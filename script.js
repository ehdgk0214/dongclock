const SITE_CONFIG = Object.freeze({
  version: '1.0.0',
  // Microsoft Store listings for Basic and Pro are live.
  microsoftStoreBasicUrl: 'https://apps.microsoft.com/detail/9n0z8vz90sk6?ocid=webpdpshare',
  microsoftStoreProUrl: 'https://apps.microsoft.com/detail/9ph3wmbzpq50?hl=ko-KR&gl=KR'
});

const pageLanguage = document.documentElement.lang === 'en' ? 'en' : 'ko';
const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const UI_COPY = Object.freeze({
  ko: {
    basicAvailable: 'Basic 다운로드',
    basicUnavailable: 'Microsoft Store 링크 준비 중',
    proAvailable: 'Pro 구매',
    proUnavailable: 'Microsoft Store 링크 준비 중',
    basicStatus: '무료 · Windows 10 / 11 x64',
    proStatus: '가격 및 구매 조건은 Microsoft Store에서 확인',
    storeStatus: 'Microsoft Store 상품 페이지 준비 중',
    menuOpen: '메뉴 열기',
    menuClose: '메뉴 닫기'
  },
  en: {
    basicAvailable: 'Download Basic',
    basicUnavailable: 'Microsoft Store link coming soon',
    proAvailable: 'Buy Pro',
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
const demoProgressCells = Array.from(document.querySelectorAll('.demo-progress-cell'));
if (demoClock) {
  const hoursMinutesSeconds = demoClock.querySelector('.clock-hms');
  const milliseconds = demoClock.querySelector('.clock-millis');

  const renderDemoClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const millisValue = now.getMilliseconds();
    const millis = String(millisValue).padStart(3, '0');

    hoursMinutesSeconds.textContent = `${hours}:${minutes}:${seconds}`;
    milliseconds.textContent = `.${millis}`;
    demoClock.setAttribute('aria-label', `${hours}:${minutes}:${seconds}.${millis}`);

    const filledSteps = Math.floor(millisValue / 50);
    demoProgressCells.forEach((cell, index) => {
      cell.classList.toggle('is-filled', index < filledSteps);
    });
  };

  renderDemoClock();
  window.setInterval(renderDemoClock, 50);
}


const demoErrorValue = document.querySelector('.demo-error-value');
const demoErrorState = document.querySelector('.demo-error-state');
if (demoErrorValue) {
  const minimumErrorMs = 14;
  const enteredAt = performance.now();
  let currentErrorMs = randomInteger(300, 500);

  const renderDemoError = () => {
    demoErrorValue.textContent = pageLanguage === 'en'
      ? `Estimated error ±${currentErrorMs} ms`
      : `추정 오차 ±${currentErrorMs} ms`;

    if (demoErrorState) {
      const settled = currentErrorMs <= minimumErrorMs;
      demoErrorState.textContent = pageLanguage === 'en'
        ? (settled ? '● Error stabilized' : '◌ Adjusting error')
        : (settled ? '● 오차 안정' : '◌ 오차 보정 중');
      demoErrorState.classList.toggle('is-settled', settled);
    }
  };

  renderDemoError();

  const demoErrorTimer = window.setInterval(() => {
    const elapsed = performance.now() - enteredAt;

    if (elapsed <= 3000) {
      currentErrorMs = randomInteger(300, 500);
    } else if (currentErrorMs > minimumErrorMs) {
      const reductionRatio = randomInteger(40, 70) / 100;
      currentErrorMs = Math.max(
        minimumErrorMs,
        Math.round(currentErrorMs * reductionRatio)
      );
    }

    renderDemoError();

    if (currentErrorMs <= minimumErrorMs && elapsed > 3000) {
      window.clearInterval(demoErrorTimer);
    }
  }, 1000);
}
