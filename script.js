const SITE_CONFIG = Object.freeze({
  version: '1.0.0',
  // TODO: Add the confirmed Microsoft Store product URLs when the listings are public.
  microsoftStoreBasicUrl: '',
  microsoftStoreProUrl: ''
});

const pageLanguage = document.documentElement.lang === 'en' ? 'en' : 'ko';
const UI_COPY = Object.freeze({
  ko: {
    basicAvailable: 'Microsoft Store에서 받기',
    basicUnavailable: 'Microsoft Store 링크 준비 중',
    proAvailable: 'Microsoft Store에서 구매',
    proUnavailable: 'Microsoft Store 링크 준비 중',
    basicStatus: '무료 · Windows 10 / 11 x64',
    proStatus: '가격 및 구매 조건은 Microsoft Store에서 확인',
    storeStatus: 'Microsoft Store 상품 페이지 준비 중',
    menuOpen: '메뉴 열기',
    menuClose: '메뉴 닫기'
  },
  en: {
    basicAvailable: 'Get it from Microsoft',
    basicUnavailable: 'Microsoft Store link coming soon',
    proAvailable: 'Get Pro from Microsoft Store',
    proUnavailable: 'Microsoft Store link coming soon',
    basicStatus: 'Free · Windows 10 / 11 x64',
    proStatus: 'See Microsoft Store for price and purchase terms',
    storeStatus: 'Microsoft Store product page coming soon',
    menuOpen: 'Open menu',
    menuClose: 'Close menu'
  }
});

document.querySelectorAll('.js-version').forEach((node) => {
  node.textContent = SITE_CONFIG.version;
});

const configureStoreLinks = (selector, url, availableCopy, unavailableCopy) => {
  document.querySelectorAll(selector).forEach((link) => {
    if (url) {
      link.href = url;
      link.textContent = availableCopy;
      link.removeAttribute('aria-disabled');
      link.removeAttribute('tabindex');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      return;
    }

    link.removeAttribute('href');
    link.removeAttribute('target');
    link.removeAttribute('rel');
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('tabindex', '-1');
    link.textContent = unavailableCopy;
  });
};

configureStoreLinks(
  '.js-basic-link',
  SITE_CONFIG.microsoftStoreBasicUrl,
  UI_COPY[pageLanguage].basicAvailable,
  UI_COPY[pageLanguage].basicUnavailable
);
configureStoreLinks(
  '.js-pro-link',
  SITE_CONFIG.microsoftStoreProUrl,
  UI_COPY[pageLanguage].proAvailable,
  UI_COPY[pageLanguage].proUnavailable
);

document.querySelectorAll('.js-basic-status').forEach((node) => {
  node.textContent = SITE_CONFIG.microsoftStoreBasicUrl
    ? UI_COPY[pageLanguage].basicStatus
    : UI_COPY[pageLanguage].storeStatus;
});

document.querySelectorAll('.js-pro-status').forEach((node) => {
  node.textContent = SITE_CONFIG.microsoftStoreProUrl
    ? UI_COPY[pageLanguage].proStatus
    : UI_COPY[pageLanguage].storeStatus;
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
