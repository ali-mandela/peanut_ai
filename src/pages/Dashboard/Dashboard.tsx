import StatCard from '../../components/ui/StatCard'
import ActivityItem from '../../components/ui/ActivityItem'
import { stats, activities } from '../../data/mockData'
import { Link } from 'react-router-dom'
import PageWrapper from '../../components/ui/PageWrapper'
import { requestPermission, sendNotification } from '../../services/notifications'
import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
  import { useToastStore } from '../../store/toastStore'
export default function Dashboard() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string>('')

const addToast = useToastStore((s) => s.addToast)

  // Auto request permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      requestPermission()
    }
  }, [])

  return (
    <PageWrapper
      title="Dashboard"
      subtitle="Monitor key metrics, recent activity, and system insights"
      actions={
        <div className="flex gap-2">
          <Link
            to="/analytics"
            className="bg-primary text-white text-sm px-3 py-2 rounded-md hover:bg-primary/90 transition"
          >
            Analytics
          </Link>

          <Link
            to="/patients"
            className="bg-surface-light border border-border text-text-primary text-sm px-3 py-2 rounded-md hover:bg-surface-elevated transition"
          >
            Patients
          </Link>
        </div>
      }
    >

      {/* 🔔 Notification Panel */}
      <div className="bg-surface-light border border-border rounded-md p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-text-secondary" />
          <h2 className="text-sm font-semibold text-text-primary">
            Test Notifications
          </h2>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notification title"
            className="px-3 py-2 text-sm bg-surface border border-border rounded-md outline-none text-text-primary placeholder:text-text-secondary"
          />

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Notification message"
            className="px-3 py-2 text-sm bg-surface border border-border rounded-md outline-none text-text-primary placeholder:text-text-secondary"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">

          <button
            onClick={async () => {
              const res = await requestPermission()
              setStatus(`Permission: ${res}`)
            }}
            className="px-3 py-2 text-xs bg-surface border border-border rounded-md text-text-secondary hover:text-text-primary"
          >
            Enable
          </button>

          <button
            onClick={() => {
  if (!title && !message) {
    addToast('Please enter title or message', 'error')
    return
  }

  sendNotification(
    title || 'Test Notification',
    message || 'This is a sample notification'
  )
  

  addToast('Notification sent successfully', 'success')

  setTitle('')
  setMessage('')
}}
            className="px-3 py-2 text-xs bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Send
          </button>

        </div>

        {/* Status */}
        {status && (
          <p className="text-xs text-text-secondary">
            {status}
          </p>
        )}
      </div>

      {/* Stats */}
      <div>
        <p className="text-xs text-text-secondary mb-2">
          Key Metrics
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-surface-light border border-border rounded-md p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-2">
          Insights
        </h2>

        <p className="text-sm text-text-secondary leading-relaxed">
          Patient visits increased by{' '}
          <span className="text-success font-medium">12%</span> this week.
          The highest activity is observed in{' '}
          <span className="text-primary font-medium">Cardiology</span>,
          suggesting increased demand in that department.
        </p>
      </div>

      {/* Activity */}
      <div className="bg-surface-light border border-border rounded-md p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-4">
          Recent Activity
        </h2>

        <div className="space-y-3">
          {activities.map((a) => (
            <ActivityItem key={a.id} {...a} />
          ))}
        </div>
      </div>

    </PageWrapper>
  )
}