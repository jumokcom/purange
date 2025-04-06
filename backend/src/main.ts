/**
 * NestJS 애플리케이션의 진입점
 * 서버 설정 및 미들웨어 구성을 담당
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // NestJS 애플리케이션 인스턴스 생성
  const app = await NestFactory.create(AppModule);
  
  // CORS 설정: 프론트엔드에서의 API 요청 허용
  app.enableCors({
    origin: ['https://purange.onrender.com', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // 전역 유효성 검사 파이프 설정
  // DTO를 통한 요청 데이터 자동 검증
  app.useGlobalPipes(new ValidationPipe());

  // 서버 시작: 환경변수 PORT 또는 기본값 3001 사용
  await app.listen(process.env.PORT || 3001);
}

// 애플리케이션 부트스트랩 실행
bootstrap();