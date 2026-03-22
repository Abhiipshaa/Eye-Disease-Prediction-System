import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Building2, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function ClinicSignup() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirm: '',
    phone: '', address: '', city: '', state: '', pincode: '',
    lat: '', lng: '',
  })
  const [errors, setErrors] = useState({})
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => ({ ...p, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Clinic name is required'
    if (!form.email)          e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.password)       e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Minimum 6 characters'
    if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
    if (!form.phone.trim())   e.phone   = 'Phone is required'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim())    e.city    = 'City is required'
    return e
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const res = await fetch('/api/register/clinic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, password: form.password,
          phone: form.phone, address: form.address, city: form.city,
          state: form.state, pincode: form.pincode,
          lat: form.lat || null, lng: form.lng || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors({ email: data.error })
        setLoading(false)
        return
      }
      localStorage.setItem('eyescreen_user', JSON.stringify({ name: data.name, email: data.email, role: data.role, token: data.token }))
      toast.success(`Welcome, ${data.name}!`)
      navigate('/upload')
    } catch {
      setErrors({ general: 'Server unreachable. Please try again.' })
      setLoading(false)
    }
  }

  const field = (label, key, type = 'text', placeholder = '') => (
    <div>
      <label className="label">{label}</label>
      <input
        className={`input ${errors[key] ? 'border-red-400' : ''}`}
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => set(key, e.target.value)}
      />
      {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 pt-16 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-8">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 mx-auto mb-4">
              <Building2 size={26} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Register Your Clinic</h1>
            <p className="text-slate-400 text-sm">Create a clinic account to access the portal</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
            {errors.general && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 mb-4">{errors.general}</p>}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Clinic Info</p>
              {field('Clinic Name', 'name', 'text', 'City Eye Care Center')}
              {field('Email', 'email', 'email', 'clinic@example.com')}
              {field('Phone', 'phone', 'tel', '+91 98765 43210')}

              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    className={`input pr-11 ${errors.password ? 'border-red-400' : ''}`}
                    type={showPwd ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={e => set('password', e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPwd(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              {field('Confirm Password', 'confirm', 'password', 'Re-enter password')}

              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider pt-2">Location</p>
              {field('Street Address', 'address', 'text', '123 Main Street')}

              <div className="grid grid-cols-2 gap-3">
                {field('City', 'city', 'text', 'Bhubaneswar')}
                {field('State', 'state', 'text', 'Odisha')}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {field('Pincode', 'pincode', 'text', '751001')}
                <div />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {field('Latitude (optional)', 'lat', 'text', '20.2961')}
                {field('Longitude (optional)', 'lng', 'text', '85.8245')}
              </div>

              <button type="submit" disabled={loading} className="w-full py-3 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-200 disabled:opacity-40 mt-2">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Registering...
                  </span>
                ) : 'Register Clinic'}
              </button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-5">
              Already registered?{' '}
              <Link to="/clinic-login" className="text-indigo-600 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
