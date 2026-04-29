import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'

export default function StatCard({
  title,
  value,
  change,
  trend,
  type = 'primary',
}: {
  title: string
  value: number
  change: string
  trend: 'up' | 'down'
  type?: 'primary' | 'success' | 'warning'
}) {

  const typeColor = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
  }

  return (
    <div className="bg-surface-light border border-border rounded-md p-4 transition hover:bg-surface-elevated hover:shadow-sm">

      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-secondary">{title}</p>

        {/* Small icon */}
        <Activity size={14} className={typeColor[type]} />
      </div>

      {/* Value */}
      <h2 className="text-2xl font-semibold text-text-primary tracking-tight mt-2">
        {value}
      </h2>

      {/* Change */}
      <div className="flex items-center gap-1 mt-2 text-xs font-medium">
        {trend === 'up' ? (
          <ArrowUpRight size={14} className="text-success" />
        ) : (
          <ArrowDownRight size={14} className="text-danger" />
        )}

        <span className={trend === 'up' ? 'text-success' : 'text-danger'}>
          {change}
        </span>

        <span className="text-text-secondary ml-1">vs last week</span>
      </div>
    </div>
  )
}