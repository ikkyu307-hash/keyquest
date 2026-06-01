/* ====================================================================
   shared.js — Loaded on EVERY page. Provides:
   helpers, sound, music, language, auth/session, userStats, theme
   ==================================================================== */

/* ===== HELPERS ===== */
const ICON = (id, cls = '') => `<svg class="ic ${cls}"><use href="#i-${id}"></use></svg>`;
const $ = id => document.getElementById(id);
const pick = a => a[Math.floor(Math.random() * a.length)];
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ===== LANGUAGE ===== */
let lang = localStorage.getItem('typing_game_lang') || 'th';

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

/* ===== THAI COMBINING MARKS HELPERS ===== */
function isCombiningThai(cp){return cp===0x0E31||(cp>=0x0E34&&cp<=0x0E3A)||(cp>=0x0E47&&cp<=0x0E4E);}

/* ===== SOUND SYSTEM ===== */
let soundOn = JSON.parse(localStorage.getItem('typing_game_sound') ?? 'true');
let audioCtx = null, masterGain = null, noiseBuf = null;

function ensureAudio() {
  if (audioCtx) { if (audioCtx.state === 'suspended') audioCtx.resume(); return; }
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain(); masterGain.gain.value = 0.5; masterGain.connect(audioCtx.destination);
    const len = Math.floor(audioCtx.sampleRate * 0.03);
    noiseBuf = noiseBuf || audioCtx.createBuffer(1, len, audioCtx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.2);
  } catch (e) { soundOn = false; }
}

function playSlashSound() {
  if (!soundOn) return; ensureAudio(); if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(800, t);
  osc.frequency.exponentialRampToValueAtTime(100, t + 0.1);
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
  osc.connect(gain).connect(masterGain);
  osc.start(t); osc.stop(t + 0.1);
  if (noiseBuf) {
    const n = audioCtx.createBufferSource(); n.buffer = noiseBuf;
    const nf = audioCtx.createBiquadFilter(); nf.type = 'highpass';
    nf.frequency.value = 2000;
    const ng = audioCtx.createGain(); 
    ng.gain.setValueAtTime(0, t);
    ng.gain.linearRampToValueAtTime(0.2, t + 0.03);
    ng.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    n.connect(nf).connect(ng).connect(masterGain); 
    n.start(t); n.stop(t + 0.15);
  }
}

function thock(deep, wrong) {
  if (!soundOn) return;
  if (wrong) {
    ensureAudio();
    if (!audioCtx) return;
    const t = audioCtx.currentTime;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(300, t);
    o.frequency.exponentialRampToValueAtTime(100, t + 0.08);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.2, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
    o.connect(g).connect(masterGain);
    o.start(t); o.stop(t + 0.1);
    
    const o2 = audioCtx.createOscillator();
    const g2 = audioCtx.createGain();
    o2.type = 'sine';
    o2.frequency.setValueAtTime(150, t);
    o2.frequency.exponentialRampToValueAtTime(40, t + 0.1);
    g2.gain.setValueAtTime(0.4, t);
    g2.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
    o2.connect(g2).connect(masterGain);
    o2.start(t); o2.stop(t + 0.1);
    return;
  }
  // If not wrong, play the slash sound for battle typing!
  playSlashSound();
  // Also keep a slight keyboard beep to maintain feedback
  playCorrectBeep();
}
function tick() {
  if (!soundOn) return; ensureAudio(); if (!audioCtx) return;
  const t = audioCtx.currentTime, o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = 'triangle'; o.frequency.setValueAtTime(210, t);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  o.connect(g).connect(masterGain); o.start(t); o.stop(t + 0.06);
}
function winSound() {
  if (!soundOn) return; ensureAudio(); if (!audioCtx) return;
  const notes = [
    {f: 523.25, d: 0.12}, {f: 523.25, d: 0.12}, {f: 523.25, d: 0.12},
    {f: 523.25, d: 0.3}, {f: 415.30, d: 0.25}, {f: 466.16, d: 0.25}, {f: 523.25, d: 0.6}
  ];
  let t = audioCtx.currentTime;
  notes.forEach((note) => {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'square';
    o.frequency.value = note.f;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.12, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.01, t + note.d);
    o.connect(g).connect(masterGain);
    o.start(t);
    o.stop(t + note.d);
    t += note.d - 0.02;
  });
}

// Preloaded Audio Pool for low-latency overlapping click/beep sound effects
const BEEP_POOL_SIZE = 12;
let beepPool = [];
let beepPoolIndex = 0;

function initBeepPool() {
  if (beepPool.length > 0) return;
  for (let i = 0; i < BEEP_POOL_SIZE; i++) {
    const audio = new Audio('liecio-menu_beep_ploc-533786.mp3');
    audio.volume = 1.0; // 100% volume
    beepPool.push(audio);
  }
}

function playCorrectBeep() {
  if (!soundOn) return;
  initBeepPool();
  const audio = beepPool[beepPoolIndex];
  audio.currentTime = 0;
  audio.play().catch(e => console.warn('Pool beep play failed:', e));
  beepPoolIndex = (beepPoolIndex + 1) % BEEP_POOL_SIZE;
}

function playMenuBeep() {
  playCorrectBeep();
}
window.addEventListener('click', (e) => {
  if (e.target.closest('button, a, .dcard, .key, [role="button"]')) {
    playMenuBeep();
  }
});
function toggleSound() {
  soundOn = !soundOn;
  localStorage.setItem('typing_game_sound', JSON.stringify(soundOn));
  if (soundOn) ensureAudio();
  updateSoundBtn();
  if (soundOn) thock(false, false);
}
function updateSoundBtn() {
  const b = $('btnSound'); if (!b) return;
  b.classList.toggle('off', !soundOn);
  b.querySelector('use').setAttribute('href', soundOn ? '#i-vol' : '#i-mute');
}

/* ===== MUSIC SYSTEM (HTML5 Audio) ===== */
let musicOn = JSON.parse(localStorage.getItem('typing_game_music') ?? 'true');
let bgMusic = null;
const MUSIC_FILE = 'vespidaze-upbeat-rpg-battle-460971.mp3';

function ensureMusic() {
  if (bgMusic) return;
  bgMusic = new Audio(MUSIC_FILE);
  bgMusic.loop = true;
  bgMusic.volume = 0.3; // 30% volume
}

function startMusic() {
  ensureMusic();
  if (!musicOn) return;
  bgMusic.volume = 0.3; // 30% volume
  bgMusic.play().catch(e => console.warn('Music play failed:', e));
}
function stopMusic() {
  if (bgMusic) {
    try { bgMusic.pause(); } catch(e) {}
  }
}
function startGameplayMusic() {
  ensureMusic();
  if (!musicOn) return;
  if (bgMusic) {
    bgMusic.volume = 0.3; // 30% volume during gameplay
    if (bgMusic.paused) {
      bgMusic.play().catch(e => console.warn('BGM play failed:', e));
    }
  }
}
function stopGameplayMusic() {
  if (musicOn && bgMusic) {
    bgMusic.volume = 0.3;
  }
}
function toggleMusic() {
  musicOn = !musicOn;
  localStorage.setItem('typing_game_music', JSON.stringify(musicOn));
  if (musicOn) startMusic(); else stopMusic();
  updateMusicBtn();
}
function updateMusicBtn() {
  const b = $('btnMusic'); if (!b) return;
  b.classList.toggle('off', !musicOn);
  b.querySelector('use').setAttribute('href', musicOn ? '#i-music' : '#i-music-off');
}

/* first-gesture music kick — browsers require user interaction before play */
let _firstGesture = false;
function kickMusic() { if (_firstGesture) return; _firstGesture = true; if (musicOn) startMusic(); }

/* ===== USER STATS ===== */
let userStats = {
  xp: 0, level: 1, gold: 0,
  unlocked_skills: ['homerow'], equipped_skills: ['homerow'],
  max_wpm: 0, games_played: 0, avg_accuracy: 0,
  monsters_killed: {}
};

function handleDatabaseError(error) {
  if (!error) return;
  const errMsg = error.message || '';
  const errCode = error.code || '';
  if (errCode === '42P01' || errMsg.includes('does not exist') || errMsg.includes('relation')) {
    console.group('%c⚠️ KEYQUEST DATABASE SETUP REQUIRED ⚠️', 'color: #ff5d6c; font-size: 14px; font-weight: bold;');
    console.log(
      '%cThe "typing_user_stats" table does not exist in your Supabase database.%c\n\n' +
      'Please run the CREATE TABLE command in the Supabase SQL Editor.\n' +
      'See the README or config.js for details.',
      'color: #ffaa00; font-weight: bold;', 'color: inherit;'
    );
    console.groupEnd();
  }
}

async function loadUserStats() {
  if (!dbClient || !currentUser) { loadLocalStats(); return; }
  try {
    const { data, error } = await dbClient.from('typing_user_stats').select('*').eq('id', currentUser.id).single();
    if (error) {
      if (error.code === 'PGRST116') { await createProfile(); }
      else { throw error; }
    } else if (data) {
      userStats = {
        xp: data.xp || 0, level: data.level || 1, gold: data.gold || 0,
        unlocked_skills: data.unlocked_skills || ['homerow'],
        equipped_skills: data.equipped_skills || ['homerow'],
        max_wpm: data.max_wpm || 0, games_played: data.games_played || 0,
        avg_accuracy: data.avg_accuracy || 0,
        monsters_killed: data.monsters_killed || {}
      };
      applyTheme();
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
      id: currentUser.id, xp: 0, level: 1, gold: 0,
      unlocked_skills: ['homerow'], equipped_skills: ['homerow'],
      max_wpm: 0, games_played: 0, avg_accuracy: 0, monsters_killed: {}
    };
    const { error } = await dbClient.from('typing_user_stats').insert([defaultStats]);
    if (error) throw error;
    userStats = { xp: 0, level: 1, gold: 0, unlocked_skills: ['homerow'], equipped_skills: ['homerow'], max_wpm: 0, games_played: 0, avg_accuracy: 0, monsters_killed: {} };
    applyTheme();
  } catch (e) {
    console.error('Profile creation failed:', e);
    handleDatabaseError(e);
  }
}

async function saveUserStats() {
  if (!dbClient || !currentUser) { saveLocalStats(); return; }
  try {
    const { error } = await dbClient.from('typing_user_stats').update({
      xp: userStats.xp, level: userStats.level, gold: userStats.gold,
      unlocked_skills: userStats.unlocked_skills, equipped_skills: userStats.equipped_skills,
      max_wpm: userStats.max_wpm, games_played: userStats.games_played,
      avg_accuracy: userStats.avg_accuracy, monsters_killed: userStats.monsters_killed, updated_at: new Date().toISOString()
    }).eq('id', currentUser.id);
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
      if (!userStats.monsters_killed) userStats.monsters_killed = {};
    } catch (e) { console.error(e); }
  } else {
    userStats = { xp: 0, level: 1, gold: 0, unlocked_skills: ['homerow'], equipped_skills: ['homerow'], max_wpm: 0, games_played: 0, avg_accuracy: 0, monsters_killed: {} };
  }
  applyTheme();
}

function saveLocalStats() {
  localStorage.setItem('typing_game_local_stats', JSON.stringify(userStats));
}

/* ===== THEME ===== */
function applyTheme() {
  if (userStats.equipped_skills && userStats.equipped_skills.includes('cyberpunk')) {
    document.body.classList.add('cyberpunk-theme');
  } else {
    document.body.classList.remove('cyberpunk-theme');
  }
}

function updateProfileBar() {
  const profileUser = $('profileUser');
  if (!profileUser) return;

  const lvl = Math.floor(userStats.xp / 200) + 1;
  const prevLvlXp = (lvl - 1) * 200;
  const levelXp = userStats.xp - prevLvlXp;
  const xpPct = (levelXp / 200) * 100;

  const nameKey = 'typing_game_display_name_' + (currentUser ? currentUser.id : 'guest');
  const displayName = localStorage.getItem(nameKey) || (currentUser ? currentUser.email.split('@')[0] : (lang === 'th' ? 'ผู้ใช้ทั่วไป' : 'Guest'));
  profileUser.textContent = displayName;
  
  $('profileLvl').textContent = `Lv. ${lvl}`;
  $('profileXpBar').style.width = `${xpPct}%`;
  $('profileGold').textContent = userStats.gold;

  const avatarKey = 'typing_game_avatar_' + (currentUser ? currentUser.id : 'guest');
  const userAvatar = localStorage.getItem(avatarKey) || '🦊';
  const av = $('headerAvatar');
  if (av) {
    if (userAvatar.startsWith('http')) {
      av.innerHTML = `<img src="${userAvatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover; display:block;">`;
    } else {
      av.textContent = userAvatar;
    }
  }

  const row = $('profileRow');
  if (row) row.style.display = 'flex';
}

/* ===== OS DETECTION ===== */
function detectOS() {
  const ua = navigator.userAgent || '';
  const plat = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
  const s = plat + ' ' + ua;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/Mac/i.test(s)) return 'mac';
  if (/Win/i.test(s)) return 'win';
  if (/Linux|X11|CrOS/i.test(s)) return 'linux';
  return 'other';
}
const OS = detectOS();
const OS_INFO = {
  win: { icon: 'win', label: { th: 'Windows', en: 'Windows' }, chips: ['Win', 'Space'], alt: { th: '(หรือ Alt + Shift)', en: '(or Alt + Shift)' }, text: 'Win + Space' },
  mac: { icon: 'apple', label: { th: 'macOS', en: 'macOS' }, chips: ['Ctrl', 'Space'], alt: { th: '(หรือกดปุ่มลูกโลก / fn บน Mac รุ่นใหม่)', en: '(or the Globe / fn key on newer Macs)' }, text: 'Ctrl + Space' },
  linux: { icon: 'linux', label: { th: 'Linux', en: 'Linux' }, chips: ['Super', 'Space'], alt: { th: '(บางเครื่องใช้ Alt + Shift)', en: '(some distros use Alt + Shift)' }, text: 'Super + Space' },
  ios: { icon: 'phone', label: { th: 'iPhone / iPad', en: 'iPhone / iPad' }, chips: null, tap: { th: 'แตะปุ่มลูกโลกบนแป้นพิมพ์', en: 'Tap the globe key on the on-screen keyboard' }, text: 'ปุ่มลูกโลกบนแป้นพิมพ์' },
  android: { icon: 'phone', label: { th: 'Android', en: 'Android' }, chips: null, tap: { th: 'แตะปุ่มลูกโลกบนแป้นพิมพ์', en: 'Tap the globe key on the on-screen keyboard' }, text: 'ปุ่มลูกโลกบนแป้นพิมพ์' },
  other: { icon: 'kb', label: { th: 'ระบบของคุณ', en: 'your system' }, chips: ['Alt', 'Shift'], alt: { th: '', en: '' }, text: 'Alt + Shift' }
};
function osSwitchText() { return OS_INFO[OS].text; }

function renderFooter() {
  const fn = $('footerNote'); if (!fn) return;
  const i = OS_INFO[OS], head = (lang === 'th' ? 'ตรวจพบ:' : 'Detected:');
  let keys;
  if (i.chips) { keys = i.chips.map(c => `<span class="kbd">${c}</span>`).join('+') + ' ' + (i.alt[lang] || ''); }
  else { keys = (lang === 'th' ? '<span class="kbd">' + i.tap.th + '</span>' : '<span class="kbd">' + i.tap.en + '</span>'); }
  const tipLabel = lang === 'th' ? 'สลับแป้น:' : 'Switch:';
  const fingerTip = lang === 'th' ? 'วางนิ้วตามไกด์สี' : 'Follow finger guide';
  fn.innerHTML =
    `<span class="os-tag">${ICON(i.icon)} ${i.label[lang]}</span>` +
    `<span class="status-sep"></span>` +
    `${tipLabel} ${keys}` +
    `<span class="status-sep"></span>` +
    `${fingerTip}` +
    `<span class="version-tag" style="margin-left: auto; color: var(--muted); font-size: 10px; opacity: 0.6; font-family: 'IBM Plex Mono', monospace;">v1.0.0</span>`;
}

/* ===== SESSION / AUTH ===== */
async function checkSession() {
  if (!dbClient) return null;
  try {
    const { data: { session } } = await dbClient.auth.getSession();
    return session && session.user ? session.user : null;
  } catch (e) {
    console.error('Session check failed:', e);
    return null;
  }
}

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
    background: '#1a1a2e', color: '#fff'
  });

  if (confirmResult.isConfirmed) {
    if (dbClient) await dbClient.auth.signOut();
    currentUser = null;
    localStorage.removeItem('typing_game_guest');
    localStorage.setItem('typing_game_logged_out', 'true');
    if (window.liff && liff.isLoggedIn()) {
      try {
        liff.logout();
      } catch (e) {
        console.error('LIFF logout error:', e);
      }
    }
    window.location.href = 'login.html';
  }
}

/* ===== LANGUAGE ===== */
function setLang(l) {
  lang = l;
  localStorage.setItem('typing_game_lang', l);
  document.documentElement.lang = l;
  if ($('btnTH')) $('btnTH').classList.toggle('active', l === 'th');
  if ($('btnEN')) $('btnEN').classList.toggle('active', l === 'en');
  updateTooltips();
  // page-specific callback
  if (typeof onLangChange === 'function') onLangChange();
}

/* ===== TOOLTIP LANG SYNC ===== */
function updateTooltips() {
  document.querySelectorAll('.has-tip').forEach(el => {
    const tip = el.getAttribute(lang === 'th' ? 'data-tip-th' : 'data-tip-en');
    if (tip) el.setAttribute('data-tip', tip);
  });
}

/* ===== SCREEN HELPERS (for multi-screen pages like game.html) ===== */
function showScreen(screens, name) {
  for (const k in screens) {
    const el = screens[k];
    const on = k === name;
    el.classList.toggle('on', on);
    if (on) playEntrance(el);
  }
}
function playEntrance(el) { el.classList.remove('anim'); void el.offsetWidth; el.classList.add('anim'); }

/* ===== APP INIT (call on every page) ===== */
async function initApp(options = {}) {
  // Init Supabase
  await initSupabase();

  // Apply language
  document.documentElement.lang = lang;
  if ($('btnTH')) $('btnTH').classList.toggle('active', lang === 'th');
  if ($('btnEN')) $('btnEN').classList.toggle('active', lang === 'en');
  updateTooltips();

  // Wire common buttons
  if ($('btnTH')) $('btnTH').onclick = () => setLang('th');
  if ($('btnEN')) $('btnEN').onclick = () => setLang('en');
  if ($('btnSound')) $('btnSound').onclick = toggleSound;
  if ($('btnFullscreen')) $('btnFullscreen').onclick = toggleFullscreen;
  if ($('btnMusic')) $('btnMusic').onclick = toggleMusic;
  if ($('btnLogout')) $('btnLogout').onclick = handleLogout;

  // Update button states from localStorage
  updateSoundBtn();
  updateMusicBtn();

  // First-gesture music
  window.addEventListener('pointerdown', kickMusic, { once: false });
  window.addEventListener('keydown', kickMusic, { once: false });

  // Profile bar click → profile page
  if ($('profileBar')) {
    $('profileBar').onclick = (e) => {
      if (e.target.closest('#btnLogout')) return;
      window.location.href = 'profile.html';
    };
  }

  // Check auth
  if (options.requireAuth) {
    currentUser = await checkSession();
    const isGuest = localStorage.getItem('typing_game_guest') === 'true';
    if (!currentUser && !isGuest) {
      window.location.href = 'login.html';
      return false;
    }
    await loadUserStats();
    applyTheme();
    updateProfileBar();
    renderFooter();
    return true;
  }

  if (options.redirectIfAuth) {
    currentUser = await checkSession();
    if (currentUser) {
      window.location.href = 'profile.html';
      return false;
    }
    return true;
  }

  // Default: just check session without redirecting
  currentUser = await checkSession();
  if (currentUser) {
    await loadUserStats();
  }
  applyTheme();
  renderFooter();
  return true;
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn(`Fullscreen error: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}
