/**
 * NestJS 애플리케이션의 진입점
 * 서버 설정 및 부트스트래핑을 담당
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  /**
   * NestJS 애플리케이션 인스턴스 생성
   */
  const app = await NestFactory.create(AppModule);
  
  /**
   * CORS 설정
   * 프론트엔드와의 통신을 위한 크로스 오리진 설정
   */
  app.enableCors({
    origin: ['http://localhost:3000', 'https://purange.onrender.com'],
    credentials: true,
  });
  
  /**
   * 전역 파이프 설정
   * 요청 데이터 유효성 검사를 위한 ValidationPipe 설정
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Swagger 문서 설정
   * API 문서화를 위한 Swagger 설정
   */
  const config = new DocumentBuilder()
    .setTitle('Purange API')
    .setDescription('Purange 백엔드 API 문서')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /**
   * 서버 시작
   * 환경변수의 PORT 또는 기본 포트(3001)로 서버 실행
   */
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// 애플리케이션 부트스트랩 실행
bootstrap();