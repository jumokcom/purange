/**
 * JWT 인증 전략
 * JWT 토큰을 검증하고 사용자 정보를 추출하는 Passport 전략 구현
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const secretKey = configService.get<string>('JWT_SECRET');
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  /**
   * JWT 토큰 검증 후 실행되는 메서드
   * 토큰에서 추출한 사용자 정보를 바탕으로 실제 사용자 정보를 조회
   * @param payload JWT 토큰에서 추출한 페이로드
   * @returns 사용자 정보 (비밀번호 제외)
   */
  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    
    if (!user) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }
}
