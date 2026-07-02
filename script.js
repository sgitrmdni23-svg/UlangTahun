/* ==========================================================
   UNTUK IYUY — SCRIPT
   ----------------------------------------------------------
   Bagian yang paling sering diedit:
   - WISHES        (halaman "Langit Harapan")
   - letterContent (isi surat di halaman amplop)
   Cari komentar "GANTI DI SINI" untuk menemukannya cepat.
========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     0. NAVIGASI ANTAR HALAMAN
  ============================================ */
  const screens = Array.from(document.querySelectorAll('.screen'));

  function showScreen(id){
    const target = document.getElementById(id);
    if(!target) return;

    screens.forEach(s => {
      if(s === target) return;
      if(s.classList.contains('active')){
        s.classList.add('leaving');
        s.classList.remove('active');
        setTimeout(() => s.classList.remove('leaving'), 550);
      }
    });

    // beri sedikit jeda supaya transisi "keluar" terlihat rapi
    setTimeout(() => {
      target.classList.add('active');
      window.scrollTo({ top:0, behavior:'auto' });
      onScreenEnter(id);
    }, target.id === 'opening' ? 0 : 120);
  }

  document.getElementById('open-letter-btn').addEventListener('click', (e) => {
    rippleEffect(e.currentTarget);
    setTimeout(() => showScreen('page1'), 350);
  });

  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      rippleEffect(e.currentTarget);
      const next = btn.getAttribute('data-next');
      setTimeout(() => showScreen(next), 250);
    });
  });

  function onScreenEnter(id){
    if(id === 'page3') buildStarField();
    if(id === 'page4') { /* menunggu klik amplop */ }
    if(id === 'page5') { spawnFinalHearts(); burstConfetti(); }
  }

  function rippleEffect(btn){
    btn.classList.remove('rippling');
    void btn.offsetWidth; // reflow supaya animasi bisa diulang
    btn.classList.add('rippling');
  }

  /* ============================================
     1. LAPISAN HATI & KELOPAK MELAYANG (global)
  ============================================ */
  const floatyLayer = document.getElementById('floaty-layer');
  const floatySymbols = ['♥','❀','✿'];
  const floatyColors = ['#E7A9BE','#F1AFC3','#D8B476','#F6C9D6'];

  function spawnFloaty(){
    const el = document.createElement('span');
    const symbol = floatySymbols[Math.floor(Math.random()*floatySymbols.length)];
    el.textContent = symbol;
    el.className = 'floaty';
    const size = 10 + Math.random()*16;
    el.style.left = Math.random()*100 + 'vw';
    el.style.fontSize = size + 'px';
    el.style.color = floatyColors[Math.floor(Math.random()*floatyColors.length)];
    const duration = 8 + Math.random()*6;
    el.style.animationDuration = duration + 's';
    el.style.setProperty('--drift', (Math.random()*80 - 40) + 'px');
    el.style.setProperty('--spin', (Math.random()*360) + 'deg');
    floatyLayer.appendChild(el);
    setTimeout(() => el.remove(), duration*1000 + 200);
  }
  setInterval(spawnFloaty, 900);
  for(let i=0;i<5;i++) setTimeout(spawnFloaty, i*300); // isi awal biar tidak kosong

  /* ============================================
     2. SPARKLES DI OPENING
  ============================================ */
  const sparkleWrap = document.querySelector('.opening-sparkles');
  for(let i=0;i<18;i++){
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = Math.random()*100 + '%';
    s.style.top = Math.random()*100 + '%';
    s.style.animationDelay = (Math.random()*2.4) + 's';
    sparkleWrap.appendChild(s);
  }

  /* ============================================
     3. TOMBOL MUSIK
     GANTI file musik di index.html pada tag <audio id="bg-music">
  ============================================ */
  const musicBtn = document.getElementById('music-toggle');
  const music = document.getElementById('bg-music');
  let isPlaying = false;

  musicBtn.addEventListener('click', () => {
    const hasSource = music.querySelector('source[src]') || music.currentSrc;
    if(!hasSource){
      musicBtn.querySelector('.music-label').textContent = 'Tambahkan file musik';
      setTimeout(() => {
        musicBtn.querySelector('.music-label').textContent = isPlaying ? 'Jeda Musik' : 'Putar Musik';
      }, 1800);
      return;
    }
    if(!isPlaying){
      music.play().catch(() => {});
      isPlaying = true;
    } else {
      music.pause();
      isPlaying = false;
    }
    musicBtn.classList.toggle('playing', isPlaying);
    musicBtn.querySelector('.music-label').textContent = isPlaying ? 'Jeda Musik' : 'Putar Musik';
  });

  /* ============================================
     4. KARTU KENANGAN (halaman 2)
     GANTI DI SINI: teks tiap kenangan ada di atribut
     data-msg pada setiap tombol .memory-card di index.html
  ============================================ */
  document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', () => {
      const opened = card.classList.toggle('opened');
      let msgEl = card.querySelector('.memory-msg');
      if(opened){
        if(!msgEl){
          msgEl = document.createElement('p');
          msgEl.className = 'memory-msg';
          msgEl.textContent = card.getAttribute('data-msg');
          card.appendChild(msgEl);
        }
      } else if(msgEl){
        msgEl.remove();
      }
    });
  });

  /* ============================================
     5. LANGIT HARAPAN (halaman 3)
     GANTI DI SINI: daftar harapan. Boleh tambah/kurangi,
     minimal sudah berisi 12 harapan berbeda.
  ============================================ */
  const WISHES = [
    'Aku harap kamu sehat lahir maupun batin.',
    'Aku harap semua mimpimu perlahan menemukan jalannya untuk menjadi nyata.',
    'Aku harap kamu selalu menemukan alasan untuk tersenyum, bahkan di hari yang berat.',
    'Aku harap kamu dikelilingi orang-orang yang tulus dan tidak pernah membuatmu ragu akan dirimu sendiri.',
    'Aku harap kamu terus tumbuh jadi versi dirimu yang paling kamu banggakan.',
    'Aku harap rezekimu lancar, dan usahamu selalu berbuah manis.',
    'Aku harap hatimu selalu tenang, meski dunia sedang ramai.',
    'Aku harap kamu berani memilih apa yang membuatmu bahagia, tanpa rasa bersalah.',
    'Aku harap luka-luka kecil di masa lalu perlahan menjadi pelajaran, bukan beban.',
    'Aku harap kamu selalu diberi kekuatan untuk menghadapi hari-hari yang sulit.',
    'Aku harap suatu hari nanti kamu bisa menoleh ke belakang dan tersenyum, bukan merasa berat.',
    'Aku harap cinta yang baik dan pantas selalu menemukan jalannya kepadamu.'
  ];

  const starField = document.getElementById('star-field');
  const wishBanner = document.getElementById('wish-banner');
  const wishText = document.getElementById('wish-text');
  let starsBuilt = false;

  const STAR_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14.6 8.5 L23.5 8.5 L16.2 13.8 L18.8 22.3 L12 17 L5.2 22.3 L7.8 13.8 L0.5 8.5 L9.4 8.5 Z"/></svg>';

  function buildStarField(){
    if(starsBuilt) return;
    starsBuilt = true;
    const positions = generateStarPositions(WISHES.length, 90, 92);
    WISHES.forEach((wish, i) => {
      const btn = document.createElement('button');
      btn.className = 'star-btn';
      btn.innerHTML = STAR_SVG;
      btn.style.left = positions[i].x + '%';
      btn.style.top = positions[i].y + '%';
      btn.style.animationDelay = (Math.random()*2.5) + 's';
      btn.setAttribute('aria-label', 'Buka harapan');
      btn.addEventListener('click', () => {
        wishText.textContent = wish;
        wishBanner.classList.add('show');
        btn.classList.add('used');
      });
      starField.appendChild(btn);
    });
  }

  // sebar posisi bintang secara acak tapi tidak terlalu menumpuk
  function generateStarPositions(count, maxX, maxY){
    const pts = [];
    let attempts = 0;
    while(pts.length < count && attempts < count*40){
      attempts++;
      const cand = { x: Math.random()*maxX, y: Math.random()*maxY };
      const tooClose = pts.some(p => Math.hypot(p.x-cand.x, p.y-cand.y) < 14);
      if(!tooClose) pts.push(cand);
    }
    while(pts.length < count){ pts.push({x:Math.random()*maxX, y:Math.random()*maxY}); }
    return pts;
  }

  /* ============================================
     6. AMPLOP & SURAT (halaman 4)
     GANTI DI SINI: isi surat ada pada variabel letterContent.
     Gunakan \n untuk baris baru / paragraf baru.
  ============================================ */
  const letterContent =
`Selamat ulang tahun, Iyuy.

Hii, how's your day? Igit harap hari kamu lebih baik dari hari-hari yang sebelumnya yaa. Igit harap kamu masih bisa senyum lewat hal kecil yang kamu temui tiap harinya. Kalau mungkin hari ini ga baik sama kamu it's okay, it just a bad day not a bad life. Kamu percaya kan kalau setelah semua masalah yang kamu lalui akan menghasilkan sesuatu yang luar biasa nantinya.  

Jangan pernah merasa gagal atas semua yang kamu lakukan, big no! Kamu engga gagal, kamu itu sedang berproses, dan proses itu ga selamanya mudah. Pasti akan ada saatnya kamu jatuh, kamu terpuruk, kamu kalah, kamu kecewa, dan dari proses itu akan berakhir dengan hasil yang terbaik. Trust me everything gonna be okay, Igit percaya kamu akan baik-baik aja kok. 

Igit harap kamu tetap melangkah ya? Jangan berhenti, masih banyak hal yang harus kamu lalui, dan ini belum seberapa. Akan ada banyak rintangan lagi setelah ini, i hope you strong, I trust you. Sure, you can do it and you deserve to be happy. Happy process, I hope good things always come for you.  

Kalau suatu saat kamu teringat masa-masa itu, Igit harap yang teringat adalah bagian-bagian baiknya aja yaa.

Doa dan harapan terbaik dari igit, Selamat bertambah usia, Iyuy. Jaga diri baik-baik, ya.`;

  const envelope = document.getElementById('envelope');
  const letterWrap = document.getElementById('letter-wrap');
  const letterTextEl = document.getElementById('letter-text');
  const letterCursor = document.getElementById('letter-cursor');
  const toFinalBtn = document.getElementById('to-final-btn');
  let letterTyped = false;

  envelope.addEventListener('click', () => {
    if(envelope.classList.contains('opened')) return;
    envelope.classList.add('opened');
    setTimeout(() => {
      letterWrap.classList.add('show');
      if(!letterTyped){
        letterTyped = true;
        typewriter(letterContent, letterTextEl, 22, () => {
          letterCursor.classList.add('done');
          toFinalBtn.classList.add('ready');
        });
      }
    }, 500);
  });

  function typewriter(text, el, speed, onDone){
    let i = 0;
    el.textContent = '';
    function step(){
      if(i < text.length){
        el.textContent += text.charAt(i);
        i++;
        // sedikit variasi kecepatan supaya terasa lebih natural
        const jitter = speed + (Math.random()*14 - 7);
        setTimeout(step, jitter);
      } else if(onDone){
        onDone();
      }
    }
    step();
  }

  /* ============================================
     7. HALAMAN TERAKHIR — hati mengambang & confetti
  ============================================ */
  const finalHeartsWrap = document.querySelector('.final-hearts');
  let finalHeartsSpawned = false;

  function spawnFinalHearts(){
    if(finalHeartsSpawned) return;
    finalHeartsSpawned = true;
    for(let i=0;i<22;i++){
      setTimeout(() => {
        const h = document.createElement('span');
        h.textContent = '♥';
        h.style.position = 'absolute';
        h.style.left = Math.random()*100 + '%';
        h.style.bottom = '-30px';
        h.style.fontSize = (10 + Math.random()*18) + 'px';
        h.style.color = ['#E7A9BE','#D8B476','#F1AFC3'][Math.floor(Math.random()*3)];
        h.style.opacity = '0.85';
        const duration = 6 + Math.random()*5;
        h.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
        finalHeartsWrap.appendChild(h);
        requestAnimationFrame(() => {
          h.style.transform = `translateY(-120vh) translateX(${Math.random()*60-30}px)`;
          h.style.opacity = '0';
        });
        setTimeout(() => h.remove(), duration*1000 + 200);
      }, i*260);
    }
    // ulangi terus selama di halaman terakhir
    setInterval(() => {
      if(!document.getElementById('page5').classList.contains('active')) return;
      const h = document.createElement('span');
      h.textContent = '♥';
      h.style.position = 'absolute';
      h.style.left = Math.random()*100 + '%';
      h.style.bottom = '-30px';
      h.style.fontSize = (10 + Math.random()*18) + 'px';
      h.style.color = ['#E7A9BE','#D8B476','#F1AFC3'][Math.floor(Math.random()*3)];
      h.style.opacity = '0.85';
      const duration = 6 + Math.random()*5;
      h.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;
      finalHeartsWrap.appendChild(h);
      requestAnimationFrame(() => {
        h.style.transform = `translateY(-120vh) translateX(${Math.random()*60-30}px)`;
        h.style.opacity = '0';
      });
      setTimeout(() => h.remove(), duration*1000 + 200);
    }, 900);
  }

  function burstConfetti(){
    const colors = ['#E7A9BE','#F1AFC3','#D8B476','#F6C9D6','#FFF8F2'];
    for(let i=0;i<70;i++){
      setTimeout(() => {
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random()*100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random()*colors.length)];
        piece.style.opacity = '0.95';
        const fall = 3 + Math.random()*2.5;
        const rotate = Math.random()*360;
        const drift = (Math.random()*140 - 70);
        piece.style.transition = `transform ${fall}s cubic-bezier(.2,.6,.4,1), opacity ${fall}s linear`;
        document.body.appendChild(piece);
        requestAnimationFrame(() => {
          piece.style.transform = `translateY(105vh) translateX(${drift}px) rotate(${rotate}deg)`;
          piece.style.opacity = '0.15';
        });
        setTimeout(() => piece.remove(), fall*1000 + 250);
      }, i*18);
    }
  }

  /* ============================================
     8. PARALLAX HALUS PADA ILUSTRASI BERUANG
     + easter egg: sentuh beruang untuk memunculkan hati
  ============================================ */
  const bear = document.querySelector('.bear-illustration');
  if(bear){
    document.addEventListener('mousemove', (e) => {
      if(!document.getElementById('page1').classList.contains('active')) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      bear.style.transform = `translate(${x}px, ${y}px)`;
    });

    function bearHeartBurst(){
      const rect = bear.getBoundingClientRect();
      for(let i=0;i<6;i++){
        const h = document.createElement('span');
        h.textContent = '♥';
        h.style.position = 'fixed';
        h.style.left = (rect.left + rect.width/2 + (Math.random()*40-20)) + 'px';
        h.style.top = (rect.top + rect.height/2) + 'px';
        h.style.fontSize = (12 + Math.random()*10) + 'px';
        h.style.color = ['#E7A9BE','#D8B476','#F1AFC3'][Math.floor(Math.random()*3)];
        h.style.zIndex = 25;
        h.style.pointerEvents = 'none';
        h.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        document.body.appendChild(h);
        requestAnimationFrame(() => {
          h.style.transform = `translate(${Math.random()*60-30}px, -70px) scale(1.3)`;
          h.style.opacity = '0';
        });
        setTimeout(() => h.remove(), 1050);
      }
    }
    bear.addEventListener('click', bearHeartBurst);
    bear.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); bearHeartBurst(); }
    });
  }

  /* ============================================
     9. GALERI FOTO — lightbox + efek pop hati
     (foto diatur lewat "photos/besar.jpg" dan
     "photos/kecil-1.jpg" dst di index.html)
  ============================================ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src){
    lightboxImg.src = src;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox(){
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeLightbox(); });

  function popHeartAt(container, x, y){
    const h = document.createElement('span');
    h.textContent = '♥';
    h.className = 'photo-heart-pop';
    h.style.left = x + 'px';
    h.style.top = y + 'px';
    h.style.fontSize = (Math.random()*10 + 26) + 'px';
    container.appendChild(h);
    setTimeout(() => h.remove(), 900);
  }

  document.querySelectorAll('.photo-frame').forEach(frame => {
    let lastTap = 0;

    frame.addEventListener('click', (e) => {
      const now = Date.now();
      const isDoubleTap = (now - lastTap) < 350;
      lastTap = now;

      if(isDoubleTap){
        const rect = frame.getBoundingClientRect();
        const x = (e.clientX || rect.left + rect.width/2) - rect.left;
        const y = (e.clientY || rect.top + rect.height/2) - rect.top;
        popHeartAt(frame, x, y);
        return;
      }

      if(frame.classList.contains('no-photo')){
        // belum ada foto: kasih gerakan halus sebagai penanda, bukan lightbox
        frame.animate(
          [{ transform:'translateX(0)' }, { transform:'translateX(-4px)' }, { transform:'translateX(4px)' }, { transform:'translateX(0)' }],
          { duration: 300 }
        );
        return;
      }
      openLightbox(frame.getAttribute('data-full'));
    });

    // tilt halus mengikuti kursor (hanya perangkat dengan mouse)
    if(window.matchMedia('(pointer:fine)').matches){
      const baseRotation = frame.style.transform || '';
      frame.addEventListener('mousemove', (e) => {
        const rect = frame.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        frame.style.transform = `perspective(500px) rotateX(${py * -8}deg) rotateY(${px * 8}deg) translateY(-4px)`;
      });
      frame.addEventListener('mouseleave', () => {
        frame.style.transform = '';
      });
    }
  });

});
