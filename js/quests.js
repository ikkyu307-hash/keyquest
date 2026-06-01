/* ====================================================================
   quests.js — KeyQuest Weekly Quests & Global Leaderboard
   ==================================================================== */

/* ===== QUEST POOL ===== */
const QUEST_POOL = [
  {
    id: 'q_acc_1',
    type: 'accuracy_games',
    threshold: 95,
    target: 3,
    reward_gold: 50,
    reward_xp: 100,
    icon: 'target',
    title_th: 'นักแม่นปืนรุ่นเยาว์',
    title_en: 'Junior Sharpshooter',
    desc_th: 'พิมพ์ได้ความแม่นยำ ≥ 95% จำนวน 3 เกม',
    desc_en: 'Achieve ≥ 95% accuracy in 3 games'
  },
  {
    id: 'q_acc_2',
    type: 'accuracy_games',
    threshold: 98,
    target: 1,
    reward_gold: 60,
    reward_xp: 120,
    icon: 'shield',
    title_th: 'สมาธิดั่งหินผา',
    title_en: 'Unshakable Focus',
    desc_th: 'พิมพ์ได้ความแม่นยำ ≥ 98% จำนวน 1 เกม',
    desc_en: 'Achieve ≥ 98% accuracy in 1 game'
  },
  {
    id: 'q_wpm_1',
    type: 'wpm_single',
    threshold: 40,
    target: 1,
    reward_gold: 50,
    reward_xp: 100,
    icon: 'bolt',
    title_th: 'สายฟ้าแลบ',
    title_en: 'Speedy Fingers',
    desc_th: 'ทำความเร็วพิมพ์ ≥ 40 WPM ในเกมใดก็ได้',
    desc_en: 'Achieve speed ≥ 40 WPM in any game'
  },
  {
    id: 'q_wpm_2',
    type: 'wpm_single',
    threshold: 55,
    target: 1,
    reward_gold: 80,
    reward_xp: 150,
    icon: 'sword',
    title_th: 'ดัชนีไร้เงา',
    title_en: 'Shadowless Strike',
    desc_th: 'ทำความเร็วพิมพ์ ≥ 55 WPM ในเกมใดก็ได้',
    desc_en: 'Achieve speed ≥ 55 WPM in any game'
  },
  {
    id: 'q_combo_1',
    type: 'combo_single',
    target: 30,
    reward_gold: 40,
    reward_xp: 80,
    icon: 'flame',
    title_th: 'คอมโบสะท้านภพ',
    title_en: 'Flame Combo',
    desc_th: 'ทำคอมโบต่อเนื่อง ≥ 30 ครั้งในเกมเดียว',
    desc_en: 'Achieve a combo of ≥ 30 in a single game'
  },
  {
    id: 'q_combo_2',
    type: 'combo_single',
    target: 60,
    reward_gold: 70,
    reward_xp: 140,
    icon: 'trophy',
    title_th: 'จังหวะระดับเทพ',
    title_en: 'Divine Rhythm',
    desc_th: 'ทำคอมโบต่อเนื่อง ≥ 60 ครั้งในเกมเดียว',
    desc_en: 'Achieve a combo of ≥ 60 in a single game'
  },
  {
    id: 'q_count_1',
    type: 'games_count',
    target: 5,
    reward_gold: 30,
    reward_xp: 60,
    icon: 'scroll',
    title_th: 'นักฝึกฝนผู้ขยัน',
    title_en: 'Diligent Practitioner',
    desc_th: 'เล่นโหมดปกติครบ 5 เกม (ระดับใดก็ได้)',
    desc_en: 'Play 5 games in any difficulty'
  },
  {
    id: 'q_count_2',
    type: 'games_count',
    target: 10,
    reward_gold: 70,
    reward_xp: 130,
    icon: 'gift',
    title_th: 'ผู้บุกเบิกคีย์เควสต์',
    title_en: 'KeyQuest Explorer',
    desc_th: 'เล่นโหมดปกติครบ 10 เกม',
    desc_en: 'Play 10 games in total'
  },
  {
    id: 'q_diff_hard',
    type: 'stars_difficulty',
    difficulty: 'hard',
    target: 3,
    reward_gold: 70,
    reward_xp: 140,
    icon: 'skull',
    title_th: 'ผู้พิชิตระดับยาก',
    title_en: 'Conqueror of Hard',
    desc_th: 'ได้ 3 ดาวในระดับความยาก "ยาก"',
    desc_en: 'Earn 3 stars on Hard difficulty'
  },
  {
    id: 'q_diff_extreme',
    type: 'stars_difficulty',
    difficulty: 'extreme',
    target: 2,
    reward_gold: 100,
    reward_xp: 200,
    icon: 'medal',
    title_th: 'ขีดสุดของผู้กล้า',
    title_en: 'Extreme Challenger',
    desc_th: 'สำเร็จได้ดาว ≥ 2 ดวงในระดับ "ยากสูงสุด"',
    desc_en: 'Earn at least 2 stars on Extreme difficulty'
  }
];

/* ===== MOCK LEADERBOARD ===== */
const MOCK_LEADERBOARD = [
  { id: 'mock1', display_name: 'SirTypingAlot', xp: 2850, level: 15, max_wpm: 88, avg_accuracy: 99, avatar_url: '🧙‍♂️' },
  { id: 'mock2', display_name: 'KeycapKnight', xp: 1940, level: 10, max_wpm: 72, avg_accuracy: 96, avatar_url: '🛡️' },
  { id: 'mock3', display_name: 'FingersOfFury', xp: 1520, level: 8, max_wpm: 81, avg_accuracy: 93, avatar_url: '🔥' },
  { id: 'mock4', display_name: 'Lancelot_Keys', xp: 1210, level: 7, max_wpm: 65, avg_accuracy: 95, avatar_url: '🗡️' },
  { id: 'mock5', display_name: 'GhostWriter', xp: 980, level: 5, max_wpm: 58, avg_accuracy: 97, avatar_url: '👻' },
  { id: 'mock6', display_name: 'SwiftSorcerer', xp: 810, level: 5, max_wpm: 60, avg_accuracy: 92, avatar_url: '🔮' },
  { id: 'mock7', display_name: 'KeyboardCat', xp: 540, level: 3, max_wpm: 45, avg_accuracy: 90, avatar_url: '🐱' },
  { id: 'mock8', display_name: 'SpaceBarNinja', xp: 320, level: 2, max_wpm: 52, avg_accuracy: 94, avatar_url: '🥷' },
  { id: 'mock9', display_name: 'LegendOfClick', xp: 180, level: 1, max_wpm: 38, avg_accuracy: 89, avatar_url: '🖱️' }
];

/* ===== STATE & UTILS ===== */
let timerInterval = null;
let currentSort = 'xp';

// Seeded PRNG
function SeededRandom(seedStr) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
  }
  return function() {
    h = Math.imul(1103515245, h) + 12345 | 0;
    return (h >>> 0) / 4294967296;
  };
}

// Get date string of current week's Monday (in local time)
function getMondayDateString() {
  const d = new Date();
  const day = d.getDay();
  // If Sunday (0), go back 6 days, else go back (day - 1) days
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().split('T')[0];
}

// Get the date of next Monday 00:00:00
function getNextMondayDate() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? 1 : 8);
  const nextMonday = new Date(d.setDate(diff));
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday;
}

// Select 5 weekly quests based on seed date
function generateWeeklyQuestsForSeed(dateStr) {
  const rand = SeededRandom(dateStr);
  const pool = [...QUEST_POOL];
  const selected = [];
  for (let i = 0; i < 5; i++) {
    const idx = Math.floor(rand() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }
  return selected;
}

/* ===== DATABASE SYNC ===== */
async function loadProgressFromDB(userId, weekStart) {
  if (!dbClient) return null;
  try {
    const { data, error } = await dbClient
      .from('quest_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('week_start', weekStart)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  } catch (e) {
    console.warn('Failed to load quest progress from Supabase:', e);
    return null;
  }
}

async function saveProgressToDB(userId, weekStart, progress, claimed) {
  if (!dbClient) return;
  try {
    const { error } = await dbClient
      .from('quest_progress')
      .upsert({
        user_id: userId,
        week_start: weekStart,
        progress: progress,
        claimed: claimed,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,week_start' });
    if (error) throw error;
  } catch (e) {
    console.warn('Failed to save quest progress to Supabase:', e);
  }
}

async function loadLeaderboardFromDB() {
  if (!dbClient) return [];
  try {
    const { data, error } = await dbClient
      .from('typing_user_stats')
      .select('id, xp, level, max_wpm, avg_accuracy, display_name, avatar_url')
      .limit(50);
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.warn('Failed to fetch leaderboard from Supabase:', e);
    return [];
  }
}

/* ===== CORE LOGIC ===== */

// Sync local stats to profile_stats display name & avatar_url in DB if table supports it
async function syncDisplayNameAndAvatar() {
  if (!dbClient || !currentUser) return;
  try {
    const nameKey = 'typing_game_display_name_' + currentUser.id;
    const avatarKey = 'typing_game_avatar_' + currentUser.id;
    const name = localStorage.getItem(nameKey) || currentUser.email.split('@')[0];
    const avatar = localStorage.getItem(avatarKey) || '🦊';

    // Update in typing_user_stats
    await dbClient.from('typing_user_stats').update({
      display_name: name,
      avatar_url: avatar
    }).eq('id', currentUser.id);
  } catch (e) {
    console.warn('Could not sync profile metadata to Supabase:', e);
  }
}

// Call this from finished game screen in game.js
async function updateQuestProgress(gameResult) {
  const weekStart = getMondayDateString();
  const quests = generateWeeklyQuestsForSeed(weekStart);
  
  // Load progress
  const localProgressKey = 'kq_quest_progress_' + weekStart;
  let progress = {};
  try {
    progress = JSON.parse(localStorage.getItem(localProgressKey)) || {};
  } catch (e) {
    progress = {};
  }

  // Sync with DB
  let dbProgress = null;
  if (currentUser) {
    dbProgress = await loadProgressFromDB(currentUser.id, weekStart);
    if (dbProgress) {
      // Merge progress
      progress = { ...progress, ...(dbProgress.progress || {}) };
    }
  }

  let changed = false;
  quests.forEach(q => {
    const currentVal = progress[q.id] || 0;
    if (currentVal >= q.target) return; // already completed

    let newVal = currentVal;
    switch (q.type) {
      case 'accuracy_games':
        if (gameResult.acc >= q.threshold) newVal = currentVal + 1;
        break;
      case 'wpm_single':
        if (gameResult.wpm >= q.threshold) newVal = q.target;
        break;
      case 'combo_single':
        if (gameResult.combo >= q.target) newVal = q.target;
        break;
      case 'games_count':
        newVal = currentVal + 1;
        break;
      case 'stars_difficulty':
        if (gameResult.diff === q.difficulty && gameResult.stars >= q.target) {
          newVal = q.target;
        }
        break;
    }

    if (newVal !== currentVal) {
      progress[q.id] = Math.min(newVal, q.target);
      changed = true;
    }
  });

  if (changed) {
    localStorage.setItem(localProgressKey, JSON.stringify(progress));
    if (currentUser) {
      const localClaimedKey = 'kq_quest_claimed_' + weekStart;
      let claimed = [];
      try { claimed = JSON.parse(localStorage.getItem(localClaimedKey)) || []; } catch(e) {}
      if (dbProgress) {
        claimed = [...new Set([...claimed, ...(dbProgress.claimed || [])])];
      }
      await saveProgressToDB(currentUser.id, weekStart, progress, claimed);
    }
  }
}

// Render Quests Tab list
function renderQuestsList(quests, progress, claimed) {
  const list = $('questsList');
  if (!list) return;
  list.innerHTML = '';

  const isTh = lang === 'th';

  quests.forEach(q => {
    const progVal = progress[q.id] || 0;
    const isCompleted = progVal >= q.target;
    const isClaimed = claimed.includes(q.id);

    const card = document.createElement('div');
    card.className = 'quest-card' + (isCompleted ? ' completed' : '');

    const pct = Math.min(100, Math.round((progVal / q.target) * 100));

    // Build claim button state
    let actionHtml = '';
    if (isClaimed) {
      actionHtml = `<span class="q-claim-btn claimed"><svg class="ic"><use href="#i-check"></use></svg> ${isTh ? 'รับแล้ว' : 'Claimed'}</span>`;
    } else if (isCompleted) {
      actionHtml = `<button class="q-claim-btn" onclick="claimQuestReward('${q.id}')">${isTh ? 'รับรางวัล' : 'Claim'}</button>`;
    } else {
      actionHtml = `<button class="q-claim-btn disabled">${isTh ? 'รับรางวัล' : 'Claim'}</button>`;
    }

    card.innerHTML = `
      <div class="q-main">
        <div class="q-icon-wrap">${ICON(q.icon)}</div>
        <div class="q-content">
          <div class="q-title">${isTh ? q.title_th : q.title_en}</div>
          <div class="q-desc">${isTh ? q.desc_th : q.desc_en}</div>
          <div class="q-progress-container">
            <div class="q-progress-outer">
              <div class="q-progress-inner" style="width: ${pct}%"></div>
            </div>
            <div class="q-progress-text">${progVal} / ${q.target}</div>
          </div>
        </div>
      </div>
      <div class="q-action">
        <div class="q-rewards">
          <span class="q-reward-badge xp">+${q.reward_xp} XP</span>
          <span class="q-reward-badge gold">+${q.reward_gold} G</span>
        </div>
        ${actionHtml}
      </div>
    `;
    list.appendChild(card);
  });
  
  questsListRef = quests;
  questsCount = quests.length;
  updateQuestsSelection();
}

// Claim reward for a quest
async function claimQuestReward(questId) {
  const weekStart = getMondayDateString();
  const quests = generateWeeklyQuestsForSeed(weekStart);
  const q = quests.find(item => item.id === questId);
  if (!q) return;

  const localProgressKey = 'kq_quest_progress_' + weekStart;
  const localClaimedKey = 'kq_quest_claimed_' + weekStart;
  
  let progress = {};
  let claimed = [];
  try {
    progress = JSON.parse(localStorage.getItem(localProgressKey)) || {};
    claimed = JSON.parse(localStorage.getItem(localClaimedKey)) || [];
  } catch(e) {}

  if (claimed.includes(questId)) return;
  const currentVal = progress[questId] || 0;
  if (currentVal < q.target) return;

  claimed.push(questId);
  localStorage.setItem(localClaimedKey, JSON.stringify(claimed));

  // Add stats
  if (typeof userStats !== 'undefined') {
    const oldLvl = Math.floor(userStats.xp / 200) + 1;
    userStats.xp += q.reward_xp;
    userStats.gold += q.reward_gold;
    
    const newLvl = Math.floor(userStats.xp / 200) + 1;
    let lvlUp = false;
    if (newLvl > oldLvl) {
      lvlUp = true;
      userStats.gold += 50;
      userStats.level = newLvl;
    }

    updateProfileBar();
    await saveUserStats();
  }

  // Save to DB
  if (currentUser) {
    await saveProgressToDB(currentUser.id, weekStart, progress, claimed);
  }

  winSound();

  // Burst effect
  const b = $('burst');
  if (b) {
    b.innerHTML = ICON('win') + `<span>CLAIMED!</span>`;
    b.classList.remove('go');
    void b.offsetWidth;
    b.classList.add('go');
    setTimeout(() => b.classList.remove('go'), 1500);
  }

  Swal.fire({
    title: lang === 'th' ? 'รับรางวัลสำเร็จ!' : 'Reward Claimed!',
    html: lang === 'th' 
      ? `คุณได้รับ <span style="color:var(--cyan);font-weight:700;">+${q.reward_xp} XP</span> และ <span style="color:var(--amber);font-weight:700;">+${q.reward_gold} ทอง</span>`
      : `You received <span style="color:var(--cyan);font-weight:700;">+${q.reward_xp} XP</span> and <span style="color:var(--amber);font-weight:700;">+${q.reward_gold} Gold</span>`,
    icon: 'success',
    background: '#1a1a2e',
    color: '#fff',
    confirmButtonColor: 'var(--amber)'
  });

  renderQuestsList(quests, progress, claimed);
}

// Update remaining time countdown
function startCountdown() {
  if (timerInterval) clearInterval(timerInterval);
  
  const isTh = lang === 'th';
  const target = getNextMondayDate();

  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      $('questTimer').textContent = isTh ? 'รีเซ็ตเมื่อครู่' : 'Resetting...';
      clearInterval(timerInterval);
      setTimeout(() => bootQuests(), 2000); // Reload
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const timeStr = isTh 
      ? `รีเซ็ตใน: ${d > 0 ? d + ' วัน ' : ''}${h} ชม. ${m} นาที ${s} วิ`
      : `Resets in: ${d > 0 ? d + 'd ' : ''}${h}h ${m}m ${s}s`;
    
    $('questTimer').textContent = timeStr;
  }

  update();
  timerInterval = setInterval(update, 1000);
}

// Get Rank Title by Level
function getRankTitle(level, isTh) {
  if (level >= 15) return isTh ? 'ยอดปรมาจารย์' : 'Grandmaster';
  if (level >= 10) return isTh ? 'ปรมาจารย์' : 'Master';
  if (level >= 7) return isTh ? 'ผู้เชี่ยวชาญ' : 'Adept';
  if (level >= 4) return isTh ? 'ผู้ฝึกหัด' : 'Apprentice';
  return isTh ? 'มือใหม่' : 'Novice';
}

// Render Leaderboard list
async function renderLeaderboard() {
  const lbList = $('lbList');
  if (!lbList) return;
  lbList.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted)">${lang === 'th' ? 'กำลังโหลดอันดับ...' : 'Loading leaderboard...'}</div>`;

  const isTh = lang === 'th';

  // Get data from DB
  let dbUsers = await loadLeaderboardFromDB();
  
  // Prepare current user
  const nameKey = 'typing_game_display_name_' + (currentUser ? currentUser.id : 'guest');
  const displayName = localStorage.getItem(nameKey) || (currentUser ? currentUser.email.split('@')[0] : (isTh ? 'ผู้ใช้ทั่วไป (คุณ)' : 'Guest (You)'));
  const avatarKey = 'typing_game_avatar_' + (currentUser ? currentUser.id : 'guest');
  const avatar = localStorage.getItem(avatarKey) || '🦊';

  const selfObj = {
    id: currentUser ? currentUser.id : 'guest',
    display_name: displayName,
    xp: userStats.xp,
    level: userStats.level || (Math.floor(userStats.xp / 200) + 1),
    max_wpm: userStats.max_wpm || 0,
    avg_accuracy: userStats.avg_accuracy || 0,
    avatar_url: avatar,
    isSelf: true
  };

  // Combine DB + Mock + Self
  let list = [];
  const addedIds = new Set();

  // Add DB users first
  dbUsers.forEach(u => {
    if (u.id === selfObj.id) {
      list.push({ ...selfObj, id: u.id });
    } else {
      list.push({
        id: u.id,
        display_name: u.display_name || 'Adventurer',
        xp: u.xp || 0,
        level: u.level || 1,
        max_wpm: u.max_wpm || 0,
        avg_accuracy: u.avg_accuracy || 0,
        avatar_url: u.avatar_url || '👤'
      });
    }
    addedIds.add(u.id);
  });

  // If self not added yet, add it
  if (!addedIds.has(selfObj.id)) {
    list.push(selfObj);
    addedIds.add(selfObj.id);
  }

  // If list is small (e.g. no DB users), add mock users to make it vibrant
  MOCK_LEADERBOARD.forEach(u => {
    if (!addedIds.has(u.id)) {
      list.push(u);
      addedIds.add(u.id);
    }
  });

  // Sort based on sort state
  if (currentSort === 'xp') {
    list.sort((a, b) => b.xp - a.xp);
  } else if (currentSort === 'wpm') {
    list.sort((a, b) => b.max_wpm - a.max_wpm);
  } else if (currentSort === 'acc') {
    list.sort((a, b) => b.avg_accuracy - a.avg_accuracy);
  }

  // Render rows
  lbList.innerHTML = '';
  list.slice(0, 20).forEach((item, index) => {
    const isSelf = item.isSelf || (currentUser && item.id === currentUser.id) || (!currentUser && item.id === 'guest');
    const row = document.createElement('div');
    row.className = 'lb-row' + (isSelf ? ' lb-self' : '');

    let scoreVal = item.xp;
    let label = 'XP';
    if (currentSort === 'wpm') {
      scoreVal = item.max_wpm;
      label = 'WPM';
    } else if (currentSort === 'acc') {
      scoreVal = item.avg_accuracy + '%';
      label = isTh ? 'แม่นยำ' : 'Acc';
    }

    const avHtml = item.avatar_url.startsWith('http') 
      ? `<img src="${item.avatar_url}">` 
      : item.avatar_url;

    const rankTitle = getRankTitle(item.level, isTh);

    row.innerHTML = `
      <div class="lb-left">
        <div class="lb-rank">${index + 1}</div>
        <div class="lb-avatar">${avHtml}</div>
        <div class="lb-name-group">
          <div class="lb-name">${item.display_name}</div>
          <div class="lb-level">Lv. ${item.level} <span style="opacity:0.6;font-size:11px;margin-left:4px;">(${rankTitle})</span></div>
        </div>
      </div>
      <div class="lb-right">
        <span class="lb-val">${scoreVal}</span>
        <span class="lb-val-label">${label}</span>
      </div>
    `;
    lbList.appendChild(row);
  });
}

/* ===== LANG CHANGE ===== */
function onLangChange() {
  const isTh = lang === 'th';
  
  $('questTitle').textContent = isTh ? '📋 ภารกิจประจำสัปดาห์' : '📋 Weekly Quests';
  $('lblTabQuests').textContent = isTh ? 'ภารกิจ' : 'Quests';
  $('lblTabLb').textContent = isTh ? 'อันดับ' : 'Leaderboard';
  $('lbTitle').textContent = isTh ? '🏆 อันดับผู้เล่น' : '🏆 Top Rankings';
  $('lblSortAcc').textContent = isTh ? 'แม่นยำ' : 'Accuracy';
  if ($('lblBack')) $('lblBack').textContent = isTh ? 'กลับโปรไฟล์' : 'Back to Profile';

  // Re-render
  const weekStart = getMondayDateString();
  const quests = generateWeeklyQuestsForSeed(weekStart);
  
  const localProgressKey = 'kq_quest_progress_' + weekStart;
  const localClaimedKey = 'kq_quest_claimed_' + weekStart;
  let progress = {};
  let claimed = [];
  try {
    progress = JSON.parse(localStorage.getItem(localProgressKey)) || {};
    claimed = JSON.parse(localStorage.getItem(localClaimedKey)) || [];
  } catch(e) {}

  renderQuestsList(quests, progress, claimed);
  startCountdown();
  renderLeaderboard();
  renderFooter();
}

/* ===== BOOT ENTRY POINT ===== */

/* ===== KEYBOARD NAVIGATION ===== */
let selectedQuestIdx = 0;
let questsCount = 0;
let questsListRef = [];

function updateQuestsSelection() {
  const cards = document.querySelectorAll('.quest-card');
  cards.forEach((el, idx) => {
    el.classList.toggle('selected', idx === selectedQuestIdx);
  });
}

function questsKeyHandler(e) {
  if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
  if (questsCount === 0) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedQuestIdx = (selectedQuestIdx + 1) % questsCount;
    updateQuestsSelection();
    playMenuBeep();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedQuestIdx = (selectedQuestIdx - 1 + questsCount) % questsCount;
    updateQuestsSelection();
    playMenuBeep();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const activeQuest = questsListRef[selectedQuestIdx];
    if (activeQuest) {
      // Find the claim button for this quest card and click it
      const card = document.querySelectorAll('.quest-card')[selectedQuestIdx];
      if (card) {
        const btn = card.querySelector('.btn-amber, .btn');
        if (btn && !btn.disabled) {
          btn.click();
        }
      }
    }
  }
  } else if (e.key === 'Escape') {
    e.preventDefault();
    playClick();
    setTimeout(() => location.href = 'profile.html', 150);
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    // Switch tabs if we are at the top, or just allow toggling
    e.preventDefault();
    const tabQuests = $('tabQuests');
    const tabLb = $('tabLeaderboard');
    if (tabQuests && tabQuests.classList.contains('active')) {
      tabLb.click();
    } else if (tabLb) {
      tabQuests.click();
    }
    playMenuBeep();
  }
}

async function bootQuests() {
  const ok = await initApp({ requireAuth: true });
  if (!ok) return;

  const weekStart = getMondayDateString();
  const quests = generateWeeklyQuestsForSeed(weekStart);

  // Sync profile metadata to DB (display_name & avatar_url)
  await syncDisplayNameAndAvatar();

  // Load progress
  const localProgressKey = 'kq_quest_progress_' + weekStart;
  const localClaimedKey = 'kq_quest_claimed_' + weekStart;
  
  let progress = {};
  let claimed = [];
  try {
    progress = JSON.parse(localStorage.getItem(localProgressKey)) || {};
    claimed = JSON.parse(localStorage.getItem(localClaimedKey)) || [];
  } catch(e) {}

  // Sync progress with Supabase if logged in
  if (currentUser) {
    const dbProgress = await loadProgressFromDB(currentUser.id, weekStart);
    if (dbProgress) {
      // Merge progress and claimed status
      progress = { ...progress, ...(dbProgress.progress || {}) };
      claimed = [...new Set([...claimed, ...(dbProgress.claimed || [])])];
      
      // Update local storage
      localStorage.setItem(localProgressKey, JSON.stringify(progress));
      localStorage.setItem(localClaimedKey, JSON.stringify(claimed));
    } else {
      // Create first entry on DB
      await saveProgressToDB(currentUser.id, weekStart, progress, claimed);
    }
  }

  // Setup tabs
  const tabQuests = $('tabQuests');
  const tabLb = $('tabLeaderboard');
  const panelQuests = $('questsPanel');
  const panelLb = $('leaderboardPanel');

  tabQuests.onclick = () => {
    tabQuests.classList.add('active');
    tabLb.classList.remove('active');
    panelQuests.style.display = 'block';
    panelLb.style.display = 'none';
    tick();
  };

  tabLb.onclick = () => {
    tabLb.classList.add('active');
    tabQuests.classList.remove('active');
    panelQuests.style.display = 'none';
    panelLb.style.display = 'block';
    tick();
    renderLeaderboard();
  };

  // Setup sorting buttons
  const sortXp = $('sortXp');
  const sortWpm = $('sortWpm');
  const sortAcc = $('sortAcc');

  const setSort = (sortVal) => {
    currentSort = sortVal;
    sortXp.classList.toggle('active', sortVal === 'xp');
    sortWpm.classList.toggle('active', sortVal === 'wpm');
    sortAcc.classList.toggle('active', sortVal === 'acc');
    tick();
    renderLeaderboard();
  };

  sortXp.onclick = () => setSort('xp');
  sortWpm.onclick = () => setSort('wpm');
  sortAcc.onclick = () => setSort('acc');

  // Initial render
  onLangChange();
  
  // Attach keyboard navigation
  window.addEventListener('keydown', questsKeyHandler);
}
