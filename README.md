# DongClock Server Time website

DongClock Server Time의 한국어·영어 공식 제품 소개용 정적 사이트입니다. 빌드 도구나 외부 프레임워크 없이 HTML/CSS/JavaScript만 사용하므로 GitHub Pages에 그대로 배포할 수 있습니다.

## 파일 구조

```text
dongclock-site/
├─ index.html
├─ en.html
├─ styles.css
├─ script.js
├─ README.md
└─ assets/
   ├─ dongclock-icon.png
   └─ screenshots/
      └─ basic-app.png
```

- `index.html`: 한국어 기본 페이지
- `en.html`: 영어 페이지
- 두 페이지의 헤더에서 언어를 전환할 수 있습니다.

## 자주 바꾸는 설정

`script.js` 상단의 `SITE_CONFIG` 한 곳에서 관리합니다.

- `version`: 사이트에 표시할 제품 버전
- `basicDownloadUrl`: Basic 무료 다운로드 URL
- `proGumroadUrl`: Pro 구매 URL

현재 Basic URL은 `https://4714124465239.gumroad.com/l/clockbasic`입니다.
현재 Pro URL은 `https://4714124465239.gumroad.com/l/clockpro`입니다.

## 이미지 교체

- 앱 아이콘: `assets/dongclock-icon.png`
- 제품 화면: `assets/screenshots/basic-app.png`

현재 페이지는 아이콘을 직접 사용합니다. 제품 화면 이미지는 후속 문서나 별도 스크린샷 섹션을 추가할 때 사용할 수 있도록 정리해 두었습니다. Open Graph 이미지를 별도로 만들면 `index.html`의 `og:image`도 함께 변경하세요.

## 로컬 미리보기

프로젝트 폴더에서 간단한 정적 서버를 실행합니다.

```powershell
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다. Python이 없다면 VS Code Live Server 등 아무 정적 서버를 사용해도 됩니다.

## GitHub Pages 배포

### 저장소 루트에 배포하는 경우

1. 이 폴더의 파일을 GitHub 저장소 루트에 둡니다.
2. GitHub 저장소의 **Settings → Pages**로 이동합니다.
3. **Build and deployment**에서 **Deploy from a branch**를 선택합니다.
4. 배포 branch(보통 `main`)와 `/(root)`를 선택하고 저장합니다.

### `docs/` 폴더로 배포하는 경우

1. 이 폴더의 내용 전체를 저장소의 `docs/`로 복사합니다.
2. **Settings → Pages**에서 배포 branch와 `/docs`를 선택합니다.

사이트는 상대 경로만 사용하므로 프로젝트 Pages 경로(`username.github.io/repository/`)에서도 동작합니다.

## 배포 전 점검

- `SITE_CONFIG.basicDownloadUrl` 설정 여부
- Pro Gumroad URL
- 제품 버전과 Windows 지원 범위
- Authenticode / SmartScreen 안내의 현재 배포 정책 일치 여부
- `og:image`의 절대 URL 필요 여부(소셜 플랫폼별 권장)
- 아이콘과 스크린샷 파일이 함께 배포되는지

## 문구 검증 기준

페이지의 측정·제품 설명은 저장소의 `PROJECT_CONTEXT.md`, `DECISIONS.md`, `CHANGELOG_DEV.md`와 Basic/Pro Rust production source를 기준으로 작성했습니다. 정확도 보장, 절대 UTC 인증, 무부하, 원자시계 수준 등의 표현은 사용하지 않습니다.
