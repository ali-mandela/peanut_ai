export default function PageWrapper({
  title,
  subtitle,
  children,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6 md:space-y-7">

      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        {/* Left */}
        <div className="min-w-0">
          <h1 className="text-lg md:text-xl font-semibold text-text-primary tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm text-text-secondary mt-1 max-w-xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right */}
        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Divider (subtle but powerful) */}
      <div className="border-b border-border" />

      {/* Content */}
      <div className="space-y-6">
        {children}
      </div>

    </div>
  )
}