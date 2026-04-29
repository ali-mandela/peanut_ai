export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">

      {/* Spinner */}
      <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />

      {/* Text */}
      <p className="text-xs text-text-secondary">
        Loading...
      </p>

    </div>
  )
}