import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Rss,
  FileSearch,
  Phone,
  ShieldCheck,
  Settings,
  AlertCircle,
  LogOut,
} from 'lucide-react'

type SidebarVariant =
  | 'dashboard'
  | 'feed'
  | 'verifikasi'
  | 'layanan'
  | 'moderasi'
  | 'pengaturan'

interface SidebarProps {
  variant: SidebarVariant
}

const NAV_ITEMS = [
  {
    label: 'Dashboard Ringkasan',
    icon: LayoutDashboard,
    route: '/dashboard',
    badge: null,
  },
  {
    label: 'Kelola Postingan Feed',
    icon: Rss,
    route: '/feed',
    badge: 'CRUD',
  },
  {
    label: 'Moderasi Laporan',
    icon: FileSearch,
    route: '/moderasi',
    badge: '3 Cek',
  },
  {
    label: 'Kelola Nomor Layanan',
    icon: Phone,
    route: '/nomor-layanan',
    badge: '4 Baru',
  },
  {
    label: 'Verifikasi Data Warga',
    icon: ShieldCheck,
    route: '/verifikasi-warga',
    badge: null,
  },
  {
    label: 'Pengaturan',
    icon: Settings,
    route: '/pengaturan',
    badge: null,
  },
]

export default function Sidebar({ variant }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [unavailableMsg, setUnavailableMsg] = useState<string | null>(null)

  // Lebar sidebar 288px seragam untuk seluruh halaman admin
  const width = '288px'

  const handleNav = (item: (typeof NAV_ITEMS)[0]) => {
    if (item.route) {
      navigate(item.route)
    } else {
      setUnavailableMsg(`Halaman "${item.label}" belum tersedia.`)
      setTimeout(() => setUnavailableMsg(null), 2500)
    }
  }

  const isActive = (route: string | null) => route && location.pathname === route

  return (
    <aside
      data-variant={variant}
      className="flex flex-col flex-shrink-0 h-screen sticky top-0 overflow-y-auto"
      style={{ width, backgroundColor: '#283044', minHeight: '100vh' }}
    >
      {/* Branding */}
      <div className="px-5 pt-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2 mb-0.5">
          {/* Logo Icon */}
          <div
            className="flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ width: '32px', height: '32px', backgroundColor: '#BA0022' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" fill="white" fillOpacity="0.3" />
              <path d="M7 10H13M10 7V13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="10" cy="10" r="2" fill="white" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white" style={{ fontSize: '14px', lineHeight: '18px' }}>
                SIGAP
              </span>
              <span
                className="font-bold px-1.5 py-0.2 rounded"
                style={{
                  fontSize: '9px',
                  backgroundColor: '#0051D5',
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                  lineHeight: '13px',
                }}
              >
                LIVE
              </span>
            </div>
            <div
              className="font-medium"
              style={{ fontSize: '9px', lineHeight: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}
            >
              Command Center
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div
          className="flex items-center gap-1.5 mt-3 px-2.5 py-1.5 rounded-lg"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ backgroundColor: '#22C55E' }} />
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', lineHeight: '16px' }}>
            Sistem Operasional Normal
          </span>
          <span
            className="ml-auto font-semibold px-1.5 py-0.5 rounded"
            style={{ fontSize: '9px', backgroundColor: '#15803D', color: '#fff', letterSpacing: '0.04em' }}
          >
            Aktif
          </span>
        </div>
      </div>

      {/* Unavailable notice */}
      {unavailableMsg && (
        <div
          className="mx-3 mt-2 px-3 py-2 rounded-lg flex items-start gap-2"
          style={{ backgroundColor: 'rgba(186,0,34,0.15)', border: '1px solid rgba(186,0,34,0.3)' }}
        >
          <AlertCircle size={13} style={{ color: '#FF8A9A', marginTop: '1px', flexShrink: 0 }} />
          <span style={{ fontSize: '11px', color: '#FF8A9A', lineHeight: '15px' }}>{unavailableMsg}</span>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 py-3 px-3">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          const active = isActive(item.route)
          return (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-colors text-left"
              style={{
                backgroundColor: active ? '#BA0022' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
              }}
            >
              <Icon size={16} style={{ flexShrink: 0 }} />
              <span className="flex-1 text-left font-medium" style={{ fontSize: '13px', lineHeight: '20px' }}>
                {item.label}
              </span>
              {item.badge && (
                <span
                  className="font-semibold px-1.5 py-0.5 rounded"
                  style={{
                    fontSize: '10px',
                    backgroundColor: active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                    color: active ? '#fff' : 'rgba(255,255,255,0.7)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Profile footer */}
      <div
        className="px-3 py-3 mx-3 mb-4 rounded-xl flex items-center justify-between mt-auto"
        style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="flex items-center justify-center rounded-full font-bold flex-shrink-0"
            style={{ width: '36px', height: '36px', backgroundColor: '#BA0022', color: '#fff', fontSize: '13px' }}
          >
            BS
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-white truncate" style={{ fontSize: '13px', lineHeight: '18px' }}>
              Budi Santoso
            </div>
            <div
              className="truncate"
              style={{ fontSize: '11px', lineHeight: '16px', color: 'rgba(255,255,255,0.5)' }}
            >
              Duty Commander
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/login')}
          title="Keluar dari sesi"
          className="p-1.5 rounded-lg transition-colors hover:bg-white/10 text-white/60 hover:text-white"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  )
}

