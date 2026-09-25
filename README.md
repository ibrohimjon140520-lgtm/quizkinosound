# MBSI Quiz

React + Vite asosidagi soundtrack orqali kino topish o‘yini.

## Ishga tushirish

```bash
npm install
npm run dev
```

Production: `npm run build`. Buildni ko‘rish: `npm run preview`.

## Soundtrack va javoblar

`src/data/questions.js` ichida yuklangan fayllarga mos 15 ta savol bor. Har bir savolda `id`, `audio`, `image`, `title`, `year` va `answer` mavjud.

- Audio: `public/audio/1.mp3` ... `17.mp3` (4 va 8 yo‘q).
- Javob rasmi: `public/images/1.jpg` ... `17.jpg` (4 va 8 yo‘q).
- Rasm tagida `Kino nomi (yil)` chiqadi. Seriallar uchun ilk namoyish yili ishlatiladi.
- Moslik va yil manbalari: [docs/movie-sources.md](docs/movie-sources.md).

Yangi savol uchun audio, rasm va data obyektini qo‘shing. UI sonni avtomatik hisoblaydi. Fayl raqamlari o‘zgarmagan; ekranda savollar 1 dan 15 gacha sanaladi.

## O‘yin oqimi

Boshlash → 15 ta soundtrackdan birini tanlash → play tugmasi bilan tinglash. Playerda pause, vaqt va ijro progressini ko‘rsatuvchi dekorativ tovush chiziqlari bor; chiziqlar haqiqiy audio amplitudasi emas. Oldinga o‘tkazish yo‘q.

Bir to‘liq ijrodan keyin javob tugmasi faollashadi. Bosilganda “Rostdan ham javobni topdingizmi?” modali chiqadi. Qayta tinglab, ikkinchi ijroni ham tugatganda modal chiqmaydi. Keyin alohida sahifada 5 soniya countdown, undan keyin kino rasmi va sarlavhasi ochiladi.

Keyingi savol tugmasi tanlash sahifasiga qaytaradi. Yakunlangan kartochka belgilanadi. Barcha savollar tugagach natija chiqadi. Audio yo‘q bo‘lsa, tushunarli xabar ko‘rsatiladi va javob bloklanadi.

Audio parchalari 15 soniya ijro etiladi. Merlin 20-soniyadan boshlanib, 35-soniyada to‘xtaydi. Qayta tinglash ham shu parchani ijro etadi. Countdown tugagach javob ochilganda oq va ko‘k konfetti bir marta otiladi; animatsiyalarni kamaytirish sozlamasi yoqilganida effekt o‘chadi.
