import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import {
  Search,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Users,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  AlertTriangle,
  UserCheck,
} from 'lucide-react'

type TabKey = 'semua' | 'menunggu' | 'disetujui' | 'ditolak'

interface CitizenRecord {
  id: string
  name: string
  avatarBg: string
  avatarText: string
  badge: string
  badgeColor: { bg: string; color: string }
  phone: string
  phoneStatus: string
  email: string
  nik?: string
  emergencyContact: {
    name: string
    phone: string
    relation: string
  }
  gpsActive: boolean
  date: string
  status: 'menunggu' | 'disetujui' | 'ditolak'
  extraBadge?: string
}

const INITIAL_CITIZENS: CitizenRecord[] = [
  {
    id: '#VRF-2024-8840',
    name: 'Syifa Khaerunisa Nabila',
    avatarBg: '#BA0022',
    avatarText: 'SK',
    badge: 'Warga Terdaftar Mobile',
    badgeColor: { bg: '#DCFCE7', color: '#15803D' },
    phone: '+62 812-3456-7890',
    phoneStatus: 'OTP Terverifikasi',
    email: 'syifa@example.com',
    nik: '3328015509980001',
    emergencyContact: {
      name: 'Ibu',
      phone: '+62 812-3456-7890',
      relation: 'Keluarga',
    },
    gpsActive: true,
    date: '24 Okt 2024, 08:30 WIB',
    status: 'menunggu',
    extraBadge: 'Akun Mobile SIGAP Aktif',
  },
  {
    id: '#VRF-2024-8839',
    name: 'Hendra Gunawan',
    avatarBg: '#0051D5',
    avatarText: 'HG',
    badge: 'Warga Tetap',
    badgeColor: { bg: '#DCFCE7', color: '#15803D' },
    phone: '+62 813-9876-5432',
    phoneStatus: 'OTP Terverifikasi',
    email: 'hendra.g@gmail.com',
    nik: '3328011204890003',
    emergencyContact: {
      name: 'Dewi Anggraeni',
      phone: '+62 813-2211-4455',
      relation: 'Pasangan',
    },
    gpsActive: true,
    date: '24 Okt 2024, 08:14 WIB',
    status: 'menunggu',
    extraBadge: 'Pelapor Terverifikasi (3 Laporan)',
  },
  {
    id: '#VRF-2024-8837',
    name: 'Dimas Kurnia Pratama',
    avatarBg: '#7C3AED',
    avatarText: 'DK',
    badge: 'Warga Domisili',
    badgeColor: { bg: '#DBEAFE', color: '#1D4ED8' },
    phone: '+62 857-8912-3456',
    phoneStatus: 'OTP Terverifikasi',
    email: 'dimas.kurnia@email.com',
    nik: '3578021504950002',
    emergencyContact: {
      name: 'Bambang Sudirgo',
      phone: '+62 857-1122-3344',
      relation: 'Keluarga',
    },
    gpsActive: false, // GPS belum aktif
    date: '24 Okt 2024, 07:11 WIB',
    status: 'menunggu',
  },
  {
    id: '#VRF-2024-8835',
    name: 'Arya Pratama',
    avatarBg: '#059669',
    avatarText: 'AP',
    badge: 'Warga Tetap',
    badgeColor: { bg: '#DCFCE7', color: '#15803D' },
    phone: '+62 819-4567-8901',
    phoneStatus: 'OTP Terverifikasi',
    email: 'arya.pratama@gmail.com',
    emergencyContact: {
      name: 'Siti Rahma',
      phone: '+62 819-9988-7766',
      relation: 'Keluarga',
    },
    gpsActive: true,
    date: '24 Okt 2024, 06:45 WIB',
    status: 'menunggu',
    extraBadge: 'Pelapor Teladan (5 Laporan Valid)',
  },
]

export default function VerifikasiPage() {
  const [citizens, setCitizens] = useState<CitizenRecord[]>(INITIAL_CITIZENS)
  const [activeTab, setActiveTab] = useState<TabKey>('menunggu')
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleApprove = (id: string, name: string) => {
    setCitizens(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'disetujui' } : c))
    )
    showToast(`Akun warga "${name}" (${id}) telah disetujui & diverifikasi penuh!`)
  }

  const handleReject = (id: string, name: string) => {
    setCitizens(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'ditolak' } : c))
    )
    showToast(`Permohonan verifikasi "${name}" (${id}) ditolak / butuh koreksi dokumen.`)
  }

  const filteredCitizens = citizens.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      (c.nik && c.nik.includes(searchQuery)) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === 'semua') return matchesSearch
    return matchesSearch && c.status === activeTab
  })

  const counts = {
    semua: citizens.length,
    menunggu: citizens.filter(c => c.status === 'menunggu').length,
    disetujui: citizens.filter(c => c.status === 'disetujui').length,
    ditolak: citizens.filter(c => c.status === 'ditolak').length,
  }

  return (
    <div className="flex min-h-screen bg-[#FAF8FF]">
      <Sidebar variant="verifikasi" />

      <div className="flex flex-col flex-1 min-w-0">
        <Header variant="verifikasi" />

        {/* Main */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {/* Page heading */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div
                className="font-semibold mb-1 tracking-widest text-[10px]"
                style={{ letterSpacing: '0.1em', color: '#916F6D' }}
              >
                SISTEM OTORITAS IDENTITAS WARGA
              </div>
              <h1 className="font-bold text-2xl text-[#131B2E]">
                Verifikasi Data Pengguna SIGAP Mobile
              </h1>
              <p className="text-xs text-[#5C3F3E] mt-1 max-w-2xl">
                Validasi data registrasi seluler warga, kontak darurat, serta aktivasi sensor lokasi GPS pengguna aplikasi mobile SIGAP.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                <ShieldCheck size={14} />
                Otoritas Keamanan Data SIGAP Terenkripsi
              </span>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Card 1: Antrean Prioritas */}
            <div
              className="rounded-xl flex items-center gap-5 p-6 bg-white border border-[#EAEDFF]"
              style={{ boxShadow: '0 1px 4px rgba(80,80,160,0.06)' }}
            >
              <div className="w-14 h-14 rounded-xl bg-[#FFF0F0] text-[#BA0022] flex items-center justify-center flex-shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <div
                  className="font-semibold tracking-widest text-[10px] mb-1"
                  style={{ letterSpacing: '0.1em', color: '#916F6D' }}
                >
                  ANTREAN PERLU DITINJAU
                </div>
                <div className="font-bold text-3xl text-[#131B2E]">
                  {counts.menunggu}
                </div>
                <div className="text-xs text-[#5C3F3E] mt-0.5">Warga Menunggu Validasi Dokumen</div>
              </div>
            </div>

            {/* Card 2: Akun Terdaftar */}
            <div
              className="rounded-xl flex items-center gap-5 p-6 bg-white border border-[#EAEDFF]"
              style={{ boxShadow: '0 1px 4px rgba(80,80,160,0.06)' }}
            >
              <div className="w-14 h-14 rounded-xl bg-[#EFF6FF] text-[#0051D5] flex items-center justify-center flex-shrink-0">
                <Users size={28} />
              </div>
              <div>
                <div
                  className="font-semibold tracking-widest text-[10px] mb-1"
                  style={{ letterSpacing: '0.1em', color: '#916F6D' }}
                >
                  TOTAL AKUN TERDAFTAR
                </div>
                <div className="font-bold text-3xl text-[#131B2E]">
                  14.820
                </div>
                <div className="text-xs text-[#5C3F3E] mt-0.5">Warga Terverifikasi OTP &amp; Siap Melapor</div>
              </div>
            </div>
          </div>

          {/* Filter tabs & Search Bar */}
          <div className="bg-white rounded-xl border border-[#EAEDFF] p-4 mb-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { key: 'menunggu', label: 'Menunggu Verifikasi', count: counts.menunggu },
                  { key: 'disetujui', label: 'Telah Disetujui', count: counts.disetujui },
                  { key: 'ditolak', label: 'Ditolak / Koreksi', count: counts.ditolak },
                  { key: 'semua', label: 'Semua Pengguna', count: counts.semua },
                ].map(tab => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key as TabKey)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border-0"
                    style={{
                      backgroundColor: activeTab === tab.key ? '#BA0022' : 'transparent',
                      color: activeTab === tab.key ? '#FFFFFF' : '#5C3F3E',
                    }}
                  >
                    <span>{tab.label}</span>
                    <span
                      className="px-1.5 py-0.2 rounded-full text-[10px]"
                      style={{
                        backgroundColor: activeTab === tab.key ? 'rgba(255,255,255,0.25)' : '#EAEDFF',
                        color: activeTab === tab.key ? '#FFFFFF' : '#131B2E',
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg px-3 bg-[#F5F6FF] border border-[#E2E7FF] h-9 w-full sm:w-64">
                  <Search size={14} className="text-[#916F6D]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Cari nama, No HP, atau NIK..."
                    className="bg-transparent outline-none text-xs text-[#5C3F3E] flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Verification Cards List */}
          <div className="space-y-3.5">
            {filteredCitizens.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#EAEDFF] p-12 text-center text-slate-500">
                <UserCheck size={36} className="mx-auto mb-2 text-slate-300" />
                <div className="text-sm font-semibold text-slate-700">Tidak Ada Data Warga</div>
                <div className="text-xs text-slate-400 mt-1">
                  Tidak ditemukan antrean warga pada kriteria filter saat ini.
                </div>
              </div>
            ) : (
              filteredCitizens.map(citizen => {
                const isApproved = citizen.status === 'disetujui'
                const isRejected = citizen.status === 'ditolak'

                return (
                  <div
                    key={citizen.id}
                    className="rounded-xl bg-white border border-[#EAEDFF] p-5 transition-all hover:shadow-sm"
                    style={{ boxShadow: '0 1px 4px rgba(80,80,160,0.05)' }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      {/* Left side: Avatar + User Info */}
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-full font-bold text-white flex items-center justify-center flex-shrink-0 text-sm shadow-sm"
                          style={{ backgroundColor: citizen.avatarBg }}
                        >
                          {citizen.avatarText}
                        </div>

                        <div className="space-y-1.5 flex-1 min-w-0">
                          {/* Name + Badges */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-[#131B2E]">
                              {citizen.name}
                            </span>
                            <span
                              className="font-semibold px-2 py-0.5 rounded-full text-[10px]"
                              style={{
                                backgroundColor: citizen.badgeColor.bg,
                                color: citizen.badgeColor.color,
                              }}
                            >
                              {citizen.badge}
                            </span>
                            {citizen.extraBadge && (
                              <span className="font-semibold px-2 py-0.5 rounded-full text-[10px] bg-amber-50 text-amber-700 flex items-center gap-1 border border-amber-200">
                                <Star size={10} />
                                {citizen.extraBadge}
                              </span>
                            )}
                          </div>

                          {/* NIK info if available */}
                          {citizen.nik ? (
                            <div className="text-xs font-mono text-[#5C3F3E]">
                              NIK: <strong>{citizen.nik}</strong>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400 italic">
                              NIK: Belum dilengkapi (Registrasi OTP Dasar)
                            </div>
                          )}

                          {/* Contact Details (Phone + Email) */}
                          <div className="flex items-center gap-4 flex-wrap text-xs text-[#5C3F3E] pt-1">
                            <div className="flex items-center gap-1.5">
                              <Phone size={12} className="text-[#916F6D]" />
                              <span>{citizen.phone}</span>
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700">
                                {citizen.phoneStatus}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <Mail size={12} className="text-[#916F6D]" />
                              <span>{citizen.email}</span>
                            </div>
                          </div>

                          {/* Emergency Contact & GPS (Synchronized with Mobile App Form) */}
                          <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-slate-100 text-xs">
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#F8FAFC] border border-slate-200 text-slate-700">
                              <span className="font-semibold text-slate-500">Kontak Darurat:</span>
                              <strong className="text-[#BA0022]">
                                {citizen.emergencyContact.name} ({citizen.emergencyContact.relation})
                              </strong>
                              <span>• {citizen.emergencyContact.phone}</span>
                            </div>

                            {citizen.gpsActive ? (
                              <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <MapPin size={11} />
                                GPS Ponsel Aktif
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                <AlertTriangle size={11} />
                                GPS Belum Diaktifkan Warga
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right side: Actions & Timestamp */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-3 flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        <div className="flex items-center gap-2">
                          {isApproved ? (
                            <span className="flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs">
                              <CheckCircle size={14} />
                              Telah Disetujui
                            </span>
                          ) : isRejected ? (
                            <span className="flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg bg-rose-100 text-rose-800 text-xs">
                              <XCircle size={14} />
                              Ditolak
                            </span>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => handleApprove(citizen.id, citizen.name)}
                                className="flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg text-xs bg-[#15803D] text-white hover:opacity-90 transition-opacity cursor-pointer border-0 shadow-sm"
                              >
                                <CheckCircle size={13} />
                                Setujui Akun
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReject(citizen.id, citizen.name)}
                                className="flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg text-xs bg-[#E2E7FF] text-[#0051D5] border border-[#C7CEFF] hover:bg-[#D5DCFF] transition-colors cursor-pointer"
                              >
                                <XCircle size={13} />
                                Tolak / Koreksi
                              </button>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-[#916F6D]">
                          <Clock size={11} />
                          <span>{citizen.date}</span>
                          <span className="font-mono text-[10px] ml-1 bg-slate-100 px-1.5 py-0.2 rounded">
                            {citizen.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </main>
      </div>

      {toastMsg && (
        <div
          className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg z-50 animate-bounce"
          style={{ backgroundColor: '#131B2E', color: '#FFFFFF', fontSize: '12px' }}
        >
          <CheckCircle size={15} style={{ color: '#22C55E' }} />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  )
}
