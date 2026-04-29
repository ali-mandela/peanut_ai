import { useToastStore } from '../../store/toastStore'

export default function Toast() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed top-4 right-4 z-[999] space-y-2">

      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => removeToast(t.id)}
          className={`px-4 py-2 rounded-md text-sm cursor-pointer shadow-md border transition
            ${
              t.type === 'success'
                ? 'bg-success/10 text-success border-success/20'
                : t.type === 'error'
                ? 'bg-danger/10 text-danger border-danger/20'
                : 'bg-surface-light text-text-primary border-border'
            }`}
        >
          {t.message}
        </div>
      ))}

    </div>
  )
}