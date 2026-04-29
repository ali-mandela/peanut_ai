export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export type PatientStatus = 'active' | 'critical' | 'recovered'
export type PatientPriority = 'low' | 'medium' | 'high'

export type Address = {
  city: string
  state: string
  country: string
}

export type Contact = {
  phone: string
  email?: string
}



export type Patient = {
  id: string

  // Basic
  name: string
  age: number
  gender: 'Male' | 'Female'

  // Medical
  condition: string
  bloodGroup: string
  status: PatientStatus
  priority: PatientPriority

  // Assignment
  doctor: string
  department: string

  // Timeline
  lastVisit: string
  nextAppointment?: string

  // Contact
  contact: Contact
  address: Address

  // UI
  avatar?: string
  //
  insurance?: string
admissionType?: 'OPD' | 'IPD'
}

export type ActivityType = 'success' | 'info' | 'warning' | 'danger'

export type Activity = {
  id: number
  message: string
  time: string
  type: ActivityType
}

export type StatTrend = 'up' | 'down'

export type Stat = {
  title: string
  value: number
  change: string
  trend: StatTrend
  type?: 'primary' | 'success' | 'warning'
}