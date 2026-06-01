/* ====================================================================
   tutorial.js — Touch Typing Tutorial (6 Lessons)
   ==================================================================== */

/* ===== LESSON DATA ===== */
const LESSONS = [
  {
    id:1,
    keys_th:['ก','ด','เ','า','ส','ว','แ'],
    keys_en:['a','s','d','f','j','k','l',';'],
    name_th:'แป้นเหย้า (Home Row)',
    name_en:'Home Row Keys',
    desc_th:'ฝึกวางนิ้วที่ตำแหน่งเริ่มต้น — แป้นที่สำคัญที่สุด',
    desc_en:'Practice placing fingers on the home position — the most important keys',
    guide_th:'วางนิ้วซ้าย: ก ด เ า · นิ้วขวา: ส ว แ ง\nนิ้วหัวแม่มือวางที่ Space Bar',
    guide_en:'Left hand: A S D F · Right hand: J K L ;\nThumbs rest on Space Bar',
    count:20
  },
  {
    id:2,
    keys_th:['ฟ','ห','ก','ด','เ','า','ส','ว'],
    keys_en:['a','s','d','f','g','h','j','k','l'],
    name_th:'แป้นเหย้า + กลาง',
    name_en:'Home Row Extended',
    desc_th:'เพิ่มปุ่มกลางแถว เริ่มพิมพ์คำจริง',
    desc_en:'Add center keys — start typing real words',
    guide_th:'ใช้นิ้วชี้ทั้งสองข้างเอื้อมมาที่แป้นกลาง',
    guide_en:'Use both index fingers to reach center keys',
    count:25
  },
  {
    id:3,
    keys_th:['ไ','ป','่','ะ','ั','ี','ร','น'],
    keys_en:['q','w','e','r','u','i','o','p'],
    name_th:'แถวบน',
    name_en:'Top Row',
    desc_th:'ฝึกเอื้อมนิ้วขึ้นแถวบน — สระและพยัญชนะที่ใช้บ่อย',
    desc_en:'Reach up to the top row — frequently used keys',
    guide_th:'เอื้อมนิ้วขึ้นจากแป้นเหย้า แล้วกลับมาวางที่เดิม',
    guide_en:'Reach up from home row, then return fingers to home position',
    count:25
  },
  {
    id:4,
    keys_th:['บ','ล','ง','ค','ม','อ','ท'],
    keys_en:['z','x','c','v','b','n','m'],
    name_th:'แถวล่าง',
    name_en:'Bottom Row',
    desc_th:'ฝึกเอื้อมนิ้วลงแถวล่าง — ตัวอักษรที่มักพิมพ์ผิด',
    desc_en:'Reach down to the bottom row — commonly mistyped keys',
    guide_th:'เอื้อมนิ้วลงจากแป้นเหย้า ระวังอย่าเกร็งข้อมือ',
    guide_en:'Reach down from home row — keep wrists relaxed',
    count:25
  },
  {
    id:5,
    keys_th:['ก','ด','เ','า','ส','ว','ไ','ป','บ','ล'],
    keys_en:['a','s','d','f','j','k','l','e','r','t','n','m'],
    name_th:'รวมทุกแถว',
    name_en:'All Rows Combined',
    desc_th:'ผสมทุกแถวเข้าด้วยกัน ฝึกสลับนิ้วอย่างคล่องแคล่ว',
    desc_en:'Mix all rows — practice smooth finger transitions',
    guide_th:'จำตำแหน่งนิ้วให้แม่น กลับมาแป้นเหย้าทุกครั้ง',
    guide_en:'Remember finger positions — always return to home row',
    count:30
  },
  {
    id:6,
    keys_th:['ก','ด','เ','า','ส','ว','แ','ไ','ป','บ','ล','ง','ค','ม','อ','ท','่','ะ','ั','ี','ร','น'],
    keys_en:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    name_th:'ท้าทาย — ทุกตัวอักษร',
    name_en:'Challenge — All Letters',
    desc_th:'พิมพ์ทุกตัวอักษรอย่างรวดเร็ว ทดสอบขีดจำกัดตัวเอง!',
    desc_en:'Type all letters rapidly — test your limits!',
    guide_th:'พิมพ์ให้เร็วที่สุด ไม่ต้องมองแป้น สายตาจ้องจอ!',
    guide_en:'Type as fast as you can — eyes on screen, not keyboard!',
    count:40
  }
];

/* ===== KEYBOARD LAYOUT ===== */
const KB_TH = [
  [{sh:'_',m:'ๅ'},{sh:'+',m:'/'},{sh:'๑',m:'-'},{sh:'๒',m:'ภ'},{sh:'๓',m:'ถ'},{sh:'๔',m:'ุ'},{sh:'ู',m:'ึ'},{sh:'฿',m:'ค'},{sh:'๕',m:'ต'},{sh:'๖',m:'จ'},{sh:'๗',m:'ข'},{sh:'๘',m:'ช'}],
  [{m:'ๆ'},{m:'ไ'},{m:'ำ'},{m:'พ'},{m:'ะ'},{m:'ั'},{m:'ี'},{m:'ร'},{m:'น'},{m:'ย'},{m:'บ'},{m:'ล'}],
  [{m:'ฟ',f:'lp'},{m:'ห',f:'lr'},{m:'ก',f:'lm'},{m:'ด',f:'li'},{m:'เ',f:'li'},{m:'้',f:'ri'},{m:'่',f:'ri'},{m:'า',f:'rm'},{m:'ส',f:'rr'},{m:'ว',f:'rp'},{m:'แ',f:'rp'}],
  [{m:'ผ'},{m:'ป'},{m:'แ'},{m:'อ'},{m:'ิ'},{m:'ื'},{m:'ท'},{m:'ม'},{m:'ใ'},{m:'ฝ'}]
];
const KB_EN = [
  [{m:'1'},{m:'2'},{m:'3'},{m:'4'},{m:'5'},{m:'6'},{m:'7'},{m:'8'},{m:'9'},{m:'0'},{m:'-'},{m:'='}],
  [{m:'q'},{m:'w'},{m:'e'},{m:'r'},{m:'t'},{m:'y'},{m:'u'},{m:'i'},{m:'o'},{m:'p'},{m:'['},{m:']'}],
  [{m:'a',f:'lp'},{m:'s',f:'lr'},{m:'d',f:'lm'},{m:'f',f:'li'},{m:'g',f:'li'},{m:'h',f:'ri'},{m:'j',f:'ri'},{m:'k',f:'rm'},{m:'l',f:'rr'},{m:';',f:'rp'}],
  [{m:'z'},{m:'x'},{m:'c'},{m:'v'},{m:'b'},{m:'n'},{m:'m'},{m:','},{m:'.'},{m:'/'}]
];

/* ===== STATE ===== */
let screens={};
let currentLesson=null;
let practiceTarget='';
let practicePos=0;
let practiceCorrect=0;
let practiceTotal=0;
let practiceStreak=0;
let practiceStarted=false;
let practiceStartTime=0;
const LESSON_KEY='kq_tutorial_progress';

function getLessonProgress(){
  try{return JSON.parse(localStorage.getItem(LESSON_KEY))||{};}catch{return{};}
}
function saveLessonProgress(id,data){
  const p=getLessonProgress();p[id]=data;localStorage.setItem(LESSON_KEY,JSON.stringify(p));
}

/* ===== INIT ===== */
function initScreens(){
  screens={lessonSelect:$('lessonSelect'),practiceScreen:$('practiceScreen'),lessonComplete:$('lessonComplete')};
}

/* ===== RENDER LESSONS ===== */
function renderLessons(){
  const grid=$('lessonsGrid');if(!grid)return;
  const progress=getLessonProgress();
  const isTh=lang==='th';
  $('tutTitle').textContent=isTh?'🖐 ฝึกพิมพ์สัมผัส':'🖐 Touch Typing Tutorial';
  $('tutDesc').textContent=isTh?'เรียนรู้การวางนิ้ว จำตำแหน่งแป้น พิมพ์โดยไม่ต้องมอง':'Learn finger placement, memorize key positions, type without looking';
  $('lblBackGame').textContent=isTh?'กลับเกม':'Back to Game';

  grid.innerHTML='';
  LESSONS.forEach((les,i)=>{
    const done=progress[les.id];
    const prevDone=i===0||progress[LESSONS[i-1].id];
    const locked=!prevDone&&!done;
    const card=document.createElement('div');
    card.className='lesson-card'+(done?' completed':'')+(locked?' locked':'');
    card.innerHTML=`
      <div class="lc-icon"><svg class="ic"><use href="#i-${done?'check':locked?'lock':'hand'}"></use></svg></div>
      <div class="lc-num">${isTh?'บทที่':'Lesson'} ${les.id}</div>
      <div class="lc-name">${isTh?les.name_th:les.name_en}</div>
      <div class="lc-status">${done?'✅':locked?'🔒':''}</div>
    `;
    if(!locked)card.onclick=()=>startLesson(les);
    grid.appendChild(card);
  });
}

/* ===== START LESSON ===== */
function startLesson(les){
  if(window._tutKeyHandler){
    window.removeEventListener('keydown',window._tutKeyHandler);
  }
  currentLesson=les;
  practicePos=0;practiceCorrect=0;practiceTotal=0;practiceStreak=0;practiceStarted=false;
  const isTh=lang==='th';
  const keys=isTh?les.keys_th:les.keys_en;

  // Generate random sequence
  let seq=[];
  for(let i=0;i<les.count;i++)seq.push(keys[Math.floor(Math.random()*keys.length)]);
  practiceTarget=seq.join('');

  // Update UI
  $('lessonTitle').textContent=(isTh?'บทที่ ':'Lesson ')+les.id+' — '+(isTh?les.name_th:les.name_en);
  $('lessonProgressText').textContent=`0 / ${les.count}`;
  $('fgTitle').textContent='💡 '+(isTh?les.guide_th:les.guide_en).split('\n')[0];
  $('fgDesc').textContent=(isTh?les.guide_th:les.guide_en).split('\n').slice(1).join('\n');
  $('lblBackLesson').textContent=isTh?'บทเรียน':'Lessons';
  $('psAccLbl').textContent=isTh?'แม่นยำ':'Accuracy';
  $('psStreakLbl').textContent=isTh?'ต่อเนื่อง':'Streak';
  $('psAcc').textContent='100%';$('psWpm').textContent='0';$('psStreak').textContent='0';

  renderPracticeText();
  renderPracticeKb();
  highlightKey();
  showScreen(screens,'practiceScreen');

  // Input handler
  window._tutKeyHandler=e=>{
    if(!screens.practiceScreen.classList.contains('on'))return;
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    if(e.key.length===1){e.preventDefault();handlePracticeKey(e.key);}
  };
  window.addEventListener('keydown',window._tutKeyHandler);
}

/* ===== RENDER PRACTICE TEXT ===== */
function renderPracticeText(){
  const box=$('practiceTextBox');
  let html='';
  for(let i=0;i<practiceTarget.length;i++){
    let cls='pending';
    if(i<practicePos)cls='done';
    if(i===practicePos)cls='cur';
    const char=practiceTarget[i];
    const displayChar=(char!==' '&&isCombiningThai(char.codePointAt(0)))?'\u25CC'+char:char;
    html+=`<span class="${cls}">${displayChar}</span>`;
  }
  box.innerHTML=html;
}

/* ===== RENDER KEYBOARD ===== */
function renderPracticeKb(){
  const kb=$('practiceKb');
  const layout=lang==='th'?KB_TH:KB_EN;
  kb.innerHTML='';
  layout.forEach(row=>{
    const rowDiv=document.createElement('div');
    rowDiv.className='kb-row';
    row.forEach(k=>{
      const key=document.createElement('div');
      key.className='key';
      if(k.f)key.classList.add('f-'+k.f);
      key.dataset.char=k.m;
      key.innerHTML=`<span class="main">${k.m}</span>${k.sh?`<span class="sh">${k.sh}</span>`:''}${k.f?'<span class="fdot"></span>':''}`;
      rowDiv.appendChild(key);
    });
    // Add space bar to home row
    if(layout.indexOf(row)===2){
      const spRow=document.createElement('div');
      spRow.className='kb-row';
      const sp=document.createElement('div');
      sp.className='key space';sp.dataset.char=' ';sp.innerHTML='<span class="main">Space</span>';
      spRow.appendChild(sp);
      kb.appendChild(rowDiv);
      kb.appendChild(spRow);
      return;
    }
    kb.appendChild(rowDiv);
  });
}

/* ===== HIGHLIGHT KEY ===== */
function highlightKey(){
  const kb=$('practiceKb');
  kb.querySelectorAll('.key').forEach(k=>k.classList.remove('target'));
  if(practicePos>=practiceTarget.length)return;
  const ch=practiceTarget[practicePos];
  const key=kb.querySelector(`.key[data-char="${CSS.escape(ch)}"]`);
  if(key)key.classList.add('target');
}

/* ===== HANDLE KEY ===== */
function handlePracticeKey(ch){
  if(practicePos>=practiceTarget.length)return;
  if(!practiceStarted){
    practiceStarted=true;
    practiceStartTime=performance.now();
    startGameplayMusic();
  }

  practiceTotal++;
  const expected=practiceTarget[practicePos];
  const spans=$('practiceTextBox').children;

  if(ch===expected){
    practiceCorrect++;practiceStreak++;
    spans[practicePos].className='done';
    practicePos++;
    if(practicePos<practiceTarget.length)spans[practicePos].className='cur';
    thock(ch===' ',false);
  }else{
    practiceStreak=0;
    spans[practicePos].className='wrong';
    setTimeout(()=>{if(spans[practicePos])spans[practicePos].className='cur';},300);
    thock(ch===' ',true);
  }

  // Update stats
  const acc=practiceTotal>0?Math.round(practiceCorrect/practiceTotal*100):100;
  const elapsed=(performance.now()-practiceStartTime)/1000;
  const w=elapsed>0?Math.round((practiceCorrect/5)/(elapsed/60)):0;
  $('psAcc').textContent=acc+'%';
  $('psWpm').textContent=w;
  $('psStreak').textContent=practiceStreak;
  $('lessonProgressText').textContent=`${practicePos} / ${currentLesson.count}`;

  highlightKey();

  if(practicePos>=practiceTarget.length){
    finishLesson(w,acc);
  }
}

/* ===== FINISH LESSON ===== */
function finishLesson(w,acc){
  window.removeEventListener('keydown',window._tutKeyHandler);
  stopGameplayMusic();
  const isTh=lang==='th';
  const xpGain=Math.round(20+(w/2)+(acc>95?20:0));

  // Save progress
  saveLessonProgress(currentLesson.id,{wpm:w,acc:acc,xp:xpGain,date:Date.now()});

  // Award XP
  if(typeof userStats!=='undefined'){
    userStats.xp=(userStats.xp||0)+xpGain;
    userStats.gold=(userStats.gold||0)+Math.round(xpGain/2);
    saveUserStats();
    updateProfileBar();
  }

  // Render result
  $('lcTitle').textContent=isTh?'🎉 ผ่านบทเรียน!':'🎉 Lesson Complete!';
  $('lcSub').textContent=(isTh?'บทที่ ':'Lesson ')+currentLesson.id+' — '+(isTh?currentLesson.name_th:currentLesson.name_en);
  $('lcWpm').textContent=w;
  $('lcAcc').textContent=acc+'%';
  $('lcXp').textContent='+'+xpGain;
  $('lcAccLbl').textContent=isTh?'แม่นยำ':'Accuracy';
  $('lblLcBack').textContent=isTh?'บทเรียน':'Lessons';
  $('lblLcNext').textContent=isTh?'บทต่อไป':'Next Lesson';

  winSound();
  showScreen(screens,'lessonComplete');
}

/* ===== LANG CHANGE ===== */
function onLangChange(){
  renderLessons();
  renderFooter();
  if (screens && screens.practiceScreen && screens.practiceScreen.classList.contains('on')) {
    startLesson(currentLesson);
  }
}

/* ===== BOOT ===== */
async function bootTutorial(){
  const ok=await initApp({requireAuth:true});
  if(!ok)return;

  initScreens();
  renderLessons();

  $('btnBackLessons').onclick=()=>{
    window.removeEventListener('keydown',window._tutKeyHandler);
    stopGameplayMusic();
    showScreen(screens,'lessonSelect');renderLessons();
  };
  $('btnLcLessons').onclick=()=>{showScreen(screens,'lessonSelect');renderLessons();};
  $('btnLcNext').onclick=()=>{
    const idx=LESSONS.findIndex(l=>l.id===currentLesson.id);
    if(idx<LESSONS.length-1)startLesson(LESSONS[idx+1]);
    else{showScreen(screens,'lessonSelect');renderLessons();}
  };

  showScreen(screens,'lessonSelect');
}
