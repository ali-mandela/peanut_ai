import PageWrapper from '../../components/ui/PageWrapper'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
} from 'recharts'

import {
  visitsData,
  departmentData,
  caseDistribution,
} from '../../data/analytics'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b']

export default function Analytics() {
  return (
    <PageWrapper
      title="Analytics"
      subtitle="Insights, trends, and performance metrics"
    >

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-light border border-border rounded-md p-4">
          <p className="text-xs text-text-secondary">Weekly Visits</p>
          <h2 className="text-xl font-semibold text-text-primary mt-1">
            1,400
          </h2>
          <p className="text-xs text-success mt-1">+8% vs last week</p>
        </div>

        <div className="bg-surface-light border border-border rounded-md p-4">
          <p className="text-xs text-text-secondary">Appointments</p>
          <h2 className="text-xl font-semibold text-text-primary mt-1">
            320
          </h2>
          <p className="text-xs text-danger mt-1">-2% vs last week</p>
        </div>

        <div className="bg-surface-light border border-border rounded-md p-4">
          <p className="text-xs text-text-secondary">Critical Cases</p>
          <h2 className="text-xl font-semibold text-text-primary mt-1">
            15%
          </h2>
          <p className="text-xs text-warning mt-1">Stable</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Line */}
        <div className="bg-surface-light border border-border rounded-md p-4 h-[280px]">
          <h2 className="text-sm font-semibold text-text-primary mb-3">
            Patient Visits
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitsData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#111827', border: 'none' }} />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar */}
        <div className="bg-surface-light border border-border rounded-md p-4 h-[280px]">
          <h2 className="text-sm font-semibold text-text-primary mb-3">
            Appointments by Department
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#111827', border: 'none' }} />
              <Bar dataKey="appointments" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="bg-surface-light border border-border rounded-md p-4 h-[300px] xl:col-span-2">
          <h2 className="text-sm font-semibold text-text-primary mb-3">
            Case Distribution
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={caseDistribution}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                innerRadius={50}
                paddingAngle={3}
              >
                {caseDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#111827', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Insights */}
      <div className="bg-surface-light border border-border rounded-md p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-2">
          Insights
        </h2>

        <p className="text-sm text-text-secondary leading-relaxed">
          Patient visits show a steady upward trend, with peak activity mid-week.
          Cardiology and Neurology departments are handling the highest number of appointments.
          Critical cases remain stable, indicating effective early intervention.
        </p>
      </div>

    </PageWrapper>
  )
}