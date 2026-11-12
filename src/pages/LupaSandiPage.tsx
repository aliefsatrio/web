import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default function LupaSandiPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
    }
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

      {/* Card */}
      <div
        className="relative bg-white rounded-xl overflow-hidden"
        style={{
          width: '448px',
          minHeight: '520px',
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

            <div className="flex gap-1 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#BA0022' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E2E7FF' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E2E7FF' }} />
            </div>

            <h1
              className="font-bold text-center tracking-wide"
              style={{ fontSize: '22px', lineHeight: '28px', color: '#131B2E' }}
            >
              Pemulihan Kata Sandi
            </h1>
            <p className="text-center mt-1 text-xs text-slate-500">
              Masukkan email dinas terdaftar untuk menerima tautan reset kata sandi operator.
            </p>
          </div>

          <div className="w-full h-px mb-5" style={{ backgroundColor: '#EEF0FF' }} />

          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={26} />
              </div>
              <h2 className="font-bold text-slate-900 text-base mb-1">Tautan Pemulihan Dikirim!</h2>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Silakan periksa kotak masuk atau spam pada <strong>{email}</strong> untuk mengatur ulang kata sandi Anda.
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
                Kembali ke Halaman Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  className="block font-semibold mb-1.5"
                  style={{ fontSize: '12px', lineHeight: '16px', color: '#131B2E' }}
                >
                  Email Dinas Operator
                </label>
                <div
                  className="flex items-center rounded-lg px-3 gap-2"
                  style={{ backgroundColor: '#EAEDFF', height: '40px', border: '1px solid #C7CEFF' }}
                >
                  <Mail size={16} style={{ color: '#5C3F3E', flexShrink: 0 }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="nama.operator@pusdalops.sigap.go.id"
                    className="flex-1 bg-transparent outline-none"
                    style={{ fontSize: '13px', color: '#131B2E' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-semibold rounded-lg flex items-center justify-center mt-2 transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: '#BA0022',
                  color: '#FFFFFF',
                  height: '46px',
                  fontSize: '15px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Kirim Tautan Reset
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-1.5 text-xs text-blue-600 font-semibold mt-3 hover:underline"
              >
                <ArrowLeft size={14} />
                Kembali ke Login
              </button>
            </form>
          )}

          <div
            className="text-center mt-8"
            style={{ fontSize: '10px', lineHeight: '14px', color: '#916F6D' }}
          >
            SIGAP Integrated Emergency Management System • v3.2.0-PROD
          </div>
        </div>
      </div>
    </div>
  )
}
