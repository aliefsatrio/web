import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('budi.santoso@sigap.go.id')
  const [password, setPassword] = useState('AdminSigap2026!')
  const [showPassword, setShowPassword] = useState(false)
  const [seePassword, setSeePassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setErrorMsg('Harap masukkan username/email dan kata sandi!')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#F2F3FF', minHeight: '930px' }}
    >
      {/* Glow effect */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(100,120,255,0.18) 0%, rgba(180,100,200,0.08) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />

      {/* Login Card */}
      <div
        className="relative bg-white rounded-xl overflow-hidden"
        style={{
          width: '448px',
          minHeight: '667px',
          boxShadow: '0 4px 32px rgba(80,80,160,0.12)',
          zIndex: 1,
        }}
      >
        {/* Accent bar top */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, #BA0022 0%, #7B2FBE 50%, #0051D5 100%)',
          }}
        />

        {/* Card content */}
        <div className="px-8 pb-8 pt-7 flex flex-col" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          {/* Logo area */}
          <div className="flex flex-col items-center mb-4">
            {/* SIGAP Logo SVG */}
            <div
              className="flex items-center justify-center rounded-full mb-2"
              style={{ width: '56px', height: '56px', backgroundColor: '#BA0022' }}
            >
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3L29 10V24L17 31L5 24V10L17 3Z" fill="white" fillOpacity="0.3" />
                <path d="M17 7L25.5 12V22L17 27L8.5 22V12L17 7Z" fill="white" fillOpacity="0.5" />
                <path d="M12 17H22M17 12V22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="17" cy="17" r="3.5" fill="white" />
              </svg>
            </div>

            {/* Indicator dots */}
            <div className="flex gap-1 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#BA0022' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E2E7FF' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E2E7FF' }} />
            </div>

            {/* Title */}
            <h1
              className="font-bold text-center tracking-wide"
              style={{ fontSize: '24px', lineHeight: '32px', color: '#131B2E', letterSpacing: '0.02em' }}
            >
              SIGAP ADMIN
            </h1>

            {/* Description */}
            <div className="text-center mt-1" style={{ fontSize: '12px', lineHeight: '16px', color: '#5C3F3E' }}>
              <p>Sistem Informasi Pelaporan Kejadian Darurat</p>
              <p>untuk Mendukung Pelayanan Publik</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-5" style={{ backgroundColor: '#EEF0FF' }} />

          {/* Form */}
          {errorMsg && (
            <div className="mb-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Username/Email */}
            <div>
              <label
                className="block font-semibold mb-1.5"
                style={{ fontSize: '12px', lineHeight: '16px', color: '#131B2E' }}
              >
                Username / Email
              </label>
              <div
                className="flex items-center rounded-lg px-3 gap-2"
                style={{ backgroundColor: '#EAEDFF', height: '40px', border: '1px solid #C7CEFF' }}
              >
                <User size={16} style={{ color: '#5C3F3E', flexShrink: 0 }} />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Masukkan username atau email"
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: '13px', color: '#131B2E' }}
                />
              </div>
            </div>

            {/* Password label row */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="font-semibold"
                  style={{ fontSize: '12px', lineHeight: '16px', color: '#131B2E' }}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/lupa-sandi')}
                  className="font-medium hover:underline"
                  style={{ fontSize: '12px', color: '#0051D5', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Lupa sandi?
                </button>
              </div>
              <div
                className="flex items-center rounded-lg px-3 gap-2"
                style={{ backgroundColor: '#EAEDFF', height: '40px', border: '1px solid #C7CEFF' }}
              >
                <Lock size={16} style={{ color: '#5C3F3E', flexShrink: 0 }} />
                <input
                  type={showPassword || seePassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: '13px', color: '#131B2E' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? (
                    <EyeOff size={16} style={{ color: '#5C3F3E' }} />
                  ) : (
                    <Eye size={16} style={{ color: '#5C3F3E' }} />
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox see password */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="seePassword"
                checked={seePassword}
                onChange={e => setSeePassword(e.target.checked)}
                className="rounded"
                style={{ accentColor: '#BA0022', width: '14px', height: '14px' }}
              />
              <label
                htmlFor="seePassword"
                className="cursor-pointer"
                style={{ fontSize: '12px', lineHeight: '16px', color: '#5C3F3E' }}
              >
                Lihat Password
              </label>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full font-semibold rounded-lg flex items-center justify-center transition-opacity hover:opacity-90 active:opacity-80"
              style={{
                backgroundColor: '#BA0022',
                color: '#FFFFFF',
                height: '48px',
                fontSize: '18px',
                lineHeight: '24px',
                marginTop: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Login
            </button>

            {/* Divider OR */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px" style={{ backgroundColor: '#E2E7FF' }} />
              <span className="font-semibold" style={{ fontSize: '11px', color: '#916F6D', letterSpacing: '0.08em' }}>
                ATAU
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: '#E2E7FF' }} />
            </div>

            {/* Register button */}
            <button
              type="button"
              onClick={() => navigate('/daftar')}
              className="w-full font-semibold rounded-lg flex items-center justify-center transition-opacity hover:opacity-90 active:opacity-80"
              style={{
                backgroundColor: '#E2E7FF',
                color: '#0051D5',
                height: '40px',
                fontSize: '14px',
                lineHeight: '20px',
                border: '1px solid #C7CEFF',
                cursor: 'pointer',
              }}
            >
              Daftar
            </button>
          </form>

          {/* Footer */}
          <div
            className="text-center mt-6"
            style={{ fontSize: '10px', lineHeight: '14px', color: '#916F6D' }}
          >
            SIGAP Integrated Emergency Management System • v3.2.0-PROD
          </div>
        </div>
      </div>
    </div>
  )
}
