/* ====================================================================
   profile.js — Profile page logic with Avatar Upload
   Depends on: shared.js, config.js
   ==================================================================== */

/* ===== AVATAR MANAGEMENT ===== */
let selectedFile = null;

function changeAvatar(emoji) {
  const avatarKey = 'typing_game_avatar_' + (currentUser ? currentUser.id : 'guest');
  localStorage.setItem(avatarKey, emoji);
  renderProfilePage();
  $('avatarSelectorPanel').style.display = 'none';
  winSound();
}
window.changeAvatar = changeAvatar;

function setupAvatarUpload() {
  const zone = $('avatarUploadZone');
  const input = $('avatarFileInput');
  const preview = $('uploadPreview');
  const placeholder = $('uploadPlaceholder');
  const btnUpload = $('btnUploadAvatar');
  if (!zone || !input) return;

  // Click to open file picker
  zone.onclick = () => input.click();

  // Drag & drop
  zone.ondragover = e => { e.preventDefault(); zone.classList.add('dragover'); };
  zone.ondragleave = () => zone.classList.remove('dragover');
  zone.ondrop = e => { e.preventDefault(); zone.classList.remove('dragover'); handleFile(e.dataTransfer.files[0]); };

  // File input change
  input.onchange = () => { if (input.files[0]) handleFile(input.files[0]); };

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 2 * 1024 * 1024) {
      $('uploadStatus').textContent = lang === 'th' ? '❌ ไฟล์ใหญ่เกิน 2MB' : '❌ File too large (max 2MB)';
      return;
    }
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = e => {
      preview.src = e.target.result;
      preview.style.display = 'block';
      placeholder.style.display = 'none';
      btnUpload.style.display = 'flex';
      $('uploadStatus').textContent = '';
    };
    reader.readAsDataURL(file);
  }

  // Upload button
  btnUpload.onclick = async (e) => {
    e.stopPropagation();
    if (!selectedFile) return;
    const isTh = lang === 'th';
    $('uploadStatus').textContent = isTh ? '⏳ กำลังอัปโหลด...' : '⏳ Uploading...';

    try {
      // Try Supabase Storage first
      if (dbClient && currentUser) {
        const ext = selectedFile.name.split('.').pop();
        const path = `${currentUser.id}/avatar.${ext}`;
        const { error } = await dbClient.storage.from('avatars').upload(path, selectedFile, { upsert: true });

        if (!error) {
          const { data: urlData } = dbClient.storage.from('avatars').getPublicUrl(path);
          const publicUrl = urlData.publicUrl + '?t=' + Date.now();
          const avatarKey = 'typing_game_avatar_' + currentUser.id;
          localStorage.setItem(avatarKey, publicUrl);
          renderProfilePage();
          $('avatarSelectorPanel').style.display = 'none';
          $('uploadStatus').textContent = isTh ? '✅ อัปโหลดสำเร็จ!' : '✅ Upload complete!';
          winSound();
          selectedFile = null;
          return;
        }
      }

      // Fallback: save as data URL in localStorage
      const avatarKey = 'typing_game_avatar_' + (currentUser ? currentUser.id : 'guest');
      localStorage.setItem(avatarKey, preview.src);
      renderProfilePage();
      $('avatarSelectorPanel').style.display = 'none';
      $('uploadStatus').textContent = isTh ? '✅ บันทึกสำเร็จ (ในเครื่อง)' : '✅ Saved locally!';
      winSound();
      selectedFile = null;
    } catch (err) {
      console.error('Upload error:', err);
      // Still save locally
      const avatarKey = 'typing_game_avatar_' + (currentUser ? currentUser.id : 'guest');
      localStorage.setItem(avatarKey, preview.src);
      renderProfilePage();
      $('uploadStatus').textContent = isTh ? '⚠️ บันทึกในเครื่อง (ไม่สามารถอัปโหลดได้)' : '⚠️ Saved locally (upload unavailable)';
    }
  };
}

/* ===== RENDER PROFILE ===== */
function renderProfilePage() {
  const avatarKey = 'typing_game_avatar_' + (currentUser ? currentUser.id : 'guest');
  const userAvatar = localStorage.getItem(avatarKey) || '🦊';

  const largeAv = $('profileAvatarLarge');
  if (largeAv) {
    if (userAvatar.startsWith('http') || userAvatar.startsWith('data:')) {
      largeAv.innerHTML = `<img src="${userAvatar}" alt="avatar">`;
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
  if ($('lblLobbyPlayTitle')) $('lblLobbyPlayTitle').textContent = isTh ? 'ด่านคีย์เควสต์ (Quest)' : 'Quest Stages';
  if ($('lblLobbyPlayDesc')) $('lblLobbyPlayDesc').textContent = isTh ? 'ผจญภัยในโลกฝึกพิมพ์ดีด สะสม XP และทองคำ' : 'Adventure through typing tests, earn XP and Gold';
  if ($('lblLobbyAcademyTitle')) $('lblLobbyAcademyTitle').textContent = isTh ? 'สำนักฝึกวิชา (Academy)' : 'Skills Academy';
  if ($('lblLobbyAcademyDesc')) $('lblLobbyAcademyDesc').textContent = isTh ? 'แลกเปลี่ยนทองเพื่อเปิดความสามารถพิเศษและธีมใหม่' : 'Spend Gold to unlock unique skills and visual themes';
  if ($('lblLobbyQuestsTitle')) $('lblLobbyQuestsTitle').textContent = isTh ? 'ภารกิจ & อันดับ' : 'Quest & Rank';
  if ($('lblLobbyQuestsDesc')) $('lblLobbyQuestsDesc').textContent = isTh ? 'ทำภารกิจประจำสัปดาห์และท้าทายตารางจัดอันดับ' : 'Complete weekly tasks and climb the global leaderboards';
  if ($('lblLobbyTutorialTitle')) $('lblLobbyTutorialTitle').textContent = isTh ? 'ฝึกวางนิ้ว (Tutorial)' : 'Finger Placement';
  if ($('lblLobbyTutorialDesc')) $('lblLobbyTutorialDesc').textContent = isTh ? 'ปูพื้นฐานการวางนิ้วตามหลักการพิมพ์สัมผัสที่ถูกต้อง' : 'Learn standard touch-typing row layouts for speed';

  $('lblSelectGuardian').textContent = isTh ? 'อัปโหลดรูปโปรไฟล์' : 'Upload Profile Picture';
  if ($('lblUploadHint')) $('lblUploadHint').textContent = isTh ? 'คลิกเลือกรูป หรือลากวาง' : 'Click to choose or drag & drop';
  if ($('lblConfirmUpload')) $('lblConfirmUpload').textContent = isTh ? 'บันทึกรูปโปรไฟล์' : 'Save Profile Picture';
  if ($('lblOrEmoji')) $('lblOrEmoji').textContent = isTh ? 'หรือเลือก emoji' : 'or choose emoji';
  $('lblProfGames').textContent = isTh ? 'ด่านที่พิมพ์' : 'Games Played';
  $('lblProfWpm').textContent = isTh ? 'WPM สูงสุด' : 'Max WPM';
  $('lblProfAcc').textContent = isTh ? 'แม่นยำเฉลี่ย' : 'Avg Accuracy';
  $('lblProfGold').textContent = isTh ? 'ทองสะสม' : 'Total Gold';
  if ($('lblStartQuest')) $('lblStartQuest').textContent = isTh ? 'เข้าสู่การเลือกด่าน (Start Quest)' : 'Start Quest';
  if ($('lblProfAcademy')) $('lblProfAcademy').textContent = isTh ? 'สำนักฝึกวิชา (Academy)' : 'Skill Academy';
  $('lblProfLogout').textContent = isTh ? 'ออกจากระบบ' : 'Log Out';
}

function onLangChange() { renderProfilePage(); renderFooter(); }

/* ===== BOOT ===== */


let selectedLobbyIdx = 2; // Default to Play card
const lobbyCards = [
  { id: 'btnEditAvatar', action: () => { const btn = $('btnEditAvatar'); if (btn) btn.click(); } }, // 0
  { id: 'btnProfileLogout', action: () => handleLogout() }, // 1
  { id: 'btnLobbyPlay', url: 'game.html' }, // 2
  { id: 'btnLobbyAcademy', url: 'academy.html' }, // 3
  { id: 'btnLobbyQuests', url: 'quests.html' }, // 4
  { id: 'btnLobbyTutorial', url: 'tutorial.html' }, // 5
  { id: 'btnLobbyLibrary', url: 'library.html' } // 6
];

function updateLobbySelection() {
  lobbyCards.forEach((c, idx) => {
    const el = $(c.id);
    if (el) {
      el.classList.toggle('selected', idx === selectedLobbyIdx);
    }
  });
}

function lobbyKeyHandler(e) {
  if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
  const panel = $('avatarSelectorPanel');
  if (panel && panel.style.display === 'block') {
    if (e.key === 'Escape') {
      e.preventDefault();
      panel.style.display = 'none';
      if (typeof playMenuBeep === 'function') playMenuBeep();
    }
    return;
  }

  if (e.key === 'ArrowRight') {
    e.preventDefault();
    if (selectedLobbyIdx === 0) selectedLobbyIdx = 2;
    else if (selectedLobbyIdx === 1) selectedLobbyIdx = 4;
    else if (selectedLobbyIdx === 2) selectedLobbyIdx = 3;
    else if (selectedLobbyIdx === 4) selectedLobbyIdx = 5;
    else if (selectedLobbyIdx === 6) selectedLobbyIdx = 6;
    else if (selectedLobbyIdx === 3) selectedLobbyIdx = 0;
    else if (selectedLobbyIdx === 5) selectedLobbyIdx = 1;
    updateLobbySelection();
    if (typeof playMenuBeep === 'function') playMenuBeep();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    if (selectedLobbyIdx === 0) selectedLobbyIdx = 3;
    else if (selectedLobbyIdx === 1) selectedLobbyIdx = 5;
    else if (selectedLobbyIdx === 2) selectedLobbyIdx = 0;
    else if (selectedLobbyIdx === 4) selectedLobbyIdx = 1;
    else if (selectedLobbyIdx === 6) selectedLobbyIdx = 1;
    else if (selectedLobbyIdx === 3) selectedLobbyIdx = 2;
    else if (selectedLobbyIdx === 5) selectedLobbyIdx = 4;
    updateLobbySelection();
    if (typeof playMenuBeep === 'function') playMenuBeep();
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (selectedLobbyIdx === 0) selectedLobbyIdx = 1;
    else if (selectedLobbyIdx === 1) selectedLobbyIdx = 0;
    else if (selectedLobbyIdx === 2) selectedLobbyIdx = 4;
    else if (selectedLobbyIdx === 3) selectedLobbyIdx = 5;
    else if (selectedLobbyIdx === 4) selectedLobbyIdx = 6;
    else if (selectedLobbyIdx === 5) selectedLobbyIdx = 6;
    else if (selectedLobbyIdx === 6) selectedLobbyIdx = 2;
    updateLobbySelection();
    if (typeof playMenuBeep === 'function') playMenuBeep();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (selectedLobbyIdx === 0) selectedLobbyIdx = 1;
    else if (selectedLobbyIdx === 1) selectedLobbyIdx = 0;
    else if (selectedLobbyIdx === 6) selectedLobbyIdx = 4;
    else if (selectedLobbyIdx === 4) selectedLobbyIdx = 2;
    else if (selectedLobbyIdx === 5) selectedLobbyIdx = 3;
    else if (selectedLobbyIdx === 2) selectedLobbyIdx = 6;
    else if (selectedLobbyIdx === 3) selectedLobbyIdx = 6;
    updateLobbySelection();
    if (typeof playMenuBeep === 'function') playMenuBeep();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (typeof playMenuBeep === 'function') playMenuBeep();
    const item = lobbyCards[selectedLobbyIdx];
    if (item.url) {
      window.location.href = item.url;
    } else if (item.action) {
      item.action();
    }
  }
}

async function bootProfile() {
  const ok = await initApp({ requireAuth: true });
  if (!ok) return;

  renderProfilePage();
  setupAvatarUpload();
  
  // Initialize selection and key listener
  updateLobbySelection();
  window.addEventListener('keydown', lobbyKeyHandler);
  
  // Update mouse hover to sync selectedIdx
  lobbyCards.forEach((c, idx) => {
    const el = $(c.id);
    if (el) {
      el.onmouseenter = () => {
        selectedLobbyIdx = idx;
        updateLobbySelection();
      };
    }
  });

  $('btnEditAvatar').onclick = () => {
    const panel = $('avatarSelectorPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  };
  if ($('btnLobbyPlay')) $('btnLobbyPlay').onclick = () => { window.location.href = 'game.html'; };
  if ($('btnLobbyAcademy')) $('btnLobbyAcademy').onclick = () => { window.location.href = 'academy.html'; };
  if ($('btnLobbyQuests')) $('btnLobbyQuests').onclick = () => { window.location.href = 'quests.html'; };
  if ($('btnLobbyTutorial')) $('btnLobbyTutorial').onclick = () => { window.location.href = 'tutorial.html'; };
  if ($('btnLobbyLibrary')) $('btnLobbyLibrary').onclick = () => { window.location.href = 'library.html'; };
  if ($('btnProfileLogout')) $('btnProfileLogout').onclick = handleLogout;
}
