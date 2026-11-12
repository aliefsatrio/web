import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import {
  AlertTriangle,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  Search,
  Camera,
  Navigation,
  Send,
} from 'lucide-react'

interface IncidentReport {
  id: string
  title: string
  category: 'Kebakaran' | 'Kecelakaan' | 'Bencana Alam' | 'Ketertiban Umum' | 'Lainnya'
  location: string
  coordinates: string
  time: string
  reporter: string
  reporterType: string
  severity: 'Tinggi' | 'Sedang' | 'Rendah'
  isHoaxSuspect?: boolean
  description: string
  status: 'Menunggu' | 'Tervalidasi' | 'Ditolak' | 'Hoaks'
  photoProof: {
    badge: string
    timestamp: string
    coordinates: string
    previewDesc: string
  }
  suggestedDispatch: string
}

const INITIAL_REPORTS: IncidentReport[] = [
  {
    id: '#SG-894',
    title: 'Kebakaran Ruko Bahan Percetakan',
    category: 'Kebakaran',
    location: 'Jl. Pancasila No. 12, Tegal',
    coordinates: '-6.8797, 109.1256 (Akurasi 3m)',
    time: '2 mnt lalu',
    reporter: 'Arya Pratama',
    reporterType: 'OTP Terverifikasi',
    severity: 'Tinggi',
    description: 'Titik api merambat cepat dari lantai dasar ruko percetakan, asap hitam pekat membubung ke arah perumahan warga sekitar.',
    status: 'Menunggu',
    photoProof: {
      badge: 'KAMERA SIGAP GEOTAG',
      timestamp: '12 Nov 2026, 00:27 WIB',
      coordinates: 'LAT: -6.8797 | LNG: 109.1256',
      previewDesc: 'Asap tebal dan kobaran api dari ruko 2 lantai',
    },
    suggestedDispatch: 'Damkar Sektor Barat (Posko Induk 113)',
  },
  {
    id: '#SG-890',
    title: 'Kabar Penyerangan Geng Motor',
    category: 'Ketertiban Umum',
    location: 'Kawasan Alun-alun Kota',
    coordinates: '-6.8690, 109.1400 (Akurasi 15m)',
    time: '18 mnt lalu',
    reporter: 'Anonim',
    reporterType: 'Belum Verifikasi',
    severity: 'Sedang',
    isHoaxSuspect: true,
    description: 'Video rekaman terdeteksi merupakan klip kejadian 3 bulan lalu di kota lain yang disebarkan ulang di grup warga.',
    status: 'Menunggu',
    photoProof: {
      badge: 'KAMERA SIGAP VERIFIED',
      timestamp: '12 Nov 2026, 00:09 WIB',
      coordinates: 'LAT: -6.8690 | LNG: 109.1400',
      previewDesc: 'Tangkapan layar rekaman video media sosial',
    },
    suggestedDispatch: 'Polres Metro Respon Cepat (110)',
  },
  {
    id: '#SG-893',
    title: 'Kecelakaan Truk Boks & Sepeda Motor',
    category: 'Kecelakaan',
    location: 'Simpang Empat Maya, Tegal',
    coordinates: '-6.8820, 109.1280 (Akurasi 4m)',
    time: '32 mnt lalu',
    reporter: 'Siti Nurhaliza',
    reporterType: 'Warga Tetap',
    severity: 'Sedang',
    description: '1 Pengendara motor luka lecet di lutut dan shock, membutuhkan ambulans PMI untuk penanganan pertama dan evakuasi ke RSUD.',
    status: 'Menunggu',
    photoProof: {
      badge: 'KAMERA SIGAP GEOTAG',
      timestamp: '11 Nov 2026, 23:55 WIB',
      coordinates: 'LAT: -6.8820 | LNG: 109.1280',
      previewDesc: 'Kondisi sepeda motor di pinggir persimpangan lampu merah',
    },
    suggestedDispatch: 'Ambulans Gawat Darurat PMI & RSUD (118)',
  },
  {
    id: '#SG-889',
    title: 'Pohon Tumbang Hambat Arus Lalu Lintas',
    category: 'Bencana Alam',
    location: 'Jl. Pemuda No. 45',
    coordinates: '-6.8750, 109.1210 (Akurasi 5m)',
    time: '1 jam lalu',
    reporter: 'Dedi Kurniawan',
    reporterType: 'Warga Tetap',
    severity: 'Rendah',
    description: 'Dahan pohon beringin patah menimpa kabel optik, kendaraan roda empat belum bisa melintas.',
    status: 'Menunggu',
    photoProof: {
      badge: 'KAMERA SIGAP GEOTAG',
      timestamp: '11 Nov 2026, 23:20 WIB',
      coordinates: 'LAT: -6.8750 | LNG: 109.1210',
      previewDesc: 'Batang pohon melintang di tengah badan jalan',
    },
    suggestedDispatch: 'BPBD Tanggap Bencana & DLH',
  },
]

export default function ModerasiLaporanPage() {
  const [reports, setReports] = useState<IncidentReport[]>(INITIAL_REPORTS)
  const [selectedReportId, setSelectedReportId] = useState<string>('#SG-894')
  const [activeFilter, setActiveFilter] = useState<string>('Semua')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedDispatchUnit, setSelectedDispatchUnit] = useState<string>('Damkar Sektor Barat (Posko Induk 113)')
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3500)
  }

  const selectedReport = reports.find(r => r.id === selectedReportId) || reports[0]

  const handleUpdateStatus = (id: string, status: IncidentReport['status']) => {
    setReports(prev => prev.map(r => (r.id === id ? { ...r, status } : r)))
    if (status === 'Tervalidasi') {
      showToast(`Laporan ${id} divalidasi dan ditugaskan ke "${selectedDispatchUnit}". Feed komunitas diperbarui!`)
    } else if (status === 'Hoaks') {
      showToast(`Laporan ${id} ditandai sebagai hoaks/spam. Akses publik dibatasi.`)
    } else {
      showToast(`Laporan ${id} ditolak karena tidak memenuhi kriteria darurat.`)
    }
  }

  const filteredReports = reports.filter(r => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === 'Menunggu') return matchesSearch && r.status === 'Menunggu'
    if (activeFilter === 'Darurat Tinggi') return matchesSearch && r.severity === 'Tinggi'
    if (activeFilter === 'Diduga Hoaks') return matchesSearch && r.isHoaxSuspect
    return matchesSearch
  })

  return (
    <div className="flex min-h-screen bg-[#FAF8FF]">
      <Sidebar variant="moderasi" />

      <div className="flex flex-col flex-1 min-w-0">
        <Header variant="feed" />

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {/* Page Heading */}
          <div className="mb-6">
            <div
              className="font-semibold mb-1 tracking-widest text-[10px]"
              style={{ letterSpacing: '0.1em', color: '#916F6D' }}
            >
              RUANG KENDALI OPERATOR PUSDALOPS
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-bold text-2xl text-[#131B2E]">
                  Moderasi &amp; Validasi Laporan Kejadian Warga
                </h1>
                <p className="text-xs text-[#5C3F3E] mt-1 max-w-2xl">
                  Inspeksi bukti foto geotag kamera mobile SIGAP, verifikasi koordinat insiden, dan koordinasikan penugasan regu darurat lapangan.
                </p>
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Antrean Laporan Masuk: {reports.filter(r => r.status === 'Menunggu').length} Butuh Respon</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div
              className="rounded-xl p-5 bg-white border border-[#EAEDFF]"
              style={{ boxShadow: '0 1px 4px rgba(80,80,160,0.06)' }}
            >
              <div className="font-semibold tracking-wider text-[10px] mb-1" style={{ color: '#916F6D' }}>
                TOTAL MASUK HARI INI
              </div>
              <div className="text-3xl font-bold text-[#131B2E]">
                48
              </div>
              <div className="text-xs mt-1 text-slate-500">24 terselesaikan • 4 dalam antrean</div>
            </div>

            <div
              className="rounded-xl p-5 bg-white border border-[#EAEDFF]"
              style={{ boxShadow: '0 1px 4px rgba(80,80,160,0.06)' }}
            >
              <div className="font-semibold tracking-wider text-[10px] mb-1" style={{ color: '#BA0022' }}>
                PRIORITAS DARURAT TINGGI
              </div>
              <div className="text-3xl font-bold text-[#BA0022]">
                6
              </div>
              <div className="text-xs mt-1 text-slate-500">Kebakaran gedung &amp; kecelakaan beruntun</div>
            </div>

            <div
              className="rounded-xl p-5 bg-white border border-[#EAEDFF]"
              style={{ boxShadow: '0 1px 4px rgba(80,80,160,0.06)' }}
            >
              <div className="font-semibold tracking-wider text-[10px] mb-1" style={{ color: '#815100' }}>
                TERINDIKASI HOAKS / DISINFORMASI
              </div>
              <div className="text-3xl font-bold text-[#815100]">
                3
              </div>
              <div className="text-xs mt-1 text-slate-500">Klip video lama &amp; spam tertahan filter</div>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="bg-white rounded-xl border border-[#EAEDFF] p-4 mb-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['Semua', 'Menunggu', 'Darurat Tinggi', 'Diduga Hoaks'].map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveFilter(tab)}
                    className="font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer border-0 whitespace-nowrap"
                    style={{
                      backgroundColor: activeFilter === tab ? '#BA0022' : '#F2F3FF',
                      color: activeFilter === tab ? '#FFFFFF' : '#5C3F3E',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-lg px-3 bg-[#F5F6FF] border border-[#E2E7FF] h-9 w-full sm:w-72">
                <Search size={14} className="text-[#916F6D]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Cari ID tiket, lokasi, judul..."
                  className="bg-transparent outline-none flex-1 text-xs text-[#5C3F3E]"
                />
              </div>
            </div>
          </div>

          {/* Two Columns: List Laporan Kiri (7 Cols) + Detail Laporan Kanan (5 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* List Laporan */}
            <div
              className="lg:col-span-7 rounded-xl bg-white border border-[#EAEDFF] overflow-hidden"
              style={{ boxShadow: '0 1px 6px rgba(80,80,160,0.06)' }}
            >
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-[#FAF8FF]">
                <span className="font-semibold text-xs text-slate-700">Daftar Antrean Tiket Darurat Mobile</span>
                <span className="text-xs text-slate-500 font-mono">{filteredReports.length} Laporan Ditemukan</span>
              </div>

              <div className="divide-y divide-slate-100">
                {filteredReports.map(report => {
                  const isSelected = selectedReport.id === report.id
                  return (
                    <div
                      key={report.id}
                      onClick={() => {
                        setSelectedReportId(report.id)
                        setSelectedDispatchUnit(report.suggestedDispatch)
                      }}
                      className="p-4 cursor-pointer transition-colors"
                      style={{
                        backgroundColor: isSelected ? '#FFF8F8' : 'transparent',
                        borderLeft: isSelected ? '4px solid #BA0022' : '4px solid transparent',
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#BA0022]">
                            {report.id}
                          </span>
                          <span
                            className="text-[10px] px-2 py-0.5 rounded font-semibold"
                            style={{
                              backgroundColor:
                                report.severity === 'Tinggi'
                                  ? '#FFF0F0'
                                  : report.severity === 'Sedang'
                                  ? '#FFFBEB'
                                  : '#F2F3FF',
                              color:
                                report.severity === 'Tinggi'
                                  ? '#BA0022'
                                  : report.severity === 'Sedang'
                                  ? '#B45309'
                                  : '#5C3F3E',
                            }}
                          >
                            Level {report.severity}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-700">
                            {report.category}
                          </span>
                          {report.isHoaxSuspect && (
                            <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                              Diduga Hoaks
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock size={11} />
                          <span>{report.time}</span>
                        </div>
                      </div>

                      <div className="font-bold text-sm text-slate-900 mb-1">{report.title}</div>

                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-[#BA0022]" />
                          {report.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={11} />
                          {report.reporter} ({report.reporterType})
                        </span>
                      </div>

                      {/* Status Tag */}
                      <div className="flex items-center justify-between pt-1">
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded"
                          style={{
                            backgroundColor:
                              report.status === 'Tervalidasi'
                                ? '#DCFCE7'
                                : report.status === 'Hoaks'
                                ? '#FEE2E2'
                                : report.status === 'Ditolak'
                                ? '#F1F5F9'
                                : '#FEF3C7',
                            color:
                              report.status === 'Tervalidasi'
                                ? '#15803D'
                                : report.status === 'Hoaks'
                                ? '#BA0022'
                                : report.status === 'Ditolak'
                                ? '#64748B'
                                : '#B45309',
                          }}
                        >
                          Status: {report.status}
                        </span>
                        <span className="text-xs text-[#0051D5] font-medium hover:underline">
                          Lihat Bukti Foto &rarr;
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Panel Detail Laporan Kanan (5 Cols) */}
            <div
              className="lg:col-span-5 rounded-xl p-5 bg-white border border-[#EAEDFF] sticky top-20"
              style={{ boxShadow: '0 1px 6px rgba(80,80,160,0.06)' }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div>
                  <div className="text-xs font-mono font-bold text-[#BA0022]">
                    {selectedReport.id}
                  </div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{selectedReport.title}</div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F2F3FF] text-[#0051D5] border border-[#EAEDFF]">
                  {selectedReport.category}
                </span>
              </div>

              {/* Photo Evidence Card (Simulating mobile camera upload) */}
              <div className="mb-4 rounded-xl overflow-hidden border border-[#EAEDFF] bg-[#1E293B] text-white">
                <div className="p-3 bg-slate-900/90 flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-400">
                    <Camera size={12} />
                    <span>{selectedReport.photoProof.badge}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedReport.photoProof.timestamp}
                  </span>
                </div>

                {/* Simulated Viewfinder */}
                <div className="p-6 text-center relative flex flex-col items-center justify-center min-h-[140px] bg-gradient-to-b from-slate-800 to-slate-900">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-rose-400 mb-2 border border-white/20">
                    <Camera size={22} />
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    {selectedReport.photoProof.previewDesc}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                    <Navigation size={10} />
                    {selectedReport.photoProof.coordinates}
                  </div>
                </div>
              </div>

              {selectedReport.isHoaxSuspect && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2 mb-4">
                  <AlertTriangle size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-800 leading-relaxed">
                    <strong>Peringatan Potensi Hoaks:</strong> Laporan ini dilaporkan oleh sensor sistem sebagai video/foto lama yang tidak terjadi saat ini.
                  </div>
                </div>
              )}

              <div className="space-y-3 mb-5 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold tracking-wider">LOKASI &amp; KOORDINAT GEOTAG</div>
                  <div className="text-slate-800 font-semibold mt-0.5 flex items-center gap-1">
                    <MapPin size={13} className="text-[#BA0022]" />
                    {selectedReport.location}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono pl-4 mt-0.5">
                    {selectedReport.coordinates}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 font-semibold tracking-wider">DESKRIPSI LENGKAP WARGA</div>
                  <div className="text-slate-700 mt-1 leading-relaxed bg-[#F8FAFC] p-3 rounded-lg border border-slate-100">
                    "{selectedReport.description}"
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 font-semibold tracking-wider">IDENTITAS PELAPOR</div>
                  <div className="text-slate-800 mt-0.5">
                    <strong>{selectedReport.reporter}</strong> • <span className="text-emerald-700 font-semibold">{selectedReport.reporterType}</span>
                  </div>
                </div>

                {/* Dispatch Target Selector */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="text-[10px] text-slate-500 font-semibold tracking-wider block mb-1">
                    TARGET DISPATCH INSTANSI TERKAIT
                  </label>
                  <select
                    value={selectedDispatchUnit}
                    onChange={e => setSelectedDispatchUnit(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg bg-[#FAF8FF] border border-[#EAEDFF] text-slate-800 font-medium outline-none focus:border-[#BA0022]"
                  >
                    <option value="Damkar Sektor Barat (Posko Induk 113)">Damkar Sektor Barat (Posko Induk 113)</option>
                    <option value="Ambulans Gawat Darurat PMI & RSUD (118)">Ambulans Gawat Darurat PMI &amp; RSUD (118)</option>
                    <option value="Polres Metro Respon Cepat (110)">Polres Metro Respon Cepat (110)</option>
                    <option value="Call Center 112 Komando Terpadu">Call Center 112 Komando Terpadu</option>
                    <option value="BPBD Tanggap Bencana Daerah">BPBD Tanggap Bencana Daerah</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedReport.id, 'Tervalidasi')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-xs text-white transition-opacity hover:opacity-90 cursor-pointer border-0 shadow-sm"
                  style={{ backgroundColor: '#15803D' }}
                >
                  <Send size={13} />
                  Validasi &amp; Teruskan ke Regu Lapangan
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedReport.id, 'Hoaks')}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg font-semibold text-xs text-white transition-opacity hover:opacity-90 cursor-pointer border-0"
                    style={{ backgroundColor: '#815100' }}
                  >
                    <AlertTriangle size={12} />
                    Tandai Hoaks
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedReport.id, 'Ditolak')}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg font-semibold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                  >
                    <XCircle size={12} />
                    Tolak Laporan
                  </button>
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
