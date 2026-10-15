'use strict';
(() => {
  const params = new URLSearchParams(window.location.search);
  const cid = params.get('cid');
  const valid = /^(?:dc_(?:ko|en)_(?:instagram|youtube|community|x|github)_(?:campus01|booking01|http01|discovery01)|dc_(?:ko|en)_organic_(?:home|servertime|campus|ticketing|guide))$/;
  if (cid && valid.test(cid)) {
    document.querySelectorAll('.js-basic-link, .js-pro-link').forEach(link => {
      if (!link.href) return;
      const url = new URL(link.href);
      if (url.hostname !== 'apps.microsoft.com') return;
      url.searchParams.set('cid', cid);
      link.href = url.href;
    });
    // Carry only the allowlisted, non-personal campaign through internal guides.
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || url.hash && url.pathname === window.location.pathname) return;
      url.searchParams.set('cid', cid);
      link.href = url.href;
    });
  }
  document.querySelectorAll('.copy-pc-link').forEach(button => {
    button.addEventListener('click', async () => {
      const link = document.querySelector('.js-basic-link');
      const text = link ? link.href : window.location.href;
      const result = document.querySelector('.copy-result');
      try {
        await navigator.clipboard.writeText(text);
        if (result) result.textContent = document.documentElement.lang === 'en' ? 'Link copied for your Windows PC.' : 'Windows PC에서 열 링크를 복사했습니다.';
      } catch (_) {
        if (result) result.textContent = text;
      }
    });
  });
})();
