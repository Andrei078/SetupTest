# SetupTest

**SetupTest** este un site web care îți permite să testezi rapid componentele principale ale setup-ului tău de calculator: tastatură, mouse și webcam. Site-ul oferă informații în timp real despre funcționarea fiecărui dispozitiv și latența acestuia.

---

## Structura proiectului

```
SetupTest/
├─ pages/
│  ├─ index.html          # Homepage cu link-uri către teste
│  ├─ keyboard.html       # Test tastatură
│  ├─ mouse.html          # Test mouse
│  └─ webcam.html         # Test webcam
├─ css/
│  ├─ style.css           # CSS global
│  ├─ keyboard.css        # Stilizare tastatură
│  ├─ mouse.css           # Stilizare mouse
│  └─ webcam.css          # Stilizare webcam
├─ js/
│  ├─ keyboard.js         # Logica test tastatură
│  ├─ mouse.js            # Logica test mouse
│  └─ webcam.js           # Logica test webcam
└─ README.md
```

---

## Funcționalități

### HomePage

* Afișează o scurtă descriere a site-ului
* Trei butoane către paginile de test: Tastatură, Mouse, Webcam
* Design modern, culori dark, responsive

### Test Tastatură

* Detectează apăsările tastelor și evidențiază tastele apăsate
* Afișează:

  * Ultima tastă apăsată
  * Cod tastă
  * Timp de răspuns în ms
* Tastatura virtuală evidențiază tastele testate
* Stilizare modernă, responsive

### Test Mouse

* Zona de test mare pentru mișcarea și click-ul mouse-ului
* Detectează și afișează:

  * Click stânga
  * Click dreapta
  * Scroll
  * Poziția cursorului (X, Y)
  * Timp de răspuns (latență)
* Design modern cu feedback vizual la click

### Test Webcam

* Selectare cameră (dacă sunt mai multe disponibile)
* Pornește/oprește camera cu un singur buton
* Afișează:

  * Rezoluția camerei
  * FPS în timp real
  * Estimarea calității (Scăzută / Bună / Excelentă)
* Suport Full HD și 60 FPS dacă camera permite

---

## Instrucțiuni de utilizare

1. Deschide `index.html` într-un browser modern (recomandat Chrome sau Firefox).
2. Permite accesul la dispozitivele necesare (tastatură, mouse, webcam).
3. Selectează testul dorit:

   * **Tastatură**: testează apăsările tastelor și timpul de răspuns.
   * **Mouse**: testează click-urile, scroll-ul și mișcarea cursorului.
   * **Webcam**: pornește camera și verifică rezoluția și FPS-ul.
4. Urmează instrucțiunile afișate pe fiecare pagină.

---

## Cerințe

* Browser modern cu suport pentru `getUserMedia` (Webcam) și `performance.now()`
* HTTPS recomandat pentru acces la webcam
* JavaScript activat

---

## Note tehnice

* Toate fișierele CSS și JS sunt separate de HTML pentru claritate și mentenanță ușoară.
* Rezoluția webcam-ului poate fi limitată de browser sau de camera folosită; site-ul încearcă să folosească Full HD (1920×1080) și 60 FPS, dar face fallback dacă nu sunt disponibile.
* Testele tastatură și mouse oferă feedback vizual și măsurători de latență precise folosind `performance.now()`.

---

## Autor

* Proiect dezvoltat pentru testarea setup-ului hardware cu un design modern și interactiv.
