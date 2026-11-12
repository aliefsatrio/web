import { Search, Bell } from 'lucide-react'

type HeaderVariant = 'dashboard' | 'feed' | 'verifikasi'

interface HeaderProps {
  variant?: HeaderVariant
}

export default function Header({ variant = 'feed' }: HeaderProps) {
  const isDashboard = variant === 'dashboard'

  const searchPlaceholder = isDashboard
    ? 'Cari laporan, warga, atau instansi...'
    : 'Cari tiket darurat, warga, lokasi...'

  const serverStatus = 'Server Pusdalops: Aktif (Respon 38ms)'
  const dateLabel = 'Kamis, 24 Oktober 2024'

  return (
    <header
      className="flex items-center gap-4 px-6 flex-shrink-0 sticky top-0 z-20"
      style={{
        height: '64px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EAEDFF',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
      }}
    >
      {/* Search */}
      <div
        className="flex items-center gap-2 flex-1 max-w-sm rounded-lg px-3"
        style={{ backgroundColor: '#F5F6FF', height: '36px', border: '1px solid #E2E7FF' }}
      >
        <Search size={14} style={{ color: '#916F6D', flexShrink: 0 }} />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="flex-1 bg-transparent outline-none"
          style={{ fontSize: '12px', color: '#5C3F3E' }}
        />
        <span
          className="font-mono text-xs flex-shrink-0 px-1.5 py-0.5 rounded"
          style={{
            fontSize: '10px',
            backgroundColor: '#E2E7FF',
            color: '#5C3F3E',
            border: '1px solid #C7CEFF',
          }}
        >
          ⌘K
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Server status */}
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22C55E' }} />
        <span style={{ fontSize: '11px', color: '#5C3F3E', lineHeight: '16px' }}>{serverStatus}</span>
      </div>

      {/* Date */}
      <span
        className="font-medium"
        style={{ fontSize: '12px', color: '#916F6D', lineHeight: '16px' }}
      >
        {dateLabel}
      </span>

      {/* Notification */}
      <button
        type="button"
        className="relative flex items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
        style={{
          width: '36px',
          height: '36px',
          backgroundColor: '#F5F6FF',
          border: '1px solid #E2E7FF',
          cursor: 'pointer',
        }}
      >
        <Bell size={16} style={{ color: '#5C3F3E' }} />
        <span
          className="absolute font-semibold flex items-center justify-center rounded-full"
          style={{
            top: '-5px',
            right: '-5px',
            width: '16px',
            height: '16px',
            backgroundColor: '#BA0022',
            color: '#fff',
            fontSize: '9px',
          }}
        >
          5
        </span>
      </button>

      {/* Avatar Profile */}
      <div
        className="flex items-center justify-center rounded-full font-bold shadow-sm"
        style={{
          width: '36px',
          height: '36px',
          backgroundColor: '#BA0022',
          color: '#fff',
          fontSize: '13px',
          flexShrink: 0,
        }}
        title="Budi Santoso (Duty Commander)"
      >
        BS
      </div>
    </header>
  )
}
