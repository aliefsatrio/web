import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import {
  Phone,
  Flame,
  Radio,
  Ambulance,
  Shield,
  LifeBuoy,
  Search,
  Filter,
  ChevronDown,
  Edit2,
  Trash2,
  FileText,
  Save,
  RotateCcw,
  Plus,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'

interface ServiceContact {
  id: string
  name: string
  unitId: string
  pos: string
  category: string
  phone: string
  extraContact: string
  area: string
  fleet: string
  iconType: 'damkar' | 'callcenter' | 'polisi' | 'medis' | 'bpbd' | 'sar'
  isSelected?: boolean
}

const INITIAL_SERVICES: ServiceContact[] = [
  {
    id: 'DMK-B-01',
    name: 'Damkar Kota Pos Barat',
    unitId: 'DMK-B-01',
    pos: 'Pos Induk Daan Mogot',
    category: 'Pemadam Kebakaran',
    phone: '021-5678911',
    extraContact: 'WA: 0812-9988-1133',
    area: 'Sektor Barat & Sekitarnya',
    fleet: '4 Unit Pompa • 1 Unit Tangga Bronto',
    iconType: 'damkar',
    isSelected: true,
  },
  {
    id: 'CTR-112-ALL',
    name: 'Call Center 112 Komando Pusat',
    unitId: 'CTR-112-ALL',
    pos: 'Gedung Balaikota Balai Terpadu',
    category: 'Layanan Terpadu Terpusat',
    phone: '112',
    extraContact: 'Direct Routing 30 Operator',
    area: 'Seluruh Wilayah Kota (100%)',
    fleet: 'Lintas Satuan Dinas Terpadu',
    iconType: 'callcenter',
    isSelected: true,
  },
  {
    id: 'POL-110-FAST',
    name: 'Polres Metro Respon Cepat 110',
    unitId: 'POL-110-FAST',
    pos: 'Pusat Pengendali Ops Metro',
    category: 'Kepolisian',
    phone: '110',
    extraContact: 'Direct PSTN: 021-3840011',
    area: 'Seluruh Wilayah Hukum Metro',
    fleet: '12 Mobil Patroli Reaksi Cepat',
    iconType: 'polisi',
    isSelected: false,
  },
  {
    id: 'PMI-MED-01',
    name: 'Ambulans Gawat Darurat PMI',
    unitId: 'PMI-MED-01',
    pos: 'Markas PMI Cabang Utama',
    category: 'Rumah Sakit & Medis',
    phone: '021-3907766',
    extraContact: 'WA Siaga: 0811-9988-7711',
    area: 'Zona Jakarta & Penyangga',
    fleet: '6 Unit Ambulans Advance ICU',
    iconType: 'medis',
    isSelected: false,
  },
  {
    id: 'BPBD-BNC-01',
    name: 'BPBD Tanggap Bencana & Banjir',
    unitId: 'BPBD-BNC-01',
    pos: 'Posko Siaga Bencana Daerah',
    category: 'Penanggulangan Bencana',
    phone: '021-8604440',
    extraContact: 'Kanal Radio VHF: 149.200 MHz',
    area: 'Bantaran Sungai & Rawan Banjir',
    fleet: '8 Perahu Karet • 4 Tenda Darurat',
    iconType: 'bpbd',
    isSelected: false,
  },
  {
    id: 'SAR-SEA-01',
    name: 'Basarnas Siaga Laut & Muara',
    unitId: 'SAR-SEA-01',
    pos: 'Dermaga Penyelamatan Marina',
    category: 'Pencarian & Penyelamatan',
    phone: '115',
    extraContact: 'Hotline Marina: 021-6530115',
    area: 'Pesisir Pantai & Kepulauan',
    fleet: '3 Kapal Rigid Inflatable Boat (RIB)',
    iconType: 'sar',
    isSelected: false,
  },
]

export default function KelolaNomorLayananPage() {
  const [services, setServices] = useState<ServiceContact[]>(INITIAL_SERVICES)
  const [selectedCategory, setSelectedCategory] = useState('Semua (12)')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('Semua Status')
  const [sortFilter, setSortFilter] = useState('Prioritas Tanggap')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Form state (pre-filled Damkar Kota Pos Barat)
  const [formData, setFormData] = useState({
    name: 'Damkar Kota Pos Barat',
    category: 'Pemadam Kebakaran & Penyelamatan',
    phone: '021-5678911',
    whatsapp: '0812-9988-1133',
    area: 'Sektor Barat (Kebon Jeruk, Tomang, Kalideres)',
    fleet: '4 Unit Pompa & 1 Unit Rescue Bronto',
    address: 'Jl. Daan Mogot KM 12 No. 45, Cengkareng, Jakarta Barat',
  })

  // Delete confirmation target
  const [deleteTarget, setDeleteTarget] = useState<string>('Pemadam Kebakaran Pos Barat')

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle select all
  const handleToggleSelectAll = () => {
    const allSelected = services.every(s => s.isSelected)
    setServices(services.map(s => ({ ...s, isSelected: !allSelected })))
  }

  // Handle single checkbox toggle
  const handleToggleSelect = (id: string) => {
    setServices(
      services.map(s => (s.id === id ? { ...s, isSelected: !s.isSelected } : s))
    )
  }

  const selectedCount = services.filter(s => s.isSelected).length

  // Filtered services
  const filteredServices = services.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unitId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.area.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedCategory === 'Pemadam Kebakaran (3)') {
      return matchesSearch && item.category.toLowerCase().includes('pemadam')
    }
    if (selectedCategory === 'Kepolisian (3)') {
      return matchesSearch && item.category.toLowerCase().includes('kepolisian')
    }
    if (selectedCategory === 'Rumah Sakit') {
      return matchesSearch && item.category.toLowerCase().includes('medis')
    }
    return matchesSearch
  })

  // Handle Edit click from table
  const handleEditRow = (service: ServiceContact) => {
    setFormData({
      name: service.name,
      category: service.category,
      phone: service.phone,
      whatsapp: service.extraContact.replace('WA: ', ''),
      area: service.area,
      fleet: service.fleet,
      address: 'Jl. Daan Mogot KM 12 No. 45, Cengkareng, Jakarta Barat',
    })
    setDeleteTarget(service.name)
    showToast(`Memuat data "${service.name}" ke form.`)
  }

  // Handle Save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      showToast('Harap lengkapi nama instansi dan nomor telepon!')
      return
    }
    setServices(prev =>
      prev.map(s =>
        s.name === formData.name || s.phone === formData.phone
          ? {
              ...s,
              name: formData.name,
              category: formData.category,
              phone: formData.phone,
              extraContact: formData.whatsapp ? `WA: ${formData.whatsapp}` : s.extraContact,
              area: formData.area,
              fleet: formData.fleet,
            }
          : s
      )
    )
    showToast('Perubahan data berhasil disimpan secara lokal!')
  }

  // Handle Reset
  const handleReset = () => {
    setFormData({
      name: 'Damkar Kota Pos Barat',
      category: 'Pemadam Kebakaran & Penyelamatan',
      phone: '021-5678911',
      whatsapp: '0812-9988-1133',
      area: 'Sektor Barat (Kebon Jeruk, Tomang, Kalideres)',
      fleet: '4 Unit Pompa & 1 Unit Rescue Bronto',
      address: 'Jl. Daan Mogot KM 12 No. 45, Cengkareng, Jakarta Barat',
    })
    showToast('Formulir direset ke pengaturan awal.')
  }

  // Handle Delete Confirmation Click
  const handleConfirmDelete = () => {
    setServices(prev => prev.filter(s => !s.name.toLowerCase().includes('pos barat')))
    showToast(`Kontak "${deleteTarget}" berhasil dihapus dari data lokal!`)
  }

  // Service icon helper
  const renderServiceIcon = (type: ServiceContact['iconType']) => {
    switch (type) {
      case 'damkar':
        return (
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: '40px', height: '40px', backgroundColor: '#FFDAD6' }}
          >
            <Flame size={20} style={{ color: '#BA0022' }} />
          </div>
        )
      case 'callcenter':
        return (
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: '40px', height: '40px', backgroundColor: '#E2E7FF' }}
          >
            <Phone size={20} style={{ color: '#0051D5' }} />
          </div>
        )
      case 'polisi':
        return (
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: '40px', height: '40px', backgroundColor: '#EDE9FE' }}
          >
            <Shield size={20} style={{ color: '#7C3AED' }} />
          </div>
        )
      case 'medis':
        return (
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: '40px', height: '40px', backgroundColor: '#DCFCE7' }}
          >
            <Ambulance size={20} style={{ color: '#15803D' }} />
          </div>
        )
      case 'bpbd':
        return (
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: '40px', height: '40px', backgroundColor: '#FEF3C7' }}
          >
            <Radio size={20} style={{ color: '#B45309' }} />
          </div>
        )
      case 'sar':
        return (
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: '40px', height: '40px', backgroundColor: '#E0F2FE' }}
          >
            <LifeBuoy size={20} style={{ color: '#0369A1' }} />
          </div>
        )
    }
  }

  return (
    <div className="flex" style={{ minHeight: '1582px', backgroundColor: '#FFFFFF' }}>
      {/* Sidebar 288px */}
      <Sidebar variant="layanan" />

      <div className="flex flex-col flex-1 min-w-0" style={{ width: '992px' }}>
        {/* Header 64px */}
        <Header variant="feed" />

        {/* Main Content Area */}
        <main
          className="flex-1"
          style={{
            paddingLeft: '32px',
            paddingRight: '32px',
            paddingTop: '20px',
            paddingBottom: '48px',
            maxWidth: '992px',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Breadcrumb & Command Banner */}
          <div className="mb-2">
            <div
              className="font-medium mb-1"
              style={{ fontSize: '12px', lineHeight: '16px', color: '#916F6D' }}
            >
              Beranda &gt; Master Data &gt; Nomor Layanan Darurat
            </div>

            <div className="flex items-start justify-between flex-wrap gap-3 mt-1 mb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1
                  className="font-bold"
                  style={{
                    fontSize: '24px',
                    lineHeight: '32px',
                    color: '#131B2E',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Kelola Nomor Layanan Darurat
                </h1>
                <span
                  className="font-bold px-2.5 py-1 rounded-md"
                  style={{
                    fontSize: '10px',
                    backgroundColor: '#EAEDFF',
                    color: '#0051D5',
                    letterSpacing: '0.06em',
                  }}
                >
                  MODUL CRUD MASTER DATA
                </span>
              </div>

              {/* Status & Action in Top Right */}
              <div className="flex flex-col items-end gap-2">
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: '#DCFCE7',
                    border: '1px solid #BBF7D0',
                    fontSize: '11px',
                    color: '#15803D',
                    fontWeight: 600,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: '#15803D' }}
                  />
                  <span>Database Master Dial Ready: Auto-Sync Mobile APK</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleReset()
                    showToast('Mode formulir baru diaktifkan.')
                  }}
                  className="flex items-center gap-1.5 font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90 active:opacity-80"
                  style={{
                    backgroundColor: '#BA0022',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    lineHeight: '18px',
                  }}
                >
                  <Plus size={16} />
                  + Tambah Nomor Layanan
                </button>
              </div>
            </div>
          </div>

          {/* Metric Cards Section (x=320, width=928px, 2 cards visible, right area open) */}
          <div className="flex gap-4 mb-6" style={{ width: '928px' }}>
            {/* Card 1: Total Layanan Terdaftar */}
            <div
              className="rounded-2xl flex items-center justify-between"
              style={{
                width: '299px',
                height: '170px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EAEDFF',
                boxShadow: '0 1px 6px rgba(80,80,160,0.06)',
                padding: '24px',
                borderRadius: '16px',
                boxSizing: 'border-box',
                flexShrink: 0,
              }}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div
                    className="font-semibold tracking-wider"
                    style={{ fontSize: '11px', color: '#916F6D', lineHeight: '14px' }}
                  >
                    TOTAL LAYANAN
                  </div>
                  <div
                    className="font-semibold tracking-wider mb-2"
                    style={{ fontSize: '11px', color: '#916F6D', lineHeight: '14px' }}
                  >
                    TERDAFTAR
                  </div>
                  <div
                    className="font-bold"
                    style={{ fontSize: '32px', lineHeight: '38px', color: '#131B2E' }}
                  >
                    12
                  </div>
                </div>
                <div style={{ fontSize: '11px', lineHeight: '15px', color: '#5C3F3E' }}>
                  <div className="font-semibold text-emerald-700">Saluran Aktif</div>
                  <div>Tersebar di 5 Wilayah</div>
                  <div>Kota</div>
                </div>
              </div>

              {/* Icon surface merah muda */}
              <div
                className="flex items-center justify-center rounded-2xl flex-shrink-0 self-start"
                style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#FFDAD6',
                  borderRadius: '16px',
                }}
              >
                <Phone size={26} style={{ color: '#BA0022' }} />
              </div>
            </div>

            {/* Card 2: Kategori Instansi */}
            <div
              className="rounded-2xl flex items-center justify-between"
              style={{
                width: '299px',
                height: '170px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EAEDFF',
                boxShadow: '0 1px 6px rgba(80,80,160,0.06)',
                padding: '24px',
                borderRadius: '16px',
                boxSizing: 'border-box',
                flexShrink: 0,
              }}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div
                    className="font-semibold tracking-wider mb-2"
                    style={{ fontSize: '11px', color: '#916F6D', lineHeight: '14px' }}
                  >
                    KATEGORI INSTANSI
                  </div>
                  <div
                    className="font-bold"
                    style={{ fontSize: '32px', lineHeight: '38px', color: '#131B2E' }}
                  >
                    5
                  </div>
                </div>
                <div style={{ fontSize: '11px', lineHeight: '15px', color: '#5C3F3E' }}>
                  <div className="font-semibold" style={{ color: '#0051D5' }}>
                    Kategori Siaga
                  </div>
                  <div>Damkar, Polisi, Medis, SAR,</div>
                  <div>Utilitas</div>
                </div>
              </div>

              {/* Icon surface biru-lavender */}
              <div
                className="flex items-center justify-center rounded-2xl flex-shrink-0 self-start"
                style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#E2E7FF',
                  borderRadius: '16px',
                }}
              >
                <Ambulance size={26} style={{ color: '#0051D5' }} />
              </div>
            </div>

            {/* Right area intentionally open as per design reference */}
            <div className="flex-1" />
          </div>

          {/* Search, Filter & Bulk Action Toolbar (x=320, width=928px, height ~176px, radius 16px) */}
          <div
            className="rounded-2xl mb-6 p-4 flex flex-col justify-between"
            style={{
              width: '928px',
              minHeight: '168px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAEDFF',
              boxShadow: '0 1px 6px rgba(80,80,160,0.06)',
              borderRadius: '16px',
            }}
          >
            {/* Baris Pertama: Search Input & Dropdowns */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 flex-1 rounded-xl px-3.5"
                style={{
                  backgroundColor: '#F5F6FF',
                  height: '40px',
                  border: '1px solid #E2E7FF',
                }}
              >
                <Search size={15} style={{ color: '#916F6D', flexShrink: 0 }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Cari nama instansi, nomor telepon, sektor wilayah, atau kode unit..."
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontSize: '12px', color: '#131B2E' }}
                />
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className="flex items-center gap-2 rounded-xl px-3"
                  style={{
                    backgroundColor: '#F5F6FF',
                    height: '40px',
                    border: '1px solid #E2E7FF',
                    fontSize: '12px',
                    color: '#5C3F3E',
                  }}
                >
                  <Filter size={13} style={{ color: '#916F6D' }} />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="bg-transparent outline-none font-medium cursor-pointer"
                    style={{ fontSize: '12px', color: '#5C3F3E' }}
                  >
                    <option>Status: Semua Status</option>
                    <option>Status: Aktif</option>
                    <option>Status: Siaga Khusus</option>
                  </select>
                  <ChevronDown size={13} style={{ color: '#916F6D' }} />
                </div>

                <div
                  className="flex items-center gap-2 rounded-xl px-3"
                  style={{
                    backgroundColor: '#F5F6FF',
                    height: '40px',
                    border: '1px solid #E2E7FF',
                    fontSize: '12px',
                    color: '#5C3F3E',
                  }}
                >
                  <select
                    value={sortFilter}
                    onChange={e => setSortFilter(e.target.value)}
                    className="bg-transparent outline-none font-medium cursor-pointer"
                    style={{ fontSize: '12px', color: '#5C3F3E' }}
                  >
                    <option>Urutkan: Prioritas Tanggap</option>
                    <option>Urutkan: Nama Instansi (A-Z)</option>
                    <option>Urutkan: Wilayah</option>
                  </select>
                  <ChevronDown size={13} style={{ color: '#916F6D' }} />
                </div>
              </div>
            </div>

            {/* Baris Kedua: Chip Kategori */}
            <div className="flex items-center gap-2 my-2.5 flex-wrap">
              {[
                'Semua (12)',
                'Pemadam Kebakaran (3)',
                'Kepolisian (3)',
                'Rumah Sakit',
              ].map(cat => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className="font-semibold rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
                    style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      backgroundColor: isActive ? '#BA0022' : '#F2F3FF',
                      color: isActive ? '#FFFFFF' : '#5C3F3E',
                      border: isActive ? '1px solid #BA0022' : '1px solid #E2E7FF',
                    }}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Baris Ketiga: Bulk Action (Surface lavender muda) */}
            <div
              className="flex items-center justify-between px-3.5 py-2 rounded-xl"
              style={{
                backgroundColor: '#EAEDFF',
                border: '1px solid #C7CEFF',
              }}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={selectedCount === services.length}
                  onChange={handleToggleSelectAll}
                  className="rounded"
                  style={{ accentColor: '#BA0022', width: '15px', height: '15px' }}
                />
                <span
                  className="font-medium"
                  style={{ fontSize: '12px', color: '#131B2E' }}
                >
                  Pilih Semua Data (12 Item)
                </span>
                <span
                  className="font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: '10px',
                    backgroundColor: '#BA0022',
                    color: '#FFFFFF',
                  }}
                >
                  {selectedCount} dipilih
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Aksi massal: Ubah status massal disimulasikan.')}
                  className="font-semibold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                  style={{
                    fontSize: '11px',
                    backgroundColor: '#FFFFFF',
                    color: '#0051D5',
                    border: '1px solid #C7CEFF',
                  }}
                >
                  Ubah Status Massal
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Aksi massal: Hapus terpilih disimulasikan.')}
                  className="font-semibold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                  style={{
                    fontSize: '11px',
                    backgroundColor: '#FFF0F0',
                    color: '#BA0022',
                    border: '1px solid #FFDAD6',
                  }}
                >
                  Hapus Terpilih
                </button>
              </div>
            </div>
          </div>

          {/* Tabel Master Nomor Layanan (Lebar ~928px, Tinggi area tampak ~328px dengan clipping/scroll internal) */}
          <div
            className="rounded-2xl mb-8 overflow-hidden"
            style={{
              width: '928px',
              border: '1px solid #EAEDFF',
              boxShadow: '0 1px 6px rgba(80,80,160,0.06)',
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Scrollable table container dengan tinggi tampak terbatas sesuai referensi */}
            <div
              className="overflow-x-auto overflow-y-auto"
              style={{ maxHeight: '328px' }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '880px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F2F3FF' }}>
                    <th
                      className="text-left font-semibold py-3 pl-4 pr-2"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        color: '#916F6D',
                        borderBottom: '1px solid #EAEDFF',
                        width: '40px',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCount === services.length}
                        onChange={handleToggleSelectAll}
                        style={{ accentColor: '#BA0022', width: '14px', height: '14px' }}
                      />
                    </th>
                    <th
                      className="text-left font-semibold py-3 px-2"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        color: '#916F6D',
                        borderBottom: '1px solid #EAEDFF',
                      }}
                    >
                      INSTANSI &amp; IDENTITAS
                    </th>
                    <th
                      className="text-left font-semibold py-3 px-2"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        color: '#916F6D',
                        borderBottom: '1px solid #EAEDFF',
                      }}
                    >
                      KATEGORI
                    </th>
                    <th
                      className="text-left font-semibold py-3 px-2"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        color: '#916F6D',
                        borderBottom: '1px solid #EAEDFF',
                      }}
                    >
                      NOMOR TELEPON / HOTLINE
                    </th>
                    <th
                      className="text-left font-semibold py-3 px-2"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        color: '#916F6D',
                        borderBottom: '1px solid #EAEDFF',
                      }}
                    >
                      WILAYAH
                    </th>
                    <th
                      className="text-center font-semibold py-3 pr-4 pl-2"
                      style={{
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        color: '#916F6D',
                        borderBottom: '1px solid #EAEDFF',
                        width: '90px',
                      }}
                    >
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map(service => (
                    <tr
                      key={service.id}
                      className="transition-colors hover:bg-slate-50"
                      style={{
                        backgroundColor: service.isSelected ? '#FFF8F8' : 'transparent',
                        borderBottom: '1px solid #EAEDFF',
                      }}
                    >
                      <td className="py-3 pl-4 pr-2 align-middle">
                        <input
                          type="checkbox"
                          checked={service.isSelected}
                          onChange={() => handleToggleSelect(service.id)}
                          style={{ accentColor: '#BA0022', width: '14px', height: '14px' }}
                        />
                      </td>

                      {/* INSTANSI & IDENTITAS */}
                      <td className="py-3 px-2 align-middle">
                        <div className="flex items-center gap-3">
                          {renderServiceIcon(service.iconType)}
                          <div>
                            <div
                              className="font-semibold"
                              style={{
                                fontSize: '14px',
                                color: '#131B2E',
                                lineHeight: '18px',
                              }}
                            >
                              {service.name}
                            </div>
                            <div
                              className="font-mono text-xs"
                              style={{
                                fontSize: '11px',
                                color: '#916F6D',
                                fontFamily: 'Liberation Mono, Courier New, monospace',
                                marginTop: '2px',
                              }}
                            >
                              ID Unit: {service.unitId} • {service.pos}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* KATEGORI */}
                      <td className="py-3 px-2 align-middle">
                        <span
                          className="font-semibold px-2 py-0.5 rounded-md inline-block"
                          style={{
                            fontSize: '11px',
                            backgroundColor:
                              service.category.includes('Pemadam')
                                ? '#FFF0F0'
                                : service.category.includes('Terpadu')
                                ? '#E2E7FF'
                                : '#F2F3FF',
                            color:
                              service.category.includes('Pemadam')
                                ? '#BA0022'
                                : service.category.includes('Terpadu')
                                ? '#0051D5'
                                : '#5C3F3E',
                            border: '1px solid rgba(0,0,0,0.04)',
                          }}
                        >
                          {service.category}
                        </span>
                      </td>

                      {/* NOMOR TELEPON / HOTLINE */}
                      <td className="py-3 px-2 align-middle">
                        <div
                          className="font-bold"
                          style={{
                            fontSize: '13px',
                            color: '#131B2E',
                            fontFamily: 'Liberation Mono, Courier New, monospace',
                          }}
                        >
                          {service.phone}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#5C3F3E',
                            marginTop: '1px',
                          }}
                        >
                          {service.extraContact}
                        </div>
                      </td>

                      {/* WILAYAH */}
                      <td className="py-3 px-2 align-middle">
                        <div
                          className="font-medium"
                          style={{ fontSize: '12px', color: '#131B2E' }}
                        >
                          {service.area}
                        </div>
                        <div
                          style={{
                            fontSize: '11px',
                            color: '#916F6D',
                            marginTop: '1px',
                          }}
                        >
                          {service.fleet}
                        </div>
                      </td>

                      {/* AKSI */}
                      <td className="py-3 pr-4 pl-2 align-middle text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditRow(service)}
                            title="Edit Data"
                            className="p-1.5 rounded-lg transition-colors hover:bg-slate-200"
                            style={{
                              backgroundColor: '#F5F6FF',
                              border: '1px solid #E2E7FF',
                              color: '#0051D5',
                              cursor: 'pointer',
                            }}
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteTarget(service.name)
                              showToast(`Target konfirmasi hapus diset ke: ${service.name}`)
                            }}
                            title="Hapus Data"
                            className="p-1.5 rounded-lg transition-colors hover:bg-red-100"
                            style={{
                              backgroundColor: '#FFF0F0',
                              border: '1px solid #FFDAD6',
                              color: '#BA0022',
                              cursor: 'pointer',
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dua Panel Sejajar Sejak Initial Render:
              Kiri: Form Tambah / Perbarui (lebar 611px, tinggi ~504px, radius 16px)
              Kanan: Panel Konfirmasi Hapus (lebar 293px, tinggi ~579px, radius 16px) */}
          <div className="flex gap-6 items-start" style={{ width: '928px' }}>
            {/* PANEL FORM INLINE (Lebar 611px) */}
            <div
              className="rounded-2xl p-6"
              style={{
                width: '611px',
                minHeight: '504px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #EAEDFF',
                boxShadow: '0 1px 6px rgba(80,80,160,0.06)',
                borderRadius: '16px',
                boxSizing: 'border-box',
              }}
            >
              {/* Header Form */}
              <div className="flex items-start gap-3 mb-5 pb-3 border-b border-slate-100">
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ width: '38px', height: '38px', backgroundColor: '#FFF0F0' }}
                >
                  <FileText size={18} style={{ color: '#BA0022' }} />
                </div>
                <div>
                  <h2
                    className="font-semibold"
                    style={{ fontSize: '18px', lineHeight: '24px', color: '#131B2E' }}
                  >
                    Form Tambah / Perbarui Data Layanan
                  </h2>
                  <div
                    style={{
                      fontSize: '12px',
                      lineHeight: '16px',
                      color: '#916F6D',
                      marginTop: '2px',
                    }}
                  >
                    Lengkapi form berikut untuk menerbitkan nomor darurat ke mobile
                    <br />
                    SIGAP warga.
                  </div>
                </div>
              </div>

              {/* Form Input Dua Kolom */}
              <form onSubmit={handleSave} className="flex flex-col gap-3.5">
                {/* Baris 1 */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label
                      className="block font-semibold mb-1"
                      style={{ fontSize: '11px', color: '#131B2E' }}
                    >
                      Nama Instansi / Pos Pelayanan *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg px-3 py-2 outline-none font-medium"
                      style={{
                        backgroundColor: '#F2F3FF',
                        border: '1px solid #E2E7FF',
                        fontSize: '12px',
                        color: '#131B2E',
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className="block font-semibold mb-1"
                      style={{ fontSize: '11px', color: '#131B2E' }}
                    >
                      Kategori Layanan *
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-lg px-3 py-2 outline-none font-medium"
                      style={{
                        backgroundColor: '#F2F3FF',
                        border: '1px solid #E2E7FF',
                        fontSize: '12px',
                        color: '#131B2E',
                      }}
                    />
                  </div>
                </div>

                {/* Baris 2 */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label
                      className="block font-semibold mb-1"
                      style={{ fontSize: '11px', color: '#131B2E' }}
                    >
                      Nomor Telepon / PSTN Utama *
                    </label>
                    <div
                      className="flex items-center rounded-lg px-2.5 gap-2"
                      style={{
                        backgroundColor: '#F2F3FF',
                        border: '1px solid #E2E7FF',
                        height: '36px',
                      }}
                    >
                      <Phone size={13} style={{ color: '#916F6D', flexShrink: 0 }} />
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-transparent outline-none font-mono font-medium"
                        style={{
                          fontSize: '12px',
                          color: '#131B2E',
                          fontFamily: 'Liberation Mono, Courier New, monospace',
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label
                      className="block font-semibold mb-1"
                      style={{ fontSize: '11px', color: '#131B2E' }}
                    >
                      Nomor WhatsApp Siaga (Opsional)
                    </label>
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full rounded-lg px-3 py-2 outline-none font-mono font-medium"
                      style={{
                        backgroundColor: '#F2F3FF',
                        border: '1px solid #E2E7FF',
                        fontSize: '12px',
                        color: '#131B2E',
                        fontFamily: 'Liberation Mono, Courier New, monospace',
                      }}
                    />
                  </div>
                </div>

                {/* Baris 3 */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label
                      className="block font-semibold mb-1"
                      style={{ fontSize: '11px', color: '#131B2E' }}
                    >
                      Wilayah Cakupan &amp; Sektor Respons
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={e => setFormData({ ...formData, area: e.target.value })}
                      className="w-full rounded-lg px-3 py-2 outline-none font-medium"
                      style={{
                        backgroundColor: '#F2F3FF',
                        border: '1px solid #E2E7FF',
                        fontSize: '12px',
                        color: '#131B2E',
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className="block font-semibold mb-1"
                      style={{ fontSize: '11px', color: '#131B2E' }}
                    >
                      Jumlah Armada / Personil Siaga
                    </label>
                    <input
                      type="text"
                      value={formData.fleet}
                      onChange={e => setFormData({ ...formData, fleet: e.target.value })}
                      className="w-full rounded-lg px-3 py-2 outline-none font-medium"
                      style={{
                        backgroundColor: '#F2F3FF',
                        border: '1px solid #E2E7FF',
                        fontSize: '12px',
                        color: '#131B2E',
                      }}
                    />
                  </div>
                </div>

                {/* Baris 4 (Full Width) */}
                <div>
                  <label
                    className="block font-semibold mb-1"
                    style={{ fontSize: '11px', color: '#131B2E' }}
                  >
                    Alamat Pos Siaga / Koordinat Markas
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-lg px-3 py-2 outline-none font-medium"
                    style={{
                      backgroundColor: '#F2F3FF',
                      border: '1px solid #E2E7FF',
                      fontSize: '12px',
                      color: '#131B2E',
                    }}
                  />
                </div>

                {/* Footer Form Action Buttons */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    style={{
                      fontSize: '12px',
                      backgroundColor: '#E2E7FF',
                      color: '#0051D5',
                      border: '1px solid #C7CEFF',
                    }}
                  >
                    <RotateCcw size={13} />
                    Batal / Reset
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90 active:opacity-80 cursor-pointer"
                    style={{
                      fontSize: '12px',
                      backgroundColor: '#BA0022',
                      color: '#FFFFFF',
                      border: 'none',
                    }}
                  >
                    <Save size={14} />
                    Simpan Perubahan Data
                  </button>
                </div>
              </form>
            </div>

            {/* PANEL KONFIRMASI HAPUS INLINE (Lebar 293px, Tinggi ~579px, Radius 16px) */}
            <div
              className="rounded-2xl p-6 flex flex-col justify-between"
              style={{
                width: '293px',
                minHeight: '504px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #FFDAD6',
                boxShadow: '0 1px 6px rgba(186,0,34,0.06)',
                borderRadius: '16px',
                boxSizing: 'border-box',
              }}
            >
              <div>
                {/* Ikon Hapus Merah pada Surface Merah Muda */}
                <div
                  className="flex items-center justify-center rounded-2xl mb-4"
                  style={{
                    width: '52px',
                    height: '52px',
                    backgroundColor: '#FFDAD6',
                    borderRadius: '16px',
                  }}
                >
                  <Trash2 size={24} style={{ color: '#BA0022' }} />
                </div>

                {/* Judul Bertingkat */}
                <h3
                  className="font-bold leading-tight mb-3"
                  style={{ fontSize: '18px', lineHeight: '24px', color: '#131B2E' }}
                >
                  Konfirmasi
                  <br />
                  Penghapusan Nomor
                  <br />
                  Layanan
                </h3>

                {/* Deskripsi */}
                <p
                  className="mb-4"
                  style={{ fontSize: '12px', lineHeight: '18px', color: '#5C3F3E' }}
                >
                  Apakah Anda yakin ingin menghapus kontak layanan &quot;{deleteTarget}&quot;? Tindakan
                  ini akan menghapus nomor dari aplikasi mobile warga secara seketika.
                </p>

                {/* Inset Card Catatan */}
                <div
                  className="p-3 rounded-xl flex items-start gap-2 mb-6"
                  style={{
                    backgroundColor: '#FFF0F0',
                    border: '1px solid #FFDAD6',
                  }}
                >
                  <AlertTriangle
                    size={14}
                    style={{ color: '#BA0022', flexShrink: 0, marginTop: '2px' }}
                  />
                  <div
                    style={{
                      fontSize: '11px',
                      lineHeight: '15px',
                      color: '#BA0022',
                    }}
                  >
                    Data riwayat panggilan dan log terdahulu tetap diarsipkan di Pusdalops.
                  </div>
                </div>
              </div>

              {/* Tombol Bagian Bawah */}
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="w-full flex items-center justify-center gap-2 font-semibold py-2.5 rounded-lg transition-opacity hover:opacity-90 active:opacity-80 cursor-pointer"
                  style={{
                    backgroundColor: '#BA0022',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                  }}
                >
                  <Trash2 size={14} />
                  Ya, Hapus Data
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Penghapusan dibatalkan.')}
                  className="w-full font-semibold py-2 rounded-lg transition-colors cursor-pointer"
                  style={{
                    backgroundColor: '#F5F6FF',
                    color: '#5C3F3E',
                    border: '1px solid #E2E7FF',
                    fontSize: '12px',
                  }}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Toast Notification for Feedback */}
      {toastMessage && (
        <div
          className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg z-50 animate-bounce"
          style={{
            backgroundColor: '#131B2E',
            color: '#FFFFFF',
            fontSize: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <CheckCircle size={15} style={{ color: '#22C55E' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
