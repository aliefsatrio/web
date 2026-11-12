import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import FeedPage from './pages/FeedPage'
import VerifikasiPage from './pages/VerifikasiPage'
import KelolaNomorLayananPage from './pages/KelolaNomorLayananPage'
import ModerasiLaporanPage from './pages/ModerasiLaporanPage'
import PengaturanPage from './pages/PengaturanPage'
import LupaSandiPage from './pages/LupaSandiPage'
import DaftarPage from './pages/DaftarPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lupa-sandi" element={<LupaSandiPage />} />
        <Route path="/daftar" element={<DaftarPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/verifikasi-warga" element={<VerifikasiPage />} />
        <Route path="/nomor-layanan" element={<KelolaNomorLayananPage />} />
        <Route path="/moderasi" element={<ModerasiLaporanPage />} />
        <Route path="/pengaturan" element={<PengaturanPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
