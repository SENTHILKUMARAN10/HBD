const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const menuBtn=$('#menuBtn'),mobileMenu=$('#mobileMenu');menuBtn?.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));
const toast=$('#toast');let toastTimer;function showToast(t){if(!toast)return;toast.textContent=t;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
const heroWishes=['May this new chapter be brighter than every chapter before it. ✨','May your smile always have a reason behind it. ❤️','May God bless every step you take. 🙏','More memories. More laughter. More adventures. 🎉','This year, choose happiness again and again. 💙'];let heroWi=0;$('#heroWish')?.addEventListener('click',()=>{heroWi=(heroWi+1)%heroWishes.length;showToast(heroWishes[heroWi])});
const letter=$('#letterCard');letter?.addEventListener('click',()=>{const open=letter.classList.toggle('open');letter.classList.toggle('sealed',!open);letter.setAttribute('aria-expanded',open)});
// Memory cards flip in place. This replaces the old lightbox behavior.
$$('.memory-card').forEach(card=>card.addEventListener('click',()=>{card.classList.toggle('flipped');card.setAttribute('aria-pressed',String(card.classList.contains('flipped')))}));
// Intro: YES stays fixed; NO playfully moves.
(()=>{const intro=$('#introGate'),yes=$('#introYes'),no=$('#introNo'),reaction=$('#introReaction'),progress=$('.intro-progress'),bar=$('.intro-progress span');if(!intro||!yes||!no)return;reaction.style.minHeight=matchMedia('(max-width:600px)').matches?'62px':'42px';yes.addEventListener('click',()=>{yes.style.removeProperty('transform');reaction.textContent='Okayyyy Bezati... opening your birthday universe 🕷️❤️';progress?.classList.add('show');if(bar)bar.style.width='100%';setTimeout(()=>intro.classList.add('hidden'),850)});let n=0;const msgs=['HOW DARE U 😭','Excuse me??? That button is illegal. 😂','Nice try. The surprise is still waiting. 😌','Bezati... PRESS YES. 🕷️','Okay fine, last chance. 😭❤️'];no.addEventListener('click',()=>{n++;reaction.textContent=msgs[Math.min(n-1,msgs.length-1)];const x=Math.random()*72-36,y=Math.random()*30-15,r=Math.random()*8-4;no.style.setProperty('transform',`translate(${x}px,${y}px) rotate(${r}deg)`,'important');if(n>=3){no.textContent='YES, OKAY 😭';no.classList.remove('ghost');no.classList.add('primary')}})})();
// Catch-the-web game (single catch game retained).
(()=>{const arena=$('#gameArena'),target=$('#gameTarget'),scoreEl=$('#score'),msg=$('#gameMessage');if(!arena||!target)return;let score=0;const move=()=>{target.style.left=Math.max(8,Math.random()*88)+'%';target.style.top=Math.max(8,Math.random()*80)+'%'};target.addEventListener('click',()=>{score++;scoreEl.textContent=score+' / 10';if(score>=10){msg.textContent='MISSION COMPLETE! 🕷️❤️ You caught enough webs! 😂❤️';target.disabled=true}else{msg.textContent='Got one! Keep going, Bezati!';move()}});move()})();
// Birthday wishes card.
(()=>{const btn=$('#wishCardBtn'),text=$('#wishCardText');if(!btn||!text)return;const wishes=['May God fill your year with peace, laughter and beautiful surprises. ❤️','More memories, more adventures, and absolutely zero boring days. 😂','May every little dream you carry find its way to you. ✨','May your smile stay louder than every bad day. ❤️','One day you’ll look back at this year and say: wow, that was a good one. 💎','May your guitar skills become dangerous enough that I finally get my song. 🎸😂'];let i=-1;btn.addEventListener('click',()=>{i=(i+1)%wishes.length;text.classList.remove('wish-pop');void text.offsetWidth;text.textContent=wishes[i];text.classList.add('wish-pop');const card=btn.closest('.wish-card');card?.classList.remove('wish-popping');if(card){void card.offsetWidth;card.classList.add('wish-popping')}})})();
// XOX / Tic-Tac-Toe: visitor is X, birthday bot is O.
(()=>{const board=$('#xoxBoard'),result=$('#xoxResult'),reset=$('#xoxReset');if(!board)return;const cells=$$('#xoxBoard [data-cell]'),wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];let state=Array(9).fill(''),over=false;const winner=p=>wins.some(w=>w.every(i=>state[i]===p));const draw=()=>state.every(Boolean);function paint(){cells.forEach((c,i)=>{c.textContent=state[i];c.classList.toggle('x',state[i]==='X');c.classList.toggle('o',state[i]==='O');c.disabled=!!state[i]||over})}function finish(p){over=true;result.textContent=p==='X'?'YOU WON! Birthday bot defeated 😂❤️':p==='O'?'Birthday bot wins this round 😌🕷️':'It’s a draw — friendship wins 😂❤️';paint()}function bot(){if(over)return;const empty=state.map((v,i)=>v?'':i).filter(v=>v!=='');if(!empty.length)return;let pick=empty[Math.floor(Math.random()*empty.length)];for(const p of ['O','X']){for(const i of empty){const t=[...state];t[i]=p;if(wins.some(w=>w.every(x=>t[x]===p))){pick=i;break}}if(pick!==undefined&&(()=>{const t=[...state];t[pick]=p;return wins.some(w=>w.every(x=>t[x]===p))})())break}state[pick]='O';if(winner('O'))finish('O');else if(draw())finish('D');else{result.textContent='Your turn ✨';paint()}}cells.forEach((c,i)=>c.addEventListener('click',()=>{if(over||state[i])return;state[i]='X';paint();if(winner('X'))return finish('X');if(draw())return finish('D');result.textContent='Birthday bot is thinking... 👀';setTimeout(bot,350)}));reset?.addEventListener('click',()=>{state=Array(9).fill('');over=false;result.textContent='Your turn ✨';paint()});paint()})();
$$('[data-choice]').forEach(btn=>btn.addEventListener('click',()=>{const out=$('#choiceResult');if(!out)return;out.textContent=btn.dataset.choice==='me'?'At least you admitted it yourself 😂❤️':'Correct. Obviously YOU. Case closed 😂❤️'}));
// Gift lock: 26 Aug 2026, 12:00 AM IST.
(()=>{const stage=$('#giftStage'),btn=$('#giftReveal'),msg=$('#giftMessage'),status=$('#giftLockStatus'),count=$('#giftCountdown');if(!btn)return;const unlock=Date.UTC(2026,7,25,18,30,0);let ready=false;function tick(){const rem=unlock-Date.now();if(rem<=0){if(!ready){ready=true;btn.disabled=false;btn.removeAttribute('aria-disabled');btn.textContent='REVEAL MY GIFT 🎁';status.innerHTML='<strong>Your birthday surprise is unlocked! 🎉</strong><span>It is officially your Diamond Birthday — reveal it. ❤️</span>'}return}const t=Math.floor(rem/1000),d=Math.floor(t/86400),h=Math.floor(t%86400/3600),m=Math.floor(t%3600/60),s=t%60;count.textContent=`Unlocks in ${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`}tick();setInterval(tick,1000);btn.addEventListener('click',()=>{if(!ready)return;const box=$('#giftBox');box?.classList.add('shaking');setTimeout(()=>box?.classList.add('opened'),420);setTimeout(()=>stage?.classList.add('revealed'),820);setTimeout(()=>msg?.classList.add('show'),1250);btn.disabled=true;btn.textContent='GIFT REVEALED ❤️';status.innerHTML='<strong>Surprise unlocked! 🎸❤️</strong><span>Your guitar is waiting for you.</span>';showToast('Surprise unlocked! 🎸❤️')})})();
// Music and lightweight button sounds.
(()=>{const music=$('#bgMusic'),toggle=$('#musicToggle');if(!music)return;music.loop=true;music.volume=.42;let ctx=null,muted=false;function start(){if(muted)return;music.play()?.catch?.(()=>{});toggle?.classList.toggle('is-playing',!music.paused)}['pointerdown','touchstart','keydown'].forEach(type=>document.addEventListener(type,start,{once:true,passive:true}));$('#introYes')?.addEventListener('click',start);toggle?.addEventListener('click',e=>{e.stopPropagation();muted=!muted;music.muted=muted;if(!muted)start();toggle.textContent=muted?'🔇':'♫';toggle.setAttribute('aria-pressed',String(muted))});document.addEventListener('pointerdown',e=>{const el=e.target.closest('button,a');if(!el||el.id==='musicToggle'||muted)return;const C=window.AudioContext||window.webkitAudioContext;if(!C)return;if(!ctx)ctx=new C();if(ctx.state==='suspended')ctx.resume();const o=ctx.createOscillator(),g=ctx.createGain(),now=ctx.currentTime;o.connect(g);g.connect(ctx.destination);o.frequency.setValueAtTime(440,now);o.frequency.exponentialRampToValueAtTime(650,now+.06);g.gain.setValueAtTime(.025,now);g.gain.exponentialRampToValueAtTime(.0001,now+.07);o.start(now);o.stop(now+.08)},{passive:true})})();
$$('img').forEach(img=>img.addEventListener('error',()=>{img.style.display='none'}));

// 2026-08-24 birthday-flow fixes and additions.
(()=>{
  const introYes=$('#introYes');
  introYes?.addEventListener('click',()=>{
    // Always enter at the HOME/header area even when the URL previously had #memories.
    try{history.replaceState(null,'',location.pathname+location.search+'#home')}catch(e){location.hash='home'}
    setTimeout(()=>{
      const home=$('#home');
      if(home){home.scrollIntoView({behavior:'auto',block:'start'})}else{window.scrollTo({top:0,left:0,behavior:'auto'})}
    },880);
  });

  // Memory cards now begin with the quote and flip to the photograph.
  const memoryHelp=$('#memories .section-head p');
  if(memoryHelp)memoryHelp.textContent='Tap any quote to flip it and reveal the memory. ❤️';
  $$('.memory-card').forEach(card=>{
    card.setAttribute('aria-pressed','false');
    const quoteSide=card.querySelector('.memory-back');
    const photoSide=card.querySelector('.memory-front');
    quoteSide?.querySelector('em')?.replaceChildren(document.createTextNode('Tap to reveal the memory ❤️'));
    if(photoSide){
      let hint=photoSide.querySelector('.memory-photo-hint');
      if(!hint){hint=document.createElement('small');hint.className='memory-photo-hint';hint.textContent='Tap again for the quote';photoSide.appendChild(hint)}
    }
  });

  // Add a second playful "important question" card without changing the existing arcade.
  const activityGrid=$('.activity-grid');
  if(activityGrid&&!$('#lesbianQuestion')){
    const card=document.createElement('article');
    card.className='activity-card choice-card funny-question-card';
    card.id='lesbianQuestion';
    card.innerHTML='<div class="activity-icon">🏳️‍🌈😂</div><h3>ANOTHER IMPORTANT QUESTION</h3><p>I know you’re lesbian, right? 👀😂</p><div class="choice-buttons"><button class="btn ghost" type="button" data-lesbian-choice="yes">YES 😌</button><button class="btn primary" type="button" data-lesbian-choice="no">NO 😂</button></div><div class="choice-result" id="lesbianChoiceResult" aria-live="polite"></div>';
    activityGrid.appendChild(card);
    card.querySelectorAll('[data-lesbian-choice]').forEach(btn=>btn.addEventListener('click',()=>{
      const out=$('#lesbianChoiceResult');
      if(!out)return;
      out.textContent=btn.dataset.lesbianChoice==='yes'?'AHA! Finally admitted it 😂📸 Evidence saved in the Bezati archives!':'Hmmmm… suspicious. The lie detector says: BEEP BEEP BEEP 😂🚨';
      card.classList.remove('question-pop');void card.offsetWidth;card.classList.add('question-pop');
    }));
  }

  // The guitar reminder must stay secret until the gift itself is revealed.
  const finalParas=$$('.final-copy p');
  const guitarReminder=finalParas.find(p=>p.textContent.toLowerCase().includes('guitar song'));
  if(guitarReminder){guitarReminder.classList.add('post-gift-reminder');guitarReminder.hidden=true}
  $('#giftReveal')?.addEventListener('click',()=>{
    // The existing gift handler ignores locked clicks; mirror the same unlock timestamp here.
    const unlock=Date.UTC(2026,7,25,18,30,0);
    if(Date.now()<unlock)return;
    if(guitarReminder){guitarReminder.hidden=false;guitarReminder.classList.add('revealed-reminder')}
  });
})();