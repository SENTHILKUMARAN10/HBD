const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const menuBtn=$('#menuBtn'),mobileMenu=$('#mobileMenu');menuBtn?.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));
const toast=$('#toast');let toastTimer;function showToast(t){if(!toast)return;toast.textContent=t;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
const heroWishes=['May this new chapter be brighter than every chapter before it. ✨','May your smile always have a reason behind it. ❤️','May God bless every step you take. 🙏','More memories. More laughter. More adventures. 🎉','This year, choose happiness again and again. 💙'];let heroWi=0;$('#heroWish')?.addEventListener('click',()=>{heroWi=(heroWi+1)%heroWishes.length;showToast(heroWishes[heroWi])});
const letter=$('#letterCard');letter?.addEventListener('click',()=>{const open=letter.classList.toggle('open');letter.classList.toggle('sealed',!open);letter.setAttribute('aria-expanded',open)});
$$('.memory-card').forEach(card=>card.addEventListener('click',()=>{card.classList.toggle('flipped');card.setAttribute('aria-pressed',String(card.classList.contains('flipped')))}));
(()=>{const intro=$('#introGate'),yes=$('#introYes'),no=$('#introNo'),reaction=$('#introReaction'),progress=$('.intro-progress'),bar=$('.intro-progress span');if(!intro||!yes||!no)return;reaction.style.minHeight=matchMedia('(max-width:600px)').matches?'62px':'42px';yes.addEventListener('click',()=>{yes.style.removeProperty('transform');reaction.textContent='Okayyyy Bezati... opening your birthday universe 🕷️❤️';progress?.classList.add('show');if(bar)bar.style.width='100%';setTimeout(()=>intro.classList.add('hidden'),850)});let n=0;const msgs=['HOW DARE U 😭','Excuse me??? That button is illegal. 😂','Nice try. The surprise is still waiting. 😌','Bezati... PRESS YES. 🕷️','Okay fine, last chance. 😭❤️'];no.addEventListener('click',()=>{n++;reaction.textContent=msgs[Math.min(n-1,msgs.length-1)];const x=Math.random()*72-36,y=Math.random()*30-15,r=Math.random()*8-4;no.style.setProperty('transform',`translate(${x}px,${y}px) rotate(${r}deg)`,'important');if(n>=3){no.textContent='YES, OKAY 😭';no.classList.remove('ghost');no.classList.add('primary')}})})();
(()=>{const arena=$('#gameArena'),target=$('#gameTarget'),scoreEl=$('#score'),msg=$('#gameMessage');if(!arena||!target)return;let score=0;const move=()=>{target.style.left=Math.max(8,Math.random()*88)+'%';target.style.top=Math.max(8,Math.random()*80)+'%'};target.addEventListener('click',()=>{score++;scoreEl.textContent=score+' / 10';if(score>=10){msg.textContent='MISSION COMPLETE! 🕷️❤️ You caught enough webs! 😂❤️';target.disabled=true}else{msg.textContent='Got one! Keep going, Bezati!';move()}});move()})();
(()=>{const btn=$('#wishCardBtn'),text=$('#wishCardText');if(!btn||!text)return;const wishes=['May God fill your year with peace, laughter and beautiful surprises. ❤️','More memories, more adventures, and absolutely zero boring days. 😂','May every little dream you carry find its way to you. ✨','May your smile stay louder than every bad day. ❤️','One day you’ll look back at this year and say: wow, that was a good one. 💎','May this year bring you one surprise you never see coming. 👀❤️'];let i=-1;btn.addEventListener('click',()=>{i=(i+1)%wishes.length;text.classList.remove('wish-pop');void text.offsetWidth;text.textContent=wishes[i];text.classList.add('wish-pop');const card=btn.closest('.wish-card');card?.classList.remove('wish-popping');if(card){void card.offsetWidth;card.classList.add('wish-popping')}})})();
(()=>{const board=$('#xoxBoard'),result=$('#xoxResult'),reset=$('#xoxReset');if(!board)return;const cells=$$('#xoxBoard [data-cell]'),wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];let state=Array(9).fill(''),over=false;const winner=p=>wins.some(w=>w.every(i=>state[i]===p));const draw=()=>state.every(Boolean);function paint(){cells.forEach((c,i)=>{c.textContent=state[i];c.classList.toggle('x',state[i]==='X');c.classList.toggle('o',state[i]==='O');c.disabled=!!state[i]||over})}function finish(p){over=true;result.textContent=p==='X'?'YOU WON! Birthday bot defeated 😂❤️':p==='O'?'Birthday bot wins this round 😌🕷️':'It’s a draw — friendship wins 😂❤️';paint()}function bot(){if(over)return;const empty=state.map((v,i)=>v?'':i).filter(v=>v!=='');if(!empty.length)return;let pick=empty[Math.floor(Math.random()*empty.length)];for(const p of ['O','X']){for(const i of empty){const t=[...state];t[i]=p;if(wins.some(w=>w.every(x=>t[x]===p))){pick=i;break}}if(pick!==undefined&&(()=>{const t=[...state];t[pick]=p;return wins.some(w=>w.every(x=>t[x]===p))})())break}state[pick]='O';if(winner('O'))finish('O');else if(draw())finish('D');else{result.textContent='Your turn ✨';paint()}}cells.forEach((c,i)=>c.addEventListener('click',()=>{if(over||state[i])return;state[i]='X';paint();if(winner('X'))return finish('X');if(draw())return finish('D');result.textContent='Birthday bot is thinking... 👀';setTimeout(bot,350)}));reset?.addEventListener('click',()=>{state=Array(9).fill('');over=false;result.textContent='Your turn ✨';paint()});paint()})();
$$('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>{const out=$('#choiceResult');if(!out)return;out.textContent=btn.dataset.choice==='me'?'At least you admitted it yourself 😂❤️':'Correct. Obviously YOU. Case closed 😂❤️'}));
(()=>{const stage=$('#giftStage'),btn=$('#giftReveal'),msg=$('#giftMessage'),status=$('#giftLockStatus'),count=$('#giftCountdown');if(!btn)return;const unlock=Date.UTC(2026,7,25,18,30,0);let ready=false;function tick(){const rem=unlock-Date.now();if(rem<=0){if(!ready){ready=true;btn.disabled=false;btn.removeAttribute('aria-disabled');btn.textContent='REVEAL MY GIFT 🎁';status.innerHTML='<strong>Your birthday surprise is unlocked! 🎉</strong><span>It is officially your Diamond Birthday — reveal it. ❤️</span>'}return}const t=Math.floor(rem/1000),d=Math.floor(t/86400),h=Math.floor(t%86400/3600),m=Math.floor(t%3600/60),s=t%60;count.textContent=`Unlocks in ${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`}tick();setInterval(tick,1000);btn.addEventListener('click',()=>{if(!ready)return;const box=$('#giftBox');box?.classList.add('shaking');setTimeout(()=>box?.classList.add('opened'),420);setTimeout(()=>stage?.classList.add('revealed'),820);setTimeout(()=>msg?.classList.add('show'),1250);btn.disabled=true;btn.textContent='GIFT REVEALED ❤️';status.innerHTML='<strong>Surprise unlocked! 🎸❤️</strong><span>Your guitar is waiting for you.</span>';showToast('Surprise unlocked! 🎸❤️')})})();
(()=>{const music=$('#bgMusic'),toggle=$('#musicToggle');if(!music)return;music.loop=true;music.volume=.42;let ctx=null,muted=false;function start(){if(muted)return;music.play()?.catch?.(()=>{});toggle?.classList.toggle('is-playing',!music.paused)}['pointerdown','touchstart','keydown'].forEach(type=>document.addEventListener(type,start,{once:true,passive:true}));$('#introYes')?.addEventListener('click',start);toggle?.addEventListener('click',e=>{e.stopPropagation();muted=!muted;music.muted=muted;if(!muted)start();toggle.textContent=muted?'🔇':'♫';toggle.setAttribute('aria-pressed',String(muted))});document.addEventListener('pointerdown',e=>{const el=e.target.closest('button,a');if(!el||el.id==='musicToggle'||muted)return;const C=window.AudioContext||window.webkitAudioContext;if(!C)return;if(!ctx)ctx=new C();if(ctx.state==='suspended')ctx.resume();const o=ctx.createOscillator(),g=ctx.createGain(),now=ctx.currentTime;o.connect(g);g.connect(ctx.destination);o.frequency.setValueAtTime(440,now);o.frequency.exponentialRampToValueAtTime(650,now+.06);g.gain.setValueAtTime(.025,now);g.gain.exponentialRampToValueAtTime(.0001,now+.07);o.start(now);o.stop(now+.08)},{passive:true})})();
$$('img').forEach(img=>img.addEventListener('error',()=>{img.style.display='none'}));

(()=>{
  const ticker=$('.ticker span');
  if(ticker)ticker.textContent=ticker.textContent.replace('GUITAR','SURPRISE');

  const introYes=$('#introYes');
  introYes?.addEventListener('click',()=>{
    try{history.replaceState(null,'',location.pathname+location.search+'#home')}catch(e){location.hash='home'}
    setTimeout(()=>{const home=$('#home');if(home){home.scrollIntoView({behavior:'auto',block:'start'})}else{window.scrollTo({top:0,left:0,behavior:'auto'})}},880);
  });

  const memoryHelp=$('#memories .section-head p');
  if(memoryHelp)memoryHelp.textContent='Tap any quote to flip it and reveal the memory. ❤️';
  $$('.memory-card').forEach(card=>{
    card.classList.add('flipped');
    card.setAttribute('aria-pressed','true');
    const quoteSide=card.querySelector('.memory-back');
    const photoSide=card.querySelector('.memory-front');
    quoteSide?.querySelector('em')?.replaceChildren(document.createTextNode('Tap to reveal the memory ❤️'));
    if(photoSide){let hint=photoSide.querySelector('.memory-photo-hint');if(!hint){hint=document.createElement('small');hint.className='memory-photo-hint';hint.textContent='Tap again for the quote';photoSide.appendChild(hint)}}
  });

  const activityGrid=$('.activity-grid');
  if(activityGrid&&!$('#lesbianQuestion')){
    const card=document.createElement('article');
    card.className='activity-card choice-card funny-question-card';
    card.id='lesbianQuestion';
    card.innerHTML='<div class="activity-icon">🏳️‍🌈😂</div><h3>ANOTHER IMPORTANT QUESTION</h3><p>I know you’re lesbian, right? 👀😂</p><div class="choice-buttons"><button class="btn ghost" type="button" data-lesbian-choice="yes">YES 😌</button><button class="btn primary" type="button" data-lesbian-choice="no">NO 😂</button></div><div class="choice-result" id="lesbianChoiceResult" aria-live="polite"></div>';
    activityGrid.appendChild(card);
    card.querySelectorAll('[data-lesbian-choice]').forEach(btn=>btn.addEventListener('click',()=>{const out=$('#lesbianChoiceResult');if(!out)return;out.textContent=btn.dataset.lesbianChoice==='yes'?'AHA! Finally admitted it 😂📸 Evidence saved in the Bezati archives!':'Hmmmm… suspicious. The lie detector says: BEEP BEEP BEEP 😂🚨';card.classList.remove('question-pop');void card.offsetWidth;card.classList.add('question-pop')}));
  }

  const finalParas=$$('.final-copy p');
  const guitarReminder=finalParas.find(p=>p.textContent.toLowerCase().includes('guitar song'));
  if(guitarReminder){guitarReminder.classList.add('post-gift-reminder');guitarReminder.hidden=true}
  $('#giftReveal')?.addEventListener('click',()=>{const unlock=Date.UTC(2026,7,25,18,30,0);if(Date.now()<unlock)return;if(guitarReminder){guitarReminder.hidden=false;guitarReminder.classList.add('revealed-reminder')}});
})();

// Audit Desk launch card on the birthday page.
(()=>{
  if($('#auditDeskLaunch'))return;
  const gift=$('#gift');
  if(!gift)return;
  const style=document.createElement('style');
  style.textContent=`.audit-desk-launch{padding:70px 20px;display:flex;justify-content:center}.audit-desk-card{width:min(860px,100%);padding:34px;border:1px solid rgba(255,255,255,.12);border-radius:26px;background:linear-gradient(135deg,rgba(10,25,45,.96),rgba(17,30,61,.96));box-shadow:0 24px 60px rgba(0,0,0,.28);text-align:center}.audit-desk-card .audit-icon{font-size:42px;margin-bottom:10px}.audit-desk-card h2{margin:8px 0 10px;font-size:clamp(28px,5vw,48px)}.audit-desk-card h2 span{color:#72dfff}.audit-desk-card p{max-width:650px;margin:0 auto 22px;color:#b8c9db;line-height:1.7}.audit-desk-card .btn{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;min-width:250px}@media(max-width:600px){.audit-desk-launch{padding:45px 15px}.audit-desk-card{padding:24px 18px}.audit-desk-card .btn{width:100%;min-width:0}}`;
  document.head.appendChild(style);
  const section=document.createElement('section');
  section.className='audit-desk-launch';
  section.id='auditDeskLaunch';
  section.innerHTML=`<div class="audit-desk-card"><div class="audit-icon">💼</div><div class="eyebrow">A LITTLE DESK FOR AFTER THE BIRTHDAY</div><h2>Bezati's <span>Audit Desk</span></h2><p>Your own tiny work corner with GST, TDS, variance and date tools — made so this birthday website can stay useful even after today. 😌💗</p><a class="btn primary" href="audit.html">OPEN AUDIT DESK →</a></div>`;
  gift.parentNode.insertBefore(section,gift);
})();

// Final surprise: responsive Spotify-inspired birthday song player.
(()=>{
  if($('#lastSurprise'))return;
  const finalSection=$('.final-section');
  const giftSection=$('#gift');
  if(!giftSection||!finalSection)return;

  const section=document.createElement('section');
  section.className='section song-surprise-section';
  section.id='lastSurprise';
  section.innerHTML=`
    <div class="song-ambient" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="song-surprise-shell">
      <div class="song-pre-reveal" id="songPreReveal">
        <div class="song-pre-icon" aria-hidden="true">🎧</div>
        <div class="eyebrow">OKAY... ONE LAST SURPRISE ❤️</div>
        <h2>Bezati, headphones <span>on.</span></h2>
        <p>Okay Bezati… now take your headphones, get comfortable, and be ready for the emotional part. 🥹🎧❤️</p>
        <p class="song-pre-small">No skipping. No laughing at me. Just listen till the end. 😌💗</p>
        <button class="btn song-reveal-btn" id="songRevealBtn" type="button">I'M READY 🎧❤️</button>
      </div>

      <div class="song-reveal-content" id="songRevealContent" hidden>
        <div class="song-heading-wrap">
          <div class="eyebrow">THE REAL FINAL SURPRISE 🎵</div>
          <h2>This is only made for you by purely <span>SK 💗😌</span></h2>
          <p>I couldn't fit every memory and every feeling into a normal birthday wish… so I turned a little piece of it into a song for you. ❤️</p>
        </div>

        <div class="spotify-player" id="bezatiPlayer">
          <div class="player-glow" aria-hidden="true"></div>
          <div class="player-art-wrap">
            <img class="player-cover" src="assets/song/happy-birthday-bezati-cover.png" alt="Happy Birthday Bezatiiiii song cover" loading="lazy">
            <div class="player-equalizer" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
          </div>

          <div class="player-body">
            <div class="player-topline"><span>FOR YOU, ALWAYS 💗</span><button class="player-heart" type="button" aria-label="Love this song" aria-pressed="true">♥</button></div>
            <div class="player-meta">
              <h3>Happy Birthday Bezatiiiii ❤️</h3>
              <p>Birthday Wish Song • SK</p>
            </div>

            <audio id="bezatiSong" src="assets/audio/happy-birthday-bezati.mp3" preload="metadata"></audio>

            <div class="player-progress-wrap">
              <input class="player-progress" id="songProgress" type="range" min="0" max="406" value="0" step="0.01" aria-label="Song progress">
              <div class="player-times"><span id="songCurrentTime">0:00</span><span id="songDuration">6:46</span></div>
            </div>

            <div class="player-controls" aria-label="Music controls">
              <button class="player-skip" id="songBack" type="button" aria-label="Back 10 seconds">↶<small>10</small></button>
              <button class="player-play" id="songPlay" type="button" aria-label="Play birthday song" aria-pressed="false"><span class="play-icon">▶</span></button>
              <button class="player-skip" id="songForward" type="button" aria-label="Forward 10 seconds">↷<small>10</small></button>
            </div>

            <div class="player-volume-row">
              <span aria-hidden="true">🔈</span>
              <input class="player-volume" id="songVolume" type="range" min="0" max="1" value="0.85" step="0.01" aria-label="Song volume">
              <span aria-hidden="true">🔊</span>
            </div>
          </div>
        </div>

        <div class="song-after-note" id="songAfterNote" hidden>
          <span>💗</span>
          <p>Happy Birthday, Bezati. Some memories become stories… and some memories become songs. This one is yours. 😌❤️</p>
        </div>
      </div>
    </div>`;
  finalSection.parentNode.insertBefore(section,finalSection);

  const revealBtn=$('#songRevealBtn'),pre=$('#songPreReveal'),content=$('#songRevealContent');
  const song=$('#bezatiSong'),play=$('#songPlay'),progress=$('#songProgress'),current=$('#songCurrentTime'),duration=$('#songDuration'),volume=$('#songVolume');
  const back=$('#songBack'),forward=$('#songForward'),player=$('#bezatiPlayer'),after=$('#songAfterNote'),bg=$('#bgMusic'),bgToggle=$('#musicToggle');
  let revealed=false;

  const formatTime=seconds=>{if(!Number.isFinite(seconds)||seconds<0)return'0:00';const m=Math.floor(seconds/60),s=Math.floor(seconds%60);return`${m}:${String(s).padStart(2,'0')}`};
  const setProgressFill=()=>{const max=Number(progress.max)||406,value=Number(progress.value)||0;progress.style.setProperty('--progress',`${Math.max(0,Math.min(100,value/max*100))}%`)};
  const setVolumeFill=()=>volume.style.setProperty('--volume',`${Math.round(Number(volume.value)*100)}%`);

  revealBtn?.addEventListener('click',()=>{
    revealed=true;
    pre?.classList.add('is-leaving');
    setTimeout(()=>{
      if(pre)pre.hidden=true;
      if(content){content.hidden=false;requestAnimationFrame(()=>content.classList.add('is-visible'))}
      section.scrollIntoView({behavior:'smooth',block:'start'});
    },360);
  });

  function setPlayingUI(isPlaying){
    player?.classList.toggle('is-playing',isPlaying);
    play?.setAttribute('aria-pressed',String(isPlaying));
    play?.setAttribute('aria-label',isPlaying?'Pause birthday song':'Play birthday song');
    const icon=play?.querySelector('.play-icon');if(icon)icon.textContent=isPlaying?'Ⅱ':'▶';
  }

  async function startSong(){
    if(!song)return;
    if(bg&&!bg.paused)bg.pause();
    bgToggle?.classList.remove('is-playing');
    try{await song.play();setPlayingUI(true)}catch(e){showToast('Tap play once more to start the song 🎧❤️')}
  }

  play?.addEventListener('click',()=>{if(!song)return;if(song.paused)startSong();else{song.pause();setPlayingUI(false)}});
  back?.addEventListener('click',()=>{if(song)song.currentTime=Math.max(0,song.currentTime-10)});
  forward?.addEventListener('click',()=>{if(song)song.currentTime=Math.min(song.duration||406,song.currentTime+10)});

  song?.addEventListener('loadedmetadata',()=>{const d=Number.isFinite(song.duration)?song.duration:406;progress.max=d;duration.textContent=formatTime(d);setProgressFill()});
  song?.addEventListener('timeupdate',()=>{if(!progress.matches(':active'))progress.value=song.currentTime||0;current.textContent=formatTime(song.currentTime);setProgressFill()});
  song?.addEventListener('play',()=>{if(bg&&!bg.paused)bg.pause();setPlayingUI(true)});
  song?.addEventListener('pause',()=>setPlayingUI(false));
  song?.addEventListener('ended',()=>{setPlayingUI(false);progress.value=progress.max;setProgressFill();if(after){after.hidden=false;requestAnimationFrame(()=>after.classList.add('show'))}});
  song?.addEventListener('error',()=>showToast('The birthday song file is not available yet. ❤️'));

  progress?.addEventListener('input',()=>{if(song)song.currentTime=Number(progress.value);current.textContent=formatTime(Number(progress.value));setProgressFill()});
  volume?.addEventListener('input',()=>{if(song)song.volume=Number(volume.value);setVolumeFill()});
  if(song)song.volume=.85;setProgressFill();setVolumeFill();

  document.addEventListener('play',e=>{if(e.target===song&&bg&&!bg.paused)bg.pause()},true);
  section.addEventListener('pointerdown',e=>e.stopPropagation());
})();

// Birthday-site-only multiverse theme switch: Spider-Verse <-> Wizarding World.
(()=>{
  if(document.body.dataset.universeReady)return;
  document.body.dataset.universeReady='1';

  const css=document.createElement('style');
  css.id='universeThemeStyles';
  css.textContent=`
  .universe-toggle{position:fixed;right:74px;top:18px;z-index:10020;border:1px solid rgba(255,255,255,.18);background:rgba(7,15,28,.86);color:#fff;border-radius:999px;padding:10px 14px;font:800 12px/1 Quicksand,system-ui,sans-serif;letter-spacing:.05em;cursor:pointer;box-shadow:0 12px 30px rgba(0,0,0,.28);backdrop-filter:blur(12px);transition:.3s ease;display:flex;align-items:center;gap:8px}.universe-toggle:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.35)}.universe-toggle .u-icon{font-size:16px}.intro-gate:not(.hidden)~.universe-toggle{opacity:0;pointer-events:none}.wizard-world-layer{position:fixed;inset:0;z-index:1;pointer-events:none;overflow:hidden;opacity:0;visibility:hidden;transition:opacity .65s ease,visibility .65s ease}.wizard-stars{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,224,142,.65) 0 1px,transparent 1.8px);background-size:58px 58px;opacity:.42;animation:wizStarDrift 24s linear infinite}.wizard-moon{position:absolute;right:8vw;top:13vh;width:clamp(90px,11vw,160px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff3be 0 12%,#e8cb73 42%,#9d772a 100%);box-shadow:0 0 55px rgba(255,213,112,.38)}.wizard-castle{position:absolute;left:50%;bottom:-4px;transform:translateX(-50%);width:min(980px,92vw);height:230px;filter:drop-shadow(0 -10px 34px rgba(255,184,67,.08))}.wizard-castle:before{content:"";position:absolute;left:5%;right:5%;bottom:0;height:90px;background:#090908;clip-path:polygon(0 100%,0 66%,5% 66%,5% 48%,10% 48%,10% 18%,13% 18%,15% 0,17% 18%,20% 18%,20% 70%,25% 70%,25% 43%,30% 43%,30% 10%,33% 10%,35% 0,37% 10%,40% 10%,40% 74%,47% 74%,47% 38%,52% 38%,52% 5%,55% 5%,57% 0,59% 5%,62% 5%,62% 67%,70% 67%,70% 30%,75% 30%,75% 9%,78% 9%,80% 0,82% 9%,85% 9%,85% 66%,92% 66%,92% 42%,96% 42%,96% 70%,100% 70%,100% 100%)}.wizard-castle:after{content:"";position:absolute;left:8%;right:8%;bottom:8px;height:48px;background:repeating-linear-gradient(90deg,transparent 0 44px,rgba(255,199,83,.38) 45px 48px,transparent 49px 72px);opacity:.32}.floating-candle{position:absolute;width:7px;height:54px;border-radius:4px;background:linear-gradient(#fff8d0,#d9bd7c 65%,#735923);box-shadow:0 0 14px rgba(255,223,132,.24);animation:candleFloat 5s ease-in-out infinite}.floating-candle:before{content:"";position:absolute;left:50%;top:-17px;transform:translateX(-50%);width:9px;height:16px;border-radius:50% 50% 45% 45%;background:radial-gradient(circle,#fff8ca 0 25%,#ffb638 50%,rgba(255,122,0,.3) 72%,transparent 75%);filter:drop-shadow(0 0 8px #ffbd48)}.floating-candle.c1{left:12%;top:23%;animation-delay:.4s}.floating-candle.c2{left:26%;top:12%;animation-delay:1.8s}.floating-candle.c3{right:23%;top:27%;animation-delay:1s}.floating-candle.c4{right:9%;top:39%;animation-delay:2.2s}.floating-candle.c5{left:43%;top:9%;animation-delay:2.8s}.golden-snitch{position:absolute;left:17%;top:31%;width:56px;height:56px;border-radius:50%;background:radial-gradient(circle at 34% 28%,#fff5b9 0 8%,#ffd862 20%,#ad7414 60%,#5a3504 100%);box-shadow:0 0 28px rgba(255,208,83,.52),inset -8px -10px 16px rgba(75,36,0,.34);animation:snitchFly 8s ease-in-out infinite}.golden-snitch:before,.golden-snitch:after{content:"";position:absolute;top:13px;width:88px;height:30px;border:2px solid rgba(255,240,183,.78);border-bottom:0;background:linear-gradient(180deg,rgba(255,249,219,.32),transparent);clip-path:polygon(0 48%,100% 0,86% 100%,10% 78%)}.golden-snitch:before{right:42px;transform:rotate(10deg)}.golden-snitch:after{left:42px;transform:scaleX(-1) rotate(10deg)}.wand-trail{position:absolute;right:14%;top:29%;width:280px;height:150px;border-top:3px solid rgba(255,220,118,.72);border-radius:50%;transform:rotate(-18deg);filter:drop-shadow(0 0 8px rgba(255,208,89,.8));animation:wandPulse 3.6s ease-in-out infinite}.wand-trail:after{content:"✦";position:absolute;right:-3px;top:-15px;color:#ffe89a;font-size:30px;text-shadow:0 0 18px #ffd35c}.wizard-hero-orb{display:none;position:absolute;left:clamp(18px,10vw,140px);top:50%;transform:translateY(-50%);width:clamp(180px,30vw,410px);aspect-ratio:1;z-index:2;pointer-events:none}.wizard-hero-orb .orb-ring{position:absolute;inset:12%;border:1px solid rgba(255,213,112,.35);border-radius:50%;box-shadow:0 0 50px rgba(255,180,53,.18),inset 0 0 60px rgba(255,196,65,.08);animation:orbSpin 14s linear infinite}.wizard-hero-orb .orb-mark{position:absolute;inset:0;display:grid;place-items:center;font-size:clamp(72px,10vw,150px);filter:drop-shadow(0 18px 28px rgba(0,0,0,.45));animation:orbFloat 4s ease-in-out infinite}.wizard-hero-orb .orb-spark{position:absolute;color:#ffd866;text-shadow:0 0 14px #ffc33a;animation:sparkBlink 2s ease-in-out infinite}.wizard-hero-orb .s1{left:10%;top:17%}.wizard-hero-orb .s2{right:8%;top:28%;animation-delay:.7s}.wizard-hero-orb .s3{left:28%;bottom:7%;animation-delay:1.2s}
  body.wizard-theme{background:#0b0906!important;background-image:radial-gradient(circle at 16% 18%,rgba(138,86,19,.22),transparent 30%),radial-gradient(circle at 82% 42%,rgba(190,132,38,.12),transparent 28%),linear-gradient(180deg,#0a0806,#120d08 45%,#090706)!important;color:#f8efd8}body.wizard-theme:after{background:radial-gradient(circle,rgba(255,219,133,.14) 0 1px,transparent 2px) 0 0/52px 52px!important;opacity:.8}body.wizard-theme .wizard-world-layer{opacity:1;visibility:visible}body.wizard-theme .spider-verse-art,body.wizard-theme .site-web-decoration,body.wizard-theme .hero-web-bg,body.wizard-theme .hero-spidey-3d,body.wizard-theme .intro-spidey{opacity:0!important;visibility:hidden!important;pointer-events:none!important}body.wizard-theme .wizard-hero-orb{display:block}body.wizard-theme .site-header{background:rgba(20,14,8,.76)!important;border-color:rgba(224,178,79,.2)!important}body.wizard-theme .site-header a,body.wizard-theme .brand{color:#f7e8bd!important}body.wizard-theme .hero{background:radial-gradient(circle at 18% 42%,rgba(184,121,26,.18),transparent 29%),radial-gradient(circle at 82% 28%,rgba(255,213,112,.10),transparent 34%)!important}body.wizard-theme .hero h1,body.wizard-theme .section-head h2,body.wizard-theme .diamond-copy h2,body.wizard-theme .gift-copy h2,body.wizard-theme .game-card h2,body.wizard-theme .final-copy h2,body.wizard-theme .song-pre-reveal h2,body.wizard-theme .song-heading-wrap h2{font-family:Georgia,'Times New Roman',serif!important;letter-spacing:.01em}body.wizard-theme .hero h1 span,body.wizard-theme h2 span,body.wizard-theme .diamond-label,body.wizard-theme .eyebrow{color:#e8bd5d!important}body.wizard-theme .btn.primary{background:linear-gradient(135deg,#d7a834,#f2d87b)!important;color:#201407!important;box-shadow:0 12px 32px rgba(213,166,52,.18)!important}body.wizard-theme .btn.ghost{border-color:rgba(231,194,111,.34)!important;background:rgba(48,31,13,.32)!important;color:#f4e2b5!important}body.wizard-theme .ticker{background:rgba(31,20,10,.78)!important;color:#e8c879!important}body.wizard-theme .memory-back{background:radial-gradient(circle at 50% 18%,rgba(199,149,51,.24),transparent 42%),linear-gradient(145deg,#2b1d0d,#0f0b07)!important}body.wizard-theme .memory-back:before{content:'✦';color:#e4bd60!important}body.wizard-theme .blessing-card,body.wizard-theme .game-card,body.wizard-theme .activity-card,body.wizard-theme .gift-message,body.wizard-theme .letter-card{background-color:rgba(29,19,10,.82)!important;border-color:rgba(230,190,102,.15)!important}body.wizard-theme .diamond-image{filter:sepia(.35) saturate(1.25) hue-rotate(350deg) drop-shadow(0 0 24px rgba(226,177,71,.28))}body.wizard-theme .audit-desk-card{background:linear-gradient(135deg,rgba(39,25,12,.96),rgba(20,14,9,.96))!important;border-color:rgba(232,194,111,.2)!important}body.wizard-theme .audit-desk-card h2 span{color:#e3ba5c!important}body.wizard-theme .song-surprise-section{background:radial-gradient(circle at 50% 0,rgba(205,151,48,.14),transparent 34%),#090704!important}body.wizard-theme .song-pre-reveal{background:linear-gradient(180deg,rgba(48,31,15,.9),rgba(15,11,7,.94))!important;border-color:rgba(230,193,105,.16)!important}body.wizard-theme .spotify-player{background:linear-gradient(145deg,rgba(39,29,18,.98),rgba(11,9,7,.99))!important;border-color:rgba(232,197,119,.12)!important}body.wizard-theme .universe-toggle{background:rgba(37,24,11,.9);border-color:rgba(232,193,102,.28);color:#f5e4b7}body.wizard-theme .intro-card{background:linear-gradient(180deg,rgba(41,27,13,.94),rgba(15,10,6,.96))!important;border-color:rgba(231,192,102,.2)!important}body.wizard-theme .intro-webs{opacity:0!important}body.wizard-theme footer{color:#d7bf88!important}
  .universe-flash{position:fixed;inset:0;z-index:10050;pointer-events:none;background:radial-gradient(circle,#fff8c6 0 4%,#e7b64b 15%,rgba(88,49,10,.45) 38%,transparent 68%);opacity:0;transform:scale(.6);animation:universeFlash .7s ease-out both}@keyframes universeFlash{0%{opacity:0;transform:scale(.4)}35%{opacity:.95}100%{opacity:0;transform:scale(1.8)}}@keyframes wizStarDrift{to{transform:translate3d(45px,60px,0)}}@keyframes candleFloat{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-18px) rotate(2deg)}}@keyframes snitchFly{0%,100%{transform:translate(0,0) rotate(-4deg)}25%{transform:translate(75px,-32px) rotate(4deg)}55%{transform:translate(150px,26px) rotate(-2deg)}80%{transform:translate(55px,48px) rotate(3deg)}}@keyframes wandPulse{50%{opacity:.45;transform:rotate(-18deg) scale(1.05)}}@keyframes orbSpin{to{transform:rotate(360deg)}}@keyframes orbFloat{50%{transform:translateY(-10px) rotate(3deg)}}@keyframes sparkBlink{50%{opacity:.35;transform:scale(.7)}}
  @media(max-width:900px){.universe-toggle{right:70px;top:12px;padding:9px 11px}.universe-toggle .u-label{display:none}.wizard-hero-orb{left:12px;top:34%;width:170px;opacity:.65}.golden-snitch{left:10%;top:25%}.wizard-castle{height:180px}.floating-candle.c5{display:none}}@media(max-width:600px){.universe-toggle{right:62px;top:10px}.wizard-hero-orb{display:none!important}.wizard-moon{right:-20px;top:16vh;width:100px}.golden-snitch{width:40px;height:40px;left:9%;top:23%}.golden-snitch:before,.golden-snitch:after{width:56px;height:22px;top:9px}.golden-snitch:before{right:30px}.golden-snitch:after{left:30px}.wand-trail{width:170px;right:7%;top:31%}.floating-candle{transform:scale(.78)}.wizard-castle{width:120vw;height:130px;opacity:.72}}@media(prefers-reduced-motion:reduce){.wizard-stars,.floating-candle,.golden-snitch,.wand-trail,.orb-ring,.orb-mark,.orb-spark{animation:none!important}}
  `;
  document.head.appendChild(css);

  const wizardLayer=document.createElement('div');
  wizardLayer.className='wizard-world-layer';
  wizardLayer.setAttribute('aria-hidden','true');
  wizardLayer.innerHTML='<div class="wizard-stars"></div><div class="wizard-moon"></div><div class="wizard-castle"></div><i class="floating-candle c1"></i><i class="floating-candle c2"></i><i class="floating-candle c3"></i><i class="floating-candle c4"></i><i class="floating-candle c5"></i><div class="golden-snitch"></div><div class="wand-trail"></div>';
  document.body.appendChild(wizardLayer);

  const hero=$('#home');
  if(hero){const orb=document.createElement('div');orb.className='wizard-hero-orb';orb.setAttribute('aria-hidden','true');orb.innerHTML='<div class="orb-ring"></div><div class="orb-mark">⚡</div><span class="orb-spark s1">✦</span><span class="orb-spark s2">✧</span><span class="orb-spark s3">✦</span>';hero.appendChild(orb)}

  const toggle=document.createElement('button');
  toggle.type='button';toggle.className='universe-toggle';toggle.id='universeToggle';
  toggle.setAttribute('aria-label','Switch between Spider-Verse and Wizarding World themes');
  document.body.appendChild(toggle);

  function setUniverse(mode,announce=false){
    const wizard=mode==='wizard';
    document.body.classList.toggle('wizard-theme',wizard);
    document.documentElement.style.colorScheme='dark';
    toggle.innerHTML=wizard?'<span class="u-icon">🕷️</span><span class="u-label">SPIDER-VERSE MODE</span>':'<span class="u-icon">⚡</span><span class="u-label">WIZARDING WORLD</span>';
    toggle.setAttribute('aria-pressed',String(wizard));
    try{localStorage.setItem('bezatiUniverse',wizard?'wizard':'spider')}catch(e){}
    const reaction=$('#introReaction');if(reaction&&wizard&&!$('.intro-gate')?.classList.contains('hidden'))reaction.textContent='A little magic is waiting too... ✨';
    if(announce){const flash=document.createElement('div');flash.className='universe-flash';document.body.appendChild(flash);setTimeout(()=>flash.remove(),750);showToast(wizard?'⚡ Welcome to the Wizarding World, Bezati ✨':'🕷️ Back to the Spider-Verse, Bezati ❤️')}
  }

  let saved='spider';try{saved=localStorage.getItem('bezatiUniverse')||'spider'}catch(e){}
  setUniverse(saved,false);
  toggle.addEventListener('click',()=>setUniverse(document.body.classList.contains('wizard-theme')?'spider':'wizard',true));
})();