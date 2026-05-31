/* ====================================================================
   academy.js — Skill Academy page logic
   Depends on: shared.js, config.js
   ==================================================================== */

const SKILLS_DATA = {
  homerow: {
    id: 'homerow',
    title: { th: 'แป้นเหย้าอุ่นเครื่อง', en: 'Home Row Training' },
    desc: { th: 'ได้รับโบนัส XP +10% ในทุกโจทย์การเล่น', en: '+10% XP bonus on every game' },
    cost: 0, icon: 'leaf',
    color: 'linear-gradient(160deg, #9be29b, #5fe6a8)',
    benefit: 'xp_bonus'
  },
  comboshield: {
    id: 'comboshield',
    title: { th: 'เกราะป้องกันคอมโบ', en: 'Combo Shield' },
    desc: { th: 'ช่วยรักษาคอมโบเดิมไม่ให้รีเซ็ตเมื่อพิมพ์ผิด 1 ครั้งแรกต่อเกม (คอมโบ 5+)', en: 'Saves your combo from resetting once per game (5+ combo)' },
    cost: 120, icon: 'lock',
    color: 'linear-gradient(160deg, #ff8fa0, #ff5d6c)',
    benefit: 'combo_shield'
  },
  goldenfingers: {
    id: 'goldenfingers',
    title: { th: 'ดัชนีทองคำ', en: 'Golden Fingers' },
    desc: { th: 'พิมพ์จบด่านด้วยความเร็ว (WPM) >= 40 จะได้รับทองสองเท่า x2', en: 'Double Gold reward if you finish with WPM >= 40' },
    cost: 200, icon: 'medal',
    color: 'linear-gradient(160deg, #ffc863, #ffb43d)',
    benefit: 'double_gold'
  },
  chillaura: {
    id: 'chillaura',
    title: { th: 'ออร่าสงบใจ', en: 'Chill Aura' },
    desc: { th: 'ไม่ลดคะแนนสะสมเมื่อพิมพ์ผิด (ปกติลด -3 คะแนน)', en: 'Zero score penalty for typos (usually -3 points)' },
    cost: 100, icon: 'bulb',
    color: 'linear-gradient(160deg, #a5f3fc, #06b6d4)',
    benefit: 'zero_penalty'
  },
  thocksound: {
    id: 'thocksound',
    title: { th: 'เสียงคีย์บอร์ด Thock', en: 'Thock Sound' },
    desc: { th: 'เปลี่ยนเสียงพิมพ์ให้ทุ้ม นุ่มลึก และมีเอกลักษณ์แบบกลไกแท้', en: 'Changes key press sound to a deep mechanical keyboard sound' },
    cost: 80, icon: 'kb',
    color: 'linear-gradient(160deg, #e9d5ff, #a855f7)',
    benefit: 'thock_sound'
  },
  cyberpunk: {
    id: 'cyberpunk',
    title: { th: 'ธีมไซเบอร์พังค์', en: 'Cyberpunk Theme' },
    desc: { th: 'ปลดล็อกธีมและเอฟเฟกต์ไฟนีออนสีชมพู/ฟ้าครามสุดล้ำ', en: 'Unlocks a futuristic pink and neon-cyan visual style' },
    cost: 150, icon: 'globe',
    color: 'linear-gradient(160deg, #f472b6, #db2777)',
    benefit: 'cyberpunk_theme'
  }
};

function renderAcademy() {
  const container = $('skillsGrid');
  if (!container) return;
  container.innerHTML = '';

  const t = AUTH_TEXT[lang];

  for (const [id, s] of Object.entries(SKILLS_DATA)) {
    const isUnlocked = userStats.unlocked_skills && userStats.unlocked_skills.includes(id);
    const isEquipped = userStats.equipped_skills && userStats.equipped_skills.includes(id);

    const card = document.createElement('div');
    card.className = 'skill-card' + (isEquipped ? ' equipped' : '');

    let badgeText = '', badgeClass = '';
    if (isEquipped) { badgeText = t.equippedMsg; badgeClass = 'equipped'; }
    else if (isUnlocked) { badgeText = t.unlockedMsg; badgeClass = 'unlocked'; }
    else { badgeText = `${s.cost} ${t.goldUnit}`; badgeClass = 'locked'; }

    let actionBtn = '';
    if (isEquipped) {
      actionBtn = `<div class="skill-action"><button class="btn btn-ghost" onclick="buyOrEquipSkill('${id}')">${t.unequipBtn}</button></div>`;
    } else if (isUnlocked) {
      actionBtn = `<div class="skill-action"><button class="btn btn-amber" onclick="buyOrEquipSkill('${id}')">${t.equipBtn}</button></div>`;
    } else {
      actionBtn = `<div class="skill-action"><button class="btn btn-amber" onclick="buyOrEquipSkill('${id}')">${t.buyBtn} ${s.cost} ${t.goldUnit}</button></div>`;
    }

    card.innerHTML =
      `<div class="skill-icon" style="background:${s.color}">${ICON(s.icon)}</div>` +
      `<div class="skill-body">` +
        `<div class="skill-title">${s.title[lang]}</div>` +
        `<div class="skill-desc">${s.desc[lang]}</div>` +
        actionBtn +
      `</div>` +
      `<span class="skill-badge ${badgeClass}">${badgeText}</span>`;

    container.appendChild(card);
  }

  // Update gold display
  const goldDisplay = $('academyGold');
  if (goldDisplay) goldDisplay.textContent = userStats.gold;
}

async function buyOrEquipSkill(id) {
  const s = SKILLS_DATA[id];
  if (!s) return;

  const isUnlocked = userStats.unlocked_skills && userStats.unlocked_skills.includes(id);
  const isEquipped = userStats.equipped_skills && userStats.equipped_skills.includes(id);

  if (isEquipped) {
    // Unequip
    userStats.equipped_skills = userStats.equipped_skills.filter(x => x !== id);
    tick();
  } else if (isUnlocked) {
    // Equip
    userStats.equipped_skills.push(id);
    winSound();
  } else {
    // Buy
    if (userStats.gold >= s.cost) {
      userStats.gold -= s.cost;
      userStats.unlocked_skills.push(id);
      userStats.equipped_skills.push(id);
      winSound();

      Swal.fire({
        icon: 'success',
        title: lang === 'th' ? 'ปลดล็อกทักษะใหม่!' : 'New Skill Unlocked!',
        text: s.title[lang],
        timer: 1500, showConfirmButton: false,
        background: '#1a1a2e', color: '#fff'
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: lang === 'th' ? 'ทองไม่เพียงพอ!' : 'Not Enough Gold!',
        text: lang === 'th' ? `คุณต้องมีทองอย่างน้อย ${s.cost} เหรียญเพื่อซื้อทักษะนี้` : `You need at least ${s.cost} gold to purchase this skill.`,
        background: '#1a1a2e', color: '#fff', confirmButtonColor: 'var(--amber)'
      });
      return;
    }
  }

  applyTheme();
  updateProfileBar();
  renderAcademy();
  await saveUserStats();
}
// Expose to onclick
window.buyOrEquipSkill = buyOrEquipSkill;

function onLangChange() {
  renderAcademy();
  renderFooter();
  const isTh = lang === 'th';
  const title = $('academyTitle');
  if (title) title.textContent = isTh ? 'สำนักฝึกวิชา' : 'Skill Academy';
  const subtitle = $('academySubtitle');
  if (subtitle) subtitle.textContent = isTh ? 'ปลดล็อกทักษะพิเศษด้วยทองสะสม' : 'Unlock special skills with your gold';
}

async function bootAcademy() {
  const ok = await initApp({ requireAuth: true });
  if (!ok) return;

  renderAcademy();
  onLangChange();

  $('btnAcademyBack').onclick = () => { window.location.href = 'profile.html'; };
}
