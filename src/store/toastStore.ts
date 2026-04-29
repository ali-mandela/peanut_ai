import { create } from 'zustand'

type Toast = {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
}

type ToastStore = {
  toasts: Toast[]
  addToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (message, type = 'info') => {
    const id = Date.now().toString()

    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }))

    // auto remove after 3s
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }))
    }, 3000)
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))