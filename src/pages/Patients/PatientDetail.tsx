import { useParams } from 'react-router-dom'
import { usePatientStore } from '../../store/patientStore'
import PageWrapper from '../../components/ui/PageWrapper'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'  

export default function PatientDetails() {
  const { id } = useParams()
    const navigate = useNavigate()
  const patient = usePatientStore((s) => s.getPatientById(id!))

  if (!patient) {
    return (
      <div className="text-text-secondary text-center py-10">
        Patient not found
      </div>
    )
  }

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
    <PageWrapper
      title={patient.name}
      subtitle={`${patient.condition} • ${patient.department}`}
       actions={
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      }
    >
      <div className="bg-surface-light border border-border rounded-md p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <img
            src={
              patient.avatar ||
              `https://ui-avatars.com/api/?name=${patient.name}`
            }
            alt={patient.name}
            className="w-14 h-14 rounded-full object-cover border border-border"
          />

          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              {patient.name}
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-[10px] px-2 py-0.5 rounded ${statusColor[patient.status]}`}
              >
                {patient.status}
              </span>

              <span className={`text-xs ${priorityColor[patient.priority]}`}>
                {patient.priority} priority
              </span>
            </div>
          </div>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Basic */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">
              Basic Info
            </h3>
            <div className="space-y-1 text-sm text-text-secondary">
              <p>Age: <span className="text-text-primary">{patient.age}</span></p>
              <p>Gender: <span className="text-text-primary">{patient.gender}</span></p>
              <p>Blood Group: <span className="text-text-primary">{patient.bloodGroup}</span></p>
            </div>
          </div>

          {/* Medical */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">
              Medical
            </h3>
            <div className="space-y-1 text-sm text-text-secondary">
              <p>Condition: <span className="text-text-primary">{patient.condition}</span></p>
              <p>Doctor: <span className="text-text-primary">{patient.doctor}</span></p>
              <p>Department: <span className="text-text-primary">{patient.department}</span></p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">
              Timeline
            </h3>
            <div className="space-y-1 text-sm text-text-secondary">
              <p>Last Visit: <span className="text-text-primary">{patient.lastVisit}</span></p>
              {patient.nextAppointment && (
                <p>Next Appointment: <span className="text-primary">{patient.nextAppointment}</span></p>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">
              Contact
            </h3>
            <div className="space-y-1 text-sm text-text-secondary">
              <p>Phone: <span className="text-text-primary">{patient.contact.phone}</span></p>
              {patient.contact.email && (
                <p>Email: <span className="text-text-primary">{patient.contact.email}</span></p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-text-primary mb-2">
              Address
            </h3>
            <p className="text-sm text-text-secondary">
              {patient.address.city}, {patient.address.state}, {patient.address.country}
            </p>
          </div>

          {/* Extra */}
          {(patient.insurance || patient.admissionType) && (
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-text-primary mb-2">
                Additional Info
              </h3>
              <div className="text-sm text-text-secondary space-y-1">
                {patient.insurance && (
                  <p>Insurance: <span className="text-text-primary">{patient.insurance}</span></p>
                )}
                {patient.admissionType && (
                  <p>Admission: <span className="text-text-primary">{patient.admissionType}</span></p>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </PageWrapper>
  )
}