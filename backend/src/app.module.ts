/**
 * 애플리케이션의 루트 모듈
 * 모든 기능 모듈들을 통합하고 전역 설정을 관리
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // ✅ Prisma 모듈 가져오기
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    /**
     * 환경 변수 설정
     * .env 파일을 통한 환경 설정 로드 및 유효성 검사
     */
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 사용 가능하도록 설정
      envFilePath: ['.env', '.env.development', '.env.production'],
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
      }),
    }),
    PrismaModule,
    UserModule,
    AuthModule
  ], // ✅ PrismaModule 등록
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
