import { create } from 'zustand'
import { patients as mockPatients } from '../data/patients'
import type { Patient } from '../types'

type ViewMode = 'grid' | 'list'

type PatientStore = {
  patients: Patient[]
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  getPatientById: (id: string) => Patient | undefined
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: mockPatients,
  viewMode: 'grid',

  setViewMode: (mode) => set({ viewMode: mode }),

  getPatientById: (id) =>
    get().patients.find((p) => p.id === id),
}))