import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import {
  ChevronDown,
  RefreshCw,
  Download,
  Filter,
  MapPin,
  Clock,
  MessageCircle,
  Heart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Flame,
  Droplets,
  Car,
  CloudLightning,
  Zap,
  MoreHorizontal,
} from 'lucide-react'

// Feed data
const FEED_POSTS = [
  {
    id: 'POST-0910',
    title: 'Kecelakaan di Jl. Pancasila',
    summary: 'Terjadi kecelakaan motor dan mobil di Jl. Pancasila arah kota. Mohon hindari jalur ini sementara waktu.',
    reporter: 'Warga Tegal',
    reporterType: 'OTP Terverifikasi',
    category: 'Kecelakaan',
    location: 'Jl. Pancasila (1,2 km)',
    time: '2 jam yang lalu',
    likes: 120,
    comments: 15,
    reports: 2,
    status: 'valid',
    thumbnail: null,
    categoryIcon: Car,
  },
  {
    id: 'POST-0914',
    title: 'Banjir di Perumahan Taman Indah',
    summary: 'Air sudah mulai naik sekitar 30 cm. Hati-hati yang melintas di blok utama perumahan.',
    reporter: 'Rizky_07',
    reporterType: 'Warga Tetap',
    category: 'Bencana',
    location: 'Perumahan Taman Indah (2,5 km)',
    time: '4 jam yang lalu',
    likes: 45,
    comments: 6,
    reports: 0,
    status: 'valid',
    thumbnail: null,
    categoryIcon: Droplets,
  },
  {
    id: 'POST-0911',
    title: 'Peringatan Asap Tebal Pabrik Rungkut',
    summary: 'Asap tebal mengepul dari cerobong pabrik, warga diminta menjauhi area.',
    reporter: 'Pusdalops Tim 2',
    reporterType: 'Petugas Resmi',
    category: 'Kebakaran',
    location: 'Kawasan Industri Rungkut',
    time: '10 menit yang lalu',
    likes: 24,
    comments: 8,
    reports: 0,
    status: 'valid',
    thumbnail: null,
    categoryIcon: Flame,
  },
  {
    id: 'POST-0912',
    title: 'Truk Terguling Depan SPBU Joyoboyo',
    summary: 'Kemacetan parah akibat truk terguling, jalur dialihkan.',
    reporter: 'Rian Hidayat',
    reporterType: 'Valid',
    category: 'Kecelakaan',
    location: 'Jl. Joyoboyo No. 44',
    time: '25 menit yang lalu',
    likes: 15,
    comments: 12,
    reports: 0,
    status: 'valid',
    thumbnail: null,
    categoryIcon: Car,
  },
  {
    id: 'POST-0915',
    title: 'Peringatan Cuaca Ekstrem & Angin Kencang',
    summary: 'BMKG mengeluarkan peringatan dini cuaca ekstrem untuk seluruh wilayah.',
    reporter: 'BMKG Wilayah II',
    reporterType: 'Institusi Resmi',
    category: 'Cuaca',
    location: 'Seluruh Kota Madya',
    time: '2 jam yang lalu',
    likes: 89,
    comments: 24,
    reports: 0,
    status: 'valid',
    thumbnail: null,
    categoryIcon: CloudLightning,
  },
  {
    id: 'POST-0916',
    title: 'Tiang Listrik Roboh Timpa Kabel Telepon',
    summary: 'Tiang listrik roboh akibat angin kencang, berbahaya bagi pejalan kaki.',
    reporter: 'Siti Aminah',
    reporterType: 'NIK Valid',
    category: 'Info Layanan',
    location: 'Jl. Kenanga Timur No. 12',
    time: '3 jam yang lalu',
    likes: 7,
    comments: 5,
    reports: 0,
    status: 'valid',
    thumbnail: null,
    categoryIcon: Zap,
  },
]

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { label: string; bg: string; color: string }> = {
    valid: { label: 'Valid', bg: '#DCFCE7', color: '#15803D' },
    ditinjau: { label: 'Ditinjau', bg: '#FEF3C7', color: '#B45309' },
    'belum verifikasi': { label: 'Belum Verifikasi', bg: '#F3F4F6', color: '#6B7280' },
    hoaks: { label: 'Hoaks', bg: '#FEE2E2', color: '#BA0022' },
    'institusi resmi': { label: 'Institusi Resmi', bg: '#DBEAFE', color: '#1D4ED8' },
    'petugas resmi': { label: 'Petugas Resmi', bg: '#EDE9FE', color: '#7C3AED' },
    'nik valid': { label: 'NIK Valid', bg: '#DCFCE7', color: '#15803D' },
  }
  const key = status.toLowerCase()
  const c = configs[key] || { label: status, bg: '#F3F4F6', color: '#6B7280' }
  return (
    <span
      className="font-semibold rounded px-1.5 py-0.5 inline-block"
      style={{ fontSize: '10px', backgroundColor: c.bg, color: c.color }}
    >
      {c.label}
    </span>
  )
}

function FeedRow({
  post,
  isSelected,
  onClick,
}: {
  post: (typeof FEED_POSTS)[0]
  isSelected: boolean
  onClick: () => void
}) {
  const CategoryIcon = post.categoryIcon
  return (
    <tr
      onClick={onClick}
      className="cursor-pointer transition-colors"
      style={{
        backgroundColor: isSelected ? '#FFF5F5' : 'transparent',
        borderLeft: isSelected ? '3px solid #BA0022' : '3px solid transparent',
      }}
    >
      {/* INFO POSTINGAN & MEDIA */}
      <td className="py-3 pl-3 pr-2 align-top" style={{ minWidth: '200px', maxWidth: '220px' }}>
        <div className="flex gap-2">
          {/* Thumbnail placeholder */}
          <div
            className="rounded flex-shrink-0"
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: post.category === 'Banjir' ? '#BFDBFE' :
                post.category === 'Kebakaran' ? '#FEE2E2' :
                  post.category === 'Kecelakaan' ? '#FEF3C7' :
                    post.category === 'Cuaca' ? '#E0F2FE' : '#E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CategoryIcon
              size={22}
              style={{
                color: post.category === 'Banjir' ? '#1D4ED8' :
                  post.category === 'Kebakaran' ? '#BA0022' :
                    post.category === 'Kecelakaan' ? '#B45309' :
                      post.category === 'Cuaca' ? '#0369A1' : '#6B7280',
              }}
            />
          </div>
          <div className="min-w-0">
            <div
              className="font-semibold leading-snug"
              style={{ fontSize: '12px', color: '#131B2E', lineHeight: '16px', marginBottom: '3px' }}
            >
              {post.title}
            </div>
            <div
              className="line-clamp-2"
              style={{ fontSize: '11px', color: '#916F6D', lineHeight: '15px' }}
            >
              {post.summary}
            </div>
            {post.reports > 0 && (
              <div
                className="flex items-center gap-0.5 mt-1 font-semibold"
                style={{ fontSize: '10px', color: '#BA0022' }}
              >
                <AlertTriangle size={9} />
                {post.reports} Laporan Hoax
              </div>
            )}
          </div>
        </div>
      </td>

      {/* PELAPOR */}
      <td className="py-3 px-2 align-top" style={{ minWidth: '130px' }}>
        <div className="flex items-center gap-1.5 mb-1">
          <div
            className="flex items-center justify-center rounded-full font-bold flex-shrink-0"
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: post.reporterType === 'Petugas Resmi' ? '#EDE9FE' :
                post.reporterType === 'Institusi Resmi' ? '#DBEAFE' :
                  post.reporterType === 'Belum Verifikasi' ? '#F3F4F6' : '#DCFCE7',
              color: post.reporterType === 'Petugas Resmi' ? '#7C3AED' :
                post.reporterType === 'Institusi Resmi' ? '#1D4ED8' :
                  post.reporterType === 'Belum Verifikasi' ? '#6B7280' : '#15803D',
              fontSize: '9px',
            }}
          >
            {post.reporter === 'Akun Anonim' ? 'AN' : post.reporter.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="font-medium" style={{ fontSize: '11px', color: '#131B2E', lineHeight: '15px' }}>
              {post.reporter}
            </div>
          </div>
        </div>
        <StatusBadge status={post.reporterType} />
      </td>

      {/* KATEGORI & LOKASI */}
      <td className="py-3 px-2 align-top" style={{ minWidth: '130px' }}>
        <div className="flex items-center gap-1 mb-1">
          <CategoryIcon size={12} style={{ color: '#5C3F3E' }} />
          <span className="font-medium" style={{ fontSize: '11px', color: '#131B2E' }}>{post.category}</span>
        </div>
        <div className="flex items-start gap-0.5" style={{ fontSize: '11px', color: '#916F6D' }}>
          <MapPin size={10} style={{ marginTop: '2px', flexShrink: 0 }} />
          <span style={{ lineHeight: '14px' }}>{post.location}</span>
        </div>
        <div className="flex items-center gap-0.5 mt-1" style={{ fontSize: '10px', color: '#916F6D' }}>
          <Clock size={9} />
          {post.time}
        </div>
      </td>

      {/* INTERAKSI */}
      <td className="py-3 px-2 align-top" style={{ minWidth: '80px' }}>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1" style={{ fontSize: '11px', color: '#916F6D' }}>
            <Heart size={11} style={{ color: '#BA0022' }} />
            {post.likes}
          </div>
          <div className="flex items-center gap-1" style={{ fontSize: '11px', color: '#916F6D' }}>
            <MessageCircle size={11} style={{ color: '#0051D5' }} />
            {post.comments}
          </div>
          {post.reports > 0 && (
            <div className="flex items-center gap-1 font-semibold" style={{ fontSize: '11px', color: '#BA0022' }}>
              <AlertTriangle size={11} />
              {post.reports}
            </div>
          )}
        </div>
      </td>

      {/* STATUS */}
      <td className="py-3 px-2 align-top" style={{ minWidth: '80px' }}>
        <StatusBadge status={post.status === 'ditinjau' ? 'ditinjau' : post.status} />
      </td>

      {/* AKSI */}
      <td className="py-3 pl-2 pr-3 align-top" style={{ minWidth: '70px' }}>
        <button
          className="flex items-center justify-center rounded-lg"
          style={{
            width: '28px',
            height: '28px',
            backgroundColor: '#F5F6FF',
            border: '1px solid #E2E7FF',
            cursor: 'pointer',
          }}
        >
          <MoreHorizontal size={14} style={{ color: '#5C3F3E' }} />
        </button>
      </td>
    </tr>
  )
}

function PreviewPanel({
  post,
  onAction,
}: {
  post: typeof FEED_POSTS[0]
  onAction?: (msg: string) => void
}) {
  const CategoryIcon = post.categoryIcon
  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden flex-shrink-0"
      style={{
        width: '299px',
        border: '1px solid #EAEDFF',
        backgroundColor: '#fff',
        boxShadow: '0 1px 6px rgba(80,80,160,0.07)',
      }}
    >
      {/* Panel header */}
      <div
        className="px-4 py-3 flex items-center justify-between flex-shrink-0"
        style={{ borderBottom: '1px solid #EAEDFF' }}
      >
        <div>
          <div className="font-semibold" style={{ fontSize: '13px', color: '#131B2E' }}>
            Pratinjau Postingan Feed
          </div>
          <div style={{ fontSize: '10px', color: '#916F6D', fontFamily: 'Liberation Mono, Courier New, monospace' }}>
            {post.id}
          </div>
        </div>
      </div>

      {/* Alert */}
      {post.reports > 0 && (
        <div
          className="mx-3 mt-3 p-3 rounded-lg flex items-start gap-2"
          style={{ backgroundColor: '#FFF0F0', border: '1px solid #FFDAD6' }}
        >
          <AlertTriangle size={13} style={{ color: '#BA0022', flexShrink: 0, marginTop: '1px' }} />
          <p style={{ fontSize: '11px', color: '#BA0022', lineHeight: '15px', margin: 0 }}>
            <strong>Perlu Tindakan Cepat:</strong> {post.reports} warga menandai postingan ini sebagai informasi palsu/hoax. Silakan lakukan verifikasi lokasi atau turunkan feed.
          </p>
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-4">
        {/* Reporter info */}
        <div className="flex items-center gap-2 mb-2">
          <div
            className="flex items-center justify-center rounded-full font-bold flex-shrink-0"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: post.reporterType === 'Belum Verifikasi' ? '#F3F4F6' : '#E2E7FF',
              color: post.reporterType === 'Belum Verifikasi' ? '#6B7280' : '#5C3F3E',
              fontSize: '11px',
            }}
          >
            {post.reporter === 'Akun Anonim' ? 'AN' : post.reporter.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold" style={{ fontSize: '12px', color: '#131B2E' }}>
              {post.reporter}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Clock size={9} style={{ color: '#916F6D' }} />
              <span style={{ fontSize: '10px', color: '#916F6D' }}>{post.time}</span>
              <MapPin size={9} style={{ color: '#916F6D' }} />
              <span style={{ fontSize: '10px', color: '#916F6D' }}>{post.location}</span>
            </div>
          </div>
        </div>

        {/* Hoax badge */}
        {post.reports > 0 && (
          <div className="mb-2">
            <span
              className="font-semibold px-2 py-0.5 rounded-full inline-block"
              style={{ fontSize: '10px', backgroundColor: '#FEE2E2', color: '#BA0022' }}
            >
              🔴 Hoax Alert
            </span>
          </div>
        )}

        {/* Post title */}
        <div
          className="font-bold mb-2"
          style={{ fontSize: '13px', lineHeight: '18px', color: '#131B2E' }}
        >
          {post.title}
        </div>

        {/* Description */}
        <div
          className="mb-3"
          style={{ fontSize: '12px', lineHeight: '18px', color: '#5C3F3E' }}
        >
          {post.id === 'POST-0914'
            ? 'Air setinggi dada orang dewasa masuk rumah warga, butuh perahu karet segera! Tanggul sungai belakang jebol parah mohon relawan merapat.'
            : post.summary}
        </div>

        {/* Photo placeholder */}
        <div
          className="rounded-lg mb-2 flex items-center justify-center"
          style={{
            height: '120px',
            backgroundColor: post.category === 'Banjir' ? '#BFDBFE' :
              post.category === 'Kebakaran' ? '#FEE2E2' :
                post.category === 'Kecelakaan' ? '#FEF3C7' :
                  post.category === 'Cuaca' ? '#E0F2FE' : '#E5E7EB',
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <CategoryIcon
              size={28}
              style={{
                color: post.category === 'Banjir' ? '#1D4ED8' :
                  post.category === 'Kebakaran' ? '#BA0022' :
                    post.category === 'Kecelakaan' ? '#B45309' :
                      post.category === 'Cuaca' ? '#0369A1' : '#6B7280',
              }}
            />
            <span style={{ fontSize: '10px', color: '#916F6D' }}>Foto Lampiran</span>
          </div>
        </div>

        {/* Photo badge */}
        <div
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-3"
          style={{ backgroundColor: '#E2E7FF', fontSize: '10px', color: '#5C3F3E' }}
        >
          <span>📷</span>
          <span className="font-medium">1 Foto Lampiran</span>
        </div>

        {/* Geotag */}
        <div
          className="flex items-start gap-2 p-2.5 rounded-lg mb-3"
          style={{ backgroundColor: '#F5F6FF', border: '1px solid #E2E7FF' }}
        >
          <MapPin size={12} style={{ color: '#5C3F3E', marginTop: '2px', flexShrink: 0 }} />
          <div>
            <div className="font-mono font-medium" style={{ fontSize: '11px', color: '#131B2E' }}>
              {post.id === 'POST-0914' ? '-7.2891, 112.7344' : post.location}
            </div>
            {post.id === 'POST-0914' && (
              <div style={{ fontSize: '10px', color: '#916F6D' }}>Akurasi GPS 14m</div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div
          className="flex items-center gap-4 py-2 mb-3"
          style={{ borderTop: '1px solid #EAEDFF', borderBottom: '1px solid #EAEDFF' }}
        >
          <div className="flex items-center gap-1" style={{ fontSize: '11px', color: '#5C3F3E' }}>
            <Heart size={12} style={{ color: '#BA0022' }} />
            {post.likes}
          </div>
          <div className="flex items-center gap-1" style={{ fontSize: '11px', color: '#5C3F3E' }}>
            <MessageCircle size={12} style={{ color: '#0051D5' }} />
            {post.comments}
          </div>
          {post.reports > 0 && (
            <div className="flex items-center gap-1 font-semibold" style={{ fontSize: '11px', color: '#BA0022' }}>
              <AlertTriangle size={12} />
              {post.reports} Laporan
            </div>
          )}
        </div>

        {/* Moderation actions label */}
        <div
          className="font-semibold mb-2 tracking-widest"
          style={{ fontSize: '10px', letterSpacing: '0.08em', color: '#916F6D' }}
        >
          AKSI MODERASI OPERATOR
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onAction?.(`Postingan "${post.title}" berhasil diturunkan dari linimasa.`)}
            className="w-full font-semibold rounded-lg flex items-center justify-center gap-2 py-2 transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: '#BA0022', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px' }}
          >
            <XCircle size={14} />
            Turunkan Post
          </button>
          <button
            type="button"
            onClick={() => onAction?.(`Postingan "${post.title}" telah dikonfirmasi valid.`)}
            className="w-full font-semibold rounded-lg flex items-center justify-center gap-2 py-2 transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: '#0051D5', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px' }}
          >
            <CheckCircle size={14} />
            Konfirmasi Valid
          </button>
          <button
            type="button"
            onClick={() => onAction?.(`Membuka modal tinjau ${post.comments} komentar warga.`)}
            className="w-full font-semibold rounded-lg flex items-center justify-center gap-2 py-2 transition-colors hover:bg-slate-200"
            style={{ backgroundColor: '#E2E7FF', color: '#0051D5', border: '1px solid #C7CEFF', cursor: 'pointer', fontSize: '12px' }}
          >
            <MessageCircle size={14} />
            Tinjau {post.comments} Komentar
          </button>
          <button
            type="button"
            onClick={() => onAction?.(`Postingan "${post.title}" dipindahkan ke arsip sampah.`)}
            className="flex items-center justify-center rounded-lg ml-auto transition-colors hover:bg-red-200"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#FFF0F0',
              border: '1px solid #FFDAD6',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={14} style={{ color: '#BA0022' }} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function FeedPage() {
  const [selectedPostId, setSelectedPostId] = useState('POST-0914')
  const [categoryFilter, setCategoryFilter] = useState('Semua Kategori')
  const [statusFilter, setStatusFilter] = useState('Semua Status')
  const [currentPage, setCurrentPage] = useState(1)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const selectedPost = FEED_POSTS.find(p => p.id === selectedPostId) || FEED_POSTS[2]

  const displayedPosts = FEED_POSTS.filter(post => {
    if (categoryFilter !== 'Semua Kategori' && post.category !== categoryFilter) {
      return false
    }
    if (statusFilter !== 'Semua Status' && post.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false
    }
    return true
  })

  return (
    <div className="flex" style={{ minHeight: '1237px', backgroundColor: '#fff' }}>
      <Sidebar variant="feed" />

      <div className="flex flex-col flex-1 min-w-0">
        <Header variant="feed" />

        {/* Main */}
        <main className="flex-1" style={{ padding: '24px', backgroundColor: '#fff' }}>
          {/* Page heading */}
          <div className="mb-5">
            <div
              className="font-semibold mb-1 tracking-widest"
              style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#916F6D' }}
            >
              LINIMASA PUBLIK
            </div>
            <h1
              className="font-bold"
              style={{ fontSize: '24px', lineHeight: '32px', color: '#131B2E' }}
            >
              Kelola Postingan Feed
            </h1>
          </div>

          {/* Stats cards */}
          <div className="flex gap-4 mb-5">
            {[
              { title: 'TOTAL POSTINGAN AKTIF', value: 142, sub: '+14 hari ini', color: '#131B2E' },
              { title: 'DILAPORKAN WARGA', value: 8, sub: 'Perlu Tinjauan', color: '#BA0022' },
              { title: 'fEED', value: 5, sub: 'Hoaks/valid', color: '#815100' },
            ].map(card => (
              <div
                key={card.title}
                className="rounded-xl flex flex-col justify-between"
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #EAEDFF',
                  boxShadow: '0 1px 4px rgba(80,80,160,0.06)',
                  padding: '16px 20px',
                  width: '304px',
                  height: '124px',
                  boxSizing: 'border-box',
                  flexShrink: 0,
                }}
              >
                <div>
                  <div
                    className="font-semibold tracking-widest mb-1"
                    style={{ fontSize: '10px', color: '#916F6D', letterSpacing: '0.08em' }}
                  >
                    {card.title}
                  </div>
                  <div
                    className="font-bold"
                    style={{ fontSize: '32px', lineHeight: '38px', color: card.color }}
                  >
                    {card.value}
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#916F6D' }}>{card.sub}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium"
              style={{ backgroundColor: '#F5F6FF', border: '1px solid #E2E7FF', fontSize: '12px', color: '#5C3F3E' }}
            >
              <Filter size={13} style={{ color: '#916F6D' }} />
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-medium"
                style={{ fontSize: '12px', color: '#5C3F3E' }}
              >
                <option>Semua Kategori</option>
                <option>Kebakaran</option>
                <option>Kecelakaan</option>
                <option>Banjir</option>
                <option>Cuaca</option>
                <option>Info Layanan</option>
              </select>
              <ChevronDown size={13} style={{ color: '#916F6D' }} />
            </div>

            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium"
              style={{ backgroundColor: '#F5F6FF', border: '1px solid #E2E7FF', fontSize: '12px', color: '#5C3F3E' }}
            >
              <Filter size={13} style={{ color: '#916F6D' }} />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-medium"
                style={{ fontSize: '12px', color: '#5C3F3E' }}
              >
                <option>Semua Status</option>
                <option value="valid">Valid</option>
                <option value="ditinjau">Ditinjau</option>
              </select>
              <ChevronDown size={13} style={{ color: '#916F6D' }} />
            </div>
          </div>

          {/* Two-column workspace */}
          <div className="flex gap-6 items-start">
            {/* Left: Table panel */}
            <div
              className="rounded-xl flex flex-col overflow-hidden"
              style={{
                flex: '1 1 621px',
                maxWidth: '621px',
                border: '1px solid #EAEDFF',
                boxShadow: '0 1px 4px rgba(80,80,160,0.06)',
                backgroundColor: '#fff',
              }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                style={{ borderBottom: '1px solid #EAEDFF' }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold" style={{ fontSize: '13px', color: '#131B2E' }}>
                    Daftar Postingan Komunitas
                  </span>
                  <span
                    className="font-semibold px-2 py-0.5 rounded-full"
                    style={{ fontSize: '10px', backgroundColor: '#E2E7FF', color: '#5C3F3E' }}
                  >
                    142 Data
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                  >
                    <RefreshCw size={14} style={{ color: '#916F6D' }} />
                  </button>
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                  >
                    <Download size={14} style={{ color: '#916F6D' }} />
                  </button>
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                  >
                    <Eye size={14} style={{ color: '#916F6D' }} />
                  </button>
                </div>
              </div>

              {/* Table with horizontal scroll */}
              <div className="overflow-x-auto">
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#F9FAFE' }}>
                      {['INFO POSTINGAN & MEDIA', 'PELAPOR / WARGA', 'KATEGORI & LOKASI', 'INTERAKSI', 'STATUS', 'AKSI'].map(col => (
                        <th
                          key={col}
                          className="text-left font-semibold tracking-wider"
                          style={{
                            fontSize: '10px',
                            letterSpacing: '0.07em',
                            color: '#916F6D',
                            padding: '10px 8px',
                            borderBottom: '1px solid #EAEDFF',
                          }}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayedPosts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-xs text-slate-400">
                          Tidak ada postingan yang sesuai dengan filter.
                        </td>
                      </tr>
                    ) : (
                      displayedPosts.map((post) => (
                        <FeedRow
                          key={post.id}
                          post={post}
                          isSelected={selectedPostId === post.id}
                          onClick={() => setSelectedPostId(post.id)}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div
                className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                style={{ borderTop: '1px solid #EAEDFF' }}
              >
                <span style={{ fontSize: '11px', color: '#916F6D' }}>
                  Menampilkan 1 - 5 dari 142 postingan
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="font-medium px-2.5 py-1 rounded disabled:opacity-50"
                    style={{ fontSize: '11px', color: '#5C3F3E', backgroundColor: '#F5F6FF', border: '1px solid #E2E7FF', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    Sebelumnya
                  </button>
                  {[1, 2, 3].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCurrentPage(n)}
                      className="font-semibold flex items-center justify-center rounded transition-colors"
                      style={{
                        width: '28px',
                        height: '28px',
                        fontSize: '11px',
                        backgroundColor: currentPage === n ? '#BA0022' : '#F5F6FF',
                        color: currentPage === n ? '#fff' : '#5C3F3E',
                        border: currentPage === n ? 'none' : '1px solid #E2E7FF',
                        cursor: 'pointer',
                      }}
                    >
                      {n}
                    </button>
                  ))}
                  <span style={{ fontSize: '11px', color: '#916F6D' }}>...</span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(29)}
                    className="font-semibold flex items-center justify-center rounded"
                    style={{
                      width: '28px',
                      height: '28px',
                      fontSize: '11px',
                      backgroundColor: currentPage === 29 ? '#BA0022' : '#F5F6FF',
                      color: currentPage === 29 ? '#fff' : '#5C3F3E',
                      border: currentPage === 29 ? 'none' : '1px solid #E2E7FF',
                      cursor: 'pointer',
                    }}
                  >
                    29
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(prev => Math.min(29, prev + 1))}
                    disabled={currentPage === 29}
                    className="font-medium px-2.5 py-1 rounded disabled:opacity-50"
                    style={{ fontSize: '11px', color: '#5C3F3E', backgroundColor: '#F5F6FF', border: '1px solid #E2E7FF', cursor: currentPage === 29 ? 'not-allowed' : 'pointer' }}
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Preview panel */}
            <PreviewPanel post={selectedPost} onAction={showToast} />
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
