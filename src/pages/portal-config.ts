import type { IconName } from '../components/Icons'

export interface PortalConfig {
  id: string
  path: string
  title: string
  subtitle: string
  icon: IconName
  greeting: string
  description: string
  accent: string
  stats: { label: string; value: string; detail: string; icon: IconName }[]
  focusTitle: string
  focusDescription: string
  actions: { title: string; description: string; icon: IconName }[]
}

export const portals: PortalConfig[] = [
  {
    id: 'developer',
    path: '/developer',
    title: 'Developer Hub',
    subtitle: 'BUILD THE CAMPUS',
    icon: 'code',
    greeting: 'Bangun sesuatu yang berdampak.',
    description: 'Pantau layanan digital kampus dan lanjutkan pekerjaanmu.',
    accent: 'mint',
    stats: [
      { label: 'API SERVICES', value: '08', detail: '7 layanan aktif', icon: 'grid' },
      { label: 'BUILD SUCCESS', value: '96.8%', detail: '+2.4% bulan ini', icon: 'check' },
      { label: 'DEPLOYMENTS', value: '24', detail: 'di 30 hari terakhir', icon: 'arrow' },
    ],
    focusTitle: 'Ruang kerja developer',
    focusDescription: 'Semua tools untuk membangun ekosistem UMMU.',
    actions: [
      { title: 'API Gateway', description: 'Kelola routing dan status layanan', icon: 'grid' },
      { title: 'Dokumentasi API', description: 'Jelajahi endpoint dan panduan integrasi', icon: 'code' },
      { title: 'Aktivitas deployment', description: 'Lihat riwayat rilis terbaru', icon: 'arrow' },
    ],
  },
  {
    id: 'finance',
    path: '/finance',
    title: 'Keuangan',
    subtitle: 'FINANCE OFFICE',
    icon: 'wallet',
    greeting: 'Ringkasan keuangan kampus.',
    description: 'Akses pembayaran, tagihan, dan layanan administrasi keuangan.',
    accent: 'amber',
    stats: [
      { label: 'TAGIHAN AKTIF', value: '—', detail: 'Ringkasan akun', icon: 'wallet' },
      { label: 'STATUS BAYAR', value: '—', detail: 'Periode berjalan', icon: 'check' },
      { label: 'RIWAYAT', value: '—', detail: 'Transaksi terakhir', icon: 'arrow' },
    ],
    focusTitle: 'Layanan keuangan',
    focusDescription: 'Pintasan menuju layanan dan informasi keuangan.',
    actions: [
      { title: 'Pembayaran kuliah', description: 'Informasi tagihan dan pembayaran', icon: 'wallet' },
      { title: 'Bukti transaksi', description: 'Riwayat dan unduh bukti pembayaran', icon: 'check' },
      { title: 'Bantuan keuangan', description: 'Panduan dan kanal bantuan', icon: 'arrow' },
    ],
  },
  {
    id: 'admin',
    path: '/admin',
    title: 'Administrasi',
    subtitle: 'CAMPUS ADMIN',
    icon: 'settings',
    greeting: 'Selamat datang di administrasi.',
    description: 'Kelola informasi akademik dan layanan administrasi kampus.',
    accent: 'violet',
    stats: [
      { label: 'LAYANAN', value: '—', detail: 'Administrasi kampus', icon: 'grid' },
      { label: 'PENGAJUAN', value: '—', detail: 'Status permohonan', icon: 'check' },
      { label: 'PENGUMUMAN', value: '—', detail: 'Informasi terbaru', icon: 'bell' },
    ],
    focusTitle: 'Pusat administrasi',
    focusDescription: 'Akses cepat ke layanan administrasi universitas.',
    actions: [
      { title: 'Data akademik', description: 'Informasi dan layanan akademik', icon: 'grid' },
      { title: 'Surat & dokumen', description: 'Pengajuan dokumen administrasi', icon: 'lecturer' },
      { title: 'Pengumuman kampus', description: 'Informasi dan kebijakan terbaru', icon: 'bell' },
    ],
  },
  {
    id: 'student',
    path: '/student',
    title: 'Portal Mahasiswa',
    subtitle: 'STUDENT LIFE',
    icon: 'student',
    greeting: 'Hai, perjalananmu berlanjut.',
    description: 'Ruang personal untuk aktivitas dan perjalanan akademikmu.',
    accent: 'blue',
    stats: [
      { label: 'KARTU RENCANA STUDI', value: '—', detail: 'Semester berjalan', icon: 'lecturer' },
      { label: 'JADWAL KULIAH', value: '—', detail: 'Kelas dan agenda', icon: 'grid' },
      { label: 'TAGIHAN', value: '—', detail: 'Status pembayaran', icon: 'wallet' },
    ],
    focusTitle: 'Perjalanan akademik',
    focusDescription: 'Hal-hal penting untuk menemani aktivitas kuliahmu.',
    actions: [
      { title: 'KRS & KHS', description: 'Rencana studi dan hasil semester', icon: 'lecturer' },
      { title: 'Jadwal kuliah', description: 'Agenda perkuliahan dan ujian', icon: 'grid' },
      { title: 'Pembayaran', description: 'Informasi tagihan dan transaksi', icon: 'wallet' },
    ],
  },
  {
    id: 'lecturer',
    path: '/lecturer',
    title: 'Portal Dosen',
    subtitle: 'FACULTY SPACE',
    icon: 'lecturer',
    greeting: 'Selamat datang kembali.',
    description: 'Satu ruang untuk mengajar, membimbing, dan berkolaborasi.',
    accent: 'teal',
    stats: [
      { label: 'JADWAL MENGAJAR', value: '—', detail: 'Semester berjalan', icon: 'grid' },
      { label: 'KELAS AKTIF', value: '—', detail: 'Ruang perkuliahan', icon: 'student' },
      { label: 'PENGISIAN NILAI', value: '—', detail: 'Status akademik', icon: 'check' },
    ],
    focusTitle: 'Ruang pengajar',
    focusDescription: 'Pintasan untuk kegiatan akademik dan pembelajaran.',
    actions: [
      { title: 'Jadwal mengajar', description: 'Kelas, waktu, dan ruang kuliah', icon: 'grid' },
      { title: 'Presensi mahasiswa', description: 'Kelola kehadiran perkuliahan', icon: 'student' },
      { title: 'Input nilai', description: 'Pengelolaan hasil pembelajaran', icon: 'check' },
    ],
  },
]
