/**
 * 인증 모듈
 * JWT를 사용한 사용자 인증 및 권한 부여를 관리
 */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    /**
     * JWT 모듈 설정
     * 토큰 생성 및 검증에 필요한 설정을 동적으로 로드
     */
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d', // 토큰 만료 시간: 1일
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule, // 데이터베이스 접근을 위한 Prisma 모듈
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // 다른 모듈에서 AuthService 사용 가능하도록 export
})
export class AuthModule {}
