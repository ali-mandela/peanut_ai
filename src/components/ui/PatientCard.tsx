import type { Patient } from '../../types'
  import { useNavigate } from 'react-router-dom'
export default function PatientCard({ patient }: { patient: Patient }) {


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
  className="bg-surface-light border border-border rounded-md p-4 hover:bg-surface-elevated hover:shadow-sm transition cursor-pointer"
>

      {/* Top */}
      <div className="flex items-start justify-between">

        {/* Left (Avatar + Name) */}
        <div className="flex items-center gap-3">
          <img
            src={
              patient.avatar ||
              `https://ui-avatars.com/api/?name=${patient.name}`
            }
            alt={patient.name}
            className="w-10 h-10 rounded-full object-cover border border-border"
          />

          <div>
            <h2 className="text-sm font-semibold text-text-primary">
              {patient.name}
            </h2>
            <p className="text-xs text-text-secondary">
              {patient.age} • {patient.gender}
            </p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`text-[10px] px-2 py-0.5 rounded ${statusColor[patient.status]}`}
        >
          {patient.status}
        </span>
      </div>

      {/* Condition */}
      <p className="text-xs text-text-secondary mt-3 leading-relaxed">
        {patient.condition}
      </p>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-text-secondary">
        <p>Dr: {patient.doctor}</p>
        <p>{patient.department}</p>
        <p>Blood: {patient.bloodGroup}</p>
        <p className={priorityColor[patient.priority]}>
          Priority: {patient.priority}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-border mt-3 pt-3 text-xs text-text-secondary space-y-1">
        <p>📍 {patient.address.city}, {patient.address.country}</p>
        <p>🕒 Last visit: {patient.lastVisit}</p>

        {patient.nextAppointment && (
          <p className="text-primary">
            Next: {patient.nextAppointment}
          </p>
        )}
      </div>

    </div>
  )
}