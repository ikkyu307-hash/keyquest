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
  if ($('lblProfReset')) $('lblProfReset').textContent = isTh ? 'รีเซ็ตความก้าวหน้า' : 'Reset Progress';
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
  
  if ($('btnProfileReset')) {
    $('btnProfileReset').onclick = async () => {
      const isTh = lang === 'th';
      const confirmResult = await Swal.fire({
        title: isTh ? 'ยืนยันการรีเซ็ตข้อมูล?' : 'Reset All Progress?',
        text: isTh ? 'เลเวล ทอง สถิติ และความก้าวหน้าทั้งหมดจะถูกล้างค่าใหม่ทั้งหมดและไม่สามารถกู้คืนได้' : 'Your level, gold, stats, and all progress will be permanently reset.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--coral)',
        cancelButtonColor: '#333',
        confirmButtonText: isTh ? 'ยืนยันรีเซ็ต' : 'Yes, Reset',
        cancelButtonText: isTh ? 'ยกเลิก' : 'Cancel',
        background: '#1a1a2e', color: '#fff'
      });

      if (confirmResult.isConfirmed) {
        // 1. Reset stats object
        userStats = {
          xp: 0, level: 1, gold: 0,
          unlocked_skills: ['homerow'], equipped_skills: ['homerow'],
          max_wpm: 0, games_played: 0, avg_accuracy: 0
        };

        // 2. Clear local storage keys
        localStorage.removeItem('typing_game_local_stats');
        localStorage.removeItem('kq_tutorial_progress');

        // Clear quest progress keys
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('kq_quest_progress_') || key.startsWith('kq_quest_claimed_'))) {
            localStorage.removeItem(key);
            i--; // Adjust index since we removed an item
          }
        }

        // 3. Sync to Supabase if logged in
        if (dbClient && currentUser) {
          try {
            await dbClient.from('typing_user_stats').update({
              xp: 0, level: 1, gold: 0,
              unlocked_skills: ['homerow'], equipped_skills: ['homerow'],
              max_wpm: 0, games_played: 0, avg_accuracy: 0,
              updated_at: new Date().toISOString()
            }).eq('id', currentUser.id);

            // Also delete quest progress
            await dbClient.from('quest_progress').delete().eq('user_id', currentUser.id);
          } catch (e) {
            console.warn('Failed to sync reset to Supabase:', e);
          }
        }

        // Apply visual updates & show success alert
        winSound();
        applyTheme();
        renderProfilePage();

        Swal.fire({
          title: isTh ? 'รีเซ็ตสำเร็จ!' : 'Reset Successful!',
          text: isTh ? 'ประวัติการเล่นและเลเวลของคุณถูกรีเซ็ตเรียบร้อยแล้ว' : 'Your progress has been reset successfully.',
          icon: 'success',
          background: '#1a1a2e', color: '#fff', confirmButtonColor: 'var(--amber)'
        });
      }
    };
  }
}
