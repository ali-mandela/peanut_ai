import type { Patient } from '../../types'
import { useNavigate } from 'react-router-dom'
export default function PatientRow({ patient }: { patient: Patient }) {


const navigate = useNavigate()
  const statusColor = {
    active: 'bg-success/10 text-success',
    critical: 'bg-danger/10 text-danger',
    recovered: 'bg-primary/10 text-primary',
  }

  const priorityColor = {
    low: 'text-text-secondary',
    medium: 'text-warning',
    high: 'text-danger',
  }

  return (
  <div
  onClick={() => navigate(`/patients/${patient.id}`)}
  className="flex items-center justify-between px-4 py-3 bg-surface-light border border-border rounded-md hover:bg-surface-elevated transition cursor-pointer"
>

      {/* Left (Avatar + Info) */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar */}
        <img
          src={
            patient.avatar ||
            `https://ui-avatars.com/api/?name=${patient.name}`
          }
          alt={patient.name}
          className="w-9 h-9 rounded-full object-cover border border-border"
        />

        {/* Name + condition */}
        <div className="truncate">
          <p className="text-sm font-medium text-text-primary truncate">
            {patient.name}
          </p>
          <p className="text-xs text-text-secondary truncate">
            {patient.condition} • {patient.department}
          </p>
        </div>
      </div>

      {/* Middle (Doctor + Priority) */}
      <div className="hidden md:flex flex-col text-xs text-text-secondary">
        <span>{patient.doctor}</span>
        <span className={priorityColor[patient.priority]}>
          Priority: {patient.priority}
        </span>
      </div>

      {/* Status */}
      <div className="hidden sm:block">
        <span
          className={`text-[10px] px-2 py-0.5 rounded ${statusColor[patient.status]}`}
        >
          {patient.status}
        </span>
      </div>

      {/* Right (Time + Location) */}
      <div className="text-right">
        <p className="text-xs text-text-primary">
          {patient.lastVisit}
        </p>
        <p className="text-[10px] text-text-secondary">
          {patient.address.city}
        </p>
      </div>

    </div>
  )
}