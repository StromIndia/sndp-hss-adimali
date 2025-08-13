// auth.js — simple demo authentication using localStorage (not for production)
(function(){
  const USERS_KEY = 'sndp:users';
  const SESSION_KEY = 'sndp:session';

  function getUsers(){
    try{ return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }catch(e){ return []; }
  }
  function saveUsers(users){ localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
  function setSession(session){ localStorage.setItem(SESSION_KEY, JSON.stringify(session)); }
  function getSession(){ try{ return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch(e){ return null; } }
  function hash(s){ return btoa(unescape(encodeURIComponent(s))).split('').reverse().join(''); } // playful hash

  // Signup
  const signup = document.getElementById('signup-form');
  if (signup){
    signup.addEventListener('submit', (e)=>{
      e.preventDefault();
      const fd = new FormData(signup);
      const data = Object.fromEntries(fd.entries());
      const status = document.getElementById('signup-status');

      if (data.password !== data.confirm){
        status.textContent = 'Passwords do not match.';
        status.style.color = 'var(--danger)';
        return;
      }

      const users = getUsers();
      if (users.find(u=>u.email === data.email)){
        status.textContent = 'Account already exists. Please log in.';
        status.style.color = 'var(--danger)';
        return;
      }

      const user = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        pass: hash(data.password),
        createdAt: Date.now()
      };
      users.push(user);
      saveUsers(users);
      setSession({ email: user.email });
      status.style.color = 'var(--accent)';
      status.textContent = 'Account created! Redirecting…';
      setTimeout(()=>{ window.location.href = 'dashboard.html'; }, 800);
    });
  }

  // Login
  const login = document.getElementById('login-form');
  if (login){
    login.addEventListener('submit', (e)=>{
      e.preventDefault();
      const fd = new FormData(login);
      const { email, password } = Object.fromEntries(fd.entries());
      const status = document.getElementById('login-status');

      const users = getUsers();
      const user = users.find(u=>u.email === email);
      if (!user || user.pass !== hash(password)){
        status.textContent = 'Invalid email or password.';
        status.style.color = 'var(--danger)';
        return;
      }
      setSession({ email });
      status.style.color = 'var(--accent)';
      status.textContent = 'Login successful! Redirecting…';
      setTimeout(()=>{ window.location.href = 'dashboard.html'; }, 600);
    });
  }

  // Dashboard session
  const userName = document.getElementById('user-name');
  const userEmail = document.getElementById('user-email');
  const logout = document.getElementById('logout-btn');
  if (userName || userEmail || logout){
    const session = getSession();
    if (!session){ window.location.href = 'login.html'; return; }
    const user = getUsers().find(u=>u.email === session.email);
    if (!user){ window.location.href = 'login.html'; return; }
    if (userName) userName.textContent = user.name || 'Student';
    if (userEmail) userEmail.textContent = user.email;
    if (logout) logout.addEventListener('click', ()=>{
      localStorage.removeItem(SESSION_KEY);
      window.location.href = 'index.html';
    });
  }
})();
document.getElementById("signupForm").addEventListener("submit", function(e){
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
        alert("Account created successfully!");
        window.location.href = "login.html";
    })
    .catch(error => {
        alert(error.message);
    });
});

document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
        alert("Login successful!");
        window.location.href = "dashboard.html";
    })
    .catch(error => {
        alert(error.message);
    });
});
