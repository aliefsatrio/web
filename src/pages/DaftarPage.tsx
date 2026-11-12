import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, Mail, Shield, ArrowLeft, CheckCircle } from 'lucide-react'

export default function DaftarPage() {
  const navigate = useNavigate()
  const [fullname, setFullname] = useState('')
  const [nip, setNip] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (fullname && email && password) {
      setIsSuccess(true)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-10"
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

      {/* Card */}
      <div
        className="relative bg-white rounded-xl overflow-hidden"
        style={{
          width: '460px',
          minHeight: '620px',
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

        <div className="px-8 pb-8 pt-7 flex flex-col" style={{ paddingLeft: '32px', paddingRight: '32px' }}>
          {/* Logo area */}
          <div className="flex flex-col items-center mb-4">
            <div
              className="flex items-center justify-center rounded-full mb-2"
              style={{ width: '56px', height: '56px', backgroundColor: '#BA0022' }}
            >
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path d="M17 3L29 10V24L17 31L5 24V10L17 3Z" fill="white" fillOpacity="0.3" />
                <path d="M17 7L25.5 12V22L17 27L8.5 22V12L17 7Z" fill="white" fillOpacity="0.5" />
                <path d="M12 17H22M17 12V22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="17" cy="17" r="3.5" fill="white" />
              </svg>
            </div>

            <div className="flex gap-1 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#BA0022' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E2E7FF' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E2E7FF' }} />
            </div>

            <h1
              className="font-bold text-center tracking-wide"
              style={{ fontSize: '22px', lineHeight: '28px', color: '#131B2E' }}
            >
              Registrasi Operator Baru
            </h1>
            <p className="text-center mt-1 text-xs text-slate-500">
              Pendaftaran akun petugas berwenang sistem tanggap darurat SIGAP.
            </p>
          </div>

          <div className="w-full h-px mb-4" style={{ backgroundColor: '#EEF0FF' }} />

          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={26} />
              </div>
              <h2 className="font-bold text-slate-900 text-base mb-1">Pendaftaran Terkirim!</h2>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Akun operator <strong>{fullname}</strong> sedang menunggu verifikasi dari Duty Commander Pusat. Silakan login setelah aktivasi.
              </p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full font-semibold rounded-lg flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#BA0022',
                  color: '#FFFFFF',
                  height: '44px',
                  fontSize: '14px',
                }}
              >
                <ArrowLeft size={16} />
                Kembali ke Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block font-semibold mb-1 text-xs text-slate-800">
                  Nama Lengkap Petugas *
                </label>
                <div
                  className="flex items-center rounded-lg px-3 gap-2"
                  style={{ backgroundColor: '#EAEDFF', height: '38px', border: '1px solid #C7CEFF' }}
                >
                  <User size={15} style={{ color: '#5C3F3E', flexShrink: 0 }} />
                  <input
                    type="text"
                    required
                    value={fullname}
                    onChange={e => setFullname(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="flex-1 bg-transparent outline-none text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs text-slate-800">
                  NIP / ID Personil Pusdalops
                </label>
                <div
                  className="flex items-center rounded-lg px-3 gap-2"
                  style={{ backgroundColor: '#EAEDFF', height: '38px', border: '1px solid #C7CEFF' }}
                >
                  <Shield size={15} style={{ color: '#5C3F3E', flexShrink: 0 }} />
                  <input
                    type="text"
                    value={nip}
                    onChange={e => setNip(e.target.value)}
                    placeholder="19850324 201001 1 008"
                    className="flex-1 bg-transparent outline-none text-xs font-mono text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs text-slate-800">
                  Email Dinas Resmi *
                </label>
                <div
                  className="flex items-center rounded-lg px-3 gap-2"
                  style={{ backgroundColor: '#EAEDFF', height: '38px', border: '1px solid #C7CEFF' }}
                >
                  <Mail size={15} style={{ color: '#5C3F3E', flexShrink: 0 }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="nama@pusdalops.sigap.go.id"
                    className="flex-1 bg-transparent outline-none text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-xs text-slate-800">
                  Kata Sandi *
                </label>
                <div
                  className="flex items-center rounded-lg px-3 gap-2"
                  style={{ backgroundColor: '#EAEDFF', height: '38px', border: '1px solid #C7CEFF' }}
                >
                  <Lock size={15} style={{ color: '#5C3F3E', flexShrink: 0 }} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter kombinasi"
                    className="flex-1 bg-transparent outline-none text-xs text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-semibold rounded-lg flex items-center justify-center mt-3 transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: '#BA0022',
                  color: '#FFFFFF',
                  height: '44px',
                  fontSize: '15px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Daftar Akun Operator
              </button>

              <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mt-2">
                <span>Sudah memiliki akun resmi?</span>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Masuk di sini
                </button>
              </div>
            </form>
          )}

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
