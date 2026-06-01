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
  renderGuide();
}

/* ===== RENDER GUIDE CONTENT ===== */
function renderGuide() {
  const container = $('guideContainer');
  if (!container) return;
  const isTh = lang === 'th';

  $('lblTabLessons').textContent = isTh ? 'บทเรียน' : 'Lessons';
  $('lblTabGuide').textContent = isTh ? 'คู่มือ & เทคนิค' : 'Guide & Tips';

  if (isTh) {
    container.innerHTML = `
      <h3>🖐 เทคนิคการฝึกพิมพ์สัมผัส (Touch Typing Guide)</h3>
      <p class="intro">
        การฝึกพิมพ์สัมผัส (Touch Typing) เป็นทักษะสำคัญที่ช่วยประหยัดเวลา เพิ่มประสิทธิภาพการทำงาน และลดความเสี่ยงจากอาการปวดเมื่อยหรือออฟฟิศซินโดรม 
        หัวใจหลักของการพิมพ์สัมผัสคือการสร้าง <strong>หน่วยความจำกล้ามเนื้อ (Muscle Memory)</strong> เพื่อให้สมองสั่งการนิ้วมือได้อัตโนมัติโดยไม่ต้องใช้สายตามอง
      </p>

      <div class="guide-card">
        <h4><span class="num">1</span> การจัดท่าทางและสรีระให้ถูกต้อง (Ergonomics)</h4>
        <p class="guide-card-p">การจัดท่าทางเป็นพื้นฐานสำคัญที่สุดเพื่อป้องกันความเมื่อยล้าและทำให้การเคลื่อนไหวนิ้วเป็นไปอย่างอิสระ:</p>
        <ul class="guide-sub-list">
          <li><strong>ท่านั่ง:</strong> นั่งหลังตรง สะโพกชิดพนักพิง ห่างจากขอบโต๊ะประมาณ 1 คืบ และวางเท้าให้ราบกับพื้นทั้งสองข้างเพื่อความมั่นคง</li>
          <li><strong>แขนและข้อมือ:</strong> ปล่อยแขนตามสบายให้ข้อศอกตั้งฉากหรือขนานกับพื้นโต๊ะ ข้อมือควรลอยเหนือแป้นพิมพ์ (ห้ามวางทับหรือตกลงบนขอบโต๊ะเด็ดขาด) เพื่อลดการกดทับเส้นประสาทและให้นิ้วขยับได้คล่องตัว</li>
          <li><strong>นิ้วมือ:</strong> งอนิ้วให้โค้งเหมือนตะขอ (ประมาณ 2 ข้อ) และสัมผัสแป้นพิมพ์ด้วย "ปลายนิ้วหรือจมูกเล็บ" ในแนวดิ่ง</li>
        </ul>
      </div>

      <div class="guide-card">
        <h4><span class="num">2</span> การยึดตำแหน่ง "แป้นเหย้า" (Home Row) เป็นศูนย์กลางเสมอ</h4>
        <p class="guide-card-p">แป้นเหย้าคือจุดพักนิ้วมือ (ภาษาอังกฤษคือ A S D F และ J K L ; ส่วนภาษาไทยคือ ฟ ห ก ด และ ่ า ส ว)</p>
        <ul class="guide-sub-list">
          <li><strong>รอยนูนสัมผัส:</strong> บนแป้นพิมพ์มาตรฐานจะมีรอยนูนบนปุ่ม F และ J (หรือ ด และ ่) เพื่อให้ใช้นิ้วชี้สัมผัสหาจุดศูนย์กลางได้โดยไม่ต้องก้มมอง</li>
          <li><strong>กฎสำคัญ:</strong> เมื่อเอื้อมนิ้วไปกดปุ่มอื่นเสร็จแล้ว ต้องชักนิ้วกลับมาวางพักที่แป้นเหย้าเสมอ การปล่อยให้นิ้วลอยคว้างจะทำให้สมองเสียพิกัดการจำตำแหน่ง</li>
        </ul>
      </div>

      <div class="guide-card">
        <h4><span class="num">3</span> ห้ามก้มมองแป้นพิมพ์เด็ดขาด (Blind Typing)</h4>
        <p class="guide-card-p">นี่คืออุปสรรคใหญ่ที่สุดที่ทำให้คนพิมพ์ช้า การก้มมองแป้นจะทำลายกระแสประสาทการจดจำของกล้ามเนื้อ และทำให้เมื่อยคอ:</p>
        <ul class="guide-sub-list">
          <li><strong>เทคนิคแก้ไข:</strong> ให้สายตาจดจ่ออยู่ที่หน้าจอเท่านั้น หากเผลอมองแป้นบ่อยๆ แนะนำให้นำผ้ามาคลุมมือและแป้นพิมพ์ไว้ หรือใช้แผ่นสติ๊กเกอร์ปิดทับตัวอักษร เพื่อบังคับให้ตัวเองใช้สัมผัสแทนสายตา</li>
          <li><strong>หากลืมปุ่ม:</strong> อย่าเดามั่ว ให้หยุดคิดหรือดูผังคีย์บอร์ดบนหน้าจอ แล้วลองกดปุ่มนั้นซ้ำๆ เพื่อสร้างความคุ้นเคยใหม่</li>
        </ul>
      </div>

      <div class="guide-card">
        <h4><span class="num">4</span> กฎความแม่นยำ 90% (90% Accuracy Rule)</h4>
        <p class="guide-card-p">คุณควรเพิ่มความเร็วในการพิมพ์ก็ต่อเมื่อคุณสามารถรักษาความถูกต้องในการพิมพ์ได้อย่างน้อย 90% ขึ้นไปเท่านั้น หากความแม่นยำต่ำกว่าเกณฑ์ควรลดความเร็วในการพิมพ์ลงจนกว่าความแม่นยำจะกลับมาสู่ระดับเดิม:</p>
        <ul class="guide-sub-list">
          <li><strong>ประหยัดเวลามากกว่า:</strong> การพยายามพิมพ์เร็วเกินทักษะทำให้ผิดบ่อย ซึ่งการตามแก้คำผิดเสียเวลามากกว่าพิมพ์ช้าๆ ให้ถูกตั้งแต่แรก 2-3 เท่า</li>
          <li><strong>ป้องกันความจำที่ผิดพลาด:</strong> หากพิมพ์ผิดบ่อยๆ สมองและกล้ามเนื้อจะจดจำรูปแบบการก้าวนิ้วที่ผิดพลาดไปใช้</li>
          <li><strong>ป้องกันนิสัยที่ไม่ดี:</strong> การพิมพ์ผิดแล้วต้องตามแก้เรื่อยๆ จะสร้างความหงุดหงิดและนำไปสู่พฤติกรรมการพิมพ์ที่แย่ลง</li>
          <li><strong>ช่วยให้ความเร็วสุทธิ (Net WPM) ดีขึ้น:</strong> หากฝืนพิมพ์เร็วแต่ผิดพลาดสูง ท้ายที่สุดแล้วความเร็วสุทธิของคุณจะน้อยกว่าการยอมพิมพ์ช้าลงแต่พิมพ์ได้อย่างแม่นยำ</li>
          <li><strong>สร้างรากฐานที่มั่นคง:</strong> เมื่อพิมพ์ได้อย่างถูกต้องจนร่างกายจดจำได้โดยอัตโนมัติแล้ว ความเร็วในการพิมพ์จะค่อยๆ เพิ่มขึ้นมาเองตามธรรมชาติ</li>
        </ul>
      </div>

      <div class="guide-card">
        <h4><span class="num">5</span> เทคนิคการก้าวนิ้วและการอ่าน</h4>
        <ul class="guide-sub-list">
          <li><strong>การเคาะแป้น:</strong> ใช้วิธีแตะหรือเคาะเบาๆ ด้วยแรงที่น้อยที่สุด แล้วสปริงนิ้วขึ้นทันที ไม่ควรกดแป้นแช่ค้างไว้หรือกระแทกแรงๆ</li>
          <li><strong>การอ่านข้อความ:</strong> เมื่อเริ่มชำนาญขึ้น ให้ปรับวิธีมองข้อความต้นฉบับ โดยอ่านรวบเป็นกลุ่มคำหรือประโยค (Sight-reading) แทนการจ้องสะกดทีละตัวอักษร จะช่วยให้สมองสั่งการกล้ามเนื้อได้ลื่นไหลขึ้น</li>
        </ul>
      </div>

      <div class="guide-card">
        <h4><span class="num">6</span> ฝึกซ้อมสม่ำเสมอด้วยเวลาสั้นๆ (Consistency is Key)</h4>
        <p class="guide-card-p">การฝึกพิมพ์เป็นเวลานานแบบมาราธอนจะทำให้เกิดความล้าและขาดสมาธิ:</p>
        <ul class="guide-sub-list">
          <li><strong>เวลาที่เหมาะสม:</strong> ฝึกเพียงวันละ 15 - 30 นาที แต่ทำให้สม่ำเสมอทุกวัน สมองจะประมวลผลและพัฒนาทักษะได้ดีกว่า</li>
          <li><strong>แหล่งฝึกซ้อมเสริม:</strong> นอกเหนือจากการพิมพ์เล่นในคีย์เควสต์ คุณสามารถใช้เว็บไซต์ฝึกพิมพ์สัมผัส เช่น TypingStudy, Keybr, 10FastFingers หรือ TypingClub เพื่อช่วยประเมินความเร็ว (WPM) และชี้เป้าจุดที่นิ้วของคุณยังทำได้ไม่ดี</li>
        </ul>
      </div>
    `;
  } else {
    container.innerHTML = `
      <h3>🖐 Touch Typing Guide & Techniques</h3>
      <p class="intro">
        Touch typing is an essential skill that saves time, increases work efficiency, and reduces the risk of muscle strain. 
        The core of touch typing is developing <strong>Muscle Memory</strong>, allowing the brain to control your fingers automatically without looking.
      </p>

      <div class="guide-card">
        <h4><span class="num">1</span> Correct Posture and Ergonomics</h4>
        <p class="guide-card-p">Posture is the foundation to prevent fatigue and allow fingers to move freely:</p>
        <ul class="guide-sub-list">
          <li><strong>Seating:</strong> Sit upright, back close to the backrest, about one hand-span away from the desk. Keep both feet flat on the floor for stability.</li>
          <li><strong>Wrists & Arms:</strong> Keep elbows relaxed and parallel to the desk. Wrists should float above the keyboard (never rest them on the desk or key edge) to reduce pressure and keep fingers agile.</li>
          <li><strong>Fingers:</strong> Curve fingers like hooks (bending at the first two joints) and press keys vertically with your fingertips or nail beds.</li>
        </ul>
      </div>

      <div class="guide-card">
        <h4><span class="num">2</span> Stay Centered on the "Home Row"</h4>
        <p class="guide-card-p">The home row is the resting position (A S D F and J K L ; in English, ฟ ห ก ด and ่ า ส ว in Thai).</p>
        <ul class="guide-sub-list">
          <li><strong>Tactile Bumps:</strong> Standard keyboards have tactile bumps on the F and J keys (or ด and ่) to help you locate the center without looking down.</li>
          <li><strong>Golden Rule:</strong> Always return your fingers to the home row after pressing other keys. Leaving fingers floating makes the brain lose track of coordinates.</li>
        </ul>
      </div>

      <div class="guide-card">
        <h4><span class="num">3</span> Never Look at the Keyboard (Blind Typing)</h4>
        <p class="guide-card-p">Looking down breaks muscle memory reinforcement and strains your neck:</p>
        <ul class="guide-sub-list">
          <li><strong>Technique:</strong> Keep your eyes focused entirely on the screen. If you struggle, cover your hands with a cloth or use blank sticker covers.</li>
          <li><strong>Forget a key:</strong> Don't guess blindly. Look at the on-screen keyboard layout and practice pressing that key repeatedly to rebuild familiarity.</li>
        </ul>
      </div>

      <div class="guide-card">
        <h4><span class="num">4</span> 90% Accuracy Rule</h4>
        <p class="guide-card-p">You should only increase typing speed when you can maintain at least 90% accuracy. If it falls below, slow down until accuracy returns to normal.</p>
        <ul class="guide-sub-list">
          <li><strong>Save Time:</strong> Typing faster than your skill level causes errors. Correcting mistakes takes 2-3 times longer than typing slowly and accurately from the start.</li>
          <li><strong>Prevent Bad Muscle Memory:</strong> Typing wrong keys teaches your muscles incorrect paths.</li>
          <li><strong>Reduce Frustration:</strong> Stop constant deleting/correcting to maintain a smooth typing experience and positive habit.</li>
          <li><strong>Better Net Speed (Net WPM):</strong> Ultimately, your net typing speed will be higher than rushing with low accuracy.</li>
          <li><strong>Solid Foundation:</strong> Once typing accurately becomes an automatic physical response, speed naturally increases.</li>
        </ul>
      </div>

      <div class="guide-card">
        <h4><span class="num">5</span> Keystrokes & Sight Reading</h4>
        <ul class="guide-sub-list">
          <li><strong>Keystrokes:</strong> Tap keys lightly with minimal force and spring back immediately. Do not smash or hold keys down.</li>
          <li><strong>Reading:</strong> As you improve, read in word groups or phrases (sight-reading) rather than spelling letter-by-letter.</li>
        </ul>
      </div>

      <div class="guide-card">
        <h4><span class="num">6</span> Practice Consistently in Short Sessions</h4>
        <p class="guide-card-p">Long marathon sessions cause fatigue and drop in focus.</p>
        <ul class="guide-sub-list">
          <li><strong>Duration:</strong> Practice 15 - 30 minutes daily. Consistency helps the brain process and retain motor skills much better.</li>
          <li><strong>Extra Tools:</strong> Supplement your practice on sites like TypingStudy, Keybr, 10FastFingers, or TypingClub to track your WPM and identify weak spots.</li>
        </ul>
      </div>
    `;
  }
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

  const btnTabLessons = $('btnTabLessons');
  const btnTabGuide = $('btnTabGuide');
  const lessonsView = $('lessonsView');
  const guideView = $('guideView');

  if (btnTabLessons && btnTabGuide && lessonsView && guideView) {
    btnTabLessons.onclick = () => {
      if (btnTabLessons.classList.contains('active')) return;
      playMenuBeep();
      btnTabLessons.classList.add('active');
      btnTabGuide.classList.remove('active');
      lessonsView.classList.add('on');
      guideView.classList.remove('on');
    };
    btnTabGuide.onclick = () => {
      if (btnTabGuide.classList.contains('active')) return;
      playMenuBeep();
      btnTabGuide.classList.add('active');
      btnTabLessons.classList.remove('active');
      guideView.classList.add('on');
      lessonsView.classList.remove('on');
    };
  }

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
