
const ICON=(id,cls='')=>`<svg class="ic ${cls}"><use href="#i-${id}"></use></svg>`;
const $=id=>document.getElementById(id);



/* ===== KEYBOARD + FINGER MAP ===== */
const FINGER={'`':'lp','1':'lp','q':'lp','a':'lp','z':'lp','2':'lr','w':'lr','s':'lr','x':'lr','3':'lm','e':'lm','d':'lm','c':'lm',
'4':'li','5':'li','r':'li','t':'li','f':'li','g':'li','v':'li','b':'li','6':'ri','7':'ri','y':'ri','u':'ri','h':'ri','j':'ri','n':'ri','m':'ri',
'8':'rm','i':'rm','k':'rm',',':'rm','9':'rr','o':'rr','l':'rr','.':'rr','0':'rp','-':'rp','=':'rp','p':'rp','[':'rp',']':'rp',';':'rp',"'":'rp','/':'rp','\\':'rp'};
const ROWS=[['1','2','3','4','5','6','7','8','9','0','-','='],['q','w','e','r','t','y','u','i','o','p','[',']'],
['a','s','d','f','g','h','j','k','l',';',"'"],['z','x','c','v','b','n','m',',','.','/']];
const EN_LAYER={};ROWS.flat().forEach(k=>{EN_LAYER[k]={n:k,s:k.toUpperCase()};});
const TH_LAYER={'1':{n:'ๅ',s:'+'},'2':{n:'/',s:'๑'},'3':{n:'-',s:'๒'},'4':{n:'ภ',s:'๓'},'5':{n:'ถ',s:'๔'},'6':{n:'ุ',s:'ู'},'7':{n:'ึ',s:'฿'},'8':{n:'ค',s:'๕'},'9':{n:'ต',s:'๖'},'0':{n:'จ',s:'๗'},'-':{n:'ข',s:'๘'},'=':{n:'ช',s:'๙'},
'q':{n:'ๆ',s:'๐'},'w':{n:'ไ',s:'"'},'e':{n:'ำ',s:'ฎ'},'r':{n:'พ',s:'ฑ'},'t':{n:'ะ',s:'ธ'},'y':{n:'ั',s:'ํ'},'u':{n:'ี',s:'๊'},'i':{n:'ร',s:'ณ'},'o':{n:'น',s:'ฯ'},'p':{n:'ย',s:'ญ'},'[':{n:'บ',s:'ฐ'},']':{n:'ล',s:','},
'a':{n:'ฟ',s:'ฤ'},'s':{n:'ห',s:'ฆ'},'d':{n:'ก',s:'ฏ'},'f':{n:'ด',s:'โ'},'g':{n:'เ',s:'ฌ'},'h':{n:'้',s:'็'},'j':{n:'่',s:'๋'},'k':{n:'า',s:'ษ'},'l':{n:'ส',s:'ศ'},';':{n:'ว',s:'ซ'},"'":{n:'ง',s:'.'},
'z':{n:'ผ',s:'('},'x':{n:'ป',s:')'},'c':{n:'แ',s:'ฉ'},'v':{n:'อ',s:'ฮ'},'b':{n:'ิ',s:'ฺ'},'n':{n:'ื',s:'์'},'m':{n:'ท',s:'?'},',':{n:'ม',s:'ฒ'},'.':{n:'ใ',s:'ฬ'},'/':{n:'ฝ',s:'ฦ'}};

/* ===== RANDOM CONTENT ===== */
const pick=a=>a[Math.floor(Math.random()*a.length)];
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
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

/* ===== OS DETECTION (for keyboard-language switch hint) ===== */
function detectOS(){
  const ua=navigator.userAgent||'';
  const plat=(navigator.userAgentData&&navigator.userAgentData.platform)||navigator.platform||'';
  const s=plat+' '+ua;
  if(/iPhone|iPad|iPod/i.test(ua))return 'ios';
  if(/Android/i.test(ua))return 'android';
  if(/Mac/i.test(s))return 'mac';
  if(/Win/i.test(s))return 'win';
  if(/Linux|X11|CrOS/i.test(s))return 'linux';
  return 'other';
}
const OS=detectOS();
const OS_INFO={
  win:{icon:'win',label:{th:'Windows',en:'Windows'},chips:['Win','Space'],
       alt:{th:'(หรือ Alt + Shift)',en:'(or Alt + Shift)'},text:'Win + Space'},
  mac:{icon:'apple',label:{th:'macOS',en:'macOS'},chips:['Ctrl','Space'],
       alt:{th:'(หรือกดปุ่มลูกโลก / fn บน Mac รุ่นใหม่)',en:'(or the Globe / fn key on newer Macs)'},text:'Ctrl + Space'},
  linux:{icon:'linux',label:{th:'Linux',en:'Linux'},chips:['Super','Space'],
       alt:{th:'(บางเครื่องใช้ Alt + Shift)',en:'(some distros use Alt + Shift)'},text:'Super + Space'},
  ios:{icon:'phone',label:{th:'iPhone / iPad',en:'iPhone / iPad'},chips:null,
       tap:{th:'แตะปุ่มลูกโลกบนแป้นพิมพ์',en:'Tap the globe key on the on-screen keyboard'},text:'ปุ่มลูกโลกบนแป้นพิมพ์'},
  android:{icon:'phone',label:{th:'Android',en:'Android'},chips:null,
       tap:{th:'แตะปุ่มลูกโลกบนแป้นพิมพ์',en:'Tap the globe key on the on-screen keyboard'},text:'ปุ่มลูกโลกบนแป้นพิมพ์'},
  other:{icon:'kb',label:{th:'ระบบของคุณ',en:'your system'},chips:['Alt','Shift'],
       alt:{th:'',en:''},text:'Alt + Shift'}
};
function osSwitchText(){return OS_INFO[OS].text;}
function renderFooter(){
  const i=OS_INFO[OS], head=(lang==='th'?'ตรวจพบ:':'Detected:');
  const tip=(lang==='th'?'สลับแป้นพิมพ์ของเครื่องให้ตรงกับโหมดด้วย':'Switch your device keyboard to match the mode using');
  let keys;
  if(i.chips){keys=i.chips.map(c=>`<span class="kbd">${c}</span>`).join(' + ')+' '+(i.alt[lang]||'');}
  else{keys=(lang==='th'?'<span class="kbd">'+i.tap.th+'</span>':'<span class="kbd">'+i.tap.en+'</span>');}
  $('footerNote').innerHTML=
    `<span class="os-tag">${ICON(i.icon)} ${head} ${i.label[lang]}</span><br>`+
    `${(lang==='th'?'เคล็ดลับ: ':'Tip: ')}${tip} ${keys} · `+
    (lang==='th'?'วางนิ้วตามไกด์สีบนแป้นจำลอง':'follow the coloured finger guide on the on-screen keyboard');
}

/* ===== SOUND — synthesized soft mechanical "thock" ===== */
let soundOn=true,audioCtx=null,masterGain=null,noiseBuf=null;
function ensureAudio(){
  if(audioCtx){if(audioCtx.state==='suspended')audioCtx.resume();return;}
  try{
    audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    masterGain=audioCtx.createGain();masterGain.gain.value=0.5;masterGain.connect(audioCtx.destination);
    const len=Math.floor(audioCtx.sampleRate*0.03);
    noiseBuf=noiseBuf||audioCtx.createBuffer(1,len,audioCtx.sampleRate);
    const d=noiseBuf.getChannelData(0);
    for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.2);
  }catch(e){soundOn=false;}
}
function thock(deep,wrong){
  if(!soundOn)return;ensureAudio();if(!audioCtx)return;
  const t=audioCtx.currentTime;
  const o=audioCtx.createOscillator(),og=audioCtx.createGain();
  o.type='triangle';
  
  // Custom thock sound: lower pitch frequency
  const isThock = userStats && userStats.equipped_skills && userStats.equipped_skills.includes('thocksound');
  const pitchMult = isThock ? 0.65 : 1.0;
  
  const base=(deep?92:150)*(wrong?0.78:1)*(0.96+Math.random()*0.08)*pitchMult;
  o.frequency.setValueAtTime(base,t);
  o.frequency.exponentialRampToValueAtTime(base*0.55,t+0.07);
  const peak=wrong?0.28:(deep?0.5:0.4);
  og.gain.setValueAtTime(0.0001,t);
  og.gain.exponentialRampToValueAtTime(peak,t+0.006);
  og.gain.exponentialRampToValueAtTime(0.0001,t+(deep?0.13:0.085));
  o.connect(og).connect(masterGain);o.start(t);o.stop(t+0.16);
  if(noiseBuf){
    const n=audioCtx.createBufferSource();n.buffer=noiseBuf;
    const nf=audioCtx.createBiquadFilter();nf.type='bandpass';
    nf.frequency.value=wrong?1100:(deep?1600:2300)*pitchMult;nf.Q.value=0.7;
    const ng=audioCtx.createGain();ng.gain.value=wrong?0.1:0.16;
    n.connect(nf).connect(ng).connect(masterGain);n.start(t);n.stop(t+0.03);
  }
}
function tick(){if(!soundOn)return;ensureAudio();if(!audioCtx)return;
  const t=audioCtx.currentTime,o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type='triangle';o.frequency.setValueAtTime(210,t);
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.18,t+0.004);g.gain.exponentialRampToValueAtTime(0.0001,t+0.05);
  o.connect(g).connect(masterGain);o.start(t);o.stop(t+0.06);}
function winSound(){if(!soundOn)return;ensureAudio();if(!audioCtx)return;
  const notes=[523.25,659.25,783.99,1046.5],t0=audioCtx.currentTime;
  notes.forEach((f,i)=>{const t=t0+i*0.09,o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type='triangle';o.frequency.value=f;
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.28,t+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+0.3);
    o.connect(g).connect(masterGain);o.start(t);o.stop(t+0.32);});}
function toggleSound(){soundOn=!soundOn;
  if(soundOn)ensureAudio();
  const b=$('btnSound');b.classList.toggle('off',!soundOn);
  b.querySelector('use').setAttribute('href',soundOn?'#i-vol':'#i-mute');
  if(soundOn)thock(false,false);}

/* ===== MUSIC — generative chill loop (synth, no files) ===== */
let musicOn=true,musicGain=null,musicRunning=false,schedTimer=null,nextStepTime=0,stepN=0;
const BPM=88, SPS=2 /*eighths*/, SECPSTEP=60/BPM/SPS;
const CHORDS=[[261.63,329.63,392.00],[196.00,246.94,392.00],[220.00,261.63,329.63],[174.61,220.00,349.23]]; // C  G  Am  F
const BASS=[130.81,98.00,110.00,87.31];                                                                       // C3 G2 A2 F2
const PENT=[392.00,440.00,523.25,587.33,659.25,783.99];                                                       // G A C5 D5 E5 G5
function startMusic(){
  ensureAudio();if(!audioCtx||musicRunning)return;
  if(!musicGain){musicGain=audioCtx.createGain();musicGain.connect(audioCtx.destination);}
  musicGain.gain.cancelScheduledValues(audioCtx.currentTime);
  musicGain.gain.setValueAtTime(0.0001,audioCtx.currentTime);
  musicGain.gain.linearRampToValueAtTime(0.22,audioCtx.currentTime+1.2);
  musicRunning=true;stepN=0;nextStepTime=audioCtx.currentTime+0.1;
  schedTimer=setInterval(()=>{
    while(nextStepTime<audioCtx.currentTime+0.12){playStep(stepN,nextStepTime);stepN++;nextStepTime+=SECPSTEP;}
  },25);
}
function stopMusic(){musicRunning=false;clearInterval(schedTimer);
  if(musicGain&&audioCtx){musicGain.gain.cancelScheduledValues(audioCtx.currentTime);
    musicGain.gain.linearRampToValueAtTime(0.0001,audioCtx.currentTime+0.4);}}
function mTone(freq,t,dur,peak,type){const o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type=type||'triangle';o.frequency.value=freq;
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+0.04);
  g.gain.exponentialRampToValueAtTime(0.0001,t+dur);o.connect(g).connect(musicGain);o.start(t);o.stop(t+dur+0.05);}
function playStep(n,t){
  const bar=Math.floor(n/8)%4, beat=n%8;
  if(beat===0){ // pad chord + bass at bar start
    CHORDS[bar].forEach(f=>mTone(f,t,SECPSTEP*8*0.95,0.05,'triangle'));
    mTone(BASS[bar],t,SECPSTEP*4,0.10,'sine');
  }
  if(beat===4)mTone(BASS[bar],t,SECPSTEP*4,0.07,'sine');
  if(Math.random()<0.5)mTone(PENT[Math.floor(Math.random()*PENT.length)],t,0.35,0.06,'triangle'); // sparse lead
}
function toggleMusic(){musicOn=!musicOn;
  if(musicOn)startMusic();else stopMusic();
  const b=$('btnMusic');b.classList.toggle('off',!musicOn);
  b.querySelector('use').setAttribute('href',musicOn?'#i-music':'#i-music-off');}

/* ===== STATE & SKILLS SYSTEM ===== */
let lang='th',diffKey='easy',target='',pos=0;
let errors=0,correctChars=0,totalKeys=0,combo=0,maxCombo=0,score=0;
let started=false,finished=false,startTime=0,timerInt=null,charMap={};
let cells=[],posToCell=[],marks=[];
let shieldActive=false; // Gameplay state: Combo Shield active for the current game round


let userStats = {
  xp: 0,
  level: 1,
  gold: 0,
  unlocked_skills: ['homerow'],
  equipped_skills: ['homerow'],
  max_wpm: 0,
  games_played: 0,
  avg_accuracy: 0
};

const SKILLS_DATA = {
  homerow: {
    id: 'homerow',
    title: { th: 'แป้นเหย้าอุ่นเครื่อง', en: 'Home Row Training' },
    desc: { th: 'ได้รับโบนัส XP +10% ในทุกโจทย์การเล่น', en: '+10% XP bonus on every game' },
    cost: 0,
    icon: 'leaf',
    color: 'linear-gradient(160deg, #9be29b, #5fe6a8)',
    benefit: 'xp_bonus'
  },
  comboshield: {
    id: 'comboshield',
    title: { th: 'เกราะป้องกันคอมโบ', en: 'Combo Shield' },
    desc: { th: 'ช่วยรักษาคอมโบเดิมไม่ให้รีเซ็ตเมื่อพิมพ์ผิด 1 ครั้งแรกต่อเกม (คอมโบ 5+)', en: 'Saves your combo from resetting once per game (5+ combo)' },
    cost: 120,
    icon: 'lock',
    color: 'linear-gradient(160deg, #ff8fa0, #ff5d6c)',
    benefit: 'combo_shield'
  },
  goldenfingers: {
    id: 'goldenfingers',
    title: { th: 'ดัชนีทองคำ', en: 'Golden Fingers' },
    desc: { th: 'พิมพ์จบด่านด้วยความเร็ว (WPM) >= 40 จะได้รับทองสองเท่า x2', en: 'Double Gold reward if you finish with WPM >= 40' },
    cost: 200,
    icon: 'medal',
    color: 'linear-gradient(160deg, #ffc863, #ffb43d)',
    benefit: 'double_gold'
  },
  chillaura: {
    id: 'chillaura',
    title: { th: 'ออร่าสงบใจ', en: 'Chill Aura' },
    desc: { th: 'ไม่ลดคะแนนสะสมเมื่อพิมพ์ผิด (ปกติลด -3 คะแนน)', en: 'Zero score penalty for typos (usually -3 points)' },
    cost: 100,
    icon: 'bulb',
    color: 'linear-gradient(160deg, #a5f3fc, #06b6d4)',
    benefit: 'zero_penalty'
  },
  thocksound: {
    id: 'thocksound',
    title: { th: 'เสียงคีย์บอร์ด Thock', en: 'Thock Sound' },
    desc: { th: 'เปลี่ยนเสียงพิมพ์ให้ทุ้ม นุ่มลึก และมีเอกลักษณ์แบบกลไกแท้', en: 'Changes key press sound to a deep mechanical keyboard sound' },
    cost: 80,
    icon: 'kb',
    color: 'linear-gradient(160deg, #e9d5ff, #a855f7)',
    benefit: 'thock_sound'
  },
  cyberpunk: {
    id: 'cyberpunk',
    title: { th: 'ธีมไซเบอร์พังค์', en: 'Cyberpunk Theme' },
    desc: { th: 'ปลดล็อกธีมและเอฟเฟกต์ไฟนีออนสีชมพู/ฟ้าครามสุดล้ำ', en: 'Unlocks a futuristic pink and neon-cyan visual style' },
    cost: 150,
    icon: 'globe',
    color: 'linear-gradient(160deg, #f472b6, #db2777)',
    benefit: 'cyberpunk_theme'
  },
  uxui: {
    id: 'uxui',
    title: { th: 'นักออกแบบ UX/UI', en: 'UX/UI Designer' },
    desc: { th: 'ปลดล็อกธีม "แก้ววิบวับ" (Glassmorphism) และเอฟเฟกต์ประกายไฟเมื่อพิมพ์ถูกต้อง', en: 'Unlocks the Glassmorphism theme and sparkling particle effects on correct key hits' },
    cost: 150,
    icon: 'target',
    color: 'linear-gradient(160deg, #38bdf8, #818cf8)',
    benefit: 'uxui_theme'
  }
};

/* ===== AUTH LANG TRANSLATIONS ===== */
const AUTH_TEXT = {
  th: {
    loginTitle: 'เข้าสู่ระบบคีย์เควสต์',
    loginSubtitle: 'บันทึกสถิติ ระดับเลเวล และทองของคุณลงเซิร์ฟเวอร์',
    registerTitle: 'สมัครสมาชิกคีย์เควสต์',
    registerSubtitle: 'สร้างบัญชีเพื่อบันทึกความก้าวหน้าและปลดล็อกความสามารถพิเศษ',
    emailLabel: 'อีเมล (Email)',
    passwordLabel: 'รหัสผ่าน (Password)',
    submitLogin: 'เข้าสู่ระบบ',
    submitRegister: 'สมัครสมาชิก',
    guestBtn: 'เล่นแบบไม่ลงทะเบียน (Guest)',
    tabLogin: 'เข้าสู่ระบบ',
    tabRegister: 'สมัครสมาชิก',
    required: 'กรุณากรอกข้อมูลให้ครบถ้วน',
    shortPass: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
    authSuccess: 'ดำเนินการสำเร็จ!',
    unlockedMsg: 'ปลดล็อกแล้ว',
    equippedMsg: 'ติดตั้งอยู่',
    equipBtn: 'ติดตั้ง',
    unequipBtn: 'ถอดออก',
    buyBtn: 'ซื้อด้วย',
    goldUnit: 'ทอง',
    xpUnit: 'XP',
    levelUpMsg: 'เลเวลอัป!'
  },
  en: {
    loginTitle: 'Log in to KeyQuest',
    loginSubtitle: 'Save your stats, level, and gold to the server',
    registerTitle: 'Sign up to KeyQuest',
    registerSubtitle: 'Create an account to save progress and unlock unique skills',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    submitLogin: 'Log In',
    submitRegister: 'Sign Up',
    guestBtn: 'Play as Guest (Offline)',
    tabLogin: 'Log In',
    tabRegister: 'Sign Up',
    required: 'Please fill in all fields',
    shortPass: 'Password must be at least 6 characters long',
    authSuccess: 'Action Successful!',
    unlockedMsg: 'Unlocked',
    equippedMsg: 'Equipped',
    equipBtn: 'Equip',
    unequipBtn: 'Unequip',
    buyBtn: 'Buy for',
    goldUnit: 'Gold',
    xpUnit: 'XP',
    levelUpMsg: 'LEVEL UP!'
  }
};

let authMode = 'login'; // 'login' or 'register'

/* Thai combining marks (above/below vowels, tone marks) — attach to the base, not their own cell.
   0x0E31 = Mai Han Akat (vowel sign), 0x0E34-0x0E3A = above/below vowels + Phinthu,
   0x0E47-0x0E4E = Mai Tai Khu, tone marks, Thanthakhat, Nikhahit, Yamakkan.
   Note: 0x0E33 (Sara Am ำ) is NOT a combining mark — it occupies its own visual slot. */
function isCombiningThai(cp){return cp===0x0E31||(cp>=0x0E34&&cp<=0x0E3A)||(cp>=0x0E47&&cp<=0x0E4E);}
function buildCells(str){const out=[];for(let i=0;i<str.length;i++){const cp=str.codePointAt(i);
  if(out.length&&isCombiningThai(cp)){const c=out[out.length-1];c.text+=str[i];c.end=i+1;}
  else out.push({text:str[i],start:i,end:i+1});}return out;}
function cellSpan(i){return $('textBox').children[posToCell[i]];}

const screens={
  auth: $('auth'),
  profile: $('profile'),
  menu: $('menu'),
  game: $('game'),
  result: $('result'),
  academy: $('academy'),
  multiplayer: $('multiplayer')
};

// Multiplayer / Challenge state
let isRoomGame = false;
let currentRoomId = null;
let currentRoomCode = null;
let currentRoomText = null;
let scoreboardInterval = null;
let fallingBgInterval = null;
function initFallingBg() {
  const bg = $('authFallingBg');
  if (!bg) return;
  
  bg.innerHTML = '';
  if (fallingBgInterval) clearInterval(fallingBgInterval);
  
  const symbols = ['✨', '⭐', '❤️', '💖', '⌨️', '🎮', '💡', '🔥', '🌟', '🍀'];
  const characters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                      'ก','ข','ค','ง','จ','ฉ','ช','ซ','ด','ต','ถ','ท','น','บ','ป','ผ','ฝ','พ','ฟ','ม','ย','ร','ล','ว','ส','ห','อ','ฮ'];
  const colors = ['#ffb43d', '#5fe6a8', '#54d6ff', '#ff5d6c', '#9775fa', '#f783ac', '#ffa94d', '#ffd43b'];
  
  // Spawn initial set across the screen
  for (let i = 0; i < 16; i++) {
    spawnItem(true);
  }
  
  // Periodically spawn new ones
  fallingBgInterval = setInterval(() => {
    if (screens.auth.classList.contains('on')) {
      spawnItem(false);
    }
  }, 700);
  
  function spawnItem(initial = false) {
    const item = document.createElement('div');
    const r = Math.random();
    
    if (r < 0.45) {
      item.className = 'falling-item keycap';
      item.textContent = pick(characters);
      if (Math.random() < 0.5) {
        const randomColor = pick(colors);
        item.style.backgroundColor = randomColor + '20'; // translucent background
        item.style.borderColor = randomColor;
        item.style.color = randomColor;
      }
    } else if (r < 0.8) {
      item.className = 'falling-item emoji';
      item.textContent = pick(symbols);
    } else {
      item.className = 'falling-item symbol';
      item.textContent = pick(characters);
      item.style.color = pick(colors);
    }
    
    const size = 18 + Math.random() * 22;
    if (item.classList.contains('keycap')) {
      item.style.width = size + 'px';
      item.style.height = size + 'px';
      item.style.fontSize = (size * 0.45) + 'px';
    } else {
      item.style.fontSize = size + 'px';
    }
    
    const left = Math.random() * 100;
    const duration = 10 + Math.random() * 10; // 10s to 20s
    const delay = initial ? -(Math.random() * duration) : 0;
    const sway = (Math.random() * 120 - 60) + 'px';
    const rot = (Math.random() * 360 + 180) + 'deg';
    const opacity = 0.35 + Math.random() * 0.4;
    
    item.style.left = left + '%';
    item.style.animationDuration = duration + 's';
    item.style.animationDelay = delay + 's';
    item.style.setProperty('--sway', sway);
    item.style.setProperty('--rot', rot);
    item.style.setProperty('--op', opacity);
    
    bg.appendChild(item);
    
    setTimeout(() => {
      item.remove();
    }, duration * 1000);
  }
}

function show(n){
  for(const k in screens){
    const el=screens[k];
    const on=k===n;
    el.classList.toggle('on',on);
    if(on)playEntrance(el);
  }
  // Show profile bar row on all screens except Auth and Profile screens
  $('profileRow').style.display = (n === 'auth' || n === 'profile') ? 'none' : 'flex';

  if (n === 'auth') {
    initFallingBg();
  } else {
    if (fallingBgInterval) {
      clearInterval(fallingBgInterval);
      fallingBgInterval = null;
    }
    const bg = $('authFallingBg');
    if (bg) bg.innerHTML = '';
  }
}
function playEntrance(el){el.classList.remove('anim');void el.offsetWidth;el.classList.add('anim');}

function buildCharMap(){charMap={};const layer=lang==='th'?TH_LAYER:EN_LAYER;
  for(const key in layer){const {n,s}=layer[key];charMap[n]={key,shift:false,finger:FINGER[key]};if(s&&s!==n)charMap[s]={key,shift:true,finger:FINGER[key]};}
  charMap[' ']={key:'space',shift:false,finger:'th'};}

/* ===== KEYBOARD RENDER ===== */
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

/* ===== SUPABASE SYNCING AND PROGRESS ROUTINES ===== */
function changeAvatar(emoji) {
  const avatarKey = 'typing_game_avatar_' + (currentUser ? currentUser.id : 'guest');
  localStorage.setItem(avatarKey, emoji);
  updateProfileUI();
  $('avatarSelectorPanel').style.display = 'none';
  winSound();
}

function renderProfileScreen() {
  const avatarKey = 'typing_game_avatar_' + (currentUser ? currentUser.id : 'guest');
  const userAvatar = localStorage.getItem(avatarKey) || '🦊';
  
  const headerAv = $('headerAvatar');
  if (headerAv) {
    if (userAvatar.startsWith('http')) {
      headerAv.innerHTML = `<img src="${userAvatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
    } else {
      headerAv.textContent = userAvatar;
    }
  }
  
  const largeAv = $('profileAvatarLarge');
  if (largeAv) {
    if (userAvatar.startsWith('http')) {
      largeAv.innerHTML = `<img src="${userAvatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
    } else {
      largeAv.textContent = userAvatar;
    }
  }

  const displayName = lineProfile ? lineProfile.displayName : (currentUser ? currentUser.email.split('@')[0] : (lang === 'th' ? 'ผู้ใช้ทั่วไป' : 'Guest User'));
  $('profileUsernameLarge').textContent = displayName;
  $('profileUserEmail').textContent = lineProfile ? 'LINE User' : (currentUser ? currentUser.email : (lang === 'th' ? 'โหมดเล่นออฟไลน์' : 'Offline Play Mode'));

  const lvl = Math.floor(userStats.xp / 200) + 1;
  const prevLvlXp = (lvl - 1) * 200;
  const levelXp = userStats.xp - prevLvlXp;
  const xpPct = (levelXp / 200) * 100;

  $('profileLvlBadge').textContent = `Lv. ${lvl}`;
  $('profileXpText').textContent = `XP: ${levelXp}/200`;
  $('profileXpBarFill').style.width = `${xpPct}%`;

  $('profStatGames').textContent = userStats.games_played || 0;
  $('profStatWpm').textContent = userStats.max_wpm || 0;
  $('profStatAcc').textContent = (userStats.avg_accuracy || 0) + '%';
  $('profStatGold').textContent = userStats.gold || 0;

  const isTh = lang === 'th';
  $('lblSelectGuardian').textContent = isTh ? 'เลือกผู้พิทักษ์ของคุณ' : 'Choose your guardian';
  $('lblProfGames').textContent = isTh ? 'ด่านที่พิมพ์' : 'Games Played';
  $('lblProfWpm').textContent = isTh ? 'WPM สูงสุด' : 'Max WPM';
  $('lblProfAcc').textContent = isTh ? 'แม่นยำเฉลี่ย' : 'Avg Accuracy';
  $('lblProfGold').textContent = isTh ? 'ทองสะสม' : 'Total Gold';
  $('lblStartQuest').textContent = isTh ? 'เข้าสู่การเลือกด่าน (Start Quest)' : 'Start Quest';
  $('lblProfAcademy').textContent = isTh ? 'สำนักฝึกวิชา (Academy)' : 'Skill Academy';
  $('lblProfLogout').textContent = isTh ? 'ออกจากระบบ' : 'Log Out';
}

async function checkUserSession() {
  if (!dbClient) {
    loadLocalStats();
    show('auth');
    return;
  }
  try {
    const { data: { session }, error } = await dbClient.auth.getSession();
    if (session && session.user) {
      currentUser = session.user;
      await loadUserStats();
      show('profile');
    } else {
      loadLocalStats();
      show('auth');
    }
  } catch (e) {
    console.error('Session check failed:', e);
    loadLocalStats();
    show('auth');
  }
}

function handleDatabaseError(error) {
  if (!error) return;
  const errMsg = error.message || '';
  const errCode = error.code || '';
  
  if (errCode === '42P01' || errMsg.includes('does not exist') || errMsg.includes('relation')) {
    if (errMsg.includes('typing_rooms') || errMsg.includes('typing_room_results')) {
      Swal.fire({
        icon: 'error',
        title: lang === 'th' ? 'ต้องตั้งค่าตารางเล่นออนไลน์!' : 'Multiplayer Setup Required!',
        text: lang === 'th' ? 'กรุณารัน SQL สำหรับตารางสร้างห้องแข่งขันใน Supabase SQL Editor ก่อนใช้งาน' : 'Please run the SQL for room tables in your Supabase SQL Editor first.',
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonColor: 'var(--coral)'
      });
      return;
    }

    console.group('%c⚠️ KEYQUEST DATABASE SETUP REQUIRED ⚠️', 'color: #ff5d6c; font-size: 14px; font-weight: bold;');
    console.log(
      '%cIt looks like the "typing_user_stats" table does not exist in your Supabase database.%c\n\n' +
      'Please run the following SQL command in your Supabase SQL Editor to create it:\n\n' +
      'CREATE TABLE public.typing_user_stats (\n' +
      '  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,\n' +
      '  xp INTEGER DEFAULT 0 NOT NULL,\n' +
      '  level INTEGER DEFAULT 1 NOT NULL,\n' +
      '  gold INTEGER DEFAULT 0 NOT NULL,\n' +
      '  unlocked_skills TEXT[] DEFAULT ARRAY[\'homerow\']::TEXT[] NOT NULL,\n' +
      '  equipped_skills TEXT[] DEFAULT ARRAY[\'homerow\']::TEXT[] NOT NULL,\n' +
      '  max_wpm INTEGER DEFAULT 0 NOT NULL,\n' +
      '  games_played INTEGER DEFAULT 0 NOT NULL,\n' +
      '  avg_accuracy INTEGER DEFAULT 0 NOT NULL,\n' +
      '  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone(\'utc\'::text, now()) NOT NULL\n' +
      ');\n\n' +
      'ALTER TABLE public.typing_user_stats ENABLE ROW LEVEL SECURITY;\n' +
      'CREATE POLICY "Allow users to manage their own stats" ON public.typing_user_stats FOR ALL USING (auth.uid() = id);',
      'color: #ffaa00; font-weight: bold;',
      'color: inherit;'
    );
    console.groupEnd();

    const errDiv = $('authError');
    if (errDiv) {
      errDiv.style.color = 'var(--coral)';
      errDiv.textContent = lang === 'th' ? 
        'ผิดพลาด: ไม่พบตารางข้อมูลในระบบ (กรุณาตั้งค่าตาราง typing_user_stats ใน Supabase)' : 
        'Error: Database table not found. Please set up the typing_user_stats table in Supabase.';
    }
  }
}

async function loadUserStats() {
  if (!dbClient || !currentUser) {
    loadLocalStats();
    return;
  }
  try {
    const { data, error } = await dbClient
      .from('typing_user_stats')
      .select('*')
      .eq('id', currentUser.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        await createProfile();
      } else {
        throw error;
      }
    } else if (data) {
      userStats = {
        xp: data.xp || 0,
        level: data.level || 1,
        gold: data.gold || 0,
        unlocked_skills: data.unlocked_skills || ['homerow'],
        equipped_skills: data.equipped_skills || ['homerow'],
        max_wpm: data.max_wpm || 0,
        games_played: data.games_played || 0,
        avg_accuracy: data.avg_accuracy || 0
      };
      applyTheme();
      updateProfileUI();
    }
  } catch (e) {
    console.error('Failed to load stats, falling back to local:', e);
    handleDatabaseError(e);
    loadLocalStats();
  }
}

async function createProfile() {
  if (!dbClient || !currentUser) return;
  try {
    const defaultStats = {
      id: currentUser.id,
      xp: 0,
      level: 1,
      gold: 0,
      unlocked_skills: ['homerow'],
      equipped_skills: ['homerow'],
      max_wpm: 0,
      games_played: 0,
      avg_accuracy: 0
    };
    const { error } = await dbClient.from('typing_user_stats').insert([defaultStats]);
    if (error) throw error;
    userStats = {
      xp: 0,
      level: 1,
      gold: 0,
      unlocked_skills: ['homerow'],
      equipped_skills: ['homerow'],
      max_wpm: 0,
      games_played: 0,
      avg_accuracy: 0
    };
    applyTheme();
    updateProfileUI();
  } catch (e) {
    console.error('Profile creation failed:', e);
    handleDatabaseError(e);
  }
}

async function saveUserStats() {
  if (!dbClient || !currentUser) {
    saveLocalStats();
    return;
  }
  try {
    const { error } = await dbClient
      .from('typing_user_stats')
      .update({
        xp: userStats.xp,
        level: userStats.level,
        gold: userStats.gold,
        unlocked_skills: userStats.unlocked_skills,
        equipped_skills: userStats.equipped_skills,
        max_wpm: userStats.max_wpm,
        games_played: userStats.games_played,
        avg_accuracy: userStats.avg_accuracy,
        updated_at: new Date().toISOString()
      })
      .eq('id', currentUser.id);

    if (error) throw error;
  } catch (e) {
    console.error('Failed to sync to Supabase, saving locally:', e);
    handleDatabaseError(e);
    saveLocalStats();
  }
}

function loadLocalStats() {
  const local = localStorage.getItem('typing_game_local_stats');
  if (local) {
    try {
      userStats = JSON.parse(local);
      if (!userStats.equipped_skills) userStats.equipped_skills = ['homerow'];
      if (!userStats.unlocked_skills) userStats.unlocked_skills = ['homerow'];
    } catch (e) {
      console.error(e);
    }
  } else {
    userStats = {
      xp: 0,
      level: 1,
      gold: 0,
      unlocked_skills: ['homerow'],
      equipped_skills: ['homerow'],
      max_wpm: 0,
      games_played: 0,
      avg_accuracy: 0
    };
  }
  applyTheme();
  updateProfileUI();
}

function saveLocalStats() {
  localStorage.setItem('typing_game_local_stats', JSON.stringify(userStats));
}

function updateProfileUI() {
  const lvl = Math.floor(userStats.xp / 200) + 1;
  const prevLvlXp = (lvl - 1) * 200;
  const levelXp = userStats.xp - prevLvlXp;
  const xpPct = (levelXp / 200) * 100;

  const displayName = lineProfile ? lineProfile.displayName : (currentUser ? currentUser.email.split('@')[0] : (lang === 'th' ? 'ผู้ใช้ทั่วไป (Guest)' : 'Guest User'));
  $('profileUser').textContent = displayName;
  $('profileLvl').textContent = `Lv. ${lvl}`;
  $('profileXpBar').style.width = `${xpPct}%`;
  $('profileGold').textContent = userStats.gold;

  renderProfileScreen();
}

function applyTheme() {
  if (userStats.equipped_skills && userStats.equipped_skills.includes('cyberpunk')) {
    document.body.classList.add('cyberpunk-theme');
    document.body.classList.remove('uxui-theme');
  } else if (userStats.equipped_skills && userStats.equipped_skills.includes('uxui')) {
    document.body.classList.add('uxui-theme');
    document.body.classList.remove('cyberpunk-theme');
  } else {
    document.body.classList.remove('cyberpunk-theme', 'uxui-theme');
  }
}

/* ===== AUTH CONTROL ===== */
function renderAuthText() {
  const t = AUTH_TEXT[lang];
  $('authTitle').textContent = authMode === 'login' ? t.loginTitle : t.registerTitle;
  $('authSubtitle').textContent = authMode === 'login' ? t.loginSubtitle : t.registerSubtitle;
  $('lblEmail').textContent = t.emailLabel;
  $('lblPassword').textContent = t.passwordLabel;
  $('btnSubmitAuth').textContent = authMode === 'login' ? t.submitLogin : t.submitRegister;
  $('btnGuestAuth').textContent = t.guestBtn;
  $('tabLogin').textContent = t.tabLogin;
  $('tabRegister').textContent = t.tabRegister;
}

function switchAuthTab(mode) {
  authMode = mode;
  $('tabLogin').classList.toggle('active', mode === 'login');
  $('tabRegister').classList.toggle('active', mode === 'register');
  renderAuthText();
  $('authError').textContent = '';
}

async function handleAuthSubmit() {
  const email = $('authEmail').value.trim();
  const password = $('authPassword').value;
  const errDiv = $('authError');
  const t = AUTH_TEXT[lang];

  if (!email || !password) {
    errDiv.textContent = t.required;
    return;
  }
  if (password.length < 6) {
    errDiv.textContent = t.shortPass;
    return;
  }

  errDiv.style.color = 'var(--amber)';
  errDiv.textContent = lang === 'th' ? 'กำลังดำเนินการ...' : 'Processing...';

  // SweetAlert2 Loading State
  Swal.fire({
    title: lang === 'th' ? 'กำลังดำเนินการ...' : 'Processing...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
    background: '#1a1a2e',
    color: '#fff'
  });

  try {
    if (authMode === 'login') {
      let loginData = null;
      try {
        const { data, error } = await dbClient.auth.signInWithPassword({ email, password });
        if (error) throw error;
        loginData = data;
      } catch (loginErr) {
        // If login failed because of unconfirmed email, try auto-confirming via Admin API
        if (loginErr.message && (loginErr.message.includes('confirm') || loginErr.message.includes('verification')) && dbClient.auth.admin) {
          try {
            console.log("Email not confirmed during login. Attempting admin auto-confirm...");
            const { data: listData, error: listError } = await dbClient.auth.admin.listUsers();
            if (!listError && listData && listData.users) {
              const targetUser = listData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
              if (targetUser) {
                const { error: confirmError } = await dbClient.auth.admin.updateUserById(targetUser.id, { email_confirm: true });
                if (!confirmError) {
                  console.log("User email successfully confirmed by admin API. Retrying login...");
                  const { data: retryData, error: retryError } = await dbClient.auth.signInWithPassword({ email, password });
                  if (!retryError) {
                    loginData = retryData;
                  } else {
                    throw retryError;
                  }
                } else {
                  throw confirmError;
                }
              } else {
                throw loginErr;
              }
            } else {
              throw loginErr;
            }
          } catch (adminErr) {
            console.error("Admin auto-confirm failed during login:", adminErr);
            throw loginErr; // throw original login error
          }
        } else {
          throw loginErr;
        }
      }

      currentUser = loginData.user;
      await loadUserStats();
      errDiv.style.color = 'var(--mint)';
      errDiv.textContent = t.authSuccess;

      // Close loading, show success SweetAlert2
      Swal.fire({
        icon: 'success',
        title: lang === 'th' ? 'เข้าสู่ระบบสำเร็จ!' : 'Login Successful!',
        text: lang === 'th' ? `ยินดีต้อนรับกลับมา, ${currentUser.email.split('@')[0]}` : `Welcome back, ${currentUser.email.split('@')[0]}`,
        timer: 1500,
        showConfirmButton: false,
        background: '#1a1a2e',
        color: '#fff'
      });

      setTimeout(() => {
        show('profile');
        errDiv.textContent = '';
      }, 1500);
    } else {
      let authData = null;
      let signUpSuccess = false;

      // Try creating user via Admin API to bypass email confirmation (works if initialized with service_role key)
      try {
        if (dbClient.auth.admin) {
          const { data, error } = await dbClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true
          });
          if (!error && data && data.user) {
            authData = data;
            signUpSuccess = true;
            console.log("Created user and auto-confirmed via admin API");
          } else if (error) {
            if (error.message && error.message.includes('already exists')) {
              throw error;
            }
            console.warn("Admin signup failed, trying standard signup:", error.message);
          }
        }
      } catch (adminErr) {
        if (adminErr.message && adminErr.message.includes('already exists')) {
          throw adminErr;
        }
        console.warn("Admin signup bypassed/failed, falling back to normal signup:", adminErr);
      }

      if (!signUpSuccess) {
        const { data, error } = await dbClient.auth.signUp({ email, password });
        if (error) throw error;
        authData = data;
      }

      // Log in immediately using signInWithPassword to establish the session in client
      try {
        const { data: sessionData, error: sessionError } = await dbClient.auth.signInWithPassword({ email, password });
        if (sessionError) throw sessionError;
        currentUser = sessionData.user;
        await loadUserStats();

        errDiv.style.color = 'var(--mint)';
        errDiv.textContent = t.authSuccess;

        Swal.fire({
          icon: 'success',
          title: lang === 'th' ? 'สมัครสมาชิกสำเร็จ!' : 'Registration Successful!',
          text: lang === 'th' ? 'ระบบได้ทำการล็อกอินให้คุณโดยอัตโนมัติ' : 'The system has logged you in automatically.',
          timer: 1500,
          showConfirmButton: false,
          background: '#1a1a2e',
          color: '#fff'
        });

        setTimeout(() => {
          show('profile');
          errDiv.textContent = '';
        }, 1500);
      } catch (loginErr) {
        // If login fails because email is not confirmed
        if (loginErr.message && (loginErr.message.includes('confirm') || loginErr.message.includes('verification'))) {
          errDiv.style.color = 'var(--mint)';
          errDiv.textContent = lang === 'th' ? 
            'สมัครสมาชิกสำเร็จ! กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันตัวตนก่อนเข้าสู่ระบบ' : 
            'Registration successful! Please check your email to confirm before logging in.';
            
          Swal.fire({
            icon: 'info',
            title: lang === 'th' ? 'สมัครสมาชิกสำเร็จ!' : 'Registration Successful!',
            text: lang === 'th' ? 'กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันตัวตนก่อนเข้าสู่ระบบ' : 'Please check your email to confirm before logging in.',
            background: '#1a1a2e',
            color: '#fff',
            confirmButtonColor: 'var(--amber)'
          });
        } else {
          throw loginErr;
        }
      }
    }
  } catch (e) {
    errDiv.style.color = 'var(--coral)';
    errDiv.textContent = e.message;

    // Show error Swal
    Swal.fire({
      icon: 'error',
      title: lang === 'th' ? 'เกิดข้อผิดพลาด!' : 'Error!',
      text: e.message,
      background: '#1a1a2e',
      color: '#fff',
      confirmButtonColor: 'var(--coral)'
    });
  }
}

/* ===== SKILL ACADEMY CONTROL ===== */
function renderAcademy() {
  const grid = $('skillsGrid');
  grid.innerHTML = '';
  const t = AUTH_TEXT[lang];

  Object.keys(SKILLS_DATA).forEach(key => {
    const s = SKILLS_DATA[key];
    const unlocked = userStats.unlocked_skills.includes(key);
    const equipped = userStats.equipped_skills.includes(key);

    const card = document.createElement('div');
    card.className = `skill-card ${equipped ? 'equipped' : ''}`;

    let badgeClass = 'locked';
    let badgeText = s.cost + ' ' + t.goldUnit;
    if (equipped) {
      badgeClass = 'equipped';
      badgeText = t.equippedMsg;
    } else if (unlocked) {
      badgeClass = 'unlocked';
      badgeText = t.unlockedMsg;
    }

    let actionBtn = '';
    if (equipped) {
      actionBtn = `<button class="btn btn-ghost" onclick="buyOrEquipSkill('${key}')">${t.unequipBtn}</button>`;
    } else if (unlocked) {
      actionBtn = `<button class="btn btn-amber" onclick="buyOrEquipSkill('${key}')">${t.equipBtn}</button>`;
    } else {
      const disabled = userStats.gold < s.cost ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : '';
      actionBtn = `<button class="btn btn-amber" onclick="buyOrEquipSkill('${key}')" ${disabled}>${t.buyBtn} ${s.cost} ${ICON('star', 'ic')}</button>`;
    }

    const iconBg = unlocked ? (s.color || 'var(--panel-2)') : 'var(--panel-2)';
    const iconColor = unlocked ? '#2a1602' : 'var(--muted)';

    card.innerHTML = `
      <div class="skill-icon" style="background: ${iconBg}; color: ${iconColor};">
        ${ICON(s.icon)}
      </div>
      <div class="skill-body">
        <div class="skill-title">${s.title[lang]}</div>
        <div class="skill-desc">${s.desc[lang]}</div>
        <div class="skill-action">${actionBtn}</div>
      </div>
      <span class="skill-badge ${badgeClass}">${badgeText}</span>
    `;

    grid.appendChild(card);
  });
}

async function buyOrEquipSkill(id) {
  const s = SKILLS_DATA[id];
  if (!s) return;

  const unlocked = userStats.unlocked_skills.includes(id);
  const equipped = userStats.equipped_skills.includes(id);

  if (equipped) {
    userStats.equipped_skills = userStats.equipped_skills.filter(x => x !== id);
    thock(false, false);
  } else if (unlocked) {
    if (id === 'cyberpunk') {
      userStats.equipped_skills = userStats.equipped_skills.filter(x => x !== 'uxui');
    } else if (id === 'uxui') {
      userStats.equipped_skills = userStats.equipped_skills.filter(x => x !== 'cyberpunk');
    }
    userStats.equipped_skills.push(id);
    winSound();
  } else {
    if (userStats.gold >= s.cost) {
      userStats.gold -= s.cost;
      userStats.unlocked_skills.push(id);
      if (id === 'cyberpunk') {
        userStats.equipped_skills = userStats.equipped_skills.filter(x => x !== 'uxui');
      } else if (id === 'uxui') {
        userStats.equipped_skills = userStats.equipped_skills.filter(x => x !== 'cyberpunk');
      }
      userStats.equipped_skills.push(id);
      winSound();
      spawnConfetti();

      Swal.fire({
        icon: 'success',
        title: lang === 'th' ? 'ปลดล็อกสำเร็จ!' : 'Unlocked!',
        text: lang === 'th' ? `ปลดล็อกทักษะ ${s.name[lang]} เรียบร้อยแล้ว` : `Successfully unlocked ${s.name[lang]}`,
        timer: 1500,
        showConfirmButton: false,
        background: '#1a1a2e',
        color: '#fff'
      });
    } else {
      thock(false, true);

      Swal.fire({
        icon: 'warning',
        title: lang === 'th' ? 'ทองไม่เพียงพอ!' : 'Not Enough Gold!',
        text: lang === 'th' ? `คุณต้องมีทองอย่างน้อย ${s.cost} เหรียญเพื่อซื้อทักษะนี้` : `You need at least ${s.cost} gold to purchase this skill.`,
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonColor: 'var(--amber)'
      });
      return;
    }
  }

  applyTheme();
  updateProfileUI();
  renderAcademy();
  await saveUserStats();
}

/* ===== GAME FLOW ===== */
function startGame(key){
  ensureAudio();if(musicOn)startMusic();
  diffKey=key;target=DIFFS[key].gen(lang);
  cells=buildCells(target);posToCell=[];cells.forEach((c,ci)=>{for(let i=c.start;i<c.end;i++)posToCell[i]=ci;});
  marks=new Array(target.length).fill('');
  pos=0;errors=0;correctChars=0;totalKeys=0;combo=0;maxCombo=0;score=0;
  started=false;finished=false;clearInterval(timerInt);updateHeat();
  
  shieldActive = userStats.equipped_skills && userStats.equipped_skills.includes('comboshield');

  $('lvlLabel').textContent=DIFFS[key].name[lang];
  const sc=osSwitchText();
  $('liveHint').textContent=lang==='th'
    ?`สลับแป้นเป็นไทยด้วย ${sc} · จับเวลาเริ่มเมื่อกดปุ่มแรก`
    :`Switch your keyboard to English (${sc}) · timer starts on first key`;
  updateStats(0,100,0);buildCharMap();renderKeyboard();renderText();show('game');
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

function handleChar(ch){
  if(finished)return;
  if(!started)startTimer();
  const expected=target[pos];totalKeys++;
  const correct=ch===expected;
  
  thock(ch===' ', !correct);keyHit(ch);
  
  if(correct){
    const gain=10+Math.min(combo,20);
    correctChars++;combo++;if(combo>maxCombo)maxCombo=combo;score+=gain;
    marks[pos]='ok';flashChar(cellSpan(pos),false);floatPoints(cellSpan(pos),gain);comboBump();updateHeat();
    if(userStats.equipped_skills && userStats.equipped_skills.includes('uxui')){
      spawnUiFx(cellSpan(pos));
    }
    if(combo%10===0)milestone(combo);
    pos++;
  }else{
    errors++;
    
    if (shieldActive && combo >= 5) {
      shieldActive = false;
      floatPoints(cellSpan(pos), lang === 'th' ? '🛡️ ป้องกัน!' : '🛡️ Blocked!', true);
      tick();
      marks[pos]='bad';flashChar(cellSpan(pos),true);cardShake();
      pos++;
    } else {
      combo=0;
      score=Math.max(0,score- (userStats.equipped_skills.includes('chillaura') ? 0 : 3));
      marks[pos]='bad';flashChar(cellSpan(pos),true);cardShake();updateHeat();
      pos++;
    }
  }
  if(pos>=target.length){finish();return;}
  paintProgress();highlightKey(target[pos]);const t=(performance.now()-startTime)/1000;updateStats(t,accuracy(),wpm(t));
}

/* ---- effect helpers ---- */
function flashChar(span,bad){const c=bad?'flashbad':'flash';span.classList.add(c);setTimeout(()=>span.classList.remove(c),320);}
function cardShake(){const card=$('textBox').closest('.type-card');card.classList.remove('shake');void card.offsetWidth;card.classList.add('shake');setTimeout(()=>card.classList.remove('shake'),330);}
function comboBump(){const s=$('sCombo');s.classList.remove('bump');void s.offsetWidth;s.classList.add('bump');}
function keyHit(ch){const info=charMap[ch];if(!info)return;const el=document.querySelector(`.key[data-key="${CSS.escape(info.key)}"]`);if(!el)return;el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),170);}
function floatPoints(span,gain,isText=false){if(!span)return;const card=$('textBox').closest('.type-card');
  const cr=card.getBoundingClientRect(),sr=span.getBoundingClientRect();
  const f=document.createElement('div');f.className='float';
  f.textContent=isText ? gain : '+'+gain;
  f.style.left=(sr.left-cr.left+sr.width/2)+'px';f.style.top=(sr.top-cr.top)+'px';
  f.style.color=isText ? 'var(--cyan)' : (combo>=15?'#ffd9a0':'var(--mint)');
  card.appendChild(f);setTimeout(()=>f.remove(),720);}
function spawnUiFx(span) {
  if (!span) return;
  const colors = ['#38bdf8', '#818cf8', '#34d399', '#f43f5e'];
  const rect = span.getBoundingClientRect();
  const card = $('textBox').closest('.type-card');
  const cardRect = card.getBoundingClientRect();
  const x = rect.left - cardRect.left + rect.width / 2;
  const y = rect.top - cardRect.top + rect.height / 2;
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('div');
    p.className = 'uxui-sparkle';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.background = colors[i % colors.length];
    const angle = (i * 60 + Math.random() * 30 - 15) * (Math.PI / 180);
    const velocity = 20 + Math.random() * 30;
    p.style.setProperty('--tx', (Math.cos(angle) * velocity) + 'px');
    p.style.setProperty('--ty', (Math.sin(angle) * velocity) + 'px');
    card.appendChild(p);
    setTimeout(() => p.remove(), 500);
  }
}
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

  // Progression calculation
  let gainedXp = Math.round(correctChars * (acc / 100));
  if (userStats.equipped_skills && userStats.equipped_skills.includes('homerow')) {
    gainedXp = Math.round(gainedXp * 1.1); // +10% XP
  }

  let gainedGold = Math.round((correctChars / 8) * stars);
  if (userStats.equipped_skills && userStats.equipped_skills.includes('goldenfingers') && w >= 40) {
    gainedGold *= 2; // Double Gold on 40+ WPM
  }

  const oldLvl = Math.floor(userStats.xp / 200) + 1;
  userStats.xp += gainedXp;
  userStats.gold += gainedGold;
  userStats.games_played += 1;
  if (w > userStats.max_wpm) userStats.max_wpm = w;
  userStats.avg_accuracy = Math.round((userStats.avg_accuracy * (userStats.games_played - 1) + acc) / userStats.games_played);

  const newLvl = Math.floor(userStats.xp / 200) + 1;
  let lvlUp = false;
  if (newLvl > oldLvl) {
    lvlUp = true;
    userStats.gold += 50; // Level up reward
    userStats.level = newLvl;
  }

  if (isRoomGame) {
    const userAlias = currentUser ? currentUser.email.split('@')[0] : (localStorage.getItem('typing_game_guest_name') || 'Guest_' + Math.floor(Math.random() * 1000));
    submitRoomResult(currentRoomId, userAlias, w, acc, score);
  }

  if (isRoomGame) {
    $('rSub').innerHTML = (lang==='th'
      ?`โหมดประชันออนไลน์ห้อง "${currentRoomCode}" · คอมโบสูงสุด ${maxCombo}`
      :`Online Challenge Room "${currentRoomCode}" · max combo ${maxCombo}`) + 
      `<br><span style="color:var(--cyan); font-weight:700;">+${gainedXp} ${AUTH_TEXT[lang].xpUnit}</span> · ` +
      `<span style="color:var(--amber); font-weight:700;">+${gainedGold} ${AUTH_TEXT[lang].goldUnit}</span>` +
      (lvlUp ? ` <span style="color:var(--mint); font-weight:800; animation: bump 0.4s ease;">[${AUTH_TEXT[lang].levelUpMsg} +50G]</span>` : '');
  } else {
    $('rSub').innerHTML = (lang==='th'
      ?`ระดับ "${DIFFS[diffKey].name.th}" · คอมโบสูงสุด ${maxCombo}`
      :`Difficulty "${DIFFS[diffKey].name.en}" · max combo ${maxCombo}`) + 
      `<br><span style="color:var(--cyan); font-weight:700;">+${gainedXp} ${AUTH_TEXT[lang].xpUnit}</span> · ` +
      `<span style="color:var(--amber); font-weight:700;">+${gainedGold} ${AUTH_TEXT[lang].goldUnit}</span>` +
      (lvlUp ? ` <span style="color:var(--mint); font-weight:800; animation: bump 0.4s ease;">[${AUTH_TEXT[lang].levelUpMsg} +50G]</span>` : '');
  }

  if (isRoomGame) {
    $('btnNext').style.display = 'none';
    $('btnMenu').style.display = 'none';
    
    let btnBackRoom = $('btnBackToRoom');
    if (!btnBackRoom) {
      btnBackRoom = document.createElement('button');
      btnBackRoom.id = 'btnBackToRoom';
      btnBackRoom.className = 'btn btn-cyan';
      btnBackRoom.innerHTML = `${ICON('next')} กลับสู่ห้องแข่งขัน`;
      btnBackRoom.onclick = () => {
        isRoomGame = false;
        showRoomLobby(currentRoomCode);
      };
      $('btnNext').parentNode.appendChild(btnBackRoom);
    } else {
      btnBackRoom.style.display = 'inline-flex';
    }
  } else {
    const idx=DIFF_ORDER.indexOf(diffKey);
    $('btnNext').style.display=idx<DIFF_ORDER.length-1?'inline-flex':'none';
    $('btnMenu').style.display = 'inline-flex';
    if ($('btnBackToRoom')) $('btnBackToRoom').style.display = 'none';
  }
  show('result');
  
  countUp($('rWpm'),w,0,'');countUp($('rAcc'),acc,0,'%');countUp($('rTime'),t,1,'s');countUp($('rScore'),score,0,'');
  
  if (lvlUp) {
    const b=$('burst');b.innerHTML=ICON('win')+`<span>${AUTH_TEXT[lang].levelUpMsg}</span>`;
    b.classList.remove('go');void b.offsetWidth;b.classList.add('go');setTimeout(()=>b.classList.remove('go'),1500);
  }

  winSound();spawnConfetti();
  updateProfileUI();
  await saveUserStats();
}

/* ===== INPUT ===== */
window.addEventListener('keydown',e=>{if(!screens.game.classList.contains('on'))return;
  if(e.key==='Backspace'){e.preventDefault();handleBackspace();return;}
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  if(e.key.length===1){e.preventDefault();handleChar(e.key);}else if(e.key===' '){e.preventDefault();handleChar(' ');}});

/* ===== WIRE ===== */
function setLang(l){
  lang=l;
  $('btnTH').classList.toggle('active',l==='th');
  $('btnEN').classList.toggle('active',l==='en');
  document.documentElement.lang=l;
  
  renderMenu();
  renderFooter();
  renderAuthText();
  renderAcademy();

  const activeScreen = Object.keys(screens).find(k=>screens[k].classList.contains('on'));
  if (activeScreen && activeScreen !== 'auth' && activeScreen !== 'academy') {
    show(activeScreen);
  }
}

$('btnTH').onclick=()=>setLang('th');
$('btnEN').onclick=()=>setLang('en');
$('btnSound').onclick=toggleSound;
$('btnMusic').onclick=toggleMusic;

/* begin the chill loop as soon as the user first interacts (autoplay policy) */
let _firstGesture=false;
function kickMusic(){if(_firstGesture)return;_firstGesture=true;if(musicOn)startMusic();}
window.addEventListener('pointerdown',kickMusic,{once:false});
window.addEventListener('keydown',kickMusic,{once:false});

async function handleLogout() {
  const confirmResult = await Swal.fire({
    title: lang === 'th' ? 'ต้องการออกจากระบบ?' : 'Are you sure?',
    text: lang === 'th' ? 'สถิติที่ไม่ได้อัปเดตลงเซิร์ฟเวอร์อาจสูญหาย' : 'Unsynced statistics might be lost.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'var(--coral)',
    cancelButtonColor: '#333',
    confirmButtonText: lang === 'th' ? 'ออกจากระบบ' : 'Log Out',
    cancelButtonText: lang === 'th' ? 'ยกเลิก' : 'Cancel',
    background: '#1a1a2e',
    color: '#fff'
  });
  
  if (confirmResult.isConfirmed) {
    if (dbClient) await dbClient.auth.signOut();
    currentUser = null;
    lineProfile = null;
    if (window.liff && liff.isLoggedIn()) {
      liff.logout();
    }
    loadLocalStats();
    show('auth');
    
    Swal.fire({
      icon: 'success',
      title: lang === 'th' ? 'ออกจากระบบเรียบร้อย' : 'Logged Out',
      timer: 1000,
      showConfirmButton: false,
      background: '#1a1a2e',
      color: '#fff'
    });
  }
}

/* Auth UI Listeners */
$('tabLogin').onclick=()=>switchAuthTab('login');
$('tabRegister').onclick=()=>switchAuthTab('register');
$('authForm').onsubmit=(e)=>{ e.preventDefault(); handleAuthSubmit(); };
$('btnGuestAuth').onclick=()=>{
  currentUser = null;
  loadLocalStats();
  show('profile');
};
$('btnLogout').onclick=handleLogout;

/* Profile UI Listeners */
$('btnEditAvatar').onclick=()=>{
  const panel = $('avatarSelectorPanel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
};
$('btnStartQuest').onclick=()=>show('menu');
$('btnProfileAcademy').onclick=()=>{
  renderAcademy();
  show('academy');
};
$('btnProfileLogout').onclick=handleLogout;
$('profileBar').onclick=(e)=>{
  if(e.target.closest('#btnLogout')) return;
  show('profile');
};

/* Menu & Navigation Listeners */
$('btnGoAcademy').onclick=()=>{
  renderAcademy();
  show('academy');
};
$('btnAcademyBack').onclick=()=>show('profile');
$('btnBack').onclick=()=>{
  clearInterval(timerInt);
  if (isRoomGame) {
    showRoomLobby(currentRoomCode);
  } else {
    show('menu');
  }
};
$('btnRestart').onclick=()=>{
  if (isRoomGame) {
    startRoomGame();
  } else {
    startGame(diffKey);
  }
};
$('btnMenu').onclick=()=>show('menu');
$('btnRetry').onclick=()=>{
  if (isRoomGame) {
    startRoomGame();
  } else {
    startGame(diffKey);
  }
};
$('btnNext').onclick=()=>{const idx=DIFF_ORDER.indexOf(diffKey);startGame(DIFF_ORDER[Math.min(idx+1,DIFF_ORDER.length-1)]);};

$('btnGoMultiplayer').onclick=()=>{
  show('multiplayer');
};

/* ===== ONLINE MULTIPLAYER / CHALLENGE ROOM SYSTEM ===== */

// Gemini API Prompt generator
async function generateAiPrompt(topic, language) {
  const apiKey = 'AIzaSyB6rl-ypQ32s-MFabSCh_XmHyirunqYjy0';
  const prompt = language === 'th'
    ? `สร้างข้อความย่อหน้าสั้นสำหรับเกมฝึกพิมพ์ดีดภาษาไทย หัวข้อ: "${topic}" ข้อความต้องเป็นภาษาไทยล้วน มีเครื่องหมายวรรคตอนและการเว้นวรรคปกติ ไม่ต้องยาวเกินไป (ประมาณ 120-180 ตัวอักษร) ไม่มีตัวอักษรแปลกๆ หรือการขึ้นบรรทัดใหม่ และส่งกลับมาเป็นรูปแบบ JSON เช่น { "text": "ข้อความที่นี่" } เท่านั้น`
    : `Generate a short typing game paragraph in English about "${topic}". The text must be only English, grammatically correct, around 120-180 characters, with normal punctuation and spaces, no line breaks or strange symbols, and return as JSON format: { "text": "content here" } only.`;
    
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });
    
    if (!response.ok) throw new Error('Gemini API call failed');
    const data = await response.json();
    const textJson = JSON.parse(data.candidates[0].content.parts[0].text.trim());
    return textJson.text || textJson.paragraph || "";
  } catch (err) {
    console.error("Gemini generation failed, falling back:", err);
    return pickN(language === 'th' ? TH_SENT : EN_SENT, 3);
  }
}

// Supabase Room Handlers
async function createRoom(type, topic, language) {
  let targetText = '';
  if (type === 'ai') {
    targetText = await generateAiPrompt(topic, language);
  } else {
    targetText = pickN(language === 'th' ? TH_SENT : EN_SENT, 3);
  }
  
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const creator = currentUser ? currentUser.email.split('@')[0] : 'Guest';
  
  const { data, error } = await dbClient
    .from('typing_rooms')
    .insert([
      {
        room_code: roomCode,
        target_text: targetText,
        created_by: creator,
        type: type,
        topic: topic || null
      }
    ])
    .select();
    
  if (error) {
    handleDatabaseError(error);
    throw error;
  }
  
  return roomCode;
}

async function getRoom(roomCode) {
  const { data, error } = await dbClient
    .from('typing_rooms')
    .select('*')
    .eq('room_code', roomCode.toUpperCase())
    .single();
    
  if (error) {
    handleDatabaseError(error);
    throw error;
  }
  return data;
}

async function getRoomResults(roomId) {
  const { data, error } = await dbClient
    .from('typing_room_results')
    .select('*')
    .eq('room_id', roomId)
    .order('score', { ascending: false });
    
  if (error) {
    handleDatabaseError(error);
    throw error;
  }
  return data;
}

async function submitRoomResult(roomId, username, wpm, acc, score) {
  const { data, error } = await dbClient
    .from('typing_room_results')
    .insert([
      {
        room_id: roomId,
        username: username,
        wpm: wpm,
        accuracy: acc,
        score: score
      }
    ]);
    
  if (error) handleDatabaseError(error);
}

// Multiplayer UI navigation & updates
let multiLang = 'th';
let multiType = 'general';
let activeRoomData = null;

async function showRoomLobby(roomCode) {
  Swal.fire({
    title: lang === 'th' ? 'กำลังโหลดห้อง...' : 'Loading Room...',
    allowOutsideClick: false,
    didOpen: () => { Swal.showLoading(); },
    background: '#1a1a2e',
    color: '#fff'
  });
  
  try {
    const room = await getRoom(roomCode);
    activeRoomData = room;
    currentRoomId = room.id;
    currentRoomCode = room.room_code;
    currentRoomText = room.target_text;
    
    // Update lobby info
    $('lobbyRoomCode').textContent = room.room_code;
    $('lobbyRoomDesc').textContent = lang === 'th'
      ? `ประเภท: ${room.type === 'ai' ? 'AI คิดโจทย์ (' + room.topic + ')' : 'ทั่วไป'} · โดย: ${room.created_by}`
      : `Type: ${room.type === 'ai' ? 'AI Generated (' + room.topic + ')' : 'General'} · By: ${room.created_by}`;
      
    $('lobbyTextPreview').textContent = room.target_text;
    $('lobbyTextPreview').style.filter = 'blur(3.5px)';
    $('lobbyBlurHint').style.display = 'block';
    
    // Share link
    const shareUrl = window.location.origin + window.location.pathname + '?room=' + room.room_code;
    $('shareLinkInput').value = shareUrl;
    
    // Load Scoreboard
    await refreshScoreboard(room.id);
    
    // Switch view
    $('lobbySetup').style.display = 'none';
    $('lobbyActive').style.display = 'block';
    show('multiplayer');
    
    Swal.close();
    
    // Set polling scoreboard interval every 5 seconds
    if (scoreboardInterval) clearInterval(scoreboardInterval);
    scoreboardInterval = setInterval(() => {
      refreshScoreboard(room.id);
    }, 5000);
    
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: lang === 'th' ? 'ไม่พบห้องแข่งขัน' : 'Room Not Found',
      text: lang === 'th' ? 'รหัสห้องไม่ถูกต้อง หรือห้องหมดอายุแล้ว' : 'Invalid room code or room has expired.',
      background: '#1a1a2e',
      color: '#fff',
      confirmButtonColor: 'var(--coral)'
    });
    // Remove query parameter from URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

async function refreshScoreboard(roomId) {
  try {
    const results = await getRoomResults(roomId);
    const tbody = $('scoreboardBody');
    tbody.innerHTML = '';
    
    if (!results || results.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 20px; color: var(--muted);">${lang === 'th' ? 'ยังไม่มีผู้ใดส่งสถิติ' : 'No scores submitted yet.'}</td></tr>`;
      return;
    }
    
    results.forEach((r, idx) => {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--line)';
      
      let badge = idx + 1;
      if (idx === 0) badge = '🥇';
      else if (idx === 1) badge = '🥈';
      else if (idx === 2) badge = '🥉';
      
      tr.innerHTML = `
        <td style="padding: 8px; font-weight: bold;">${badge}</td>
        <td style="padding: 8px; font-weight: 600;">${r.username}</td>
        <td style="padding: 8px; text-align: right; color: var(--cyan);">${r.wpm}</td>
        <td style="padding: 8px; text-align: right; color: var(--amber); font-weight: 700;">${r.score}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (e) {
    console.error("Scoreboard refresh failed", e);
  }
}

function startRoomGame() {
  if (scoreboardInterval) {
    clearInterval(scoreboardInterval);
    scoreboardInterval = null;
  }
  
  ensureAudio(); if (musicOn) startMusic();
  isRoomGame = true;
  target = currentRoomText;
  cells = buildCells(target); posToCell = []; cells.forEach((c, ci) => { for (let i = c.start; i < c.end; i++) posToCell[i] = ci; });
  marks = new Array(target.length).fill('');
  pos = 0; errors = 0; correctChars = 0; totalKeys = 0; combo = 0; maxCombo = 0; score = 0;
  started = false; finished = false; clearInterval(timerInt); updateHeat();
  
  shieldActive = userStats.equipped_skills && userStats.equipped_skills.includes('comboshield');
  
  $('lvlLabel').textContent = lang === 'th' ? 'ท้าทายออนไลน์' : 'Online Challenge';
  const sc = osSwitchText();
  $('liveHint').textContent = lang === 'th'
    ? `จับเวลาเริ่มเมื่อกดปุ่มแรก · สลับคีย์บอร์ดให้ตรงภาษาห้อง`
    : `Timer starts on first key press · match room language`;
    
  updateStats(0, 100, 0); buildCharMap(); renderKeyboard(); renderText(); show('game');
}

function checkRoomUrl() {
  const params = new URLSearchParams(window.location.search);
  const roomCode = params.get('room');
  if (roomCode) {
    // Prompt Guest Name if not logged in
    if (!currentUser) {
      Swal.fire({
        title: lang === 'th' ? 'ตั้งชื่อเข้าร่วมแข่งขัน' : 'Enter Display Name',
        input: 'text',
        inputValue: localStorage.getItem('typing_game_guest_name') || 'Guest_' + Math.floor(Math.random() * 1000),
        showCancelButton: false,
        confirmButtonText: lang === 'th' ? 'เข้าร่วมห้อง' : 'Join Room',
        background: '#1a1a2e',
        color: '#fff',
        confirmButtonColor: 'var(--amber)',
        inputValidator: (value) => {
          if (!value) {
            return lang === 'th' ? 'กรุณากรอกชื่อ!' : 'Please enter a name!';
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('typing_game_guest_name', result.value);
          showRoomLobby(roomCode);
        }
      });
    } else {
      showRoomLobby(roomCode);
    }
  }
}

// Tab Switching
$('tabCreateRoom').onclick = () => {
  $('tabCreateRoom').classList.add('active');
  $('tabJoinRoom').classList.remove('active');
  $('formCreateRoom').style.display = 'block';
  $('formJoinRoom').style.display = 'none';
};
$('tabJoinRoom').onclick = () => {
  $('tabJoinRoom').classList.add('active');
  $('tabCreateRoom').classList.remove('active');
  $('formJoinRoom').style.display = 'block';
  $('formCreateRoom').style.display = 'none';
};

// Mode Switching (Create Form)
$('btnModeGeneral').onclick = () => {
  multiType = 'general';
  $('btnModeGeneral').classList.add('active');
  $('btnModeAi').classList.remove('active');
  $('groupAiTopic').style.display = 'none';
};
$('btnModeAi').onclick = () => {
  multiType = 'ai';
  $('btnModeAi').classList.add('active');
  $('btnModeGeneral').classList.remove('active');
  $('groupAiTopic').style.display = 'block';
};

// Language Selection (Create Form)
$('btnLangTH').onclick = () => {
  multiLang = 'th';
  $('btnLangTH').classList.add('active');
  $('btnLangEN').classList.remove('active');
};
$('btnLangEN').onclick = () => {
  multiLang = 'en';
  $('btnLangEN').classList.add('active');
  $('btnLangTH').classList.remove('active');
};

// Back from Multiplayer lobby setup
$('btnBackFromLobbySetup').onclick = () => {
  show('menu');
};

// Submit Create Room Form
$('btnSubmitCreateRoom').onclick = async () => {
  const topic = $('aiTopic').value.trim();
  if (multiType === 'ai' && !topic) {
    Swal.fire({
      icon: 'warning',
      title: lang === 'th' ? 'ข้อมูลไม่ครบถ้วน!' : 'Incomplete Information!',
      text: lang === 'th' ? 'กรุณาระบุหัวข้อที่ต้องการให้ AI แต่งโจทย์' : 'Please specify a topic for the AI to write.',
      background: '#1a1a2e',
      color: '#fff',
      confirmButtonColor: 'var(--coral)'
    });
    return;
  }
  
  Swal.fire({
    title: lang === 'th' ? 'กำลังสร้างห้องด้วย AI...' : 'Generating Room with AI...',
    allowOutsideClick: false,
    didOpen: () => { Swal.showLoading(); },
    background: '#1a1a2e',
    color: '#fff'
  });
  
  try {
    const code = await createRoom(multiType, topic, multiLang);
    Swal.close();
    showRoomLobby(code);
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: lang === 'th' ? 'สร้างห้องล้มเหลว' : 'Failed to Create Room',
      text: lang === 'th' ? 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล' : 'An error occurred while connecting to the database.',
      background: '#1a1a2e',
      color: '#fff',
      confirmButtonColor: 'var(--coral)'
    });
  }
};

// Submit Join Room Form
$('btnSubmitJoinRoom').onclick = () => {
  const code = $('roomCodeInput').value.trim().toUpperCase();
  if (!code) return;
  
  // Prompt Guest Name if not logged in
  if (!currentUser) {
    Swal.fire({
      title: lang === 'th' ? 'ตั้งชื่อเข้าร่วมแข่งขัน' : 'Enter Display Name',
      input: 'text',
      inputValue: localStorage.getItem('typing_game_guest_name') || 'Guest_' + Math.floor(Math.random() * 1000),
      showCancelButton: false,
      confirmButtonText: lang === 'th' ? 'เข้าร่วมห้อง' : 'Join Room',
      background: '#1a1a2e',
      color: '#fff',
      confirmButtonColor: 'var(--amber)',
      inputValidator: (value) => {
        if (!value) {
          return lang === 'th' ? 'กรุณากรอกชื่อ!' : 'Please enter a name!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('typing_game_guest_name', result.value);
        showRoomLobby(code);
      }
    });
  } else {
    showRoomLobby(code);
  }
};

// Copy Share Link
$('btnCopyShareLink').onclick = () => {
  const input = $('shareLinkInput');
  input.select();
  input.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(input.value);
  
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: lang === 'th' ? 'คัดลอกลิงก์เรียบร้อย!' : 'Link copied!',
    showConfirmButton: false,
    timer: 2000,
    background: '#1a1a2e',
    color: '#fff'
  });
};

// Exit Room
$('btnExitRoom').onclick = () => {
  if (scoreboardInterval) {
    clearInterval(scoreboardInterval);
    scoreboardInterval = null;
  }
  activeRoomData = null;
  currentRoomId = null;
  currentRoomCode = null;
  currentRoomText = null;
  
  // Reset fields
  $('roomCodeInput').value = '';
  $('aiTopic').value = '';
  
  // Clean URL parameters
  window.history.replaceState({}, document.title, window.location.pathname);
  
  // Show Setup Lobby screen
  $('lobbySetup').style.display = 'block';
  $('lobbyActive').style.display = 'none';
};

// Start room challenge
$('btnStartRoomChallenge').onclick = () => {
  startRoomGame();
};

// Refresh Scoreboard button
$('btnRefreshScoreboard').onclick = () => {
  if (currentRoomId) refreshScoreboard(currentRoomId);
};

// LINE LIFF login handler
async function handleLineLoginFlow(profile) {
  const email = `line_${profile.userId.toLowerCase()}@liff.line`;
  const password = `LiffPass_${profile.userId}`;
  
  Swal.fire({
    title: lang === 'th' ? 'กำลังล็อกอินด้วย LINE...' : 'Logging in with LINE...',
    allowOutsideClick: false,
    didOpen: () => { Swal.showLoading(); },
    background: '#1a1a2e',
    color: '#fff'
  });
  
  try {
    let loginData = null;
    try {
      const { data, error } = await dbClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      loginData = data;
    } catch (loginErr) {
      if (loginErr.message && (loginErr.message.includes('Invalid login credentials') || loginErr.message.includes('not found') || loginErr.message.includes('confirm'))) {
        console.log("LINE user not registered in Supabase. Creating account...");
        const { data: signUpData, error: signUpError } = await dbClient.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        
        const { data: retryData, error: retryError } = await dbClient.auth.signInWithPassword({ email, password });
        if (retryError) throw retryError;
        loginData = retryData;
      } else {
        throw loginErr;
      }
    }
    
    currentUser = loginData.user;
    
    const avatarKey = 'typing_game_avatar_' + currentUser.id;
    if (profile.pictureUrl) {
      localStorage.setItem(avatarKey, profile.pictureUrl);
    }
    
    await loadUserStats();
    
    Swal.fire({
      icon: 'success',
      title: lang === 'th' ? 'ล็อกอินด้วย LINE สำเร็จ!' : 'LINE Login Successful!',
      text: lang === 'th' ? `ยินดีต้อนรับคุณ ${profile.displayName}` : `Welcome ${profile.displayName}`,
      timer: 1500,
      showConfirmButton: false,
      background: '#1a1a2e',
      color: '#fff'
    });
    
    setTimeout(() => {
      show('profile');
    }, 1500);
    
  } catch (err) {
    console.error("LINE Supabase login failed:", err);
    Swal.fire({
      icon: 'error',
      title: lang === 'th' ? 'เข้าสู่ระบบด้วย LINE ล้มเหลว' : 'LINE Login Failed',
      text: err.message,
      background: '#1a1a2e',
      color: '#fff',
      confirmButtonColor: 'var(--coral)'
    });
  }
}

async function initLiff() {
  if (!window.liff) {
    console.warn("LINE LIFF SDK is not loaded.");
    return;
  }
  try {
    await liff.init({ liffId: LIFF_ID });
    console.log("LINE LIFF Initialized successfully");
    if (liff.isLoggedIn()) {
      lineProfile = await liff.getProfile();
      console.log("Logged in to LINE:", lineProfile.displayName);
      await handleLineLoginFlow(lineProfile);
    }
  } catch (err) {
    console.error("LIFF initialization error:", err);
  }
}

$('btnLineAuth').onclick = () => {
  if (!window.liff) {
    Swal.fire({
      icon: 'error',
      title: lang === 'th' ? 'พบข้อผิดพลาด SDK' : 'SDK Error',
      text: lang === 'th' ? 'LINE LIFF SDK ไม่โหลด กรุณาตรวจสอบอินเทอร์เน็ตของคุณ' : 'LINE LIFF SDK failed to load. Please check your connection.',
      background: '#1a1a2e',
      color: '#fff'
    });
    return;
  }
  if (!liff.isLoggedIn()) {
    liff.login();
  } else {
    liff.getProfile().then(profile => {
      lineProfile = profile;
      handleLineLoginFlow(profile);
    });
  }
};

// Boot flow
renderMenu();
renderFooter();
renderAuthText();
initSupabase().then(() => {
  checkUserSession();
  initLiff().then(() => {
    checkRoomUrl();
  });
});
