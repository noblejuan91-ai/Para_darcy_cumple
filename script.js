/* ============ ✏️ TEXTOS EDITABLES ============ */
const CFG = {
  foto: '1000090735.jpeg',
  fechaInicio: '2025-09-23T00:00:00', // Fecha en que empezaron a hablar
  frasesCometa: [
    "Te amo, mi cielo ✨",
    "Mi casualidad favorita 💖",
    "Contigo todo es mejor 🌙",
    "18 años brillando 🌟",
    "Para siempre tú y yo ❤️",
    "La dueña de mi universo 🌌"
  ],
  fragmentos: [
    'A veces alguien llega a tu vida y, sin darte cuenta, empiezas a querer saber cada vez más de esa persona.',
    'Contigo descubrí lo bonito que es poder hablar sin miedo, decir lo que pienso y sentir que puedo ser yo mismo.',
    'Y hubo un momento en el que entendí que lo que sentía por ti era diferente. No tenía que forzarlo. Simplemente me nacía estar cerca de ti.'
  ],
  unidas: '✨ ¡Las tres estrellas se han conectado y brillan en constelación! ❤️',
  notaSecreta: 'P. D.: Si pudiera volver al momento exacto en el que empecé a sentir esa conexión contigo, no cambiaría absolutamente nada. Te quiero. ❤️',
  miniCaption: 'JAJAJAJA, la mejor foto. ❤️',
  t5: 'No sé si alguna vez te he explicado lo mucho que me fascinan. Hay cosas que uno intenta describir mil veces y aun así siente que las palabras se quedan cortas.',
  orbes: {
    1: '✨ Cada estrella eligió su camino para encontrarte.',
    2: '💫 Contigo todo fluye sin miedo.',
    3: '🌌 Más allá del cielo, tú eres mi luz.',
    4: '❤️ La sonrisa más hermosa del universo.',
    5: '👀 Podría mirarte por siempre.',
    6: '💌 Escrita con el corazón.',
    7: '✨ Mi casualidad favorita.'
  },
  carta: `Mi niña:

Hoy cumples 18 años y quería regalarte algo diferente. Algo que no fuera solamente una felicitación, sino una pequeña forma de mostrarte lo especial que eres para mí.

A veces pienso en cómo empezó todo lo que siento por ti. No recuerdo haber necesitado una razón exacta. Fue esa conexión que sentía cuando hablaba contigo, esa tranquilidad de poder decirte las cosas sin miedo y saber que podía ser yo mismo.

Contigo nunca he sentido que tenga que fingir ser alguien diferente para que me entiendas. Puedo abrirme, hablar de lo que siento y simplemente ser yo. Y quizá eso sea una de las cosas más bonitas que alguien puede encontrar en otra persona.

Me encantan tus ojos, tu forma de ser y todo eso que te hace ser tú. Puede que no siempre encuentre las palabras perfectas para explicarte lo que significas para mí, pero quiero que nunca dudes de que me haces sentir algo muy especial.

Hoy comienza una nueva etapa de tu vida y deseo que esté llena de cosas bonitas, de sueños cumplidos, de sonrisas sinceras y de motivos para sentirte orgullosa de la persona en la que te estás convirtiendo.

Quiero que sepas que, pase lo que pase y vengan los retos que vengan, siempre voy a estar en tu esquina. Puedes contar conmigo para absolutamente todo, y te prometo que te voy a apoyar e impulsar en cada paso que des para verte triunfar.

Y si pudiera acompañarte en muchos de esos momentos, sería muy feliz.

Feliz cumpleaños, Amor. Gracias por dejarme conocerte, por permitirme ser yo mismo contigo y por formar parte de mi vida.

Te quiero muchísimo. ❤️`
};
/* ============================================= */

const $=s=>document.querySelector(s);
const cv=$('#c'),ctx=cv.getContext('2d');
let W,H,DPR,CX,CY;
function resize(){DPR=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;CX=W/2;CY=H/2;cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0)}
addEventListener('resize',resize);resize();

/* ---- GENERADOR DE SONIDOS MÁGICOS ---- */
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playPopSound() {
  if (typeof muted !== 'undefined' && muted) return;
  try {
    const ctxAcc = getAudioContext();
    const osc = ctxAcc.createOscillator();
    const gain = ctxAcc.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, ctxAcc.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, ctxAcc.currentTime + 0.06);
    
    gain.gain.setValueAtTime(0.04, ctxAcc.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctxAcc.currentTime + 0.06);
    
    osc.connect(gain);
    gain.connect(ctxAcc.destination);
    osc.start();
    osc.stop(ctxAcc.currentTime + 0.06);
  } catch(e) {}
}

function playMagicChime() {
  if (typeof muted !== 'undefined' && muted) return;
  try {
    const ctxAcc = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, index) => {
      const osc = ctxAcc.createOscillator();
      const gain = ctxAcc.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctxAcc.currentTime + index * 0.08);
      
      gain.gain.setValueAtTime(0.03, ctxAcc.currentTime + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctxAcc.currentTime + index * 0.08 + 0.6);
      
      osc.connect(gain);
      gain.connect(ctxAcc.destination);
      osc.start(ctxAcc.currentTime + index * 0.08);
      osc.stop(ctxAcc.currentTime + index * 0.08 + 0.6);
    });
  } catch(e) {}
}

/* ---- estrellas 3D ---- */
const stars=[];const NS=250;
function newStar(far){return{x:(Math.random()*2-1)*W,y:(Math.random()*2-1)*H,z:far?W:Math.random()*W+1}}
for(let i=0;i<NS;i++)stars.push(newStar(false));
let warp=0,heartMode=false,heartStart=0;

/* ---- polvo mágico ---- */
const dust=[];const COLORS=['255,210,122','255,143,184','255,255,255','143,199,255'];
function burst(x,y,n,spd){for(let i=0;i<n;i++){const a=Math.random()*6.283,s=Math.random()*(spd||2)+.3;dust.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,c:COLORS[Math.random()*4|0],r:Math.random()*2+.8})}}
let lastP=0;
function trail(e){const n=performance.now();if(n-lastP<16)return;lastP=n;burst(e.clientX,e.clientY,2,1.2)}
addEventListener('pointermove',trail);
addEventListener('pointerdown',e=>burst(e.clientX,e.clientY,10,2.5));

/* ---- corazón 3D ---- */
const heart=[];
function buildHeart(){
  heart.length=0;
  const s=Math.min(W,480)*0.6/32, N=800;
  for(let i=0;i<N;i++){
    const t=Math.random()*6.283;
    let x=16*Math.pow(Math.sin(t),3);
    let y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));
    const k=Math.random()<.55?1:Math.sqrt(Math.random())*.95;
    x*=k;y*=k;
    heart.push({tx:x*s,ty:y*s-H*0.06,tz:(Math.random()*2-1)*7*s*(0.4+0.6*(1-k+.2)),
      x:CX+(Math.random()*2-1)*20,y:CY+(Math.random()*2-1)*20,
      c:Math.random()<.7?'255,110,160':(Math.random()<.5?'255,210,122':'255,255,255'),r:Math.random()*1.6+.6})
  }
}

function frame(t){
  ctx.globalCompositeOperation='destination-out';
  ctx.fillStyle='rgba(0,0,0,'+(warp>2?0.25:0.55)+')';
  ctx.fillRect(0,0,W,H);
  ctx.globalCompositeOperation='source-over';
  const sp=0.7+warp;
  for(const s of stars){
    const pz=s.z;s.z-=sp;
    if(s.z<1){Object.assign(s,newStar(true));continue}
    const f=W*0.5;
    const sx=CX+s.x*f/s.z,sy=CY+s.y*f/s.z;
    if(sx<-50||sx>W+50||sy<-50||sy>H+50){Object.assign(s,newStar(true));continue}
    const r=(1-s.z/W)*2+.3;
    ctx.fillStyle='rgba(255,255,255,'+Math.min(1,.3+(1-s.z/W))+')';
    if(warp>2){
      const px=CX+s.x*f/(s.z+sp*3),py=CY+s.y*f/(s.z+sp*3);
      ctx.strokeStyle='rgba(180,210,255,.8)';ctx.lineWidth=r;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(sx,sy);ctx.stroke();
    }else{ctx.beginPath();ctx.arc(sx,sy,r,0,6.283);ctx.fill()}
  }
  warp*=0.965;if(warp<.05)warp=0;
  ctx.globalCompositeOperation='lighter';
  for(let i=dust.length-1;i>=0;i--){
    const d=dust[i];d.x+=d.vx;d.y+=d.vy;d.vy+=.015;d.life-=.016;
    if(d.life<=0){dust.splice(i,1);continue}
    ctx.fillStyle='rgba('+d.c+','+d.life+')';ctx.beginPath();ctx.arc(d.x,d.y,d.r*d.life+.3,0,6.283);ctx.fill();
  }
  if(heartMode){
    const el=(t-heartStart)/1000;
    const th=Math.sin(el*.7)*.8, ct=Math.cos(th), st=Math.sin(th);
    const beat=1+.05*Math.max(0,Math.sin(el*5.5))+.03*Math.max(0,Math.sin(el*5.5-1));
    for(const p of heart){
      const rx=(p.tx*ct+p.tz*st)*beat, ry=p.ty*beat;
      const gx=CX+rx,gy=CY+ry;
      p.x+=(gx-p.x)*.045;p.y+=(gy-p.y)*.045;
      ctx.fillStyle='rgba('+p.c+',.85)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();
    }
  }
  ctx.globalCompositeOperation='source-over';
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ---- escenas ---- */
let cur=1;
function go(n){
  playPopSound();
  $('#s'+cur).classList.remove('active');
  cur=n;
  $('#s'+n).classList.add('active');
  $('#orb').style.display=n<8?'block':'none';
  if(n>=5)$('#mini').style.display='block';
  if(n===5)scene5();
  if(n===6)scene6();
  if(n===7)updateCosmicTimer();
  if(n===8)scene8();
  if(n!==5)$('#spot').classList.remove('on');
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-next]');
  if(b&&b.id!=='b3'){warp=Math.max(warp,6);go(+b.dataset.next)}
});

/* typewriter */
function typeInto(el,text,ms,done){
  let i=0,stop=false;
  el.textContent='';
  const id=setInterval(()=>{
    if(stop)return;
    el.textContent=text.slice(0,++i);
    el.scrollTop=el.scrollHeight;
    if(i>=text.length){clearInterval(id);done&&done()}
  },ms);
  return{skip(){stop=true;clearInterval(id);el.textContent=text;done&&done()}};
}

/* orbe secreto */
let orbT=null;
function popup(txt){
  playPopSound();
  const s=$('#secret');s.textContent=txt;s.classList.add('show');
  clearTimeout(orbT);orbT=setTimeout(()=>s.classList.remove('show'),3500);
}
$('#orb').addEventListener('click',()=>{
  playPopSound();
  burst(innerWidth-35,innerHeight-100,30,3);
  popup(CFG.orbes[cur]||'✨');
});
$('#orb').style.display='block';

/* E2: nodos */
const found=new Set();
document.querySelectorAll('.node').forEach(n=>n.addEventListener('click',e=>{
  const i=+n.dataset.i;if(found.has(i))return;
  playPopSound();
  found.add(i);n.classList.add('done');
  const r=n.getBoundingClientRect();burst(r.left+22,r.top+22,60,4);
  const sc=$('#scroll');if(found.size===1)sc.innerHTML='';
  const p=document.createElement('p');p.textContent=CFG.fragmentos[i];sc.appendChild(p);
  if(found.size===3){$('#consts').classList.add('linked');const m=document.createElement('p');m.textContent=CFG.unidas;m.style.color='#ffd27a';m.style.textAlign='center';sc.appendChild(m);sc.scrollTop=sc.scrollHeight;setTimeout(()=>$('#b2').classList.remove('hidden'),1200)}
}));

/* ===== AUDIO: ambiente (escenas 1-3) + canción con fundidos ===== */
const aud = $('#aud');
let muted = false;
const SONG_VOL=.15, SONG_FADE_IN=5000, SONG_FADE_OUT=9000, END_FADE_AFTER=45000; // ms (ajustables)

let ambMaster=null,ambNodes=[],ambOn=false,ambTwinkle=null,songStarted=false;
function startAmbient(){
  if(ambOn||songStarted||muted)return;
  try{
    const actx=getAudioContext();
    ambOn=true;
    const t=actx.currentTime;
    ambMaster=actx.createGain();ambMaster.gain.setValueAtTime(0,t);
    ambMaster.gain.linearRampToValueAtTime(0.35,t+6);   // fundido de entrada
    const lp=actx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=700;lp.Q.value=.6;
    const lfo=actx.createOscillator(),lfoG=actx.createGain();
    lfo.frequency.value=.07;lfoG.gain.value=350;lfo.connect(lfoG);lfoG.connect(lp.frequency);lfo.start();
    lp.connect(ambMaster);ambMaster.connect(actx.destination);
    ambNodes.push(lfo);
    // acorde abierto, grave y suave
    [[110,.10],[164.8,.08],[220,.07],[329.6,.045],[493.9,.025]].forEach(([f,v],k)=>{
      [-4,4].forEach(det=>{
        const o=actx.createOscillator(),g=actx.createGain();
        o.type=k<2?'sine':'triangle';o.frequency.value=f;o.detune.value=det;
        g.gain.value=v/2;o.connect(g);g.connect(lp);o.start();ambNodes.push(o);
        const l=actx.createOscillator(),lg=actx.createGain();   // respiración lenta
        l.frequency.value=.05+k*.017;lg.gain.value=v/3;l.connect(lg);lg.connect(g.gain);l.start();ambNodes.push(l);
      });
    });
    // destellos agudos ocasionales (como estrellas)
    ambTwinkle=setInterval(()=>{
      if(!ambOn||actx.state!=='running')return;
      const n=actx.currentTime,o=actx.createOscillator(),g=actx.createGain();
      o.type='sine';o.frequency.value=[880,987.8,1318.5,1568][Math.random()*4|0];
      g.gain.setValueAtTime(0,n);g.gain.linearRampToValueAtTime(.035,n+.08);g.gain.exponentialRampToValueAtTime(.0001,n+2.6);
      o.connect(g);g.connect(ambMaster);o.start(n);o.stop(n+2.7);
    },2600);
  }catch(e){console.log('Ambiente no disponible',e)}
}
function stopAmbient(sec){
  if(!ambOn||!audioCtx)return;ambOn=false;clearInterval(ambTwinkle);
  const t=audioCtx.currentTime;
  ambMaster.gain.cancelScheduledValues(t);ambMaster.gain.setValueAtTime(ambMaster.gain.value,t);
  ambMaster.gain.linearRampToValueAtTime(0,t+sec);
  setTimeout(()=>{ambNodes.forEach(o=>{try{o.stop()}catch(e){}});ambNodes=[]},sec*1000+300);
}

let fadeTimer=null;
function fadeSong(to,ms,done){
  clearInterval(fadeTimer);
  const from=aud.volume,steps=Math.max(1,ms/50);let k=0;
  fadeTimer=setInterval(()=>{
    k++;aud.volume=Math.min(1,Math.max(0,from+(to-from)*(k/steps)));
    if(k>=steps){clearInterval(fadeTimer);done&&done()}
  },50);
}
function startSong(){
  songStarted=true;
  aud.volume=0;aud.muted=muted;
  aud.play().catch(error=>console.log("El navegador requirió interacción adicional:",error));
  fadeSong(SONG_VOL,SONG_FADE_IN);
}

// el ambiente arranca con el primer toque (los navegadores exigen un gesto)
document.addEventListener('pointerdown',()=>{if(cur<4)startAmbient()});

$('#b3').addEventListener('click', () => {
  playMagicChime();
  warp = 40;
  stopAmbient(4);   // el ambiente se apaga...
  startSong();      // ...mientras entra "Siempre seré"
  go(4);
});

$('#mute').addEventListener('click',()=>{
  playPopSound();
  muted=!muted;aud.muted=muted;$('#mute').textContent=muted?'🔇':'🔊';
  if(audioCtx){muted?audioCtx.suspend():audioCtx.resume()}
  if(!muted&&aud.paused&&songStarted)aud.play().catch(()=>{});
});

/* E4: foto */
const ph=$('#ph'),img=new Image();
img.onload=()=>{ph.style.backgroundImage="url('"+CFG.foto+"')";$('#miniImg').style.backgroundImage="url('"+CFG.foto+"')"};
img.onerror=()=>{$('#phEmoji').style.display='block'};
img.src=CFG.foto;
let lp=null;
const pol=$('#pol');
pol.addEventListener('contextmenu',e=>e.preventDefault());
pol.addEventListener('pointerdown',()=>{lp=setTimeout(()=>{$('#noteTxt').textContent=CFG.notaSecreta;$('#note').classList.add('show')},1000)});
['pointerup','pointerleave','pointercancel'].forEach(ev=>pol.addEventListener(ev,()=>clearTimeout(lp)));
$('#note').addEventListener('click',()=>{$('#note').classList.remove('show')});
$('#mini').addEventListener('click',()=>{$('#mini').classList.toggle('flip');popup(CFG.miniCaption)});

/* E5 */
let t5timer;
function scene5(){
  const n=$('#neon'),t=$('#t5');n.textContent='';t.style.opacity=0;t.textContent=CFG.t5;$('#b5').classList.add('hidden');
  $('#spot').classList.add('on');
  setTimeout(()=>{
    typeInto(n,'Tus ojos.',230,()=>{
      setTimeout(()=>{t.style.opacity=1;setTimeout(()=>$('#b5').classList.remove('hidden'),1800)},600);
    });
  },2000);
}

/* E6 */
let tw=null;
function scene6(){
  const p=$('#papiro');$('#b6').classList.add('hidden');$('#skip6').classList.remove('hidden');
  tw=typeInto(p,CFG.carta,38,()=>{$('#b6').classList.remove('hidden');$('#skip6').classList.add('hidden')});
}
$('#skip6').addEventListener('click',()=>{tw&&tw.skip()});

/* --- Contador estelar --- */
function updateCosmicTimer() {
  const timerEl = document.getElementById('cosmicTimer');
  if (!timerEl) return;
  
  const start = new Date(CFG.fechaInicio);
  const now = new Date();
  const diff = now - start;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  
  timerEl.textContent = `✨ ${days} días, ${hours} h y ${minutes} m a tu lado`;
}
setInterval(updateCosmicTimer, 60000);

/* --- Cometas fugaces --- */
document.addEventListener('dblclick', (e) => {
  playPopSound();
  if (cur === 8) return;
  const phrase = CFG.frasesCometa[Math.floor(Math.random() * CFG.frasesCometa.length)];
  
  const el = document.createElement('div');
  el.className = 'shooting-phrase';
  el.textContent = phrase;
  
  el.style.left = Math.random() * 50 + 'vw';
  el.style.top = (Math.random() * 40 + 50) + 'vh';
  
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
});

/* --- Lluvia de stickers --- */
let stickerInterval = null;
function startFloatingStickers() {
  const stickerFiles = ['uno.png', 'dos.png', 'tres.png', 'cuatro.png', 'cinco.png', 'seis.png', 'siete.png', 'ocho.png', 'nueve.png', 'diez.png'];
  
  const lanes = [5, 15, 25, 35, 45, 55, 65, 75, 85, 92];
  let shuffledLanes = [...lanes].sort(() => Math.random() - 0.5);
  let laneIndex = 0;

  stickerInterval = setInterval(() => {
    if (cur !== 8) return;
    
    const st = document.createElement('img');
    st.className = 'floating-sticker';
    st.src = stickerFiles[Math.floor(Math.random() * stickerFiles.length)];
    
    st.style.left = shuffledLanes[laneIndex] + 'vw';
    laneIndex = (laneIndex + 1) % shuffledLanes.length;
    
    if (laneIndex === 0) {
      shuffledLanes = [...lanes].sort(() => Math.random() - 0.5);
    }
    
    const duration = Math.random() * 3 + 5; 
    st.style.animationDuration = duration + 's';
    st.style.width = (Math.random() * 20 + 45) + 'px';
    
    st.addEventListener('click', (e) => {
      e.stopPropagation(); 
      playPopSound();
      const rect = st.getBoundingClientRect();
      
      burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40, 4);
      st.remove();
    });
    
    document.body.appendChild(st);
    setTimeout(() => st.remove(), duration * 1000);
  }, 700);
}

/* E8 */
function scene8(){
  setTimeout(()=>{
    const f=$('#flash');f.classList.remove('go');void f.offsetWidth;f.classList.add('go');
    warp=30;
    setTimeout(()=>{buildHeart();heartMode=true;heartStart=performance.now();startFloatingStickers();},500);
    setTimeout(()=>{$('#t8').style.opacity=1},4500);
    setTimeout(()=>fadeSong(0,SONG_FADE_OUT),END_FADE_AFTER);
  },600);
}