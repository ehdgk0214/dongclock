const SITE_CONFIG = Object.freeze({
  version: '1.0.0',
  basicDownloadUrl: 'https://4714124465239.gumroad.com/l/clockbasic',
  proGumroadUrl: 'https://4714124465239.gumroad.com/l/clockpro'
});

const pageLanguage = document.documentElement.lang === 'en' ? 'en' : 'ko';
const UI_COPY = Object.freeze({
  ko: { basicUnavailable: 'Basic 다운로드 준비 중', basicStatus: 'Windows 10 / 11 x64', menuOpen: '메뉴 열기', menuClose: '메뉴 닫기' },
  en: { basicUnavailable: 'Basic download coming soon', basicStatus: 'Windows 10 / 11 x64', menuOpen: 'Open menu', menuClose: 'Close menu' }
});

document.querySelectorAll('.js-version').forEach((node) => {
  node.textContent = SITE_CONFIG.version;
});

document.querySelectorAll('.js-pro-link').forEach((link) => {
  link.href = SITE_CONFIG.proGumroadUrl;
});

document.querySelectorAll('.js-basic-link').forEach((link) => {
  if (SITE_CONFIG.basicDownloadUrl) {
    link.href = SITE_CONFIG.basicDownloadUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return;
  }

  link.href = '#download';
  link.setAttribute('aria-disabled', 'true');
  link.textContent = UI_COPY[pageLanguage].basicUnavailable;
  link.addEventListener('click', (event) => event.preventDefault());
});

document.querySelectorAll('.js-basic-status').forEach((node) => {
  node.textContent = SITE_CONFIG.basicDownloadUrl ? UI_COPY[pageLanguage].basicStatus : UI_COPY[pageLanguage].basicUnavailable;
});

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.querySelector('.sr-only').textContent = isOpen ? UI_COPY[pageLanguage].menuClose : UI_COPY[pageLanguage].menuOpen;
  });
  nav.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
}

const demoClock = document.querySelector('#demo-clock');
if (demoClock && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const anchor = Date.now();
  const initial = 14 * 3600000 + 42 * 60000 + 28482;
  const formatClock = () => {
    const value = (initial + Date.now() - anchor) % 86400000;
    const hours = String(Math.floor(value / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor(value / 60000) % 60).padStart(2, '0');
    const seconds = String(Math.floor(value / 1000) % 60).padStart(2, '0');
    const millis = String(value % 1000).padStart(3, '0');
    demoClock.innerHTML = `${hours}:${minutes}:${seconds}<span>.${millis}</span>`;
    requestAnimationFrame(formatClock);
  };
  requestAnimationFrame(formatClock);
}
