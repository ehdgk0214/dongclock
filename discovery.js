/* Browser-local preparation tools. No network requests, analytics, or dependencies. */
(() => {
  'use strict';
  const copyButtons = document.querySelectorAll('[data-copy-install]');
  copyButtons.forEach(button => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const status = document.getElementById(button.getAttribute('aria-describedby'));
      const link = document.querySelector('[data-install-link]');
      if (!link || !status) return;
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard unavailable');
        await navigator.clipboard.writeText(link.href);
        status.textContent = 'PC에서 열 설치 링크를 복사했습니다.';
      } catch (_) {
        status.textContent = '복사하지 못했습니다. 아래 설치 링크를 길게 누르거나 마우스 오른쪽 버튼으로 복사하세요.';
      }
    });
  });
  document.querySelectorAll('[data-checklist]').forEach(tool => {
    const key = 'dongclock-prep-v1:' + tool.dataset.checklist;
    const checks = Array.from(tool.querySelectorAll('[data-check]'));
    const memo = tool.querySelector('[data-memo]');
    const save = tool.querySelector('[data-save]');
    const progress = tool.querySelector('[data-progress]');
    const status = tool.querySelector('[data-storage-status]');
    const reset = tool.querySelector('[data-reset]');
    const saveControl = tool.querySelector('[data-save-control]');
    let storageAvailable = true;
    saveControl.hidden = false;
    reset.hidden = false;
    function updateProgress() {
      progress.textContent = checks.filter(item => item.checked).length + ' / ' + checks.length + '개 확인';
    }
    function writeState() {
      updateProgress();
      if (!save.checked || !storageAvailable) return;
      try {
        localStorage.setItem(key, JSON.stringify({version:1, checked:checks.filter(item => item.checked).map(item => item.value), memo:memo.value}));
        status.textContent = '이 브라우저에 저장 중 · 서버로 전송하지 않습니다.';
      } catch (_) {
        storageAvailable = false;
        save.checked = false;
        status.textContent = '브라우저에서 저장할 수 없습니다. 페이지를 닫기 전까지 사용할 수 있습니다.';
      }
    }
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && saved.version === 1 && Array.isArray(saved.checked) && typeof saved.memo === 'string') {
          checks.forEach(item => { item.checked = saved.checked.includes(item.value); });
          memo.value = saved.memo;
          save.checked = true;
          status.textContent = '이 브라우저에 저장한 준비 내용을 불러왔습니다.';
        }
      }
    } catch (_) {
      storageAvailable = false;
      save.disabled = true;
      status.textContent = '이 브라우저에서는 저장 기능을 사용할 수 없습니다. 체크리스트는 계속 쓸 수 있습니다.';
    }
    checks.forEach(item => item.addEventListener('change', writeState));
    memo.addEventListener('input', writeState);
    save.addEventListener('change', () => {
      if (save.checked) { writeState(); return; }
      try {
        localStorage.removeItem(key);
        status.textContent = '저장한 내용을 삭제했습니다. 현재 입력은 이 페이지를 닫을 때까지 유지됩니다.';
      } catch (_) {
        status.textContent = '저장 내용을 삭제하지 못했습니다. 브라우저의 사이트 데이터 설정에서 삭제할 수 있습니다.';
      }
    });
    reset.addEventListener('click', () => {
      checks.forEach(item => { item.checked = false; });
      memo.value = '';
      writeState();
      status.textContent = save.checked ? '체크와 메모를 비우고 저장했습니다.' : '체크와 메모를 비웠습니다.';
    });
    updateProgress();
  });
})();
