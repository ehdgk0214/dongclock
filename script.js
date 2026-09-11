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
if (demoClock) {
  const hoursMinutesSeconds = demoClock.querySelector('.clock-hms');
  const milliseconds = demoClock.querySelector('.clock-millis');
  const renderDemoClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const millis = String(now.getMilliseconds()).padStart(3, '0');

    hoursMinutesSeconds.textContent = `${hours}:${minutes}:${seconds}`;
    milliseconds.textContent = `.${millis}`;
    demoClock.setAttribute('aria-label', `${hours}:${minutes}:${seconds}.${millis}`);
  };

  renderDemoClock();
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.setInterval(renderDemoClock, 50);
  }
}
