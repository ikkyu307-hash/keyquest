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
  $('lblSelectGuardian').textContent = isTh ? 'อัปโหลดรูปโปรไฟล์' : 'Upload Profile Picture';
  if ($('lblUploadHint')) $('lblUploadHint').textContent = isTh ? 'คลิกเลือกรูป หรือลากวาง' : 'Click to choose or drag & drop';
  if ($('lblConfirmUpload')) $('lblConfirmUpload').textContent = isTh ? 'บันทึกรูปโปรไฟล์' : 'Save Profile Picture';
  if ($('lblOrEmoji')) $('lblOrEmoji').textContent = isTh ? 'หรือเลือก emoji' : 'or choose emoji';
  $('lblProfGames').textContent = isTh ? 'ด่านที่พิมพ์' : 'Games Played';
  $('lblProfWpm').textContent = isTh ? 'WPM สูงสุด' : 'Max WPM';
  $('lblProfAcc').textContent = isTh ? 'แม่นยำเฉลี่ย' : 'Avg Accuracy';
  $('lblProfGold').textContent = isTh ? 'ทองสะสม' : 'Total Gold';
  $('lblStartQuest').textContent = isTh ? 'เข้าสู่การเลือกด่าน (Start Quest)' : 'Start Quest';
  $('lblProfAcademy').textContent = isTh ? 'สำนักฝึกวิชา (Academy)' : 'Skill Academy';
  $('lblProfLogout').textContent = isTh ? 'ออกจากระบบ' : 'Log Out';
}

function onLangChange() { renderProfilePage(); renderFooter(); }

/* ===== BOOT ===== */
async function bootProfile() {
  const ok = await initApp({ requireAuth: true });
  if (!ok) return;

  renderProfilePage();
  setupAvatarUpload();

  $('btnEditAvatar').onclick = () => {
    const panel = $('avatarSelectorPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  };
  $('btnStartQuest').onclick = () => { window.location.href = 'game.html'; };
  $('btnProfileAcademy').onclick = () => { window.location.href = 'academy.html'; };
  $('btnProfileLogout').onclick = handleLogout;
}
