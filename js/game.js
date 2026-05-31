/* ====================================================================
   game.js — Game page: Menu + Game + Results
   Depends on: shared.js, config.js
   ==================================================================== */

/* ===== KEYBOARD + FINGER MAP ===== */
const FINGER={'`':'lp','1':'lp','q':'lp','a':'lp','z':'lp','2':'lr','w':'lr','s':'lr','x':'lr','3':'lm','e':'lm','d':'lm','c':'lm',
'4':'li','5':'li','r':'li','t':'li','f':'li','g':'li','v':'li','b':'li','6':'ri','7':'ri','y':'ri','u':'ri','h':'ri','j':'ri','n':'ri','m':'ri',
'8':'rm','i':'rm','k':'rm',',':'rm','9':'rr','o':'rr','l':'rr','.':'rr','0':'rp','-':'rp','=':'rp','p':'rp','[':'rp',']':'rp',';':'rp',"'":'rp','/':'rp','\\':'rp'};
const ROWS=[['1','2','3','4','5','6','7','8','9','0','-','='],['q','w','e','r','t','y','u','i','o','p','[',']'],
['a','s','d','f','g','h','j','k','l',';',"'"],['z','x','c','v','b','n','m',',','.','/'  ]];
const EN_LAYER={};ROWS.flat().forEach(k=>{EN_LAYER[k]={n:k,s:k.toUpperCase()};});
const TH_LAYER={'1':{n:'ๅ',s:'+'},'2':{n:'/',s:'๑'},'3':{n:'-',s:'๒'},'4':{n:'ภ',s:'๓'},'5':{n:'ถ',s:'๔'},'6':{n:'ุ',s:'ู'},'7':{n:'ึ',s:'฿'},'8':{n:'ค',s:'๕'},'9':{n:'ต',s:'๖'},'0':{n:'จ',s:'๗'},'-':{n:'ข',s:'๘'},'=':{n:'ช',s:'๙'},
'q':{n:'ๆ',s:'๐'},'w':{n:'ไ',s:'"'},'e':{n:'ำ',s:'ฎ'},'r':{n:'พ',s:'ฑ'},'t':{n:'ะ',s:'ธ'},'y':{n:'ั',s:'ํ'},'u':{n:'ี',s:'๊'},'i':{n:'ร',s:'ณ'},'o':{n:'น',s:'ฯ'},'p':{n:'ย',s:'ญ'},'[':{n:'บ',s:'ฐ'},']':{n:'ล',s:','},
'a':{n:'ฟ',s:'ฤ'},'s':{n:'ห',s:'ฆ'},'d':{n:'ก',s:'ฏ'},'f':{n:'ด',s:'โ'},'g':{n:'เ',s:'ฌ'},'h':{n:'้',s:'็'},'j':{n:'่',s:'๋'},'k':{n:'า',s:'ษ'},'l':{n:'ส',s:'ศ'},';':{n:'ว',s:'ซ'},"'":{n:'ง',s:'.'},
'z':{n:'ผ',s:'('},'x':{n:'ป',s:')'},'c':{n:'แ',s:'ฉ'},'v':{n:'อ',s:'ฮ'},'b':{n:'ิ',s:'ฺ'},'n':{n:'ื',s:'์'},'m':{n:'ท',s:'?'},',':{n:'ม',s:'ฒ'},'.':{n:'ใ',s:'ฬ'},'/':{n:'ฝ',s:'ฦ'}};

/* ===== RANDOM CONTENT ===== */
function pickN(pool,n){return shuffle(pool).slice(0,n).join(' ');}
function drill(chars,groups=8,min=3,max=4){const out=[];for(let g=0;g<groups;g++){const len=min+Math.floor(Math.random()*(max-min+1));let s='';for(let i=0;i<len;i++)s+=pick(chars);out.push(s);}return out.join(' ');}
function words(list,count){const out=[];for(let i=0;i<count;i++)out.push(pick(list));return out.join(' ');}

const TH_EASY=['ฟ','ห','ก','ด','เ','้','่','า','ส','ว','ง'];
const EN_EASY=['a','s','d','f','g','h','j','k','l',';'];
const TH_WORDS=['การ','พิมพ์','ดีด','เร็ว','มือ','นิ้ว','แป้น','คำ','ฝึก','เกม','เล่น','สนุก','ไทย','บ้าน','เมือง','ดอกไม้','ทะเล','ภูเขา','อากาศ','ความ','สุข','ใจ','ดี','งาน','เวลา','สวย','รัก','เพื่อน','โรงเรียน','หนังสือ'];
const EN_WORDS=['the','quick','brown','code','type','fast','jump','word','game','play','keys','hand','dust','five','glad','rush','look','feel','dash','space','task','soft','huge','rank','vibe','cool','wave','mind','grow','calm'];
const TH_SENT=[
 'การฝึกพิมพ์ดีดทุกวันจะทำให้มือของคุณเร็วขึ้นอย่างเห็นได้ชัด',
 'ทะเลสีครามและท้องฟ้ากว้างใหญ่ทำให้ใจของเราสงบลงได้',
 'เด็กน้อยวิ่งเล่นอยู่กลางสวนดอกไม้ที่สวยงามในยามเช้า',
 'ความพยายามอยู่ที่ไหนความสำเร็จย่อมอยู่ที่นั่นเสมอ',
 'การอ่านหนังสือเป็นประจำช่วยเปิดโลกกว้างให้กับความคิดของเรา',
 'อาหารไทยมีรสชาติจัดจ้านและมีกลิ่นหอมของสมุนไพรนานา',
 'นิสัยเล็กน้อยที่ทำสม่ำเสมอจะกลายเป็นทักษะที่ติดตัวไปนาน',
 'ใจที่สงบและจังหวะที่มั่นคงมักชนะความเร็วแบบรีบร้อนเสมอ'];
const EN_SENT=[
 'the quick brown fox jumps over the lazy dog every single morning',
 'practice every single day and your hands will get much faster soon',
 'soft hands and steady eyes are what make a truly great typist over time',
 'a calm mind and a steady rhythm beat raw speed almost every time',
 'reading good books often opens a wide new world for a curious mind',
 'small steady habits build skills that will last for an entire lifetime',
 'focus on being correct first and your speed will follow soon after',
 'never look down at the keys and trust your fingers to find the way'];

/* ===== DIFFICULTY TIERS ===== */
const DIFF_ORDER=['easy','medium','hard','extreme'];
const DIFFS={
  easy:{icon:'leaf',cls:'d-easy',dots:1,
    name:{th:'ง่าย',en:'Easy'},desc:{th:'แป้นเหย้าและตัวอักษรพื้นฐาน เหมาะกับมือใหม่',en:'Home row and basic keys for beginners'},
    gen:l=>drill(l==='th'?TH_EASY:EN_EASY,8)},
  medium:{icon:'bolt',cls:'d-medium',dots:2,
    name:{th:'ปานกลาง',en:'Medium'},desc:{th:'คำที่ใช้บ่อยจากทุกแถว ฝึกพิมพ์ทั้งคำ',en:'Common words from across the keyboard'},
    gen:l=>words(l==='th'?TH_WORDS:EN_WORDS,11+Math.floor(Math.random()*6))},
  hard:{icon:'flame',cls:'d-hard',dots:3,
    name:{th:'ยาก',en:'Hard'},desc:{th:'ประโยคเต็มแบบสุ่ม มีเว้นวรรคและสระ',en:'Random full sentences with real spacing'},
    gen:l=>pickN(l==='th'?TH_SENT:EN_SENT,2)},
  extreme:{icon:'trophy',cls:'d-extreme',dots:4,
    name:{th:'ยากสูงสุด',en:'Extreme'},desc:{th:'ย่อหน้ายาวแบบสุ่ม ทดสอบความอึดและความแม่นยำ',en:'A long random paragraph for stamina'},
    gen:l=>pickN(l==='th'?TH_SENT:EN_SENT,4)}
};

/* ===== GAME STATE ===== */
let diffKey='easy',target='',pos=0;
let errors=0,correctChars=0,totalKeys=0,combo=0,maxCombo=0,score=0;
let started=false,finished=false,startTime=0,timerInt=null,charMap={};
let cells=[],posToCell=[],marks=[];
let shieldActive=false;

/* ===== THAI COMBINING MARKS ===== */
function isCombiningThai(cp){return cp===0x0E31||(cp>=0x0E34&&cp<=0x0E3A)||(cp>=0x0E47&&cp<=0x0E4E);}
function buildCells(str){const out=[];for(let i=0;i<str.length;i++){const cp=str.codePointAt(i);
  if(out.length&&isCombiningThai(cp)){const c=out[out.length-1];c.text+=str[i];c.end=i+1;}
  else out.push({text:str[i],start:i,end:i+1});}return out;}
function cellSpan(i){return $('textBox').children[posToCell[i]];}

/* ===== SCREENS ===== */
let screens;
function initScreens(){
  screens={menu:$('menu'),game:$('game'),result:$('result')};
}

/* ===== KEYBOARD ===== */
function buildCharMap(){charMap={};const layer=lang==='th'?TH_LAYER:EN_LAYER;
  for(const key in layer){const {n,s}=layer[key];charMap[n]={key,shift:false,finger:FINGER[key]};if(s&&s!==n)charMap[s]={key,shift:true,finger:FINGER[key]};}
  charMap[' ']={key:'space',shift:false,finger:'th'};}

function renderKeyboard(){
  const kb=$('keyboard');kb.innerHTML='';const layer=lang==='th'?TH_LAYER:EN_LAYER;
  ROWS.forEach((row,ri)=>{
    const r=document.createElement('div');r.className='kb-row';
    if(ri===2){const t=document.createElement('div');t.className='key wide';t.innerHTML='<span class="main" style="font-size:11px">Caps</span>';r.appendChild(t);}
    if(ri===3){const t=document.createElement('div');t.className='key wide shiftL';t.innerHTML='<span class="main" style="font-size:11px">Shift</span>';r.appendChild(t);}
    row.forEach(key=>{const d=document.createElement('div');d.className='key f-'+(FINGER[key]||'');d.dataset.key=key;const {n,s}=layer[key];
      d.style.animationDelay=(0.2+(ri*12+row.indexOf(key))*0.012)+'s';
      d.innerHTML=(lang==='th'&&s&&s!==n?`<span class="sh">${s}</span>`:'')+`<span class="main">${n}</span><span class="fdot"></span>`;r.appendChild(d);});
    if(ri===3){const t=document.createElement('div');t.className='key wide shiftR';t.innerHTML='<span class="main" style="font-size:11px">Shift</span>';r.appendChild(t);}
    kb.appendChild(r);
  });
  const sr=document.createElement('div');sr.className='kb-row';const sp=document.createElement('div');sp.className='key space';sp.dataset.key='space';
  sp.innerHTML=`<span class="main" style="font-size:11px">Space (${lang==='th'?'นิ้วโป้ง':'Thumb'})</span>`;sr.appendChild(sp);kb.appendChild(sr);
}
function highlightKey(ch){document.querySelectorAll('.key.next,.key.shifthi').forEach(k=>k.classList.remove('next','shifthi'));
  const info=charMap[ch];if(!info)return;const el=document.querySelector(`.key[data-key="${CSS.escape(info.key)}"]`);if(el)el.classList.add('next');
  if(info.shift)document.querySelectorAll('.shiftL,.shiftR').forEach(s=>s.classList.add('shifthi'));}

/* ===== MENU ===== */
const T={th:{title:'เลือกระดับความยาก',hint:'ทุกระดับสุ่มโจทย์ใหม่ทุกครั้งที่เล่น'},
         en:{title:'Choose a difficulty',hint:'Every round is randomly generated'}};
function renderMenu(){
  $('menuTitle').textContent=T[lang].title;$('menuHint').textContent=T[lang].hint;
  const grid=$('diffGrid');grid.innerHTML='';
  DIFF_ORDER.forEach(key=>{
    const d=DIFFS[key];const card=document.createElement('div');card.className='dcard '+d.cls;
    const dots=[1,2,3,4].map(n=>`<i class="${n<=d.dots?'fill':''}"></i>`).join('');
    card.innerHTML=`<div class="dicon">${ICON(d.icon)}</div><h3>${d.name[lang]}</h3>
      <div class="desc">${d.desc[lang]}</div><div class="diff">${dots}</div>`;
    card.onclick=()=>startGame(key);grid.appendChild(card);
  });
}

/* ===== GAME FLOW ===== */
function startGame(key){
  ensureAudio();if(musicOn)startMusic();
  diffKey=key;target=DIFFS[key].gen(lang);
  cells=buildCells(target);posToCell=[];cells.forEach((c,ci)=>{for(let i=c.start;i<c.end;i++)posToCell[i]=ci;});
  marks=new Array(target.length).fill('');
  pos=0;errors=0;correctChars=0;totalKeys=0;combo=0;maxCombo=0;score=0;
  started=false;finished=false;clearInterval(timerInt);updateHeat();
  shieldActive=userStats.equipped_skills&&userStats.equipped_skills.includes('comboshield');
  $('lvlLabel').textContent=DIFFS[key].name[lang];
  const sc=osSwitchText();
  $('liveHint').textContent=lang==='th'
    ?`สลับแป้นเป็นไทยด้วย ${sc} · จับเวลาเริ่มเมื่อกดปุ่มแรก`
    :`Switch your keyboard to English (${sc}) · timer starts on first key`;
  updateStats(0,100,0);buildCharMap();renderKeyboard();renderText();showScreen(screens,'game');
}
function renderText(){const box=$('textBox');box.innerHTML='';
  cells.forEach((c,ci)=>{const sp=document.createElement('span');sp.textContent=c.text===' '?'\u00A0':c.text;box.appendChild(sp);});
  paintProgress();highlightKey(target[pos]);}
function paintProgress(){const spans=$('textBox').children;
  for(let ci=0;ci<cells.length;ci++){const c=cells[ci],sp=spans[ci];if(!sp)continue;
    sp.classList.remove('pending','done','wrong','cur');
    let cls;
    if(pos>=c.end){let bad=false;for(let i=c.start;i<c.end;i++)if(marks[i]==='bad')bad=true;cls=bad?'wrong':'done';}
    else if(pos>=c.start)cls='cur';
    else cls='pending';
    sp.classList.add(cls);}
  const pb=$('progBar');if(pb)pb.style.width=(target.length?pos/target.length*100:0)+'%';}
function startTimer(){started=true;startTime=performance.now();
  timerInt=setInterval(()=>{const t=(performance.now()-startTime)/1000;updateStats(t,accuracy(),wpm(t));},100);}
const accuracy=()=>totalKeys===0?100:Math.max(0,Math.round(correctChars/totalKeys*100));
const wpm=t=>t<=0?0:Math.round((correctChars/5)/(t/60));
function updateStats(t,acc,w){$('sTime').querySelector('.v').innerHTML=t.toFixed(1)+'<small>s</small>';
  $('sWpm').querySelector('.v').textContent=w;$('sAcc').querySelector('.v').innerHTML=acc+'<small>%</small>';$('sCombo').querySelector('.v').textContent=combo;}

/* ===== HANDLE CHARACTER ===== */
function handleChar(ch){
  if(finished)return;
  if(!started)startTimer();
  const expected=target[pos];totalKeys++;
  const correct=ch===expected;
  thock(ch===' ',!correct);keyHit(ch);
  if(correct){
    const gain=10+Math.min(combo,20);
    correctChars++;combo++;if(combo>maxCombo)maxCombo=combo;score+=gain;
    marks[pos]='ok';flashChar(cellSpan(pos),false);floatPoints(cellSpan(pos),gain);comboBump();updateHeat();
    if(combo%10===0)milestone(combo);
    pos++;
  }else{
    errors++;
    if(shieldActive&&combo>=5){
      shieldActive=false;
      floatPoints(cellSpan(pos),lang==='th'?'🛡️ ป้องกัน!':'🛡️ Blocked!',true);
      tick();marks[pos]='bad';flashChar(cellSpan(pos),true);cardShake();pos++;
    }else{
      combo=0;
      score=Math.max(0,score-(userStats.equipped_skills.includes('chillaura')?0:3));
      marks[pos]='bad';flashChar(cellSpan(pos),true);cardShake();updateHeat();pos++;
    }
  }
  if(pos>=target.length){finish();return;}
  paintProgress();highlightKey(target[pos]);const t=(performance.now()-startTime)/1000;updateStats(t,accuracy(),wpm(t));
}

/* ===== EFFECT HELPERS ===== */
function flashChar(span,bad){const c=bad?'flashbad':'flash';span.classList.add(c);setTimeout(()=>span.classList.remove(c),320);}
function cardShake(){const card=$('textBox').closest('.type-card');card.classList.remove('shake');void card.offsetWidth;card.classList.add('shake');setTimeout(()=>card.classList.remove('shake'),330);}
function comboBump(){const s=$('sCombo');s.classList.remove('bump');void s.offsetWidth;s.classList.add('bump');}
function keyHit(ch){const info=charMap[ch];if(!info)return;const el=document.querySelector(`.key[data-key="${CSS.escape(info.key)}"]`);if(!el)return;el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),170);}
function floatPoints(span,gain,isText=false){if(!span)return;const card=$('textBox').closest('.type-card');
  const cr=card.getBoundingClientRect(),sr=span.getBoundingClientRect();
  const f=document.createElement('div');f.className='float';
  f.textContent=isText?gain:'+'+gain;
  f.style.left=(sr.left-cr.left+sr.width/2)+'px';f.style.top=(sr.top-cr.top)+'px';
  f.style.color=isText?'var(--cyan)':(combo>=15?'#ffd9a0':'var(--mint)');
  card.appendChild(f);setTimeout(()=>f.remove(),720);}
function updateHeat(){const card=$('textBox').closest('.type-card');if(!card)return;
  card.classList.remove('heat-1','heat-2','heat-3');
  const s=$('sCombo');s.classList.remove('t1','t2','t3');
  if(combo>=35){card.classList.add('heat-3');s.classList.add('t3');}
  else if(combo>=20){card.classList.add('heat-2');s.classList.add('t2');}
  else if(combo>=10){card.classList.add('heat-1');s.classList.add('t1');}}
function milestone(n){
  const b=$('burst');b.innerHTML=ICON('flame')+`<span>${lang==='th'?'คอมโบ':'COMBO'} x${n}</span>`;
  b.classList.remove('go');void b.offsetWidth;b.classList.add('go');setTimeout(()=>b.classList.remove('go'),860);
  const fx=$('fx'),colors=['#ffb43d','#5fe6a8','#54d6ff','#ff5d6c','#9775fa'];
  for(let k=0;k<16;k++){const p=document.createElement('div');p.className='particle';
    const ang=Math.random()*Math.PI*2,dist=70+Math.random()*130;
    p.style.setProperty('--tx',Math.cos(ang)*dist+'px');p.style.setProperty('--ty',Math.sin(ang)*dist+'px');
    p.style.background=colors[k%colors.length];p.style.left='50%';p.style.top='44%';
    fx.appendChild(p);setTimeout(()=>p.remove(),820);}}
function spawnConfetti(){const card=document.querySelector('#result .result-card');if(!card)return;
  const colors=['#ffb43d','#5fe6a8','#54d6ff','#ff5d6c','#9775fa','#ffd43b'];
  for(let k=0;k<36;k++){const c=document.createElement('div');c.className='confetti';
    c.style.left=Math.random()*100+'%';c.style.background=colors[k%colors.length];
    c.style.setProperty('--fall',(260+Math.random()*220)+'px');
    c.style.setProperty('--rot',(Math.random()*720-360)+'deg');
    c.style.setProperty('--d',(0.9+Math.random()*0.7)+'s');
    c.style.animationDelay=(Math.random()*0.25)+'s';
    card.appendChild(c);setTimeout(()=>c.remove(),1950);}}
function countUp(el,to,dec,suf){const dur=750,s=performance.now();
  (function step(now){let p=Math.min(1,(now-s)/dur);p=1-Math.pow(1-p,3);const v=to*p;
    el.textContent=(dec?v.toFixed(dec):Math.round(v))+(suf||'');if(p<1)requestAnimationFrame(step);})(performance.now());}
function handleBackspace(){if(finished||pos===0||!started)return;tick();pos--;
  if(marks[pos]!=='bad')correctChars=Math.max(0,correctChars-1);
  totalKeys=Math.max(0,totalKeys-1);marks[pos]='';
  paintProgress();highlightKey(target[pos]);}

/* ===== FINISH ===== */
async function finish(){
  finished=true;clearInterval(timerInt);
  const t=(performance.now()-startTime)/1000;const acc=accuracy(),w=wpm(t);
  score+=maxCombo*5+(acc===100?200:0);
  let stars=1;if(acc>=90&&w>=20)stars=2;if(acc>=96&&w>=35)stars=3;
  $('rStars').innerHTML=[1,2,3].map(n=>ICON('star',n<=stars?'on':'off')).join('');
  const msgs=stars===3?(lang==='th'?['สุดยอดไปเลย','เพอร์เฟกต์ นิ้วบินได้','โปรพิมพ์ตัวจริง']:['Outstanding','Perfect run','True pro typist'])
    :stars===2?(lang==='th'?['เยี่ยมมาก','เก่งขึ้นเรื่อยๆ','ใกล้เต็มแล้ว']:['Great job','Getting sharper','Almost perfect'])
    :(lang==='th'?['ทำได้ดี','ฝึกอีกนิดเดียว','ความแม่นยำมาก่อนความเร็ว']:['Nice work','A bit more practice','Accuracy before speed']);
  $('rTitle').textContent=pick(msgs);

  let gainedXp=Math.round(correctChars*(acc/100));
  if(userStats.equipped_skills&&userStats.equipped_skills.includes('homerow')){gainedXp=Math.round(gainedXp*1.1);}
  let gainedGold=Math.round((correctChars/8)*stars);
  if(userStats.equipped_skills&&userStats.equipped_skills.includes('goldenfingers')&&w>=40){gainedGold*=2;}

  const oldLvl=Math.floor(userStats.xp/200)+1;
  userStats.xp+=gainedXp;userStats.gold+=gainedGold;userStats.games_played+=1;
  if(w>userStats.max_wpm)userStats.max_wpm=w;
  userStats.avg_accuracy=Math.round((userStats.avg_accuracy*(userStats.games_played-1)+acc)/userStats.games_played);

  const newLvl=Math.floor(userStats.xp/200)+1;
  let lvlUp=false;
  if(newLvl>oldLvl){lvlUp=true;userStats.gold+=50;userStats.level=newLvl;}

  $('rSub').innerHTML=(lang==='th'
    ?`ระดับ "${DIFFS[diffKey].name.th}" · คอมโบสูงสุด ${maxCombo}`
    :`Difficulty "${DIFFS[diffKey].name.en}" · max combo ${maxCombo}`)+
    `<br><span style="color:var(--cyan); font-weight:700;">+${gainedXp} ${AUTH_TEXT[lang].xpUnit}</span> · `+
    `<span style="color:var(--amber); font-weight:700;">+${gainedGold} ${AUTH_TEXT[lang].goldUnit}</span>`+
    (lvlUp?` <span style="color:var(--mint); font-weight:800; animation: bump 0.4s ease;">[${AUTH_TEXT[lang].levelUpMsg} +50G]</span>`:'');

  const idx=DIFF_ORDER.indexOf(diffKey);
  $('btnNext').style.display=idx<DIFF_ORDER.length-1?'inline-flex':'none';
  showScreen(screens,'result');
  countUp($('rWpm'),w,0,'');countUp($('rAcc'),acc,0,'%');countUp($('rTime'),t,1,'s');countUp($('rScore'),score,0,'');

  if(lvlUp){
    const b=$('burst');b.innerHTML=ICON('win')+`<span>${AUTH_TEXT[lang].levelUpMsg}</span>`;
    b.classList.remove('go');void b.offsetWidth;b.classList.add('go');setTimeout(()=>b.classList.remove('go'),1500);
  }

  winSound();spawnConfetti();
  updateProfileBar();
  await saveUserStats();
}

/* ===== INPUT ===== */
function setupInput(){
  window.addEventListener('keydown',e=>{
    if(!screens||!screens.game.classList.contains('on'))return;
    if(e.key==='Backspace'){e.preventDefault();handleBackspace();return;}
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    if(e.key.length===1){e.preventDefault();handleChar(e.key);}
    else if(e.key===' '){e.preventDefault();handleChar(' ');}
  });
}

/* ===== LANG CHANGE ===== */
function onLangChange(){
  renderMenu();
  renderFooter();
}

/* ===== BOOT ===== */
async function bootGame(){
  const ok=await initApp({requireAuth:true});
  if(!ok)return;

  initScreens();
  renderMenu();

  // Wire buttons
  $('btnBack').onclick=()=>{clearInterval(timerInt);showScreen(screens,'menu');};
  $('btnRestart').onclick=()=>startGame(diffKey);
  $('btnMenu').onclick=()=>showScreen(screens,'menu');
  $('btnRetry').onclick=()=>startGame(diffKey);
  $('btnNext').onclick=()=>{const idx=DIFF_ORDER.indexOf(diffKey);startGame(DIFF_ORDER[Math.min(idx+1,DIFF_ORDER.length-1)]);};
  $('btnGoAcademy').onclick=()=>{window.location.href='academy.html';};

  setupInput();
  showScreen(screens,'menu');
}
