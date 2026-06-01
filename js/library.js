const ALL_MONSTERS = [
  { id: 'monsterSlime', th: 'สไลม์วุ้นน้อย', en: 'Baby Slime', sprite: 'slime.png', baseW: 70, baseH: 70 },
  { id: 'monsterGoblin', th: 'กอบลินหัวขโมย', en: 'Goblin Thief', sprite: 'goblin.png', baseW: 80, baseH: 80 },
  { id: 'monsterGoblin_boss', th: 'บอสกอบลิน', en: 'Boss Goblin', sprite: 'goblin.png', baseW: 80, baseH: 80, isBoss: true },
  { id: 'monsterDragon', th: 'มังกรไฟโลกันตร์', en: 'Fire Dragon', sprite: 'dragon.png', baseW: 100, baseH: 100 },
  { id: 'monsterDragon_boss', th: 'บอสมังกรดำ', en: 'Darkness Overlord', sprite: 'dragon.png', baseW: 100, baseH: 100, isBoss: true }
];

function renderLibrary() {
  const isTh = lang === 'th';
  if ($('lblBack')) $('lblBack').textContent = isTh ? 'กลับหน้าโปรไฟล์' : 'Back to Profile';
  if ($('lblLibTitle')) $('lblLibTitle').textContent = isTh ? 'สมุดภาพมอนสเตอร์' : 'Monster Bestiary';
  if ($('lblLibDesc')) $('lblLibDesc').textContent = isTh ? 'สำรวจมอนสเตอร์ที่คุณเคยเผชิญหน้าและกำจัดสำเร็จ' : 'Discover the monsters you have defeated in battle';
  
  const grid = $('libGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const killed = userStats.monsters_killed || {};
  
  ALL_MONSTERS.forEach(m => {
    const count = killed[m.id] || 0;
    const locked = count === 0;
    
    const div = document.createElement('div');
    div.className = 'lib-card ' + (locked ? 'locked' : '') + (m.isBoss ? ' boss' : '');
    
    let spriteStyle = `background-image:url('${m.sprite}'); width:${m.baseW}px; height:${m.baseH}px;`;
    
    div.innerHTML = `
      <div class="lib-sprite-container">
        <div class="lib-sprite" style="${spriteStyle}"></div>
      </div>
      <div class="lib-name">${locked ? '???' : (isTh ? m.th : m.en)}</div>
      <div class="lib-stats">
        ${isTh ? 'กำจัด:' : 'Defeated:'} <span class="val">${count}</span>
      </div>
    `;
    grid.appendChild(div);
  });
}

function onLangChange() {
  renderLibrary();
  renderFooter();
}

async function bootLibrary() {
  const ok = await initApp({ requireAuth: true });
  if (!ok) return;
  renderLibrary();
  
  // Quick keyboard navigation
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      e.preventDefault();
      playClick();
      setTimeout(() => location.href = 'profile.html', 150);
    }
  });
}
