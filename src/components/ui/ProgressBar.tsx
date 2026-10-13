// ============================================================
// ProgressBar — Barra de progresso reutilizável
// ============================================================

interface ProgressBarProps {
  value: number // 0–100
  color?: string
  height?: number
  className?: string
  label?: string
}

export function ProgressBar({
  value,
  color = 'var(--color-brand-aqua)',
  height = 8,
  className = '',
  label,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500 font-medium">{label}</span>
          <span className="text-xs text-gray-400 font-medium">{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        className="progress-bar-track"
        style={{ height }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progresso'}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${clamped}%`, background: color }}
        />
      </div>
    </div>
  )
}
