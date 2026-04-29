import { usePatientStore } from '../../store/patientStore'
import PatientCard from '../../components/ui/PatientCard'
import PatientRow from '../../components/ui/PatientRow'
import PageWrapper from '../../components/ui/PageWrapper'
import { useState } from 'react'
import { Search } from 'lucide-react'

export default function Patients() {
  const { patients, viewMode, setViewMode } = usePatientStore()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'critical' | 'recovered'>('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')

  const departments = ['all', ...new Set(patients.map((p) => p.department))]

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || p.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  return (
    <PageWrapper
      title="Patients"
      subtitle="Manage and monitor patient records"
    >
      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        {/* Left side */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 bg-surface-light border border-border rounded-md">
            <Search size={14} className="text-text-secondary" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients..."
              className="bg-transparent text-sm outline-none text-text-primary placeholder:text-text-secondary w-40"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-surface-light border border-border text-text-primary text-sm px-3 py-2 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="critical">Critical</option>
            <option value="recovered">Recovered</option>
          </select>

          {/* Department */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-surface-light border border-border text-text-primary text-sm px-3 py-2 rounded-md"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'all' ? 'All Departments' : d}
              </option>
            ))}
          </select>

          {/* Reset */}
          <button
            onClick={() => {
              setSearch('')
              setStatusFilter('all')
              setDepartmentFilter('all')
            }}
            className="text-xs text-text-secondary hover:text-text-primary"
          >
            Reset
          </button>

        </div>

        {/* Right side (view toggle) */}
        <div className="flex bg-surface-light border border-border rounded-md p-1 w-fit">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1 text-sm rounded transition ${
              viewMode === 'grid'
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Grid
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 text-sm rounded transition ${
              viewMode === 'list'
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            List
          </button>
        </div>

      </div>

      {/* Info */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-text-secondary">
          Showing {filteredPatients.length} of {patients.length} patients
        </p>
      </div>

      {/* Content */}
      {filteredPatients.length === 0 ? (
        <div className="text-sm text-text-secondary text-center py-10">
          No patients found
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPatients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredPatients.map((p) => (
            <PatientRow key={p.id} patient={p} />
          ))}
        </div>
      )}
    </PageWrapper>
  )
}