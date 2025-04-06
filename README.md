# PURANGE

A colorful fullstack project built with modern web technologies.

## 기술 스택

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- React Hook Form

### Backend
- NestJS
- TypeScript
- Prisma
- PostgreSQL
- JWT Authentication

## 주요 기능

- 🔐 JWT 기반 사용자 인증
- 🌙 다크모드 지원
- ⌨️ 키보드 단축키
- 📱 반응형 디자인
- 🎨 모던한 UI/UX
- 💾 PostgreSQL 데이터베이스

## 시작하기

### 사전 요구사항
- Node.js 18.x 이상
- PostgreSQL

### 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/jumokcom/purange.git
cd purange
```

2. 프론트엔드 설정
```bash
cd frontend
npm install
cp .env.example .env.local
# .env.local 파일 설정
npm run dev
```

3. 백엔드 설정
```bash
cd backend
npm install
cp .env.example .env
# .env 파일 설정
npm run start:dev
```

## 환경 변수 설정

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```
DATABASE_URL="postgresql://username:password@localhost:5432/purange"
JWT_SECRET="your-jwt-secret"
PORT=3001
```

## 라이선스

MIT License

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 