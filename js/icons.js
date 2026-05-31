/* ====================================================================
   icons.js — KeyQuest Unified Icon Sprite (RPG / Keycap Style)
   Inject once, use everywhere. Designed to match the Sword-in-Keycap logo.
   Stroke-width: 2.2 · Caps: round · Joins: round
   ==================================================================== */
(function(){
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('width','0');svg.setAttribute('height','0');
  svg.style.position='absolute';svg.setAttribute('aria-hidden','true');
  svg.innerHTML = `

<!-- ═══════════ BRAND ═══════════ -->
<symbol id="i-logo" viewBox="0 0 128 128" fill="none" stroke="none">
  <rect x="12" y="18" width="108" height="100" rx="22" fill="#2a1602" transform="translate(4,6)"/>
  <rect x="12" y="18" width="108" height="100" rx="22" fill="#b5630a"/>
  <rect x="18" y="14" width="96" height="88" rx="18" fill="url(#logoGrad)"/>
  <rect x="22" y="16" width="88" height="28" rx="14" fill="rgba(255,255,255,0.35)"/>
  <g transform="translate(64,64) rotate(-45)">
    <rect x="-3" y="-38" width="6" height="48" rx="1" fill="#f4ecdc" stroke="#2a1602" stroke-width="2"/>
    <polygon points="0,-42 -5,-38 5,-38" fill="#f4ecdc" stroke="#2a1602" stroke-width="2" stroke-linejoin="round"/>
    <rect x="-12" y="8" width="24" height="6" rx="2" fill="#54d6ff" stroke="#2a1602" stroke-width="2"/>
    <rect x="-3" y="14" width="6" height="14" rx="1" fill="#5fe6a8" stroke="#2a1602" stroke-width="2"/>
    <circle cx="0" cy="32" r="5" fill="#ff5d6c" stroke="#2a1602" stroke-width="2"/>
  </g>
  <defs><linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffc863"/><stop offset="100%" stop-color="#ffb43d"/></linearGradient></defs>
</symbol>

<!-- ═══════════ NAVIGATION ═══════════ -->
<symbol id="i-back" viewBox="0 0 24 24"><path d="M19 12H5" stroke-width="2.4"/><path d="M12 19l-7-7 7-7" stroke-width="2.4"/></symbol>
<symbol id="i-next" viewBox="0 0 24 24"><path d="M5 12h14" stroke-width="2.4"/><path d="M12 5l7 7-7 7" stroke-width="2.4"/></symbol>
<symbol id="i-refresh" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.7 9.7 0 0 0-6.7 2.7L3 8" stroke-width="2.2"/><path d="M3 3v5h5" stroke-width="2.2"/></symbol>

<!-- ═══════════ GAME STATS (RPG Style) ═══════════ -->
<!-- Speedometer / WPM — bold gauge with sword-like needle -->
<symbol id="i-gauge" viewBox="0 0 24 24">
  <path d="M3.34 19a10 10 0 1 1 17.32 0" stroke-width="2.4"/>
  <path d="M12 14l3.5-3.5" stroke-width="2.8" stroke-linecap="round"/>
  <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none"/>
</symbol>

<!-- Crosshair / Accuracy — double ring with center dot -->
<symbol id="i-target" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="9" stroke-width="2"/>
  <circle cx="12" cy="12" r="5" stroke-width="2"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
  <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke-width="2"/>
</symbol>

<!-- Clock / Timer — bold clock face -->
<symbol id="i-clock" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="9.5" stroke-width="2.2"/>
  <path d="M12 6.5v5.5l3.5 2" stroke-width="2.4" stroke-linecap="round"/>
</symbol>

<!-- Fire / Combo — dynamic flame -->
<symbol id="i-flame" viewBox="0 0 24 24">
  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" stroke-width="2.2"/>
</symbol>

<!-- Star / Score — RPG-style 5-point star -->
<symbol id="i-star" viewBox="0 0 24 24">
  <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2" stroke-width="2"/>
</symbol>

<!-- Trophy — ornate cup -->
<symbol id="i-trophy" viewBox="0 0 24 24">
  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke-width="2.2"/>
  <path d="M4 22h16" stroke-width="2.2"/>
  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" stroke-width="2"/>
  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" stroke-width="2.2"/>
</symbol>

<!-- Medal — quest badge -->
<symbol id="i-medal" viewBox="0 0 24 24">
  <circle cx="12" cy="14" r="6" stroke-width="2.2"/>
  <path d="M8.5 8 6 3M15.5 8 18 3M9 3h6" stroke-width="2"/>
  <path d="M12 11v4" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M10 13.5l4 1" stroke-width="2" stroke-linecap="round"/>
</symbol>

<!-- ═══════════ DIFFICULTY ICONS ═══════════ -->
<!-- Leaf / Easy — gentle sprout -->
<symbol id="i-leaf" viewBox="0 0 24 24">
  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" stroke-width="2.2"/>
  <path d="M2 21c0-3 1.85-5.36 5.08-6" stroke-width="2.2"/>
</symbol>

<!-- Bolt / Medium — lightning strike -->
<symbol id="i-bolt" viewBox="0 0 24 24">
  <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" stroke-width="2"/>
</symbol>

<!-- Skull / Extreme — danger icon -->
<symbol id="i-skull" viewBox="0 0 24 24">
  <circle cx="12" cy="10" r="8" stroke-width="2.2"/>
  <path d="M9 10h.01M15 10h.01" stroke-width="3" stroke-linecap="round"/>
  <path d="M8 18h8v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2z" stroke-width="2"/>
  <path d="M10 18v4M14 18v4" stroke-width="2"/>
</symbol>

<!-- ═══════════ UI ACTIONS ═══════════ -->
<!-- Keyboard — keycap style -->
<symbol id="i-kb" viewBox="0 0 24 24">
  <rect x="2" y="4" width="20" height="16" rx="3" stroke-width="2.2"/>
  <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01" stroke-width="2.8" stroke-linecap="round"/>
  <path d="M7 16h10" stroke-width="2.2" stroke-linecap="round"/>
</symbol>

<!-- Globe / Language — with meridians -->
<symbol id="i-globe" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" stroke-width="2"/>
  <path d="M2 12h20" stroke-width="1.8"/>
  <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" stroke-width="1.8"/>
</symbol>

<!-- Lightbulb / Hint — idea lamp -->
<symbol id="i-bulb" viewBox="0 0 24 24">
  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" stroke-width="2.2"/>
  <path d="M9 18h6" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M10 22h4" stroke-width="2.2" stroke-linecap="round"/>
</symbol>

<!-- Check — bold check mark -->
<symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></symbol>

<!-- Lock — padlock -->
<symbol id="i-lock" viewBox="0 0 24 24">
  <rect x="3" y="11" width="18" height="11" rx="3" stroke-width="2.2"/>
  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2.2"/>
  <circle cx="12" cy="16.5" r="1.5" fill="currentColor" stroke="none"/>
</symbol>

<!-- ═══════════ AUDIO ═══════════ -->
<symbol id="i-vol" viewBox="0 0 24 24">
  <path d="M11 5 6 9H2v6h4l5 4z" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M15.5 8.5a5 5 0 0 1 0 7" stroke-width="2.2"/>
  <path d="M19 5a9 9 0 0 1 0 14" stroke-width="2"/>
</symbol>
<symbol id="i-mute" viewBox="0 0 24 24">
  <path d="M11 5 6 9H2v6h4l5 4z" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="m22 9-6 6" stroke-width="2.4"/><path d="m16 9 6 6" stroke-width="2.4"/>
</symbol>
<symbol id="i-music" viewBox="0 0 24 24">
  <path d="M9 18V5l12-2v13" stroke-width="2.2"/>
  <circle cx="6" cy="18" r="3" stroke-width="2"/><circle cx="18" cy="16" r="3" stroke-width="2"/>
</symbol>
<symbol id="i-music-off" viewBox="0 0 24 24">
  <path d="M9 18V5l12-2v6" stroke-width="2.2"/>
  <circle cx="6" cy="18" r="3" stroke-width="2"/>
  <path d="m2 3 20 20" stroke-width="2.4"/>
</symbol>

<!-- ═══════════ USER ═══════════ -->
<symbol id="i-user" viewBox="0 0 24 24">
  <circle cx="12" cy="8" r="4.5" stroke-width="2.2"/>
  <path d="M4 21a8 8 0 0 1 16 0" stroke-width="2.2"/>
</symbol>
<symbol id="i-logout" viewBox="0 0 24 24">
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke-width="2.2"/>
  <path d="M16 17l5-5-5-5" stroke-width="2.4"/><path d="M21 12H9" stroke-width="2.4"/>
</symbol>

<!-- ═══════════ HAND / TOUCH TYPING ═══════════ -->
<symbol id="i-hand" viewBox="0 0 24 24">
  <path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v7M10 10.5V5a2 2 0 0 0-4 0v9" stroke-width="2"/>
  <path d="M7 15v-2a2 2 0 0 0-4 0v4a8 8 0 0 0 16 0v-5a2 2 0 0 0-4 0" stroke-width="2"/>
</symbol>

<!-- ═══════════ PLATFORM DETECTION ═══════════ -->
<symbol id="i-apple" viewBox="0 0 24 24"><path d="M17.5 12.5c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9s-1.9-.9-3.1-.8c-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 3 2.3 1.2 0 1.6-.8 3.1-.8s1.8.8 3.1.8 2.1-1.1 2.9-2.2c.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.6-3.7zM15 5.2c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.6 2.8-1.4z" fill="currentColor" stroke="none"/></symbol>
<symbol id="i-win" viewBox="0 0 24 24"><path d="M3 5.5 10.5 4.4v7.1H3zM10.5 4.2 21 2.7v8.8h-10.5zM3 12.5h7.5v7.1L3 18.5zM10.5 12.5H21v8.8l-10.5-1.5z" fill="currentColor" stroke="none"/></symbol>
<symbol id="i-linux" viewBox="0 0 24 24"><path d="M9 4.5c0-1.4.9-2.5 3-2.5s3 1.1 3 2.5c0 1.8 1.3 2.9 1.3 5.5 0 1.5-.6 2.6-.3 3.8.3 1.4 1.9 2.6 1.9 4.2 0 1.5-1.2 2.5-3 2.5-1.3 0-1.9-.7-3.1-.7s-1.8.7-3.1.7c-1.8 0-3-1-3-2.5 0-1.6 1.6-2.8 1.9-4.2.3-1.2-.3-2.3-.3-3.8C8.2 7.4 9 6.3 9 4.5z" stroke-width="2"/><circle cx="10.5" cy="7" r=".7" fill="currentColor"/><circle cx="13.5" cy="7" r=".7" fill="currentColor"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2.5" stroke-width="2.2"/><path d="M11 18h2" stroke-width="2.4" stroke-linecap="round"/></symbol>

<!-- ═══════════ MISC ═══════════ -->
<symbol id="i-shield" viewBox="0 0 24 24">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="2.2"/>
  <path d="M9 12l2 2 4-4" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
</symbol>
<symbol id="i-gift" viewBox="0 0 24 24">
  <rect x="3" y="8" width="18" height="4" rx="1.5" stroke-width="2.2"/>
  <rect x="5" y="12" width="14" height="9" rx="1.5" stroke-width="2"/>
  <path d="M12 8v13" stroke-width="2"/>
  <path d="M7.5 8C7.5 8 7 4 9.5 4s3.5 4 2.5 4M16.5 8c0 0 .5-4-2-4s-3.5 4-2.5 4" stroke-width="2"/>
</symbol>
<symbol id="i-scroll" viewBox="0 0 24 24">
  <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 0 0-2 2v2h12v12" stroke-width="2.2"/>
  <path d="M11 7h4M11 11h2" stroke-width="2.2" stroke-linecap="round"/>
</symbol>
<symbol id="i-sword" viewBox="0 0 24 24">
  <path d="M14.5 17.5L3 6V3h3l11.5 11.5" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M13 19l6-6" stroke-width="2.2"/>
  <path d="M16 16l4 4" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M19 21l2-2" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M8.5 8.5l-3 3" stroke-width="2"/>
</symbol>

`;
  // Inject sprite — works whether loaded in <head> or <body>
  function inject(){
    if(document.body) document.body.prepend(svg);
    else document.addEventListener('DOMContentLoaded',()=>document.body.prepend(svg));
  }
  inject();
})();
