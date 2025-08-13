// scripts.js — UI interactions and demo content
(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links){
    toggle.addEventListener('click', ()=>{
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  // Inject events
  const events = [
    { time: 'Aug 15', desc: 'Independence Day celebrations and cultural events.' },
    { time: 'Aug 20', desc: 'Parent-Teacher Meeting for Class 11 and 12.' },
    { time: 'Sep 02', desc: 'Inter-school Science Exhibition hosted on campus.' },
    { time: 'Sep 10', desc: 'Admissions window closes for new batch.' }
  ];
  const timeline = document.getElementById('events-list');
  if (timeline){
    events.forEach(e=>{
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `<div class="time">${e.time}</div><div class="desc">${e.desc}</div>`;
      timeline.appendChild(item);
    });
  }

  // Inject gallery placeholders
  const gallery = document.getElementById('gallery');
  if (gallery){
    for (let i=0;i<8;i++){
      const div = document.createElement('div');
      div.className = 'img';
      gallery.appendChild(div);
    }
  }

  // Admissions form
  const admForm = document.getElementById('admission-form');
  if (admForm){
    admForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(admForm).entries());
      localStorage.setItem('admission:last', JSON.stringify(data));
      const status = document.getElementById('admission-status');
      if (status){ status.textContent = 'Thanks! We received your interest form.'; }
      admForm.reset();
    });
  }

  // Contact form
  const cForm = document.getElementById('contact-form');
  if (cForm){
    cForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(cForm).entries());
      const msgs = JSON.parse(localStorage.getItem('contact:messages')||'[]');
      msgs.push({ ...data, at: new Date().toISOString() });
      localStorage.setItem('contact:messages', JSON.stringify(msgs));
      const status = document.getElementById('contact-status');
      if (status){ status.textContent = 'Message sent! We will reply shortly.'; }
      cForm.reset();
    });
  }

  // Dashboard demo data
  const timetable = document.getElementById('timetable');
  if (timetable){
    const slots = ['Mon: Physics, Chemistry', 'Tue: Maths, English', 'Wed: CS, PE', 'Thu: Biology, Economics', 'Fri: Lab Day'];
    slots.forEach(s=>{
      const li = document.createElement('li'); li.textContent = s; timetable.appendChild(li);
    });
  }
  const notices = document.getElementById('notices');
  if (notices){
    ['Unit tests next week', 'Bus routes updated', 'Library new arrivals'].forEach(n=>{
      const li = document.createElement('li'); li.textContent = n; notices.appendChild(li);
    });
  }
})();
// Create glowing cursor element
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// Move it with the mouse
document.addEventListener('mousemove', (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});
document.addEventListener('mousemove', function(e) {
  let particle = document.createElement('span');
  particle.className = 'cursor-particle';
  particle.style.left = e.clientX + 'px';
  particle.style.top = e.clientY + 'px';
  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1000);
});
const firebaseConfig = {
  apiKey: "AIzaSyAVIvwX1IfaED8BaE6tiATR8ceuIEAolcA",
  authDomain: "sndp-hss-adimali.firebaseapp.com",
  projectId: "sndp-hss-adimali",
  storageBucket: "sndp-hss-adimali.firebasestorage.app",
  messagingSenderId: "710519500101",
  appId: "1:710519500101:web:dc32b08cd83a80ef0d222c"
};