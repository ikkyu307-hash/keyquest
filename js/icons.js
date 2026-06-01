/* ====================================================================
   icons.js — KeyQuest Unified Icon Sprite (16-bit Retro Pixel-Art Style)
   Inject once, use everywhere. Redesigned to match the pixel-art RPG aesthetic.
   Shape-rendering: crispEdges forces integer-pixel alignments.
   ==================================================================== */
(function(){
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('width','0');svg.setAttribute('height','0');
  svg.style.position='absolute';svg.setAttribute('aria-hidden','true');
  svg.innerHTML = `

<!-- ═══════════ BRAND ═══════════ -->
<symbol id="i-logo" viewBox="0 0 24 24" fill="none" stroke="none">
  <!-- Small fallback pixel-art sword-in-keycap logo -->
  <rect x="3" y="3" width="18" height="18" rx="2" fill="#b5630a" />
  <rect x="5" y="5" width="14" height="14" rx="1" fill="#ffb43d" />
  <path d="M11 7h2v6h-2V7zm-2 6h6v2H9v-2zm2 2h2v2h-2v-2z" fill="#1a162a" />
</symbol>

<!-- ═══════════ NAVIGATION ═══════════ -->
<symbol id="i-back" viewBox="0 0 24 24" fill="none">
  <path d="M15 4h-2v2h-2v2H9v2H7v4h2v2h2v2h2v2h2v-4H9v-2h8v-4H9V8h6V4z" fill="currentColor"/>
</symbol>

<symbol id="i-next" viewBox="0 0 24 24" fill="none">
  <path d="M9 4h2v2h2v2h2v2h2v4h-2v2h-2v2h-2v2H9v-4h6v-2H7v-4h8V8H9V4z" fill="currentColor"/>
</symbol>

<symbol id="i-refresh" viewBox="0 0 24 24" fill="none">
  <path d="M6 4h12v2H6V4zm12 2h2v6h-2V6h-2v2h2V6zm-12 6h2v6H6v-6zm2 6h8v-2H8v2zm8-2h2v-4h-2v4zm-6-10h4v2h-4V6z" fill="currentColor"/>
  <path d="M12 6h6v6h-2V8h-4V6z" fill="currentColor" />
</symbol>

<!-- ═══════════ GAME STATS (RPG Style) ═══════════ -->
<symbol id="i-gauge" viewBox="0 0 24 24" fill="none">
  <path d="M3 14h2v-2H3v2zm2-2h2v-2H5v2zm2-2h2v-2H7v2zm2-2h6v2H9V8zm6 0h2v2h-2V8zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2zM11 12h2v4h-2v-4zm2-2h4v2h-4v-2z" fill="currentColor"/>
</symbol>

<symbol id="i-target" viewBox="0 0 24 24" fill="none">
  <path d="M11 2h2v4h-2V2zm0 16h2v4h-2v-4zm-9-7h4v2H2v-2zm16 0h4v2h-4v-2zm-7 0h2v2h-2v-2zM7 5h10v2H7V5zm10 2h2v10h-2V7zM7 17h10v2H7v-2zm-4-8h2v6H3V9zm16 0h2v6h-2V9z" fill="currentColor"/>
</symbol>

<symbol id="i-clock" viewBox="0 0 24 24" fill="none">
  <path d="M9 2h6v2H9V2zm7 2h2v2h-2V4zM5 8h2v8H5V8zm2-2h2V4H7v2zm10 2h2v8h-2V8zm-2-2h-2V4h2v2zm-4 4h2v4h4v2h-6v-6zm3 10H9v2h6v-2zm-8-2H5v-2H3v4h4v-2zm12 0h-2v2h-2v2h4v-4z" fill="currentColor"/>
</symbol>

<symbol id="i-flame" viewBox="0 0 24 24" fill="none">
  <path d="M11 2h2v2h-2V2zm-2 2h2v2H9V4zm6 0h-2v2h2V4zm-8 4h2v2H7V8zm10 0h-2v2h2V8zm-12 4h2v4H5v-4zm14 0h-2v4h2v-4zm-12 6h10v2H7v-2zm2 2h6v2H9v-2zm2-10h2v6h-2v-6z" fill="currentColor"/>
</symbol>

<symbol id="i-star" viewBox="0 0 24 24" fill="none">
  <path d="M11 2h2v4h-2V2zm-2 4h6v2H9V6zm-2 2h10v2H7V8zm-4 2h18v2H3v-2zm2 2h14v2H5v-2zm2 2h10v2H7v-2zm-2 2h2v6H5v-6zm12 0h2v6h-2v-6z" fill="currentColor"/>
</symbol>

<symbol id="i-trophy" viewBox="0 0 24 24" fill="none">
  <path d="M3 4h18v2H3V4zm2 2h14v4H5V6zm2 4h10v2H7v-2zm2 2h6v2H9v-2zm2 2h2v4h-2v-4zm-5 4h8v2H9v-2zm-6-12h2v6H3V8zm16 0h2v6h-2V8z" fill="currentColor"/>
</symbol>

<symbol id="i-medal" viewBox="0 0 24 24" fill="none">
  <path d="M9 2h6v2H9V2zm-2 2h10v2H7V4zm2 2h6v4H9V6zm-4 4h14v8H5v-8zm4 8h6v2H9v-2z" fill="currentColor"/>
</symbol>

<!-- ═══════════ DIFFICULTY ICONS ═══════════ -->
<symbol id="i-leaf" viewBox="0 0 24 24" fill="none">
  <path d="M10 4h4v2h-4V4zm-2 2h8v2H8V6zm-2 2h12v2H6V8zm-2 2h14v6H4v-6zm4 6h8v2H8v-2zm2 2h4v2-4v-2z" fill="currentColor"/>
</symbol>

<symbol id="i-bolt" viewBox="0 0 24 24" fill="none">
  <path d="M14 2h-4v6h4V2zm-2 6H8v4h4V8zm-2 4H6v6h4v-6zm6 0h-4v4h4v-4zm-2 4h-4v4h4v-4z" fill="currentColor"/>
</symbol>

<symbol id="i-skull" viewBox="0 0 24 24" fill="none">
  <path d="M8 2h8v2H8V2zm-2 2h12v2H6V4zm-2 2h16v6H4V6zm2 6h12v4H6v-4zm2 4h8v2H8v-2zm-2-6h2v2H6v-2zm10 0h2v2h-2v-2z" fill="currentColor"/>
</symbol>

<!-- ═══════════ UI ACTIONS ═══════════ -->
<symbol id="i-kb" viewBox="0 0 24 24" fill="none">
  <path d="M2 4h20v14H2V4zm2 2h16v10H4V6zm2 2h2v2H6V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zm-8 4h10v2H6v-2z" fill="currentColor"/>
</symbol>

<symbol id="i-globe" viewBox="0 0 24 24" fill="none">
  <path d="M8 2h8v2H8V2zm-4 2h12v2H4V4zm-2 2h20v12H2V6zm4 12h12v2H6v-2zm2 2h8v2H8v-2z" fill="currentColor"/>
</symbol>

<symbol id="i-bulb" viewBox="0 0 24 24" fill="none">
  <path d="M10 2h4v2h-4V2zm-2 2h8v2H8V4zm-2 2h12v6H6V6zm2 6h8v2H8v-2zm2 2h4v4h-4v-4zm0 4h4v2-4v-2z" fill="currentColor"/>
</symbol>

<symbol id="i-check" viewBox="0 0 24 24" fill="none">
  <path d="M19 6l-9 9-4-4-2 2 6 6 11-11-2-2z" fill="currentColor"/>
</symbol>

<symbol id="i-lock" viewBox="0 0 24 24" fill="none">
  <path d="M8 4h8v4H8V4zm-2 4h12v2H6V8zm-3 2h18v10H3V10zm2 2h14v6H5v-6zm6 1h2v2h-2v-2z" fill="currentColor"/>
</symbol>

<!-- ═══════════ AUDIO ═══════════ -->
<symbol id="i-vol" viewBox="0 0 24 24" fill="none">
  <path d="M4 8h4v8H4V8zm4-2h2v12H8V6zm4-2h2v16h-2V4zm4 4h2v8h-2V8zm2-2h2v12h-2V6z" fill="currentColor"/>
</symbol>

<symbol id="i-mute" viewBox="0 0 24 24" fill="none">
  <path d="M4 8h4v8H4V8zm4-2h2v12H8V6zm4-2h2v16h-2V4zm6 4l4 4m0-4l-4 4" stroke="currentColor" stroke-width="2"/>
</symbol>

<symbol id="i-music" viewBox="0 0 24 24" fill="none">
  <path d="M14 2h6v2h-6V2zm0 2V12h-4v4h4v-4h6V4h-6zm-6 8h4v4H8v-4z" fill="currentColor"/>
</symbol>

<symbol id="i-music-off" viewBox="0 0 24 24" fill="none">
  <path d="M14 2h6v2h-6V2zm0 2v4h-2V4h2zm2 4h4v4h-4V8zM8 12h4v4H8v-4z" fill="currentColor"/>
  <path d="M4 4l16 16" stroke="currentColor" stroke-width="2"/>
</symbol>

<!-- ═══════════ USER ═══════════ -->
<symbol id="i-user" viewBox="0 0 24 24" fill="none">
  <path d="M8 2h8v6H8V2zm-2 6h12v2H6V8zm-3 4h18v8H3v-8z" fill="currentColor"/>
</symbol>

<symbol id="i-logout" viewBox="0 0 24 24" fill="none">
  <path d="M3 4h8v2H3v12h8v2H3c-1 0-2-1-2-2V6c0-1 1-2 2-2zm12 3h2v3h4v2h-4v3h-2v-8zm2 3l3 2-3 2v-4z" fill="currentColor"/>
</symbol>

<!-- ═══════════ HAND / TOUCH TYPING ═══════════ -->
<symbol id="i-hand" viewBox="0 0 24 24" fill="none">
  <path d="M6 8h2v8H6V8zm4-4h2v12h-2V4zm4 2h2v10h-2V6zm4 4h2v6h-2v-6zm-14 8h16v2H4v-2z" fill="currentColor"/>
</symbol>

<!-- ═══════════ PLATFORM DETECTION ═══════════ -->
<symbol id="i-apple" viewBox="0 0 24 24" fill="none"><path d="M12 2h2v4h-2V2zM6 8h12v12H6V8zm2 2h8v8H8v-8zm1-5h4v2H9V5z" fill="currentColor"/></symbol>
<symbol id="i-win" viewBox="0 0 24 24" fill="none"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zm-10 10h8v8H3v-8zm10 0h8v8h-8v-8z" fill="currentColor"/></symbol>
<symbol id="i-linux" viewBox="0 0 24 24" fill="none"><path d="M6 3h12v12H6V3zm2 2h8v8H8V5zm1 11h6v3H9v-3z" fill="currentColor"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24" fill="none"><path d="M6 2h12v20H6V2zm2 2h8v14H8V4zm3 15h2v2h-2v-2z" fill="currentColor"/></symbol>

<!-- ═══════════ MISC ═══════════ -->
<symbol id="i-shield" viewBox="0 0 24 24" fill="none">
  <path d="M4 3h16v2H4V3zm0 2h2v8h-2V5zm14 0h2v8h-2V5zm-12 8h10v2H6v-2zm2 2h6v2H8v-2zm2 2h4v2h-4v-2z" fill="currentColor"/>
</symbol>
<symbol id="i-gift" viewBox="0 0 24 24" fill="none">
  <path d="M4 6h16v4H4V6zm2 4h12v10H6V10zm4-6h4v2h-4V4zm-2 2h8v2H8V6z" fill="currentColor"/>
</symbol>
<symbol id="i-scroll" viewBox="0 0 24 24" fill="none">
  <path d="M6 4h12v2H6V4zm12 2h2v12h-2V6zM6 18h12v2H6v-2zM4 6h2v12H4V6z" fill="currentColor"/>
</symbol>
<symbol id="i-sword" viewBox="0 0 24 24" fill="none">
  <path d="M18 2h4v4h-4V2zm-4 4h4v4h-4V6zm-4 4h4v4h-4v-4zm-4 4h4v4H6v-4zm-2 4h2v2H4v-2zm-2 2h2v2H2v-2zm8 0h2v2h-2v-2z" fill="currentColor"/>
</symbol>

`;
  // Inject sprite — works whether loaded in <head> or <body>
  function inject(){
    if(document.body) document.body.prepend(svg);
    else document.addEventListener('DOMContentLoaded',()=>document.body.prepend(svg));
  }
  inject();
})();
