/* ====================================================================
   profile.js — Profile page logic
   Depends on: shared.js, config.js
   ==================================================================== */

function changeAvatar(emoji) {
  const avatarKey = 'typing_game_avatar_' + (currentUser ? currentUser.id : 'guest');
  localStorage.setItem(avatarKey, emoji);
  renderProfilePage();
  $('avatarSelectorPanel').style.display = 'none';
  winSound();
}
// expose to onclick handlers
window.changeAvatar = changeAvatar;

function renderProfilePage() {
  const avatarKey = 'typing_game_avatar_' + (currentUser ? currentUser.id : 'guest');
  const userAvatar = localStorage.getItem(avatarKey) || '🦊';

  const largeAv = $('profileAvatarLarge');
  if (largeAv) {
    if (userAvatar.startsWith('http')) {
      largeAv.innerHTML = `<img src="${userAvatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover; display:block;">`;
    } else {
      largeAv.textContent = userAvatar;
    }
  }

  const nameKey = 'typing_game_display_name_' + (currentUser ? currentUser.id : 'guest');
  const displayName = localStorage.getItem(nameKey) || (currentUser ? currentUser.email.split('@')[0] : (lang === 'th' ? 'ผู้ใช้ทั่วไป' : 'Guest User'));
  $('profileUsernameLarge').textContent = displayName;
  
  $('profileUserEmail').textContent = lang === 'th' ? 'เชื่อมต่อผ่านบัญชี LINE' : 'Connected via LINE Account';

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

function onLangChange() {
  renderProfilePage();
  renderFooter();
}

/* ===== BOOT ===== */
async function bootProfile() {
  const ok = await initApp({ requireAuth: true });
  if (!ok) return;

  renderProfilePage();

  // Wire buttons
  $('btnEditAvatar').onclick = () => {
    const panel = $('avatarSelectorPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  };
  $('btnStartQuest').onclick = () => { window.location.href = 'game.html'; };
  $('btnProfileAcademy').onclick = () => { window.location.href = 'academy.html'; };
  $('btnProfileLogout').onclick = handleLogout;
}
