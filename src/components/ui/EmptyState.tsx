import { Inbox } from 'lucide-react'

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">

      {/* Icon */}
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-surface-light border border-border mb-4">
        <Inbox size={18} className="text-text-secondary" />
      </div>

      {/* Message */}
      <p className="text-sm text-text-secondary max-w-sm">
        {message}
      </p>

    </div>
  )
}