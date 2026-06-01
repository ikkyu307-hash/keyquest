/* ====================================================================
   auth.js — Login & Register page logic
   Supports: Email/Password auth + LINE LIFF login
   Depends on: shared.js, config.js
   ==================================================================== */

/* ===== FALLING BACKGROUND ===== */
let fallingBgInterval = null;

function initFallingBg() {
  const bg = $('authFallingBg');
  if (!bg) return;
  bg.innerHTML = '';
  if (fallingBgInterval) clearInterval(fallingBgInterval);

  const symbols = ['✨', '⭐', '❤️', '💖', '⌨️', '🎮', '💡', '🔥', '🌟', '🍀'];
  const characters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
                      'ก','ข','ค','ง','จ','ฉ','ช','ซ','ด','ต','ถ','ท','น','บ','ป','ผ','ฝ','พ','ฟ','ม','ย','ร','ล','ว','ส','ห','อ','ฮ'];
  const colors = ['#ffb43d', '#5fe6a8', '#54d6ff', '#ff5d6c', '#9775fa', '#f783ac', '#ffa94d', '#ffd43b'];

  for (let i = 0; i < 16; i++) spawnItem(true);
  fallingBgInterval = setInterval(() => spawnItem(false), 700);

  function spawnItem(initial) {
    const item = document.createElement('div');
    const r = Math.random();
    if (r < 0.45) {
      item.className = 'falling-item keycap';
      item.textContent = pick(characters);
      if (Math.random() < 0.5) {
        const randomColor = pick(colors);
        item.style.backgroundColor = randomColor + '20';
        item.style.borderColor = randomColor;
        item.style.color = randomColor;
      }
    } else if (r < 0.8) {
      item.className = 'falling-item emoji';
      item.textContent = pick(symbols);
    } else {
      item.className = 'falling-item symbol';
      item.textContent = pick(characters);
      item.style.color = pick(colors);
    }

    const size = 18 + Math.random() * 22;
    if (item.classList.contains('keycap')) {
      item.style.width = size + 'px'; item.style.height = size + 'px';
      item.style.fontSize = (size * 0.45) + 'px';
    } else {
      item.style.fontSize = size + 'px';
    }

    const left = Math.random() * 100;
    const duration = 10 + Math.random() * 10;
    const delay = initial ? -(Math.random() * duration) : 0;
    item.style.left = left + '%';
    item.style.animationDuration = duration + 's';
    item.style.animationDelay = delay + 's';
    item.style.setProperty('--sway', (Math.random() * 120 - 60) + 'px');
    item.style.setProperty('--rot', (Math.random() * 360 + 180) + 'deg');
    item.style.setProperty('--op', 0.35 + Math.random() * 0.4);

    bg.appendChild(item);
    setTimeout(() => item.remove(), duration * 1000);
  }
}

/* ===== RENDER AUTH TEXT ===== */
function renderAuthText() {
  const isTh = lang === 'th';
  const mode = window._authMode || 'login';
  const isLogin = mode === 'login';

  const title = $('authTitle');
  const subtitle = $('authSubtitle');

  if (title) {
    title.textContent = isLogin
      ? (isTh ? 'เข้าสู่ระบบคีย์เควสต์' : 'Log in to KeyQuest')
      : (isTh ? 'สมัครสมาชิกคีย์เควสต์' : 'Sign up to KeyQuest');
  }
  if (subtitle) {
    subtitle.textContent = isLogin
      ? (isTh ? 'กรุณาเข้าสู่ระบบเพื่อบันทึกระดับเลเวล ทองสะสม และแข่งขันออนไลน์กับเพื่อนๆ'
              : 'Log in to save your stats, levels, gold, and play multiplayer challenges.')
      : (isTh ? 'สร้างบัญชีเพื่อบันทึกความก้าวหน้าและปลดล็อกความสามารถพิเศษ'
              : 'Create an account to save progress and unlock unique skills');
  }

  // Email label
  const lblEmail = $('lblEmail');
  if (lblEmail) {
    lblEmail.innerHTML = `<svg class="ic" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px"><use href="#i-mail"></use></svg> ${isTh ? 'อีเมล (Email)' : 'Email Address'}`;
  }

  // Password label
  const lblPassword = $('lblPassword');
  if (lblPassword) {
    lblPassword.innerHTML = `<svg class="ic" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px"><use href="#i-lock"></use></svg> ${isTh ? 'รหัสผ่าน (Password)' : 'Password'}`;
  }

  // Submit button
  const btnSubmit = $('btnSubmitAuth');
  if (btnSubmit) {
    btnSubmit.innerHTML = `<svg class="ic" style="width:16px;height:16px"><use href="#i-lock"></use></svg> ${isLogin ? (isTh ? 'เข้าสู่ระบบ' : 'Log In') : (isTh ? 'สมัครสมาชิก' : 'Sign Up')}`;
  }

  // LINE button
  const btnLine = $('btnLineAuth');
  if (btnLine) {
    btnLine.innerHTML = `
      <svg class="ic" style="fill: currentColor; stroke: none; width: 20px; height: 20px;" viewBox="0 0 24 24"><path d="M24 10.3c0-5.7-5.4-10.3-12-10.3S0 4.6 0 10.3c0 5.1 4.3 9.4 10.1 10.1.4.1.9.3 1.1.8l.2 1.9c.1.7.5.9.9.5l1.9-2.3c2.3-1.6 3.8-3.9 4.8-6.4 3.1-.3 5-2.2 5-4.6zm-14.7 2.3c0 .4-.3.7-.7.7H5.9c-.4 0-.7-.3-.7-.7v-5.2c0-.4.3-.7.7-.7s.7.3.7.7v4.5h2.1c.3.1.6.3.6.7zm2.7 0c0 .4-.3.7-.7.7s-.7-.3-.7-.7v-5.2c0-.4.3-.7.7-.7s.7.3.7.7v5.2zm4.3 0c0 .4-.3.7-.7.7h-2.1c-.4 0-.7-.3-.7-.7v-5.2c0-.4.3-.7.7-.7s.7.3.7.7v4.5h1.4c.4 0 .7.3.7.7zm3.7-2.6c0 .4-.3.7-.7.7h-1.4v1.2c0 .4-.3.7-.7.7s-.7-.3-.7-.7v-5.2c0-.4.3-.7.7-.7h2.1c.4 0 .7.3.7.7s-.3.7-.7.7h-1.4v1.2h1.4c.4 0 .7.3.7.7z"/></svg>
      ${isLogin ? (isTh ? 'เข้าสู่ระบบด้วย LINE' : 'Log In with LINE') : (isTh ? 'สมัครด้วย LINE' : 'Sign Up with LINE')}
    `;
  }

  // Guest button
  const btnGuest = $('btnGuestAuth');
  if (btnGuest) {
    btnGuest.innerHTML = `<svg class="ic" style="width:16px;height:16px"><use href="#i-user"></use></svg> ${isTh ? 'เล่นแบบไม่ลงทะเบียน (Guest)' : 'Play as Guest (Offline)'}`;
  }

  // Divider text
  const divider = $('authDivider');
  if (divider) {
    divider.innerHTML = `<span>${isTh ? 'หรือ' : 'or'}</span>`;
  }

  // Auth link
  const authLink = $('authLink');
  if (authLink) {
    if (isLogin) {
      authLink.innerHTML = isTh
        ? 'ยังไม่มีบัญชี? <a href="register.html">สมัครสมาชิก</a>'
        : 'Don\'t have an account? <a href="register.html">Sign Up</a>';
    } else {
      authLink.innerHTML = isTh
        ? 'มีบัญชีแล้ว? <a href="login.html">เข้าสู่ระบบ</a>'
        : 'Already have an account? <a href="login.html">Log In</a>';
    }
  }
}

/* ===== EMAIL/PASSWORD AUTH ===== */
async function handleEmailPasswordAuth(email, password) {
  const mode = window._authMode || 'login';
  const isLogin = mode === 'login';
  const isTh = lang === 'th';
  const errorEl = $('authError');

  // Validation
  if (!email || !password) {
    if (errorEl) errorEl.textContent = isTh ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all fields';
    return;
  }
  if (password.length < 6) {
    if (errorEl) errorEl.textContent = isTh ? 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร' : 'Password must be at least 6 characters long';
    return;
  }

  // Clear error
  if (errorEl) errorEl.textContent = '';

  // Show loading
  Swal.fire({
    title: isLogin
      ? (isTh ? 'กำลังเข้าสู่ระบบ...' : 'Logging in...')
      : (isTh ? 'กำลังสมัครสมาชิก...' : 'Signing up...'),
    allowOutsideClick: false,
    didOpen: () => { Swal.showLoading(); },
    background: '#1a1a2e',
    color: '#fff'
  });

  try {
    if (isLogin) {
      // ====== LOGIN ======
      const { data, error } = await dbClient.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }
      currentUser = data.user;
      localStorage.removeItem('typing_game_logged_out');
      await loadUserStats();

      Swal.fire({
        icon: 'success',
        title: isTh ? 'เข้าสู่ระบบสำเร็จ!' : 'Login Successful!',
        text: isTh ? `ยินดีต้อนรับกลับมา!` : `Welcome back!`,
        timer: 1500,
        showConfirmButton: false,
        background: '#1a1a2e',
        color: '#fff'
      });

      setTimeout(() => {
        localStorage.removeItem('typing_game_guest');
        window.location.href = 'profile.html';
      }, 1500);

    } else {
      // ====== REGISTER ======
      const { data, error } = await dbClient.auth.signUp({ email, password });
      if (error) {
        throw error;
      }

      // Check if email confirmation is required
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        // User already exists
        Swal.fire({
          icon: 'warning',
          title: isTh ? 'บัญชีนี้มีอยู่แล้ว' : 'Account Already Exists',
          text: isTh ? 'อีเมลนี้ถูกใช้งานแล้ว กรุณาเข้าสู่ระบบแทน' : 'This email is already in use. Please log in instead.',
          background: '#1a1a2e',
          color: '#fff',
          confirmButtonText: isTh ? 'ไปหน้าเข้าสู่ระบบ' : 'Go to Login',
          confirmButtonColor: '#ffb43d'
        }).then(() => {
          window.location.href = 'login.html';
        });
        return;
      }

      if (data.session) {
        // Auto-confirmed — log in immediately
        currentUser = data.user;
        localStorage.removeItem('typing_game_logged_out');
        await loadUserStats();

        Swal.fire({
          icon: 'success',
          title: isTh ? 'สมัครสมาชิกสำเร็จ!' : 'Registration Successful!',
          text: isTh ? 'ยินดีต้อนรับสู่คีย์เควสต์!' : 'Welcome to KeyQuest!',
          timer: 1800,
          showConfirmButton: false,
          background: '#1a1a2e',
          color: '#fff'
        });

        setTimeout(() => {
          localStorage.removeItem('typing_game_guest');
        window.location.href = 'profile.html';
        }, 1800);
      } else {
        // Need email confirmation
        Swal.fire({
          icon: 'info',
          title: isTh ? 'ตรวจสอบอีเมลของคุณ' : 'Check Your Email',
          html: isTh
            ? `เราส่งลิงก์ยืนยันไปที่ <strong>${email}</strong><br>กรุณาคลิกลิงก์ในอีเมลเพื่อเปิดใช้งานบัญชี`
            : `We sent a confirmation link to <strong>${email}</strong><br>Click the link in the email to activate your account.`,
          background: '#1a1a2e',
          color: '#fff',
          confirmButtonText: isTh ? 'เข้าใจแล้ว' : 'Got it',
          confirmButtonColor: '#ffb43d'
        });
      }
    }
  } catch (err) {
    console.error('Auth error:', err);
    let errMsg = err.message || '';

    // Translate common errors
    if (isTh) {
      if (errMsg.includes('Invalid login credentials')) {
        errMsg = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
      } else if (errMsg.includes('Email not confirmed')) {
        errMsg = 'อีเมลยังไม่ได้ยืนยัน กรุณาตรวจสอบอีเมลของคุณ';
      } else if (errMsg.includes('User already registered')) {
        errMsg = 'อีเมลนี้ถูกใช้งานแล้ว';
      } else if (errMsg.includes('rate limit') || errMsg.includes('too many')) {
        errMsg = 'คุณส่งคำขอบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่';
      } else if (errMsg.includes('Password should be at least')) {
        errMsg = 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
      } else if (errMsg.includes('Unable to validate email')) {
        errMsg = 'รูปแบบอีเมลไม่ถูกต้อง';
      }
    }

    Swal.fire({
      icon: 'error',
      title: isLogin
        ? (isTh ? 'เข้าสู่ระบบล้มเหลว' : 'Login Failed')
        : (isTh ? 'สมัครสมาชิกล้มเหลว' : 'Registration Failed'),
      text: errMsg,
      background: '#1a1a2e',
      color: '#fff',
      confirmButtonColor: 'var(--coral)'
    });

    if (errorEl) errorEl.textContent = errMsg;
  }
}

/* ===== LINE LIFF LOGIN FLOW ===== */
async function handleLineLoginFlow(profile) {
  const email = `line_${profile.userId.toLowerCase()}@liff.line`;
  const password = `LiffPass_${profile.userId}`;
  
  Swal.fire({
    title: lang === 'th' ? 'กำลังล็อกอินด้วย LINE...' : 'Logging in with LINE...',
    allowOutsideClick: false,
    didOpen: () => { Swal.showLoading(); },
    background: '#1a1a2e',
    color: '#fff'
  });
  
  try {
    let loginData = null;
    try {
      const { data, error } = await dbClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      loginData = data;
    } catch (loginErr) {
      if (loginErr.message && (loginErr.message.includes('Invalid login credentials') || loginErr.message.includes('not found') || loginErr.message.includes('confirm') || loginErr.message.includes('Invalid claims'))) {
        console.log("LINE user not registered in Supabase. Creating account...");
        const { data: signUpData, error: signUpError } = await dbClient.auth.signUp({ email, password });
        if (signUpError) throw signUpError;
        
        const { data: retryData, error: retryError } = await dbClient.auth.signInWithPassword({ email, password });
        if (retryError) throw retryError;
        loginData = retryData;
      } else {
        throw loginErr;
      }
    }
    
    currentUser = loginData.user;
    
    const avatarKey = 'typing_game_avatar_' + currentUser.id;
    if (profile.pictureUrl) {
      localStorage.setItem(avatarKey, profile.pictureUrl);
    }
    const nameKey = 'typing_game_display_name_' + currentUser.id;
    if (profile.displayName) {
      localStorage.setItem(nameKey, profile.displayName);
    }
    
    localStorage.removeItem('typing_game_logged_out');
    await loadUserStats();
    
    Swal.fire({
      icon: 'success',
      title: lang === 'th' ? 'ล็อกอินด้วย LINE สำเร็จ!' : 'LINE Login Successful!',
      text: lang === 'th' ? `ยินดีต้อนรับคุณ ${profile.displayName}` : `Welcome ${profile.displayName}`,
      timer: 1500,
      showConfirmButton: false,
      background: '#1a1a2e',
      color: '#fff'
    });
    
    setTimeout(() => {
      localStorage.removeItem('typing_game_guest');
        window.location.href = 'profile.html';
    }, 1500);
    
  } catch (err) {
    console.error("LINE Supabase login failed:", err);
    Swal.fire({
      icon: 'error',
      title: lang === 'th' ? 'เข้าสู่ระบบด้วย LINE ล้มเหลว' : 'LINE Login Failed',
      text: err.message,
      background: '#1a1a2e',
      color: '#fff',
      confirmButtonColor: 'var(--coral)'
    });
  }
}

async function initLiff() {
  if (!window.liff) {
    console.warn("LINE LIFF SDK is not loaded.");
    return;
  }
  try {
    await liff.init({ liffId: LIFF_ID });
    console.log("LINE LIFF Initialized successfully");
    
    const loggedOutFlag = localStorage.getItem('typing_game_logged_out') === 'true';
    if (liff.isLoggedIn() && !loggedOutFlag) {
      const profile = await liff.getProfile();
      console.log("Logged in to LINE:", profile.displayName);
      await handleLineLoginFlow(profile);
    }
  } catch (err) {
    console.error("LIFF initialization error:", err);
  }
}

/* ===== LANG CHANGE CALLBACK ===== */
function onLangChange() {
  renderAuthText();
}

/* ===== PASSWORD VISIBILITY TOGGLE ===== */
function initPasswordToggle() {
  const btn = $('btnTogglePassword');
  const input = $('authPassword');
  if (!btn || !input) return;

  btn.onclick = () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    const useEl = btn.querySelector('use');
    if (useEl) {
      useEl.setAttribute('href', isPassword ? '#i-eye-off' : '#i-eye');
    }
  };
}

/* ===== BOOT ===== */
async function bootAuth(mode) {
  window._authMode = mode || 'login';
  const ok = await initApp({ redirectIfAuth: true });
  if (!ok) return; // redirected away

  renderAuthText();
  initFallingBg();
  initPasswordToggle();

  // ===== Email/Password Form =====
  const authForm = $('authForm');
  if (authForm) {
    authForm.onsubmit = (e) => {
      e.preventDefault();
      const email = $('authEmail') ? $('authEmail').value.trim() : '';
      const password = $('authPassword') ? $('authPassword').value : '';
      handleEmailPasswordAuth(email, password);
    };
  }

  // ===== Guest Button =====
  const btnGuest = $('btnGuestAuth');
  if (btnGuest) {
    btnGuest.onclick = () => {
      localStorage.removeItem('typing_game_logged_out');
      localStorage.setItem('typing_game_guest', 'true');
      window.location.href = 'game.html';
    };
  }

  // ===== LINE Login Button =====
  const btnLineAuth = $('btnLineAuth');
  if (btnLineAuth) {
    btnLineAuth.onmouseenter = () => {
      btnLineAuth.style.background = '#05b04b';
      btnLineAuth.style.transform = 'translateY(-2px)';
      btnLineAuth.style.boxShadow = '0 6px 16px rgba(6, 199, 85, 0.4)';
    };
    btnLineAuth.onmouseleave = () => {
      btnLineAuth.style.background = '#06C755';
      btnLineAuth.style.transform = 'translateY(0)';
      btnLineAuth.style.boxShadow = 'none';
    };
    btnLineAuth.onmousedown = () => {
      btnLineAuth.style.transform = 'translateY(1px)';
      btnLineAuth.style.boxShadow = '0 2px 4px rgba(6, 199, 85, 0.2)';
    };
    btnLineAuth.onmouseup = () => {
      btnLineAuth.style.transform = 'translateY(-2px)';
      btnLineAuth.style.boxShadow = '0 6px 16px rgba(6, 199, 85, 0.4)';
    };

    btnLineAuth.onclick = () => {
      localStorage.removeItem('typing_game_logged_out');
      if (!window.liff) {
        Swal.fire({
          icon: 'error',
          title: lang === 'th' ? 'พบข้อผิดพลาด SDK' : 'SDK Error',
          text: lang === 'th' ? 'LINE LIFF SDK ไม่โหลด กรุณาตรวจสอบอินเทอร์เน็ตของคุณ' : 'LINE LIFF SDK failed to load. Please check your connection.',
          background: '#1a1a2e',
          color: '#fff'
        });
        return;
      }
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        liff.getProfile().then(profile => {
          handleLineLoginFlow(profile);
        });
      }
    };
  }

  // Run LIFF Init
  await initLiff();
}
