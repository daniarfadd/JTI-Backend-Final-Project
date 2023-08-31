BACKEND FOR JTI IBM TECHCAMP FINAL PROJECT
===========================================
Created by Daffa Daniarfa

Prerequisite:
1. XAMPP installed 
2. POSTMAN to test API

HOW TO RUN THIS PROJECT ON YOUR LOCAL:
1. Download repo ini
2. buka folder -> buka terminal -> jalankan perintah "npm install"
3. Install nodemon
4. buat file ".env" yang berisi 2 variabel "APP_PORT" dan "SESS_SECRET". 
    - APP_PORT bebas mau pake berapa, contohnya bisa pake port 5000.
    - SESS_SECRET isinya bebas apa aja, contoh "nasflasgoij3223ukkjlfbjadbfbn-34023941h4jcn"
    Tahap ke-4 ini opsional kalau gamau pake bisa diubah codingan di file "index.js"
5. buat database secara manual melalu phpmyadmin, namanya database nya "jti_final". Kalau mau pake nama DB yang lain ubah codingan di config-> Database.js
6. codingan pada "index.js" line 45 ( // store.sync(); ),  di un-comment
7. JANGAN LUPA NYALAKAN XAMPP, MySQL dan Apache nya harus nyala
8. Pada terminal ketik "nodemon index"
9. Jika sudah berhasil maka untuk seterusnya codingan pada "index.js" line 45 di-comment lagi
10. Selamat mencoba!