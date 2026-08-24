const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const menuBtn=$('#menuBtn'),mobileMenu=$('#mobileMenu');
menuBtn.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});
$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));
const toast=$('#toast');let toastTimer;function showToast(t){toast.textContent=t;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
const wishes=['May this new chapter be brighter than every chapter before it. ✨','May your smile always have a reason behind it. ❤️','May God bless every step you take. 🙏','More memories. More laughter. More adventures. 🎉','This year, choose happiness again and again. 💙'];let wi=0;function nextWish(){wi=(wi+1)%wishes.length;showToast(wishes[wi])}$('#heroWish').addEventListener('click',nextWish);
const letter=$('#letterCard');letter.addEventListener('click',()=>{const open=letter.classList.toggle('open');letter.classList.toggle('sealed',!open);letter.setAttribute('aria-expanded',open)});
const memories=[...$$('.memory-card')];const lb=$('#lightbox'),lbImg=$('#lbImage'),lbCap=$('#lbCaption');let current=0;const captions=['College days ❤️','Same idiots, different day 😂','The Bezati archives.'];function openLb(i){current=i;lbImg.src=memories[i].querySelector('img').src;lbImg.alt=memories[i].querySelector('img').alt;lbCap.textContent=captions[i];lb.classList.add('open')}function closeLb(){lb.classList.remove('open')}memories.forEach((m,i)=>m.addEventListener('click',()=>openLb(i)));$('#lbClose').addEventListener('click',closeLb);$('#lbPrev').addEventListener('click',()=>openLb((current+2)%3));$('#lbNext').addEventListener('click',()=>openLb((current+1)%3));lb.addEventListener('click',e=>{if(e.target===lb)closeLb()});document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')closeLb();if(e.key==='ArrowRight')openLb((current+1)%3);if(e.key==='ArrowLeft')openLb((current+2)%3)});
const giftStage=$('#giftStage'),giftBtn=$('#giftReveal'),giftMsg=$('#giftMessage'),giftLockStatus=$('#giftLockStatus'),giftCountdown=$('#giftCountdown');
// Exact birthday unlock: 26 Aug 2026, 12:00 AM Asia/Kolkata (IST).
const giftUnlockMs=Date.UTC(2026,7,25,18,30,0);
let giftUnlocked=false;
function updateGiftLock(){
  const remaining=giftUnlockMs-Date.now();
  if(remaining<=0){
    if(!giftUnlocked){
      giftUnlocked=true;
      giftBtn.disabled=false;
      giftBtn.removeAttribute('aria-disabled');
      giftBtn.textContent='REVEAL MY GIFT 🎁';
      giftLockStatus.innerHTML='<strong>Your birthday surprise is unlocked! 🎉</strong><span>It is officially your Diamond Birthday — go ahead and reveal it. ❤️</span>';
      showToast('It’s time, Bezati! Your gift is unlocked. 🎸❤️');
    }
    return;
  }
  const total=Math.floor(remaining/1000),days=Math.floor(total/86400),hours=Math.floor((total%86400)/3600),mins=Math.floor((total%3600)/60),secs=total%60;
  giftCountdown.textContent=`Unlocks in ${days}d ${String(hours).padStart(2,'0')}h ${String(mins).padStart(2,'0')}m ${String(secs).padStart(2,'0')}s`;
}
updateGiftLock();
setInterval(updateGiftLock,1000);
giftBtn.addEventListener('click',()=>{
  if(!giftUnlocked)return;
  const giftBox = $('#giftBox');
  giftBox.classList.add('shaking');
  setTimeout(()=>giftBox.classList.add('opened'),420);
  setTimeout(()=>giftStage.classList.add('revealed'),820);
  setTimeout(()=>giftMsg.classList.add('show'),1250);
  giftBtn.disabled=true;
  giftBtn.textContent='GIFT REVEALED ❤️';
  giftLockStatus.innerHTML='<strong>Surprise unlocked! 🎸❤️</strong><span>Your guitar is waiting for you.</span>';
  showToast('Surprise unlocked! 🎸❤️');
  confetti();
});
function confetti(){for(let i=0;i<70;i++){const p=document.createElement('i');p.className='confetti';p.style.left=(45+Math.random()*10)+'vw';p.style.top='45vh';p.style.setProperty('--x',(Math.random()*2-1)*380+'px');p.style.setProperty('--y',(Math.random()*2-1)*380+'px');p.style.setProperty('--r',(Math.random()*720-360)+'deg');p.style.background=['#ef2631','#2d72d9','#fff','#9f0e1b'][Math.floor(Math.random()*4)];document.body.appendChild(p);setTimeout(()=>p.remove(),1200)}}
const arena=$('#gameArena'),target=$('#gameTarget'),scoreEl=$('#score'),msg=$('#gameMessage');let score=0;function moveTarget(){target.style.left=Math.max(8,Math.random()*88)+'%';target.style.top=Math.max(8,Math.random()*80)+'%'}target.addEventListener('click',()=>{score++;scoreEl.textContent=score+' / 10';if(score>=10){msg.textContent='MISSION COMPLETE! 🕷️❤️ Okay Bezati, you officially caught enough webs. Now go enjoy your birthday! 😂❤️';target.disabled=true}else{msg.textContent='Got one! Keep going, Bezati!';moveTarget()}});moveTarget();
$$('img').forEach(img=>img.addEventListener('error',()=>{img.style.display='none'}));
const style=document.createElement('style');style.textContent='.confetti{position:fixed;width:9px;height:14px;z-index:120;pointer-events:none;animation:confettiFall 1.2s ease-out forwards}@keyframes confettiFall{to{transform:translate(var(--x),var(--y)) rotate(var(--r));opacity:0}}';document.head.appendChild(style);

/* ===== INTRO + EXTRA ACTIVITIES ===== */
(() => {
  const $ = (s) => document.querySelector(s);
  const introGate = $('#introGate');
  const introYes = $('#introYes');
  const introNo = $('#introNo');
  const introReaction = $('#introReaction');
  const introProgress = document.querySelector('.intro-progress');
  const introProgressBar = document.querySelector('.intro-progress span');

  if (introYes && introGate) {
    introYes.addEventListener('click', () => {
      introReaction.textContent = "Okayyyy Bezati... opening your tiny birthday universe 🕷️❤️";
      introProgress?.classList.add('show');
      if (introProgressBar) introProgressBar.style.width = '100%';
      setTimeout(() => introGate.classList.add('hidden'), 900);
    });
  }
  if (introNo) {
    let noCount = 0;
    const noMessages = [
      "HOW DARE U 😭",
      "Excuse me??? That button is illegal. 😂",
      "Nice try. The surprise is still waiting. 😌",
      "Bezati... press YES. Don't make this awkward. 🕷️",
      "Okay fine... I'm asking one last time. 😭❤️"
    ];
    introNo.addEventListener('click', () => {
      noCount++;
      introReaction.textContent = noMessages[Math.min(noCount - 1, noMessages.length - 1)];
      introNo.style.transform = `translate(${(Math.random()*80-40)}px, ${(Math.random()*34-17)}px) rotate(${Math.random()*8-4}deg)`;
      if (noCount >= 3) {
        introNo.textContent = "YES, OKAY 😭";
        introNo.classList.remove('ghost');
        introNo.classList.add('primary');
      }
    });
  }

  const wishes = [
    "May God fill your year with peace, laughter and beautiful surprises. ❤️",
    "More memories, more adventures, and absolutely zero boring days. 😂",
    "May every little dream you've been carrying find its way to you. ✨",
    "May your smile stay louder than every bad day. ❤️",
    "One day you'll look back at this year and say: wow, that was a good one. 💎",
    "May your guitar skills become dangerous enough that I finally get my song. 🎸😂",
    "Official birthday instruction: laugh more, worry less, and enjoy your people. 😌❤️"
  ];
  const wishBtn = $('#wishCardBtn');
  const wishText = $('#wishCardText');
  if (wishBtn && wishText) {
    let wi = -1;
    wishBtn.addEventListener('click', () => {
      wi = (wi + 1) % wishes.length;
      wishText.classList.remove('wish-pop');
      void wishText.offsetWidth;
      wishText.textContent = wishes[wi];
      wishText.classList.add('wish-pop');
    });
  }

  const spider = $('#gameSpider');
  const scoreEl = $('#gameScore');
  const game = $('#spiderGame');
  const result = $('#gameResult');
  if (spider && game && scoreEl) {
    let score = 0;
    const moveSpider = () => {
      const maxX = Math.max(35, game.clientWidth - 35);
      const maxY = Math.max(80, game.clientHeight - 45);
      spider.style.left = `${35 + Math.random()*(maxX-35)}px`;
      spider.style.top = `${35 + Math.random()*(maxY-35)}px`;
      spider.style.transform = `translate(-50%,-50%) rotate(${Math.random()*20-10}deg)`;
    };
    spider.addEventListener('click', () => {
      score++;
      scoreEl.textContent = score;
      moveSpider();
      if (score >= 7) {
        result.textContent = "MISSION COMPLETE! 🕷️❤️ Okay Bezati, you win. Go enjoy your birthday! 😂";
        score = 0;
        setTimeout(() => scoreEl.textContent = "0", 2500);
      }
    });
    moveSpider();
    window.addEventListener('resize', moveSpider, {passive:true});
  }

  document.querySelectorAll('[data-choice]').forEach(btn => {
    btn.addEventListener('click', () => {
      const out = $('#choiceResult');
      if (!out) return;
      out.textContent = btn.dataset.choice === 'bezati'
        ? "CORRECT ANSWER. 😂❤️ Case closed."
        : "Nice attempt. But Bezati has officially been declared innocent. 😌";
    });
  });
})();

/* ===== BEZATI V4 INTRO + ACTIVITIES ===== */
(() => {
  const intro = document.getElementById('introGate');
  const yes = document.getElementById('introYes');
  const no = document.getElementById('introNo');
  const reaction = document.getElementById('introReaction');
  const bar = document.querySelector('.intro-progress span');
  const progress = document.querySelector('.intro-progress');

  if (yes && intro) yes.addEventListener('click', () => {
    reaction.textContent = "Okayyyy Bezati... opening your birthday universe 🕷️❤️";
    progress?.classList.add('show');
    if (bar) bar.style.width = '100%';
    setTimeout(() => intro.classList.add('hidden'), 850);
  });

  if (no) {
    let n = 0;
    const messages = [
      "HOW DARE U 😭",
      "Excuse me??? That button is illegal. 😂",
      "Nice try. The surprise is still waiting. 😌",
      "Bezati... PRESS YES. 🕷️",
      "Okay fine, last chance. 😭❤️"
    ];
    no.addEventListener('click', () => {
      n++;
      reaction.textContent = messages[Math.min(n - 1, messages.length - 1)];
      no.style.transform = `translate(${Math.random()*90-45}px,${Math.random()*40-20}px) rotate(${Math.random()*8-4}deg)`;
      if (n >= 3) {
        no.textContent = "YES, OKAY 😭";
        no.classList.remove('ghost'); no.classList.add('primary');
      }
    });
  }

  const wishes = [
    "May God fill your year with peace, laughter and beautiful surprises. ❤️",
    "More memories, more adventures, and absolutely zero boring days. 😂",
    "May every little dream you've been carrying find its way to you. ✨",
    "May your smile stay louder than every bad day. ❤️",
    "One day you'll look back at this year and say: wow, that was a good one. 💎",
    "May your guitar skills become dangerous enough that I finally get my song. 🎸😂",
    "Official birthday instruction: laugh more, worry less, and enjoy your people. 😌❤️"
  ];
  const wb = document.getElementById('wishCardBtn');
  const wt = document.getElementById('wishCardText');
  let wi = -1;
  wb?.addEventListener('click', () => {
    if (!wt) return;
    wi = (wi + 1) % wishes.length;
    wt.classList.remove('wish-pop'); void wt.offsetWidth;
    wt.textContent = wishes[wi]; wt.classList.add('wish-pop');
    const card = wb.closest('.wish-card');
    if (card) { card.classList.remove('wish-popping'); void card.offsetWidth; card.classList.add('wish-popping'); }
  });

  const spider = document.getElementById('gameSpider');
  const arena = document.getElementById('spiderGame');
  const score = document.getElementById('gameScore');
  const result = document.getElementById('gameResult');
  let points = 0;
  function move() {
    if (!spider || !arena) return;
    spider.style.left = `${28 + Math.random() * Math.max(20, arena.clientWidth - 56)}px`;
    spider.style.top = `${30 + Math.random() * Math.max(20, arena.clientHeight - 65)}px`;
  }
  spider?.addEventListener('click', () => {
    points++;
    if (score) score.textContent = points;
    move();
    if (points >= 7) {
      if (result) result.textContent = "MISSION COMPLETE! 🕷️❤️ You caught all of them!";
      points = 0;
      setTimeout(() => { if (score) score.textContent = 0; }, 2200);
    }
  });
  move();
  window.addEventListener('resize', move);

  document.querySelectorAll('[data-choice]').forEach(btn => btn.addEventListener('click', () => {
    const out = document.getElementById('choiceResult');
    if (!out) return;
    out.textContent = btn.dataset.choice === 'bezati'
      ? "CORRECT ANSWER. 😂❤️ Case closed."
      : "Nice attempt. But Bezati has officially been declared innocent. 😌";
  }));
})();

/* =========================================================
   V6 — BIRTHDAY SOUNDTRACK + BUTTON SOUND EFFECTS
   ========================================================= */
(() => {
  const music = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  if (!music) return;

  music.loop = true;
  music.preload = 'auto';
  music.volume = 0.42;

  let audioCtx = null;
  let unlocked = false;
  let muted = false;

  const ensureAudioContext = () => {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx?.state === 'suspended') audioCtx.resume().catch(() => {});
  };

  const startMusic = () => {
    if (muted) return;
    ensureAudioContext();
    const promise = music.play();
    if (promise && typeof promise.catch === 'function') promise.catch(() => {});
    unlocked = true;
    musicToggle?.classList.toggle('is-playing', !music.paused);
  };

  // Attempt autoplay immediately. If the browser blocks sound, the first
  // interaction (including the intro YES button) starts it automatically.
  startMusic();
  ['pointerdown', 'touchstart', 'keydown'].forEach(type => {
    document.addEventListener(type, startMusic, { once: true, passive: true });
  });

  // Make the intro's YES action explicitly unlock the soundtrack.
  document.getElementById('introYes')?.addEventListener('click', startMusic);

  musicToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    muted = !muted;
    music.muted = muted;
    if (!muted) startMusic();
    musicToggle.setAttribute('aria-pressed', String(muted));
    musicToggle.setAttribute('aria-label', muted ? 'Play birthday soundtrack' : 'Mute birthday soundtrack');
    musicToggle.textContent = muted ? '🔇' : '♫';
    musicToggle.classList.toggle('is-playing', !muted && !music.paused);
  });

  const playSfx = (kind = 'click') => {
    ensureAudioContext();
    if (!audioCtx || muted) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    osc.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
    filter.type = 'lowpass';
    filter.frequency.value = 2200;

    const settings = {
      primary: [520, 780, 0.11],
      ghost: [330, 430, 0.08],
      gift: [260, 920, 0.2],
      game: [620, 980, 0.08],
      menu: [400, 540, 0.07],
      click: [420, 620, 0.06]
    }[kind] || [420, 620, 0.06];
    const [f1, f2, dur] = settings;
    osc.type = kind === 'gift' ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(f1, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(80, f2), now + dur);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === 'gift' ? 0.08 : 0.045, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.start(now);
    osc.stop(now + dur + 0.015);
  };

  document.addEventListener('pointerdown', (event) => {
    const el = event.target.closest('button, a');
    if (!el || el.id === 'musicToggle') return;
    let kind = 'click';
    if (el.classList.contains('primary')) kind = 'primary';
    if (el.classList.contains('ghost')) kind = 'ghost';
    if (el.id === 'giftReveal') kind = 'gift';
    if (el.id === 'gameTarget' || el.id === 'gameSpider') kind = 'game';
    if (el.id === 'menuBtn') kind = 'menu';
    playSfx(kind);
  }, { passive: true });
})();

/* ===== FINAL INTRO BUTTON BEHAVIOR FIX ===== */
(() => {
  const intro = document.getElementById('introGate');
  const yes = document.getElementById('introYes');
  const no = document.getElementById('introNo');
  const reaction = document.getElementById('introReaction');
  const progress = document.querySelector('.intro-progress');
  const bar = document.querySelector('.intro-progress span');
  if (!intro || !yes || !no || !reaction) return;

  // Reserve reaction space so changing the message never shifts the YES button.
  reaction.style.minHeight = window.matchMedia('(max-width:600px)').matches ? '62px' : '42px';

  let noCount = 0;
  const messages = [
    'HOW DARE U 😭',
    'Excuse me??? That button is illegal. 😂',
    'Nice try. The surprise is still waiting. 😌',
    'Bezati... PRESS YES. 🕷️',
    'Okay fine, last chance. 😭❤️'
  ];

  yes.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    yes.style.removeProperty('transform');
    reaction.textContent = 'Okayyyy Bezati... opening your birthday universe 🕷️❤️';
    progress?.classList.add('show');
    if (bar) bar.style.width = '100%';
    setTimeout(() => intro.classList.add('hidden'), 850);
  }, true);

  no.addEventListener('click', (event) => {
    event.stopImmediatePropagation();
    noCount++;
    reaction.textContent = messages[Math.min(noCount - 1, messages.length - 1)];
    const x = Math.random() * 72 - 36;
    const y = Math.random() * 30 - 15;
    const r = Math.random() * 8 - 4;
    // Inline !important intentionally beats the mobile hover stability rule.
    no.style.setProperty('transform', `translate(${x}px, ${y}px) rotate(${r}deg)`, 'important');
    if (noCount >= 3) {
      no.textContent = 'YES, OKAY 😭';
      no.classList.remove('ghost');
      no.classList.add('primary');
    }
  }, true);
})();
