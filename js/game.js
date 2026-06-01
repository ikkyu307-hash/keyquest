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
let latestResult = { wpm: 0, acc: 0, time: 0, score: 0 };
let errors=0,correctChars=0,totalKeys=0,combo=0,maxCombo=0,score=0;
let started=false,finished=false,startTime=0,timerInt=null,charMap={};
let cells=[],posToCell=[],marks=[];
let shieldActive=false;
let selectedIdx=0;
let countingDown=false;

/* ===== RESULT ANALYSIS STATE ===== */
let wpmHistory=[],accHistory=[],errorMap={},wpmSampleInt=null;

/* ===== CELLS CONVERTER ===== */
function buildCells(str){const out=[];const shouldCombine=diffKey!=='easy';for(let i=0;i<str.length;i++){const cp=str.codePointAt(i);
  if(shouldCombine&&out.length&&isCombiningThai(cp)){const c=out[out.length-1];c.text+=str[i];c.end=i+1;}
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
const T={th:{title:'เลือกระดับความยาก',hint:'ทุกระดับสุ่มโจทย์ใหม่ทุกครั้งที่เล่น',navHint:['←','→','เลือกด่าน','Enter','เริ่มเกม']},
         en:{title:'Choose a difficulty',hint:'Every round is randomly generated',navHint:['←','→','Select','Enter','Start']}};
function renderMenu(){
  $('menuTitle').textContent=T[lang].title;$('menuHint').textContent=T[lang].hint;
  const nh=T[lang].navHint;
  $('menuNavHint').innerHTML=`<kbd>${nh[0]}</kbd><kbd>${nh[1]}</kbd> ${nh[2]} &nbsp; <kbd>${nh[3]}</kbd> ${nh[4]}`;
  const grid=$('diffGrid');grid.innerHTML='';
  DIFF_ORDER.forEach((key,i)=>{
    const d=DIFFS[key];const card=document.createElement('div');card.className='dcard '+d.cls;
    if(i===selectedIdx)card.classList.add('selected');
    const dots=[1,2,3,4].map(n=>`<i class="${n<=d.dots?'fill':''}"></i>`).join('');
    card.innerHTML=`<div class="dicon">${ICON(d.icon)}</div><h3>${d.name[lang]}</h3>
      <div class="desc">${d.desc[lang]}</div><div class="diff">${dots}</div><div class="select-arrow"></div>`;
    card.onclick=()=>{selectedIdx=i;updateSelection();launchWithCountdown(key);};
    card.onmouseenter=()=>{selectedIdx=i;updateSelection();};
    grid.appendChild(card);
  });
}
function updateSelection(){
  const cards=document.querySelectorAll('.dcard');
  cards.forEach((c,i)=>{c.classList.toggle('selected',i===selectedIdx);});
  // scroll selected into view
  const sel=cards[selectedIdx];
  if(sel)sel.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
}
function menuKeyHandler(e){
  if(!screens||!screens.menu.classList.contains('on'))return;
  if(countingDown)return;
  if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();selectedIdx=(selectedIdx+1)%DIFF_ORDER.length;updateSelection();playMenuBeep();}
  else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();selectedIdx=(selectedIdx-1+DIFF_ORDER.length)%DIFF_ORDER.length;updateSelection();playMenuBeep();}
  else if(e.key==='Enter'){e.preventDefault();playMenuBeep();launchWithCountdown(DIFF_ORDER[selectedIdx]);}
}

/* ===== COUNTDOWN ===== */
function launchWithCountdown(key){
  if(countingDown)return;
  countingDown=true;
  const overlay=$('countdownOverlay');
  const numEl=$('countdownNumber');
  overlay.style.display='flex';
  let count=3;
  numEl.textContent=count;
  numEl.className='countdown-number';
  // force re-animation
  void numEl.offsetWidth;
  tick();
  const iv=setInterval(()=>{
    count--;
    if(count>0){
      numEl.textContent=count;
      numEl.className='countdown-number';
      void numEl.offsetWidth;
      numEl.className='countdown-number';
      tick();
    } else if(count===0){
      numEl.textContent=lang==='th'?'เริ่ม!':'START!';
      numEl.className='countdown-number go-text';
      void numEl.offsetWidth;
      numEl.className='countdown-number go-text';
      thock(true,false);
    } else {
      clearInterval(iv);
      overlay.style.display='none';
      countingDown=false;
      startGame(key);
    }
  },750);
}


/* ===== MONSTERS CONFIG ===== */
const MONSTERS = {
  easy: { id: 'monsterSlime', name: { th: 'สไลม์วุ้นน้อย', en: 'Baby Slime' }, lvl: 'Lv. 5' },
  medium: { id: 'monsterGoblin', name: { th: 'กอบลินหัวขโมย', en: 'Goblin Thief' }, lvl: 'Lv. 18' },
  hard: { id: 'monsterDragon', name: { th: 'มังกรไฟโลกันตร์', en: 'Fire Dragon' }, lvl: 'Lv. 55' },
  extreme: { id: 'monsterDragon', name: { th: 'มังกรดำจักรพรรดิ', en: 'Darkness Overlord' }, lvl: 'Lv. 99' }
};

function floatDamage(dmg, isCrit = false) {
  const stage = $('monsterStage');
  if (!stage) return;
  const f = document.createElement('div');
  f.className = 'float-damage' + (isCrit ? ' crit' : '');
  f.textContent = isCrit ? dmg : '-' + dmg;
  f.style.left = (40 + Math.random() * 20) + '%';
  f.style.top = (15 + Math.random() * 15) + 'px';
  stage.appendChild(f);
  setTimeout(() => f.remove(), 800);
}

let currentMonsterId = '';
let currentMonsterIsBoss = false;

/* ===== GAME FLOW ===== */
function startGame(key){
  ensureAudio();if(musicOn)startMusic();
  const stage=$('monsterStage');if(stage)stage.classList.add('playing');
  diffKey=key;target=DIFFS[key].gen(lang);

  // Spawn Boss Variant logic
  let mInfo = Object.assign({}, MONSTERS[key] || MONSTERS['easy']);
  currentMonsterIsBoss = false;
  if (userStats.max_wpm > 40 && (key === 'medium' || key === 'hard' || key === 'extreme') && Math.random() < 0.3) {
    mInfo.lvl = 'Lv. ' + (parseInt(mInfo.lvl.replace('Lv. ','')) + 30) + ' Boss';
    mInfo.name.th = 'บอส ' + mInfo.name.th;
    mInfo.name.en = 'Boss ' + mInfo.name.en;
    currentMonsterIsBoss = true;
    target += ' ' + DIFFS[key].gen(lang); // Double the length for Boss
  }
  currentMonsterId = mInfo.id + (currentMonsterIsBoss ? '_boss' : '');

  cells=buildCells(target);posToCell=[];cells.forEach((c,ci)=>{for(let i=c.start;i<c.end;i++)posToCell[i]=ci;});
  marks=new Array(target.length).fill('');
  pos=0;errors=0;correctChars=0;totalKeys=0;combo=0;maxCombo=0;score=0;
  started=false;finished=false;clearInterval(timerInt);updateHeat();
  shieldActive=userStats.equipped_skills&&userStats.equipped_skills.includes('comboshield');

  // Spawn active monster and hide inactive ones
  ['monsterSlime', 'monsterGoblin', 'monsterDragon'].forEach(id => {
    const el = $(id);
    if (el) {
      el.style.display = 'none';
      el.classList.remove('active', 'damaged', 'defeated', 'taunt', 'boss-scale');
    }
  });
  
  const activeEl = $(mInfo.id);
  if (activeEl) {
    activeEl.style.display = 'block';
    activeEl.classList.add('active');
    if (currentMonsterIsBoss) activeEl.classList.add('boss-scale');
  }
  const mNameEl = $('monsterName');
  if (mNameEl) mNameEl.textContent = mInfo.name[lang];
  const mLvlEl = $('monsterLvlBadge');
  if (mLvlEl) mLvlEl.textContent = mInfo.lvl;
  const hpFill = $('monsterHpFill');
  if (hpFill) hpFill.style.width = '100%';
  const hpText = $('monsterHpText');
  if (hpText) hpText.textContent = '100%';

  $('lvlLabel').textContent=DIFFS[key].name[lang];
  const sc=osSwitchText();
  $('liveHint').textContent=lang==='th'
    ?`สลับแป้นเป็นไทยด้วย ${sc} · จับเวลาเริ่มเมื่อกดปุ่มแรก`
    :`Switch your keyboard to English (${sc}) · timer starts on first key`;
  updateStats(0,100,0);buildCharMap();renderKeyboard();renderText();showScreen(screens,'game');
}
function renderText(){const box=$('textBox');box.innerHTML='';
  cells.forEach((c,ci)=>{const sp=document.createElement('span');
    const displayChar=(c.text!==' '&&isCombiningThai(c.text.codePointAt(0)))?'\u25CC'+c.text:c.text;
    sp.textContent=displayChar===' '?'\u00A0':displayChar;box.appendChild(sp);});
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
  startGameplayMusic();
  wpmHistory=[];accHistory=[];errorMap={};
  timerInt=setInterval(()=>{const t=(performance.now()-startTime)/1000;updateStats(t,accuracy(),wpm(t));},100);
  wpmSampleInt=setInterval(()=>{const t=(performance.now()-startTime)/1000;wpmHistory.push(wpm(t));accHistory.push(accuracy());},1000);}
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

    // Float Damage points above active monster
    const isCrit = combo >= 12 || Math.random() < 0.12;
    const baseDmg = isCrit ? (Math.floor(Math.random() * 20) + 30) : (Math.floor(Math.random() * 8) + 8);
    floatDamage(isCrit ? `CRIT! ${baseDmg}` : baseDmg, isCrit);
    
    if(isCrit){
      const stage=$('monsterStage');
      if(stage){
        stage.classList.remove('crit-shake');
        void stage.offsetWidth;
        stage.classList.add('crit-shake');
        setTimeout(()=>stage.classList.remove('crit-shake'),300);
      }
    }

    // Monster Damage flash/shake
    const mInfo = MONSTERS[diffKey] || MONSTERS['easy'];
    const activeEl = $(mInfo.id);
    if (activeEl) {
      activeEl.classList.remove('damaged');
      void activeEl.offsetWidth; // trigger reflow
      activeEl.classList.add('damaged');
    }

    pos++;

    // Update HP bar UI
    const hpPct = Math.max(0, 100 - Math.round(pos / target.length * 100));
    const hpFill = $('monsterHpFill');
    if (hpFill) hpFill.style.width = hpPct + '%';
    const hpText = $('monsterHpText');
    if (hpText) hpText.textContent = hpPct + '%';
  }else{
    errors++;const expected=target[pos];
    errorMap[expected]=(errorMap[expected]||0)+1;

    // Monster taunts player on mistake
    const mInfo = MONSTERS[diffKey] || MONSTERS['easy'];
    const activeEl = $(mInfo.id);
    if (activeEl) {
      activeEl.classList.remove('taunt');
      void activeEl.offsetWidth;
      activeEl.classList.add('taunt');
    }

    if(shieldActive&&combo>=5){
      shieldActive=false;
      floatPoints(cellSpan(pos),lang==='th'?'🛡️ ป้องกัน!':'🛡️ Blocked!',true);
      tick();marks[pos]='bad';flashChar(cellSpan(pos),true);cardShake();
    }else{
      combo=0;
      score=Math.max(0,score-(userStats.equipped_skills.includes('chillaura')?0:3));
      marks[pos]='bad';flashChar(cellSpan(pos),true);cardShake();updateHeat();
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
  finished=true;clearInterval(timerInt);clearInterval(wpmSampleInt);
  stopGameplayMusic();
  const stage=$('monsterStage');if(stage)stage.classList.remove('playing');

  // Set HP to 0% and defeat active monster
  const hpFill = $('monsterHpFill');
  if (hpFill) hpFill.style.width = '0%';
  const hpText = $('monsterHpText');
  if (hpText) hpText.textContent = '0%';

  const mInfo = MONSTERS[diffKey] || MONSTERS['easy'];
  const activeEl = $(mInfo.id);
  if (activeEl) {
    activeEl.classList.remove('damaged', 'taunt');
    activeEl.classList.add('defeated');
  }
  
  if(!userStats.monsters_killed) userStats.monsters_killed = {};
  userStats.monsters_killed[currentMonsterId] = (userStats.monsters_killed[currentMonsterId] || 0) + 1;

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
  
  let correctWords = 0;
  const wordsList = target.split(' ');
  let charIdx = 0;
  for (let i = 0; i < wordsList.length; i++) {
    const word = wordsList[i];
    if (word.length === 0) {
      charIdx++;
      continue;
    }
    let wordOk = true;
    for (let j = 0; j < word.length; j++) {
      if (marks[charIdx + j] !== 'ok') {
        wordOk = false;
        break;
      }
    }
    if (wordOk) {
      correctWords++;
    }
    charIdx += word.length + 1;
  }
  let gainedGold = correctWords;
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
  renderDetailedResult(w,acc,t);
  updateProfileBar();
  if (typeof updateQuestProgress === 'function') {
    await updateQuestProgress({ wpm: w, acc: acc, combo: maxCombo, diff: diffKey, stars: stars });
  }
  await saveUserStats();
}

/* ===== DETAILED RESULT ANALYSIS ===== */
function calcConsistency(){
  if(wpmHistory.length<2)return 100;
  const avg=wpmHistory.reduce((a,b)=>a+b,0)/wpmHistory.length;
  const variance=wpmHistory.reduce((s,v)=>s+Math.pow(v-avg,2),0)/wpmHistory.length;
  const stdDev=Math.sqrt(variance);
  return Math.max(0,Math.round(100-stdDev*2));
}

function generateCoachingTips(w,acc,consistency){
  const tips=[];
  const isTh=lang==='th';
  const hasErrors=Object.keys(errorMap).length>0;
  if(acc<80)tips.push({icon:'target',text:isTh?'เน้นความแม่นยำก่อนความเร็ว — ลองลดสปีดแล้วพิมพ์ให้ถูกทุกตัว':'Focus on accuracy first — slow down and type every character correctly',color:'var(--coral)'});
  else if(acc<95)tips.push({icon:'target',text:isTh?'ใกล้แล้ว! พยายามอ่านล่วงหน้า 2-3 ตัวอักษรจะช่วยได้':'Almost there! Try reading 2-3 characters ahead',color:'var(--amber)'});
  if(w<20)tips.push({icon:'kb',text:isTh?'ลองฝึกโหมดวางนิ้ว (Touch Typing) เพื่อจำตำแหน่งแป้นด้วยกล้ามเนื้อ':'Try the Touch Typing tutorial to build muscle memory',color:'var(--cyan)'});
  else if(w<40&&acc>=90)tips.push({icon:'gauge',text:isTh?'ดีมาก! ค่อยๆ เพิ่มสปีดทีละนิด อย่ากลัวผิด':'Great! Gradually increase speed — don\'t be afraid to make mistakes',color:'var(--mint)'});
  if(consistency<50)tips.push({icon:'gauge',text:isTh?'ความเร็วขึ้น-ลงเยอะ — ลองรักษาจังหวะให้สม่ำเสมอ':'Speed fluctuates a lot — try to maintain a steady rhythm',color:'var(--purple)'});
  if(!hasErrors&&acc===100)tips.push({icon:'star',text:isTh?'สุดยอด! ลองท้าทายด่านที่ยากขึ้นเพื่อยกระดับ!':'Outstanding! Try a harder difficulty to level up!',color:'var(--amber)'});
  if(hasErrors){
    const sorted=Object.entries(errorMap).sort((a,b)=>b[1]-a[1]).slice(0,3);
    const chars=sorted.map(e=>`"${e[0]===' '?(isTh?'เว้นวรรค':'Space'):e[0]}"`).join(', ');
    tips.push({icon:'bulb',text:isTh?`ตัวอักษรที่ผิดบ่อย: ${chars} — ลองฝึกแป้นเหล่านี้โดยเฉพาะ`:`Most missed characters: ${chars} — practice these keys specifically`,color:'var(--coral)'});
  }
  if(tips.length===0)tips.push({icon:'star',text:isTh?'ทำได้ดีมาก! ฝึกทุกวันจะเก่งขึ้นเรื่อยๆ':'Great job! Practice daily to keep improving',color:'var(--mint)'});
  return tips;
}

function renderDetailedResult(w,acc,t){
  const cps=(correctChars/t).toFixed(1);
  const rawWpm=Math.round((totalKeys/5)/(t/60));
  const consistency=calcConsistency();
  const tips=generateCoachingTips(w,acc,consistency);
  const isTh=lang==='th';

  const container=$('detailedResult');
  if(!container)return;

  // Extra stats row
  let html=`<div class="detail-stats">`;
  html+=`<div class="ds-item has-tip" data-tip-th="Raw WPM — ความเร็วดิบก่อนหักพิมพ์ผิด" data-tip-en="Raw WPM — speed before deducting errors"><div class="ds-val" style="color:var(--amber)">${rawWpm}</div><div class="ds-lbl">Raw WPM</div></div>`;
  html+=`<div class="ds-item has-tip" data-tip-th="Characters Per Second — จำนวนตัวอักษรต่อวินาที" data-tip-en="Characters Per Second"><div class="ds-val" style="color:var(--cyan)">${cps}</div><div class="ds-lbl">CPS</div></div>`;
  html+=`<div class="ds-item has-tip" data-tip-th="Consistency — ความสม่ำเสมอของสปีด (100% = เท่ากันตลอด)" data-tip-en="Consistency — how steady your speed is (100% = perfectly even)"><div class="ds-val" style="color:var(--purple)">${consistency}%</div><div class="ds-lbl">${isTh?'สม่ำเสมอ':'Consistency'}</div></div>`;
  html+=`<div class="ds-item has-tip" data-tip-th="จำนวนครั้งที่พิมพ์ผิดทั้งหมด" data-tip-en="Total number of wrong keystrokes"><div class="ds-val" style="color:var(--coral)">${errors}</div><div class="ds-lbl">${isTh?'พิมพ์ผิด':'Errors'}</div></div>`;
  html+=`</div>`;

  // WPM Chart
  html+=`<div class="wpm-chart-wrap"><canvas id="wpmChart" width="500" height="160"></canvas></div>`;

  // Error heatmap
  const sortedErrors=Object.entries(errorMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  html+=`<div class="error-section">`;
  html+=`<div class="section-title">${ICON('target')} ${isTh?'ตัวอักษรที่ผิดบ่อย':'Most Missed Characters'}</div>`;
  if(sortedErrors.length===0){
    html+=`<div class="error-perfect">${isTh?'🎉 สมบูรณ์แบบ! ไม่มีตัวผิดเลย':'🎉 Perfect! No mistakes at all'}</div>`;
  }else{
    html+=`<div class="error-badges">`;
    sortedErrors.forEach(([ch,cnt])=>{
      const label=ch===' '?(isTh?'เว้นวรรค':'Space'):ch;
      html+=`<span class="error-badge"><span class="eb-char">${label}</span><span class="eb-cnt">×${cnt}</span></span>`;
    });
    html+=`</div>`;
  }
  html+=`</div>`;

  // Coaching tips
  html+=`<div class="coaching-panel">`;
  html+=`<div class="section-title">${ICON('bulb')} ${isTh?'คำแนะนำการฝึก':'Coaching Tips'}</div>`;
  tips.forEach(tip=>{
    html+=`<div class="coach-tip"><span class="ct-icon" style="color:${tip.color}">${ICON(tip.icon)}</span><span class="ct-text">${tip.text}</span></div>`;
  });
  html+=`</div>`;

  container.innerHTML=html;
  updateTooltips();

  // Draw chart after DOM update
  requestAnimationFrame(()=>drawWpmChart());
}

function drawWpmChart(){
  const canvas=$('wpmChart');
  if(!canvas||wpmHistory.length<2)return;
  const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const pad={l:40,r:16,t:12,b:28};
  const cW=W-pad.l-pad.r,cH=H-pad.t-pad.b;
  ctx.clearRect(0,0,W,H);

  const maxW=Math.max(...wpmHistory,20);
  const stepY=Math.ceil(maxW/4);
  const gridMax=stepY*4;

  // Grid
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
  for(let i=0;i<=4;i++){
    const y=pad.t+cH-(cH*i/4);
    ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(pad.l+cW,y);ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.3)';ctx.font='10px "IBM Plex Mono"';ctx.textAlign='right';
    ctx.fillText(stepY*i,pad.l-6,y+3);
  }
  // X labels
  ctx.fillStyle='rgba(255,255,255,.3)';ctx.textAlign='center';ctx.font='10px "IBM Plex Mono"';
  const maxX=wpmHistory.length;
  for(let i=0;i<maxX;i+=Math.max(1,Math.floor(maxX/6))){
    const x=pad.l+(cW*i/(maxX-1||1));
    ctx.fillText(i+'s',x,H-6);
  }

  // WPM line
  ctx.strokeStyle='rgba(255,180,61,.9)';ctx.lineWidth=2.5;ctx.lineJoin='round';
  ctx.shadowColor='rgba(255,180,61,.4)';ctx.shadowBlur=8;
  ctx.beginPath();
  wpmHistory.forEach((v,i)=>{
    const x=pad.l+(cW*i/(maxX-1||1));
    const y=pad.t+cH-(cH*Math.min(v,gridMax)/gridMax);
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
  });
  ctx.stroke();ctx.shadowBlur=0;

  // Accuracy line
  if(accHistory.length>=2){
    ctx.strokeStyle='rgba(95,230,168,.6)';ctx.lineWidth=1.5;ctx.setLineDash([4,4]);
    ctx.beginPath();
    accHistory.forEach((v,i)=>{
      const x=pad.l+(cW*i/(maxX-1||1));
      const y=pad.t+cH-(cH*(v/100)*gridMax/gridMax);
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.stroke();ctx.setLineDash([]);
  }

  // Legend
  const lx=pad.l+8,ly=pad.t+14;
  ctx.fillStyle='rgba(255,180,61,.9)';ctx.fillRect(lx,ly-4,14,3);
  ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='10px "IBM Plex Mono"';ctx.textAlign='left';
  ctx.fillText('WPM',lx+18,ly);
  ctx.fillStyle='rgba(95,230,168,.6)';ctx.fillRect(lx+56,ly-4,14,3);
  ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillText('Acc',lx+74,ly);
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
  const isTh = lang === 'th';
  if ($('lblAcademy')) $('lblAcademy').textContent = isTh ? 'สำนักฝึกวิชา' : 'Academy';
  if ($('lblTutorial')) $('lblTutorial').textContent = isTh ? 'ฝึกวางนิ้ว' : 'Finger Guide';
  if ($('lblQuests')) $('lblQuests').textContent = isTh ? 'ภารกิจ & อันดับ' : 'Quests & Rank';
  renderFooter();
  if (screens && screens.game && screens.game.classList.contains('on')) {
    startGame(diffKey);
  }
}

/* ===== BOOT ===== */
async function bootGame(){
  const ok=await initApp({requireAuth:true});
  if(!ok)return;

  // LINE Share button click logic
  if ($('btnShareLine')) {
    $('btnShareLine').onclick = async () => {
      if (!window.liff) return;
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      const isTh = lang === 'th';
      const diffName = DIFFS[diffKey].name[isTh ? 'th' : 'en'];
      
      const flexMessage = {
        type: "flex",
        altText: isTh 
          ? `ฉันทำคะแนนฝึกพิมพ์ดีด KeyQuest ได้ ${latestResult.score} คะแนน!` 
          : `I scored ${latestResult.score} in KeyQuest!`,
        contents: {
          type: "bubble",
          size: "medium",
          hero: {
            type: "image",
            url: "https://keyquest-game.web.app/logo.png",
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover",
            backgroundColor: "#0c0a14"
          },
          body: {
            type: "box",
            layout: "vertical",
            backgroundColor: "#0c0a14",
            paddingAll: "20px",
            contents: [
              {
                type: "text",
                text: "KEYQUEST",
                weight: "bold",
                color: "#ffb43d",
                size: "sm",
                letterSpacing: "2px"
              },
              {
                type: "text",
                text: isTh ? "สรุปผลการฝึกพิมพ์ดีด" : "Typing Test Results",
                weight: "bold",
                color: "#ffffff",
                size: "xl",
                margin: "xs"
              },
              {
                type: "box",
                layout: "vertical",
                margin: "md",
                spacing: "sm",
                contents: [
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: isTh ? "ระดับความยาก" : "Difficulty",
                        color: "#8b83b0",
                        size: "sm"
                      },
                      {
                        type: "text",
                        text: diffName,
                        color: "#ffffff",
                        size: "sm",
                        weight: "bold",
                        align: "end"
                      }
                    ]
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "Speed (WPM)",
                        color: "#8b83b0",
                        size: "sm"
                      },
                      {
                        type: "text",
                        text: `${Math.round(latestResult.wpm)} WPM`,
                        color: "#ffb43d",
                        size: "sm",
                        weight: "bold",
                        align: "end"
                      }
                    ]
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: isTh ? "ความแม่นยำ" : "Accuracy",
                        color: "#8b83b0",
                        size: "sm"
                      },
                      {
                        type: "text",
                        text: `${latestResult.acc}%`,
                        color: "#5fe6a8",
                        size: "sm",
                        weight: "bold",
                        align: "end"
                      }
                    ]
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: isTh ? "เวลาที่ใช้" : "Time",
                        color: "#8b83b0",
                        size: "sm"
                      },
                      {
                        type: "text",
                        text: `${latestResult.time.toFixed(1)}s`,
                        color: "#54d6ff",
                        size: "sm",
                        weight: "bold",
                        align: "end"
                      }
                    ]
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: isTh ? "คะแนนรวม" : "Total Score",
                        color: "#8b83b0",
                        size: "sm"
                      },
                      {
                        type: "text",
                        text: `${latestResult.score}`,
                        color: "#ff5d6c",
                        size: "sm",
                        weight: "bold",
                        align: "end"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          footer: {
            type: "box",
            layout: "vertical",
            backgroundColor: "#0c0a14",
            paddingAll: "15px",
            contents: [
              {
                type: "button",
                action: {
                  type: "uri",
                  label: isTh ? "ท้าทายเพื่อฝึกพิมพ์ดีด" : "Challenge Me!",
                  uri: "https://keyquest-game.web.app"
                },
                style: "primary",
                color: "#ffb43d"
              }
            ]
          }
        }
      };
      
      try {
        const res = await liff.shareTargetPicker([flexMessage]);
        if (res) {
          Swal.fire({
            title: isTh ? 'แชร์สำเร็จ!' : 'Shared Successfully!',
            icon: 'success',
            background: '#1a1a2e', color: '#fff'
          });
        }
      } catch (err) {
        console.error('Share failed:', err);
      }
    };
  }

  // Initialize LIFF for game sharing
  if (window.liff) {
    try {
      if (!liff.isInitialized()) {
        await liff.init({ liffId: LIFF_ID });
      }
      if (liff.isLoggedIn() || liff.isApiAvailable('shareTargetPicker')) {
        const btn = $('btnShareLine');
        if (btn) btn.style.display = 'inline-flex';
      }
    } catch(e) {
      console.warn('LIFF init in game page failed:', e);
    }
  }


  initScreens();
  onLangChange();

  // Wire buttons
  $('btnBack').onclick=()=>{clearInterval(timerInt);stopGameplayMusic();const stage=$('monsterStage');if(stage)stage.classList.remove('playing');showScreen(screens,'menu');};
  $('btnMenu').onclick=()=>showScreen(screens,'menu');
  $('btnRetry').onclick=()=>launchWithCountdown(diffKey);
  $('btnNext').onclick=()=>{const idx=DIFF_ORDER.indexOf(diffKey);launchWithCountdown(DIFF_ORDER[Math.min(idx+1,DIFF_ORDER.length-1)]);};
  $('btnGoAcademy').onclick=()=>{window.location.href='academy.html';};
  $('btnGoTutorial').onclick=()=>{window.location.href='tutorial.html';};
  $('btnGoQuests').onclick=()=>{window.location.href='quests.html';};

  // Menu arrow key navigation
  window.addEventListener('keydown',menuKeyHandler);

  setupInput();
  showScreen(screens,'menu');
}
