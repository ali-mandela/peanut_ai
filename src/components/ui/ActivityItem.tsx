import type { ActivityType } from '../../types'

type Props = {
  message: string
  time: string
  type: ActivityType
}

const typeStyles: Record<ActivityType, string> = {
  success: 'bg-success',
  info: 'bg-accent',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

export default function ActivityItem({ message, time, type }: Props) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-md transition hover:bg-surface-elevated">

      {/* Left */}
      <div className="flex items-center gap-2">
        {/* Dot indicator */}
        <span className={`w-2 h-2 rounded-full ${typeStyles[type]}`} />

        <p className="text-sm text-text-primary leading-snug">
          {message}
        </p>
      </div>

      {/* Time */}
      <span className="text-xs text-text-secondary whitespace-nowrap">
        {time}
      </span>
    </div>
  )
}