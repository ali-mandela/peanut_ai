import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Analytics from '../pages/Analytics/Analytics'
import Patients from '../pages/Patients/Patients'
import PatientDetail from '../pages/Patients/PatientDetail'
import ProtectedRoute from '../components/ProtectedRoute'
import Layout from '../components/layouts/Layout' 

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes> 
    </BrowserRouter>
  )
}