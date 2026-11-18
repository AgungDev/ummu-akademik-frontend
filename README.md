# UMMU Digital Campus

Frontend SPA untuk login kampus dan workspace berbasis peran. Route portal
pertama yang dikembangkan adalah `/developer`; route Keuangan, Administrasi,
Mahasiswa, dan Dosen disiapkan sebagai tampilan awal MVP.

## Menjalankan lokal

Pastikan Auth Service dan Kong berjalan. Vite meneruskan request API ke Kong di `http://localhost:7000`, sehingga login
lokal tidak memerlukan konfigurasi CORS di browser.

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Vite menerima koneksi dari perangkat lain pada jaringan lokal. Buka alamat
`http://<IP-LAN-komputer>:5173` dari perangkat yang terhubung ke Wi-Fi yang
sama. Jika tidak dapat diakses, izinkan koneksi masuk TCP port `5173` pada
Windows Firewall untuk jaringan **Private**. Batasi akses pada jaringan lokal
yang dipercaya; server Vite ini untuk development, bukan deployment publik.

`.env` boleh membiarkan `VITE_AUTH_BASE_URL` dan `VITE_API_BASE_URL` kosong
untuk menggunakan proxy Vite. `VITE_AUTH_BASE_URL` mengatur origin Auth Service
untuk SDK `@ganz404/js-auth`; `VITE_API_BASE_URL` mengatur API Gateway untuk
request API. Pada deployment, isi keduanya dengan origin yang dapat diakses
browser dan pastikan kebijakan CORS mengizinkan origin frontend.

Dengan callback Google `localhost`, mulai login Google dari browser komputer
yang menjalankan service melalui `http://localhost:5173`. Perangkat lain di
jaringan Wi-Fi dapat memakai login username/password; Google login dari
perangkat lain memerlukan callback HTTPS yang valid.

## Route

| Route | Halaman |
| --- | --- |
| `/login` | Login username/password dan Google |
| `/developer` | Developer Hub |
| `/finance` | Portal Keuangan |
| `/admin` | Portal Administrasi |
| `/student` | Portal Mahasiswa |
| `/lecturer` | Portal Dosen |
| `/oauth/callback` | Callback login Google untuk SPA |

Setelah login berhasil, pengguna diarahkan ke `/developer`. SDK mengelola token
melalui `TokenManager` dengan penyimpanan `sessionStorage`; token tidak dibaca
atau ditulis langsung oleh komponen. `ProtectedRoute` melindungi portal dan
request API terautentikasi menggunakan `AuthenticatedHttpClient`.

Login Google dan callback menggunakan `UMMUAuthClient`. Login username/password
tetap memakai endpoint Auth Service yang sudah digunakan frontend; hasilnya
diteruskan ke `TokenManager` SDK karena SDK belum menyediakan helper password
login. User aktif diambil dari endpoint `/api/v1/auth/me`.

## Google OAuth lokal

Tambahkan konfigurasi berikut ke `auth-service/.env` tanpa mengubah Client ID
atau Client Secret yang sudah ada:

```env
GOOGLE_REDIRECT_URL=http://localhost:7000/auth/google/callback
GOOGLE_FRONTEND_CALLBACK_URL=http://localhost:5173/oauth/callback
```

Daftarkan `http://localhost:7000/auth/google/callback` sebagai **Authorized
redirect URI** di Google Cloud Console. Jangan mengganti URI Google tersebut
dengan URL frontend. Tambahkan kedua variabel itu ke `auth-service/.env`, lalu
rebuild service dari root repository:

```powershell
docker compose -f auth-service/docker-compose.yml up -d --build --force-recreate auth_service
```

Callback Auth Service meneruskan token ke SPA melalui URL fragment. SPA segera
menghapus fragment dari address bar sebelum menyimpan sesi.

## Login username/password

Frontend mengirim `username` dan `password` ke `POST /api/v1/auth/login`.
Masukkan username akun UMMU, bukan alamat email.
