# 감정 분석 기반 일기 웹 서비스 - Frontend

![Main Preview](./assets/screenshots/main_page.png)

> 📝 예비창업패키지 K-Startup 심사용  
>  
> 사용자가 하루의 감정을 기록하고, AI가 감정 키워드를 분석해 맞춤 위로/공감 문구를 제공하는 감성 일기장 서비스입니다.

---

## 💡 주요 기능 소개

### ✍️ 1. 오늘의 일기 작성

![Diary Page](./assets/screenshots/diary_page.png)

- 하루의 감정이나 사건을 작성 (50자 제한)
- 일기 저장 시 감정 키워드 자동 추출
- 감정 키워드 기반 맞춤 공감 & 위로 문구 제공

---

### 🔐 2. 공개 범위 선택 기능

![Visibility Setting](./assets/screenshots/visibility_setting.png)

- 일기 작성 시 **전체 공개 / 나만 보기** 선택 가능
- 전체 공개 시 Explore 페이지에서 다른 사용자들과 공유

---

### 📰 3. 일기 목록 조회

![Diary List](./assets/screenshots/diary_list.png)

- 사용자가 작성한 일기 목록을 날짜순으로 확인 가능
- 다른 사용자의 공개 일기 조회 기능 (Explore)

---

### ❤️ 4. 공감 / 리액션 기능

![Reaction](./assets/screenshots/reaction.png)

- 공개 일기에 좋아요, 공감 이모지 반응 기능 제공
- 사용자 간 긍정적 소통 유도

---

## 🛠️ 기술 스택

| 영역 | 기술 |
|------|------|
| 프론트엔드 | React 17, Redux, SCSS, React Router v5 |
| 상태 관리 | Redux Toolkit |
| API 연동 | Axios, Spring Boot Backend |
| 디자인 | MUI (Material UI), Custom SCSS |
| 이미지 업로드 | AWS S3 Presigned URL 방식 |

---

## 🎯 개발 포인트

- **기능 중심 폴더 구조(features)** 로 효율적 개발
- **Redux로 사용자 상태 및 일기 데이터 통합 관리**
- **AI 감정 분석 기능과 위로 문구 자동 추천**
- **디자인 퍼블리셔 없이 개발자가 직접 고급 디자인 제작**
- **MVP 서비스 런칭을 목표로 실제 서비스 수준으로 개발**

---

## 💻 실행 방법

```bash
git clone https://github.com/yeju/diary-web-frontend.git
cd diary-web-frontend
npm install
npm start
