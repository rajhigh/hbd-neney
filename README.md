# 🎀 Birthday Website

Website ulang tahun cantik bertema pink untuk orang tersayang.

---

## 📁 Struktur File

```
birthday-website/
├── index.html       ← Halaman utama
├── style.css        ← Semua styling
├── script.js        ← Animasi & interaksi
└── images/
    ├── hero.jpg         ← Foto utama (cover / hero section)
    ├── gallery1.jpg     ← Foto galeri 1
    ├── gallery2.jpg     ← Foto galeri 2
    ├── gallery3.jpg     ← Foto galeri 3
    ├── gallery4.jpg     ← Foto galeri 4
    ├── gallery5.jpg     ← Foto galeri 5
    └── gallery6.jpg     ← Foto galeri 6
```

---

## ✏️ Cara Kustomisasi

### 1. Ganti Nama & Tanggal (index.html)
Cari dan ganti teks berikut di `index.html`:
- `Nama Pacar Kamu` → nama pacarmu
- `Tanggal Ulang Tahun` → contoh: `5 September`
- `Nama Kamu` → namamu sendiri
- Caption foto galeri → sesuaikan tiap caption

### 2. Tanggal Mulai Bersama (script.js)
Di bagian atas `script.js`, ubah:
```js
togetherSince: '2023-01-15',  // ganti dengan tanggal kamu pacaran
```

### 3. Masukkan Foto
Taruh foto di folder `images/` dengan nama:
- `hero.jpg` — foto paling cantik untuk halaman depan (portrait/square bagus)
- `gallery1.jpg` s/d `gallery6.jpg` — foto kenangan bersama

> **Tips:** Kompres foto dulu di https://squoosh.app agar loading cepat.

---

## 🚀 Deploy ke GitHub Pages

1. Buat repo baru di GitHub (misal: `birthday-sayang`)
2. Upload semua file (termasuk folder `images/`)
3. Masuk ke **Settings → Pages**
4. Source: pilih branch `main`, folder `/ (root)`
5. Klik **Save**
6. Website akan live di: `https://username-github-kamu.github.io/birthday-sayang/`

---

## 🎁 Fitur Website

- ✅ Hero section dengan foto full-screen
- ✅ Pesan cinta personal
- ✅ Galeri foto dengan lightbox (bisa klik untuk zoom)
- ✅ Counter "sudah berapa lama bersama"
- ✅ Section "alasan aku mencintaimu"
- ✅ Floating hearts & sparkles animasi
- ✅ Scroll reveal animations
- ✅ Fully responsive (HP & desktop)
- ✅ Pink aesthetic theme
