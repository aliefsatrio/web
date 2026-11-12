import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import {
  Bell,
  Server,
  User,
  Save,
  CheckCircle,
  Smartphone,
} from 'lucide-react'

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState<'profil' | 'sistem' | 'notifikasi'>('profil')
  const [operatorName, setOperatorName] = useState('Budi Santoso')
  const [operatorRole, setOperatorRole] = useState('Duty Commander (Shift 1)')
  const [autoSyncMobile, setAutoSyncMobile] = useState(true)
  const [soundAlert, setSoundAlert] = useState(true)
  const [hotlinePriority, setHotlinePriority] = useState('112')
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('Konfigurasi pengaturan sistem berhasil disimpan secara lokal!')
  }

  return (
    <div className="flex" style={{ minHeight: '1024px', backgroundColor: '#FAF8FF' }}>
      <Sidebar variant="pengaturan" />

      <div className="flex flex-col flex-1 min-w-0">
        <Header variant="feed" />

        <main className="flex-1 p-8" style={{ padding: '32px', maxWidth: '1000px' }}>
          {/* Heading */}
          <div className="mb-6">
            <div
              className="font-semibold mb-1 tracking-widest"
              style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#916F6D' }}
            >
              KONFIGURASI PUSDALOPS &amp; COMMAND CENTER
            </div>
            <h1
              className="font-bold"
              style={{ fontSize: '24px', lineHeight: '32px', color: '#131B2E' }}
            >
              Pengaturan Sistem SIGAP
            </h1>
            <p style={{ fontSize: '13px', lineHeight: '20px', color: '#5C3F3E' }}>
              Kelola preferensi akun operator, integrasi server kedaruratan, dan sinkronisasi mobile APK.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 mb-6">
            {[
              { id: 'profil', label: 'Profil Operator', icon: User },
              { id: 'sistem', label: 'Sistem & API Master', icon: Server },
              { id: 'notifikasi', label: 'Notifikasi & Suara Darurat', icon: Bell },
            ].map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className="flex items-center gap-2 px-4 py-2.5 font-semibold text-xs border-b-2 transition-colors cursor-pointer"
                  style={{
                    borderColor: isActive ? '#BA0022' : 'transparent',
                    color: isActive ? '#BA0022' : '#5C3F3E',
                    marginBottom: '-2px',
                  }}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Settings Form Container */}
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            {activeTab === 'profil' && (
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div
                    className="flex items-center justify-center rounded-full font-bold text-white text-lg"
                    style={{ width: '56px', height: '56px', backgroundColor: '#BA0022' }}
                  >
                    BS
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{operatorName}</div>
                    <div className="text-xs text-slate-500">{operatorRole}</div>
                    <div className="text-xs text-emerald-600 font-medium mt-0.5">● Status Operator Aktif</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Nama Lengkap Operator</label>
                  <input
                    type="text"
                    value={operatorName}
                    onChange={e => setOperatorName(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-xs border border-slate-200 bg-slate-50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Peran / Jabatan Shift</label>
                  <input
                    type="text"
                    value={operatorRole}
                    onChange={e => setOperatorRole(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-xs border border-slate-200 bg-slate-50 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">ID Personel Pusdalops</label>
                  <input
                    type="text"
                    disabled
                    value="PUSDALOPS-OPS-2024-0012"
                    className="w-full rounded-lg px-3 py-2 text-xs border border-slate-200 bg-slate-100 font-mono text-slate-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'sistem' && (
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-blue-600" />
                    <div>
                      <div className="font-semibold text-xs text-slate-900">Auto-Sync Mobile APK</div>
                      <div className="text-xs text-slate-500">Kirim pembaruan nomor darurat langsung ke HP warga</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoSyncMobile}
                    onChange={e => setAutoSyncMobile(e.target.checked)}
                    style={{ accentColor: '#BA0022', width: '16px', height: '16px' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Default Hotline Routing</label>
                  <select
                    value={hotlinePriority}
                    onChange={e => setHotlinePriority(e.target.value)}
                    className="w-full rounded-lg px-3 py-2 text-xs border border-slate-200 bg-slate-50 outline-none"
                  >
                    <option value="112">112 - Call Center Komando Terpadu</option>
                    <option value="110">110 - Kepolisian Republik Indonesia</option>
                    <option value="113">113 - Pemadam Kebakaran</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">Server Endpoint Pusdalops</label>
                  <input
                    type="text"
                    disabled
                    value="https://api-pusdalops.sigap.go.id/v1/master-dial"
                    className="w-full rounded-lg px-3 py-2 text-xs border border-slate-200 bg-slate-100 font-mono text-slate-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifikasi' && (
              <div className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-red-600" />
                    <div>
                      <div className="font-semibold text-xs text-slate-900">Sirene Suara Kejadian Prioritas Tinggi</div>
                      <div className="text-xs text-slate-500">Bunyikan sirene audio pada dashboard saat ada laporan kebakaran/bencana</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundAlert}
                    onChange={e => setSoundAlert(e.target.checked)}
                    style={{ accentColor: '#BA0022', width: '16px', height: '16px' }}
                  />
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-800">
                  Semua notifikasi darurat disinkronkan secara real-time antar stasiun komando Pusdalops.
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 font-semibold px-4 py-2 rounded-lg text-xs text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#BA0022' }}
              >
                <Save size={14} />
                Simpan Konfigurasi
              </button>
            </div>
          </form>
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
