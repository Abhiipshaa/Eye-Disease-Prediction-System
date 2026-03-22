import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, ScanLine, Menu, X, LogOut, ChevronDown, User, Building2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const navLinks = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/technology', labelKey: 'nav.technology' },
  { path: '/faq', labelKey: 'nav.faq' },
  { path: '/contact', labelKey: 'nav.contact' },
]

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'hg', label: 'Hinglish' },
  { code: 'or', label: 'ଓଡ଼ିଆ' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const [open, setOpen] = useState(false)
  const [loginMenu, setLoginMenu] = useState(false)
  const [langMenu, setLangMenu] = useState(false)

  const loginRef = useRef(null)
  const langRef = useRef(null)

  const user = JSON.parse(localStorage.getItem('eyescreen_user') || 'null')

  useEffect(() => {
    const handler = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setLoginMenu(false)
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangMenu(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const logout = () => {
    localStorage.removeItem('eyescreen_user')
    navigate('/')
    setOpen(false)
  }

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('eyescreen_lang', lang)
    setLangMenu(false)
    setOpen(false)
  }

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) ||
    languages.find((lang) => lang.code === 'en')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 h-16">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-200">
            <Eye size={16} className="text-white" />
          </div>
          <span className="font-bold text-slate-800 text-sm">
            RetinaSense<span className="text-blue-600"> AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ path, labelKey }) => (
            <Link
              key={path}
              to={path}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {t(labelKey)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangMenu((m) => !m)}
              className="btn-ghost gap-1.5"
            >
              {currentLanguage?.label}
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${langMenu ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {langMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute right-0 top-full mt-2 w-40 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden"
                >
                  <div className="p-1.5">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          i18n.language === lang.code
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

{user ? (
  <div className="flex items-center gap-2">

    {/* ✅ NEW SCAN BUTTON */}
    <Link
      to="/upload"
      className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
    >
      <ScanLine size={14} />
      New Scan
    </Link>

    {/* Profile Dropdown */}
    <div className="relative" ref={loginRef}>
      <button
        onClick={() => setLoginMenu((m) => !m)}
        className="flex items-center gap-2 btn-ghost"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
          👤
        </div>
        <ChevronDown size={14} />
      </button>

      <AnimatePresence>
        {loginMenu && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow"
          >
            <div className="flex flex-col p-2 gap-1">
              <Link
                to="/profile"
                onClick={() => setLoginMenu(false)}
                className="px-3 py-2 rounded hover:bg-slate-100"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="px-3 py-2 rounded text-red-500 hover:bg-red-50 text-left"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
) : (
            <>
              <div className="relative" ref={loginRef}>
                <button
                  onClick={() => setLoginMenu((m) => !m)}
                  className="btn-ghost gap-1.5"
                >
                  {t('nav.login')}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${loginMenu ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {loginMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden"
                    >
                      <div className="p-1.5">
                        <Link
                          to="/patient-login"
                          onClick={() => setLoginMenu(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <User size={13} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              {t('nav.patientLogin')}
                            </p>
                            <p className="text-xs text-slate-400">
                              {t('nav.patientLoginSub')}
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/clinic-login"
                          onClick={() => setLoginMenu(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                            <Building2 size={13} className="text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              {t('nav.clinicLogin')}
                            </p>
                            <p className="text-xs text-slate-400">
                              {t('nav.clinicLoginSub')}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/signup" className="btn-primary">
                {t('nav.getStarted')}
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-all"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <X size={20} className="text-slate-600" />
          ) : (
            <Menu size={20} className="text-slate-600" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-slate-200 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ path, labelKey }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname === path ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t(labelKey)}
                </Link>
              ))}

              <div className="border-t border-slate-100 mt-2 pt-3 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        i18n.language === lang.code
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                {user ? (
                  <>
                    <Link to="/upload" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
                      <ScanLine size={14} /> {t('nav.newScan')}
                    </Link>
                    <button onClick={logout} className="btn-ghost w-full justify-center">
                      <LogOut size={14} /> {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/patient-login"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-semibold text-sm"
                    >
                      <User size={14} /> {t('nav.patientLogin')}
                    </Link>

                    <Link
                      to="/clinic-login"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm"
                    >
                      <Building2 size={14} /> {t('nav.clinicLogin')}
                    </Link>

                    <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
                      {t('nav.getStarted')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}