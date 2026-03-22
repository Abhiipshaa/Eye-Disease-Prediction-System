import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar        from './components/Navbar'
import Footer        from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Landing      from './pages/Landing'
import Upload       from './pages/Upload'
import Report       from './pages/Report'
import About        from './pages/About'
import Technology   from './pages/Technology'
import Login        from './pages/Login'
import Signup       from './pages/Signup'
import PatientLogin from './pages/PatientLogin'
import ClinicLogin  from './pages/ClinicLogin'
import ClinicSignup  from './pages/ClinicSignup'
import Contact      from './pages/Contact'
import FAQ          from './pages/FAQ'
import Profile from "./pages/Profile"; 

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#1e293b',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontSize: '0.875rem',
            fontWeight: '500',
          },
          success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/"               element={<Landing />} />
        <Route path="/about"          element={<About />} />
        <Route path="/technology"     element={<Technology />} />
        <Route path="/faq"            element={<FAQ />} />
        <Route path="/contact"        element={<Contact />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/profile"        element={<Profile />} />
        <Route path="/signup"         element={<Signup />} />
        <Route path="/patient-login"  element={<PatientLogin />} />
        <Route path="/clinic-login"   element={<ClinicLogin />} />
        <Route path="/clinic-signup"   element={<ClinicSignup />} />
        <Route path="/upload"         element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        <Route path="/report"         element={<ProtectedRoute><Report /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
