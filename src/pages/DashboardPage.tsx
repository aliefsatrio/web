import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import {
  ExternalLink,
  Clock,
  MapPin,
  User,
  CheckCircle,
  AlertOctagon,
  PhoneCall,
  ShieldAlert,
  Radio,
  Flame,
  Ambulance,
  Shield,
  Eye,
} from 'lucide-react'

function MetricCard({
  title,
  value,
  sub,
  note,
  highlightColor,
  icon: Icon,
}: {
  title: string
  value: string | number
  sub?: string
  note?: string
  highlightColor?: string
  icon?: React.ElementType
}) {
  return (
    <div
      className="rounded-xl flex flex-col justify-between p-5 bg-white border border-[#EAEDFF] transition-all hover:shadow-md"
      style={{
        boxShadow: '0 1px 6px rgba(80,80,160,0.06)',
        minHeight: '148px',
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div
            className="font-semibold tracking-widest text-[10px] leading-tight"
            style={{ color: '#916F6D', letterSpacing: '0.1em' }}
          >
            {title}
          </div>
          {Icon && (
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: highlightColor ? `${highlightColor}15` : '#F2F3FF',
                color: highlightColor || '#0051D5',
              }}
            >
              <Icon size={14} />
            </div>
          )}
        </div>
        <div
          className="font-bold text-3xl"
          style={{ color: highlightColor || '#131B2E', lineHeight: '36px' }}
        >
          {value}
        </div>
        {sub && (
          <div className="font-medium mt-1 text-xs" style={{ color: '#5C3F3E' }}>
            {sub}
          </div>
        )}
      </div>
      {note && (
        <div className="text-[11px] leading-tight mt-2" style={{ color: '#916F6D' }}>
          {note}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ type }: { type: 'tinggi' | 'hoaks' | 'sedang' }) {
  const configs = {
    tinggi: { label: 'Tinggi', bg: '#FFF0F0', color: '#BA0022', border: '#FFDAD6' },
    hoaks: { label: 'Diduga Hoaks', bg: '#FFF3CD', color: '#815100', border: '#FFE0A0' },
    sedang: { label: 'Sedang', bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' },
  }
  const c = configs[type]
  return (
    <span
      className="font-semibold rounded px-2 py-0.5 inline-block text-[10px]"
      style={{ backgroundColor: c.bg, color: c.color, border: `1px solid ${c.border}` }}
    >
      {c.label}
    </span>
  )
}

function IncidentRow({
  id,
  status,
  time,
  location,
  title,
  reporter,
  note,
  action,
  actionColor,
  isLast,
  onActionClick,
}: {
  id: string
  status: 'tinggi' | 'hoaks' | 'sedang'
  time: string
  location: string
  title: string
  reporter: string
  note?: string
  action: string
  actionColor: string
  isLast?: boolean
  onActionClick?: () => void
}) {
  return (
    <div>
      <div className="flex items-start gap-3 py-4">
        {/* Left indicator */}
        <div
          className="rounded flex-shrink-0 mt-0.5 w-[3px] h-12"
          style={{
            backgroundColor: status === 'tinggi' ? '#BA0022' : status === 'hoaks' ? '#815100' : '#B45309',
          }}
        />

        <div className="flex-1 min-w-0">
          {/* Top row */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-mono font-semibold text-[11px]" style={{ color: '#916F6D' }}>
              {id}
            </span>
            <StatusBadge type={status} />
            <span className="text-[11px] ml-auto flex items-center" style={{ color: '#916F6D' }}>
              <Clock size={11} className="inline mr-1" />
              {time}
            </span>
            <span className="text-[11px] flex items-center" style={{ color: '#916F6D' }}>
              <MapPin size={11} className="inline mr-1 text-[#BA0022]" />
              {location}
            </span>
          </div>

          {/* Title */}
          <div className="font-semibold mb-1 text-[13px] leading-snug" style={{ color: '#131B2E' }}>
            {title}
          </div>

          {/* Reporter */}
          <div className="flex items-center gap-1 mb-1 text-[11px]" style={{ color: '#916F6D' }}>
            <User size={11} />
            <span>Pelapor: {reporter}</span>
          </div>

          {/* Note */}
          {note && (
            <div className="text-[11px] leading-relaxed rounded bg-[#F8F9FE] px-2 py-1 mt-1 text-[#5C3F3E] border border-[#EAEDFF]">
              {note}
            </div>
          )}
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={onActionClick}
          className="flex-shrink-0 font-semibold rounded-lg px-3 py-1.5 transition-all hover:opacity-90 active:scale-95 shadow-sm text-xs whitespace-nowrap text-white cursor-pointer"
          style={{
            backgroundColor: actionColor,
          }}
        >
          {action}
        </button>
      </div>
      {!isLast && <div className="h-[1px] bg-[#EAEDFF]" />}
    </div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [sosHandled, setSosHandled] = useState<boolean>(false)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  return (
    <div className="flex min-h-screen bg-[#FAF8FF]">
      <Sidebar variant="dashboard" />

      <div className="flex flex-col flex-1 min-w-0">
        <Header variant="dashboard" />

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {/* Page heading */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div
                className="font-semibold mb-1 tracking-widest text-[10px]"
                style={{ letterSpacing: '0.1em', color: '#916F6D' }}
              >
                PUSDALOPS &amp; COMMAND CENTER SIGAP
              </div>
              <h1 className="font-bold text-2xl text-[#131B2E]">
                Dashboard Ringkasan Operasional
              </h1>
              <p className="text-xs text-[#5C3F3E] mt-1 max-w-2xl">
                Monitoring insiden darurat real-time, moderasi laporan warga dari aplikasi mobile SIGAP, dan koordinasi respon cepat instansi.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                GPS Geotag Sensor: Aktif (Tegal &amp; Sekitarnya)
              </span>
            </div>
          </div>

          {/* Metric Cards Grid - 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="TOTAL LAPORAN HARI INI"
              value={24}
              sub="18 Selesai • 6 Dalam Respon"
              icon={Flame}
              highlightColor="#BA0022"
            />
            <MetricCard
              title="BUTUH VERIFIKASI WARGA"
              value={4}
              sub="Antrean Warga Baru"
              note="Terdaftar via OTP seluler"
              icon={User}
              highlightColor="#0051D5"
            />
            <MetricCard
              title="LAPORAN DIDUGA HOAKS"
              value={3}
              sub="Perlu Review Tim"
              note="Flagged oleh filter AI & warga"
              icon={ShieldAlert}
              highlightColor="#815100"
            />
            <MetricCard
              title="PANGGILAN DARURAT SOS"
              value={sosHandled ? 0 : 1}
              sub={sosHandled ? 'Semua SOS Tertangani' : '1 Sinyal Darurat Aktif'}
              note="Transmisi tombol SOS mobile"
              icon={AlertOctagon}
              highlightColor={sosHandled ? '#15803D' : '#DC2626'}
            />
          </div>

          {/* Main 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Incidents Queue (7 Cols) */}
            <div
              className="lg:col-span-7 rounded-xl bg-white border border-[#EAEDFF]"
              style={{
                boxShadow: '0 1px 6px rgba(80,80,160,0.06)',
              }}
            >
              {/* Panel header */}
              <div className="px-6 py-4 border-b border-[#EAEDFF]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold text-base text-[#131B2E]">
                      Laporan Memerlukan Perhatian Cepat
                    </div>
                    <div className="text-xs text-[#5C3F3E] mt-0.5">
                      Laporan insiden terbaru yang menunggu validasi petugas sebelum tayang ke Feed Komunitas.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/moderasi')}
                    className="flex items-center gap-1 font-semibold text-xs text-[#0051D5] hover:underline whitespace-nowrap mt-1 cursor-pointer bg-transparent border-0"
                  >
                    Buka Ruang Moderasi
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>

              {/* Incidents list */}
              <div className="px-6">
                <IncidentRow
                  id="#SG-894"
                  status="tinggi"
                  time="2 mnt lalu"
                  location="Jl. Pancasila No. 12"
                  title="Kebakaran Ruko Bahan Percetakan"
                  reporter="Arya Pratama (OTP Terverifikasi)"
                  note="Titik api membubung tinggi ke arah pemukiman warga"
                  action="Validasi"
                  actionColor="#BA0022"
                  onActionClick={() => showToast('Insiden #SG-894 divalidasi dan diteruskan ke Regu Damkar.')}
                />
                <IncidentRow
                  id="#SG-890"
                  status="hoaks"
                  time="18 mnt lalu"
                  location="Kawasan Alun-alun"
                  title="Kabar Penyerangan Geng Motor"
                  reporter="Anonim (Belum Verifikasi)"
                  note="Video rekaman terdeteksi klip lama 3 bulan lalu"
                  action="Tandai Hoaks"
                  actionColor="#815100"
                  onActionClick={() => showToast('Insiden #SG-890 ditandai sebagai disinformasi hoaks.')}
                />
                <IncidentRow
                  id="#SG-893"
                  status="sedang"
                  time="32 mnt lalu"
                  location="Simpang Empat Maya"
                  title="Kecelakaan Truk Boks & Sepeda Motor"
                  reporter="Siti Nurhaliza (Warga Tetap)"
                  note="1 Korban luka ringan di lutut, butuh pertolongan pertama PMI"
                  action="Selesai"
                  actionColor="#15803D"
                  isLast
                  onActionClick={() => showToast('Insiden #SG-893 ditandai selesai ditangani.')}
                />
              </div>

              {/* Panel Footer */}
              <div className="px-6 py-3 bg-[#FAF8FF] border-t border-[#EAEDFF] rounded-b-xl flex items-center justify-between text-xs text-[#916F6D]">
                <span>Menampilkan 3 laporan teratas dari total 6 butuh respon</span>
                <button
                  type="button"
                  onClick={() => navigate('/moderasi')}
                  className="font-medium text-[#0051D5] hover:underline bg-transparent border-0 cursor-pointer"
                >
                  Lihat Semua Tiket &rarr;
                </button>
              </div>
            </div>

            {/* Right Column: SOS Incoming & Service Dispatch (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Live SOS Alert Card */}
              <div
                className="rounded-xl overflow-hidden border"
                style={{
                  backgroundColor: sosHandled ? '#FFFFFF' : '#FFF5F5',
                  borderColor: sosHandled ? '#EAEDFF' : '#FFDAD6',
                  boxShadow: '0 2px 10px rgba(186,0,34,0.08)',
                }}
              >
                <div
                  className="px-5 py-3.5 flex items-center justify-between"
                  style={{
                    backgroundColor: sosHandled ? '#F8FAFC' : '#BA0022',
                    color: sosHandled ? '#334155' : '#FFFFFF',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      {!sosHandled && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      )}
                      <span
                        className="relative inline-flex rounded-full h-3 w-3"
                        style={{ backgroundColor: sosHandled ? '#22C55E' : '#FFFFFF' }}
                      />
                    </span>
                    <span className="font-bold text-xs uppercase tracking-wider">
                      {sosHandled ? 'Sinyal SOS Selesai Ditangani' : 'Panggilan Darurat SOS Masuk'}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: sosHandled ? '#E2E8F0' : 'rgba(255,255,255,0.25)',
                    }}
                  >
                    {sosHandled ? 'RESOLVED' : 'SIAGA MERAH'}
                  </span>
                </div>

                <div className="p-5">
                  {!sosHandled ? (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="text-sm font-bold text-[#131B2E]">
                            Syifa Khaerunisa Nabila
                          </div>
                          <div className="text-xs text-[#BA0022] font-semibold flex items-center gap-1 mt-0.5">
                            <Radio size={12} className="animate-pulse" />
                            Pemicu: Tombol Darurat Mobile SIGAP
                          </div>
                        </div>
                        <span className="text-[11px] text-[#916F6D] font-mono">1 mnt lalu</span>
                      </div>

                      {/* Location & GPS */}
                      <div className="p-3 rounded-lg bg-white border border-[#FFDAD6] mb-3 space-y-1.5 text-xs">
                        <div className="flex items-center gap-1.5 font-medium text-[#131B2E]">
                          <MapPin size={13} className="text-[#BA0022] flex-shrink-0" />
                          <span>Jl. Pancasila No. 12, Tegal</span>
                        </div>
                        <div className="text-[11px] text-[#916F6D] pl-4 font-mono">
                          Geotag: -6.8797, 109.1256 • Presisi GPS: 3 meter
                        </div>
                        <div className="flex items-center gap-1.5 text-[#5C3F3E] pl-4 pt-1 border-t border-slate-100">
                          <User size={12} />
                          <span>Kontak Darurat: <strong>Ibu (+62 812-3456-7890)</strong></span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => showToast('Membuka saluran panggil darurat ke Kontak Ibu: +62 812-3456-7890')}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-[#BA0022] text-white hover:opacity-90 cursor-pointer border-0"
                        >
                          <PhoneCall size={12} />
                          Hubungi Kontak
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSosHandled(true)
                            showToast('Status SOS Syifa K. Nabila diselesaikan. Unit medis telah tiba.')
                          }}
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-[#15803D] text-white hover:opacity-90 cursor-pointer border-0"
                        >
                          <CheckCircle size={12} />
                          Tandai Selesai
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                        <CheckCircle size={20} />
                      </div>
                      <div className="text-xs font-bold text-slate-800">Tidak Ada Panggilan SOS Tertunda</div>
                      <div className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                        Seluruh pemicu SOS darurat dari warga telah dikoordinasikan dengan regu terdekat.
                      </div>
                      <button
                        type="button"
                        onClick={() => setSosHandled(false)}
                        className="mt-3 text-[11px] text-[#0051D5] hover:underline bg-transparent border-0 cursor-pointer"
                      >
                        Simulasikan Panggilan SOS Masuk
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Field Readiness Summary Card */}
              <div
                className="rounded-xl bg-white border border-[#EAEDFF] p-5"
                style={{ boxShadow: '0 1px 6px rgba(80,80,160,0.06)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-bold text-sm text-[#131B2E]">Kesiagaan Unit Instansi</div>
                  <button
                    type="button"
                    onClick={() => navigate('/nomor-layanan')}
                    className="text-xs text-[#0051D5] hover:underline flex items-center gap-0.5 cursor-pointer bg-transparent border-0"
                  >
                    Kelola Direktori
                    <Eye size={11} />
                  </button>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8FF] border border-[#EAEDFF] text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#FFF0F0] text-[#BA0022] flex items-center justify-center">
                        <Flame size={13} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Damkar Posko Induk (113)</div>
                        <div className="text-[10px] text-slate-500">4 Armada Pompa Siaga</div>
                      </div>
                    </div>
                    <span className="font-semibold text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Ready
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8FF] border border-[#EAEDFF] text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#F0FDF4] text-[#15803D] flex items-center justify-center">
                        <Ambulance size={13} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Ambulans PMI & RSUD (118)</div>
                        <div className="text-[10px] text-slate-500">1 Unit Menuju Lokasi Pancasila</div>
                      </div>
                    </div>
                    <span className="font-semibold text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Dispatching
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF8FF] border border-[#EAEDFF] text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
                        <Shield size={13} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">Polres Respon Cepat (110)</div>
                        <div className="text-[10px] text-slate-500">Patroli Presisi Wilayah Kota</div>
                      </div>
                    </div>
                    <span className="font-semibold text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Patrolling
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
