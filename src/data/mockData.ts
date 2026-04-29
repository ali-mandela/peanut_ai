import type { Stat } from '../types'

export const stats: Stat[] = [
  {
    title: 'Total Patients',
    value: 1240,
    change: '+12%',
    trend: 'up',
    type: 'primary',
  },
  {
    title: 'Appointments',
    value: 86,
    change: '-3%',
    trend: 'down',
    type: 'warning',
  },
  {
    title: 'Active Cases',
    value: 312,
    change: '+5%',
    trend: 'up',
    type: 'success',
  },
]

import type { Activity } from '../types'

export const activities: Activity[] = [
  {
    id: 1,
    message: 'New patient John Doe registered',
    time: '2 min ago',
    type: 'success',
  },
  {
    id: 2,
    message: 'Appointment scheduled with Dr. Smith',
    time: '8 min ago',
    type: 'info',
  },
  {
    id: 3,
    message: 'Lab report uploaded for Emma Watson',
    time: '15 min ago',
    type: 'success',
  },
  {
    id: 4,
    message: 'Emergency case admitted (Trauma)',
    time: '30 min ago',
    type: 'danger',
  },
  {
    id: 5,
    message: 'Prescription updated for Michael Brown',
    time: '1 hr ago',
    type: 'warning',
  },
  {
    id: 6,
    message: 'Follow-up scheduled for Olivia Davis',
    time: '2 hr ago',
    type: 'info',
  },
]