/**
 * 애플리케이션의 루트 모듈
 * 모든 기능 모듈들을 통합하고 설정을 관리
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // ✅ Prisma 모듈 가져오기
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 환경 변수 설정 모듈
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 사용 가능하도록 설정
    }),
    PrismaModule,
    UserModule,
    AuthModule
  ], // ✅ PrismaModule 등록
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
