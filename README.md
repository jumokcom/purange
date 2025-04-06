# Purange - 일정 관리 애플리케이션

효율적인 일정 관리를 위한 풀스택 웹 애플리케이션입니다.

## 주요 기능

- 사용자 인증 (회원가입/로그인)
- 일정 관리 (캘린더)
- 할 일 목록 (Todo List)
- 다크 모드 지원
- 반응형 디자인

## 기술 스택

### 프론트엔드
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand (상태 관리)

### 백엔드
- NestJS
- TypeScript
- Prisma (ORM)
- PostgreSQL
- JWT 인증

## 시작하기

### 사전 요구사항
- Node.js 18.x 이상
- PostgreSQL
- pnpm (선택사항)

### 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/your-username/purange.git
cd purange
```

2. 백엔드 설정
```bash
cd backend
npm install
cp .env.example .env # 환경 변수 설정
npx prisma migrate dev # 데이터베이스 마이그레이션
npm run start:dev
```

3. 프론트엔드 설정
```bash
cd frontend
npm install
cp .env.example .env.local # 환경 변수 설정
npm run dev
```

## 환경 변수 설정

### 백엔드 (.env)
- `DATABASE_URL`: PostgreSQL 데이터베이스 연결 문자열
- `JWT_SECRET`: JWT 토큰 생성용 비밀 키
- `PORT`: 서버 포트 (기본값: 3001)
- `NODE_ENV`: 실행 환경 (development/production)

### 프론트엔드 (.env.local)
- `NEXT_PUBLIC_API_URL`: 백엔드 API 주소

## 배포

### 백엔드 (Render)
1. 새 Web Service 생성
2. 환경 변수 설정
3. 빌드 명령어: `npm install && npx prisma generate && npm run build`
4. 시작 명령어: `npm run start:prod`

### 프론트엔드 (Vercel)
1. GitHub 저장소 연결
2. 환경 변수 설정
3. 자동 배포 설정

## 라이선스

MIT License

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 