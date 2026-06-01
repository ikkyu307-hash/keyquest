/* ====================================================================
   academy.js — Skill Academy page logic
   Depends on: shared.js, config.js
   ==================================================================== */

const SKILLS_DATA = {
  homerow: {
    id: 'homerow',
    title: { th: 'แป้นเหย้าอุ่นเครื่อง', en: 'Home Row Training' },
    desc: { th: 'ได้รับโบนัส XP +10% ในทุกโจทย์การเล่น', en: '+10% XP bonus on every game' },
    lore: { th: 'คัมภีร์ลับแห่งแป้นเหย้าที่สืบทอดกันมาแต่โบราณ ช่วยให้การวางนิ้วมั่นคงและรับพลังงานประสบการณ์รวดเร็วยิ่งขึ้น', en: 'The ancient grimoire of home row alignment. Keeps your fingers centered and channels knowledge streams.' },
    cost: 0, icon: 'leaf',
    color: 'linear-gradient(135deg, #9be29b, #5fe6a8)',
    benefit: 'xp_bonus'
  },
  comboshield: {
    id: 'comboshield',
    title: { th: 'เกราะป้องกันคอมโบ', en: 'Combo Shield' },
    desc: { th: 'ช่วยรักษาคอมโบเดิมไม่ให้รีเซ็ตเมื่อพิมพ์ผิด 1 ครั้งแรกต่อเกม (คอมโบ 5+)', en: 'Saves your combo from resetting once per game (5+ combo)' },
    lore: { th: 'เกราะมนตราศิลาศิริ ปกป้องคอมโบการร่ายอักขระของคุณจากความผิดพลาดชั่วคราวหนึ่งครั้งต่อสมรภูมิ', en: 'A heavy spellbound shield that absorbs one typing error, preserving the continuous flow of your battle combo.' },
    cost: 120, icon: 'lock',
    color: 'linear-gradient(135deg, #ff8fa0, #ff5d6c)',
    benefit: 'combo_shield'
  },
  goldenfingers: {
    id: 'goldenfingers',
    title: { th: 'ดัชนีทองคำ', en: 'Golden Fingers' },
    desc: { th: 'พิมพ์จบด่านด้วยความเร็ว (WPM) >= 40 จะได้รับทองสองเท่า x2', en: 'Double Gold reward if you finish with WPM >= 40' },
    lore: { th: 'วิชาดัชนีแปรธาตุ ชุบปลายนิ้วเป็นทองคำ เมื่อใดที่คุณร่ายอักขระได้รวดเร็ว ดัชนีจะเปลี่ยนพลังงานเป็นทองคำทวีคูณ', en: 'Alchemical touch that transfigures your speed into wealth. Double all gold rewards if typing velocity exceeds threshold.' },
    cost: 200, icon: 'medal',
    color: 'linear-gradient(135deg, #ffc863, #ffb43d)',
    benefit: 'double_gold'
  },
  chillaura: {
    id: 'chillaura',
    title: { th: 'ออร่าสงบใจ', en: 'Chill Aura' },
    desc: { th: 'ไม่ลดคะแนนสะสมเมื่อพิมพ์ผิด (ปกติลด -3 คะแนน)', en: 'Zero score penalty for typos (usually -3 points)' },
    lore: { th: 'จิตวิญญาณวารีอันสงบ ออร่ารอบตัวจะช่วยขจัดความกังวลและขจัดบทลงโทษ ลบความผิดพลาดไม่ให้ส่งผลเสียต่อคะแนนรวม', en: 'A refreshing aura of serene focus. Cleanses anxiety and immunizes your overall score against typographical setbacks.' },
    cost: 100, icon: 'bulb',
    color: 'linear-gradient(135deg, #a5f3fc, #06b6d4)',
    benefit: 'zero_penalty'
  },
  thocksound: {
    id: 'thocksound',
    title: { th: 'เสียงคีย์บอร์ด Thock', en: 'Thock Sound' },
    desc: { th: 'เปลี่ยนเสียงพิมพ์ให้ทุ้ม นุ่มลึก และมีเอกลักษณ์แบบกลไกแท้', en: 'Changes key press sound to a deep mechanical keyboard sound' },
    lore: { th: 'มนตราคลื่นเสียงทุ้มลึก ปรับจูนเสียงกระทบแป้นให้ดังกังวาน มีมิติเสียงทุ้มนุ่มแบบเครื่องกลไกเหล็กดั่งเดิม', en: 'Symphony of acoustic clicks. Metamorphoses your key presses into heavy, satisfying mechanical sound waves.' },
    cost: 80, icon: 'kb',
    color: 'linear-gradient(135deg, #e9d5ff, #a855f7)',
    benefit: 'thock_sound'
  },
  cyberpunk: {
    id: 'cyberpunk',
    title: { th: 'ธีมไซเบอร์พังค์', en: 'Cyberpunk Theme' },
    desc: { th: 'ปลดล็อกธีมและเอฟเฟกต์ไฟนีออนสีชมพู/ฟ้าครามสุดล้ำ', en: 'Unlocks a futuristic pink and neon-cyan visual style' },
    lore: { th: 'คัมภีร์ข้ามอนาคต ปลดปล่อยพลังแสงสีแสงนีออน ปรับปรุงทัศนียภาพของเกมให้ล้ำสมัยราวกับมหานครแสงสีสีชมพูและฟ้าคราม', en: 'Futuristic overlay enchantment. Re-codes the local landscape into glowing neon-pink and cybernetic-cyan.' },
    cost: 150, icon: 'globe',
    color: 'linear-gradient(135deg, #f472b6, #db2777)',
    benefit: 'cyberpunk_theme'
  }
};

let selectedSkillIdx = 0;
const skillKeys = Object.keys(SKILLS_DATA);

function renderAcademy() {
  const container = $('skillsGrid');
  if (!container) return;
  container.innerHTML = '';

  const t = AUTH_TEXT[lang];

  skillKeys.forEach((id, idx) => {
    const s = SKILLS_DATA[id];
    const isUnlocked = userStats.unlocked_skills && userStats.unlocked_skills.includes(id);
    const isEquipped = userStats.equipped_skills && userStats.equipped_skills.includes(id);

    const card = document.createElement('div');
    card.className = 'skill-card' + (isEquipped ? ' equipped' : '') + (idx === selectedSkillIdx ? ' selected' : '');

    let badgeText = '', badgeClass = '';
    if (isEquipped) { badgeText = t.equippedMsg; badgeClass = 'equipped'; }
    else if (isUnlocked) { badgeText = t.unlockedMsg; badgeClass = 'unlocked'; }
    else { badgeText = `${s.cost} ${t.goldUnit}`; badgeClass = 'locked'; }

    card.innerHTML =
      `<div class="skill-icon" style="background:${s.color}">${ICON(s.icon)}</div>` +
      `<div class="skill-body">` +
        `<div class="skill-title">${s.title[lang]}</div>` +
        `<div class="skill-desc" style="max-height: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${s.desc[lang]}</div>` +
      `</div>` +
      `<span class="skill-badge ${badgeClass}">${badgeText}</span>`;

    card.onclick = () => {
      selectedSkillIdx = idx;
      renderAcademy();
      playMenuBeep();
    };
    card.onmouseenter = () => {
      selectedSkillIdx = idx;
      renderAcademy();
    };

    container.appendChild(card);
  });

  // Render detail panel
  renderSkillDetail();

  // Update gold display
  const goldDisplay = $('academyGold');
  if (goldDisplay) goldDisplay.textContent = userStats.gold;
}

function renderSkillDetail() {
  const panel = $('skillDetailPanel');
  if (!panel) return;

  const activeId = skillKeys[selectedSkillIdx];
  const s = SKILLS_DATA[activeId];
  const isUnlocked = userStats.unlocked_skills && userStats.unlocked_skills.includes(activeId);
  const isEquipped = userStats.equipped_skills && userStats.equipped_skills.includes(activeId);
  const t = AUTH_TEXT[lang];

  let badgeText = '', badgeClass = '';
  if (isEquipped) { badgeText = t.equippedMsg; badgeClass = 'equipped'; }
  else if (isUnlocked) { badgeText = t.unlockedMsg; badgeClass = 'unlocked'; }
  else { badgeText = `${s.cost} ${t.goldUnit}`; badgeClass = 'locked'; }

  let actionBtn = '';
  if (isEquipped) {
    actionBtn = `<button class="btn btn-ghost" onclick="buyOrEquipSkill('${activeId}')">${t.unequipBtn}</button>`;
  } else if (isUnlocked) {
    actionBtn = `<button class="btn btn-amber" onclick="buyOrEquipSkill('${activeId}')">${t.equipBtn}</button>`;
  } else {
    actionBtn = `<button class="btn btn-amber" onclick="buyOrEquipSkill('${activeId}')">${t.buyBtn} ${s.cost} ${t.goldUnit}</button>`;
  }

  panel.innerHTML = `
    <div class="sd-icon-wrap" style="background: ${s.color}; box-shadow: 0 8px 24px rgba(0,0,0,0.35), 0 0 20px ${s.color.split(',')[1].trim().replace(')', '') + ', 0.2)'}">${ICON(s.icon)}</div>
    <div class="sd-title">${s.title[lang]}</div>
    <span class="sd-badge ${badgeClass}">${badgeText}</span>
    <div class="sd-lore">"${s.lore[lang]}"</div>
    <div class="sd-desc">${s.desc[lang]}</div>
    <div class="sd-action">
      ${actionBtn}
    </div>
  `;
  updateTooltips();
}

/* ===== KEYBOARD NAVIGATION ===== */
function academyKeyHandler(e) {
  if (document.activeElement && document.activeElement.tagName === 'INPUT') return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedSkillIdx = (selectedSkillIdx + 1) % skillKeys.length;
    renderAcademy();
    playMenuBeep();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedSkillIdx = (selectedSkillIdx - 1 + skillKeys.length) % skillKeys.length;
    renderAcademy();
    playMenuBeep();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const activeId = skillKeys[selectedSkillIdx];
    buyOrEquipSkill(activeId);
  } else if (e.key === 'Escape') {
    e.preventDefault();
    playClick();
    setTimeout(() => location.href = 'profile.html', 150);
  }
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

  window.addEventListener('keydown', academyKeyHandler);

  $('btnAcademyBack').onclick = () => { window.location.href = 'profile.html'; };
}
