/**
 * 인증 관련 비즈니스 로직을 처리하는 서비스
 * 사용자 인증, JWT 토큰 생성 등을 담당
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * 사용자 인증을 처리하는 메서드
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   * @returns 인증된 사용자 정보 (비밀번호 제외)
   * @throws UnauthorizedException 인증 실패 시
   */
  async validateUser(email: string, password: string) {
    // 이메일로 사용자 찾기
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    // 비밀번호를 제외한 사용자 정보 반환
    const { password: _, ...result } = user;
    return result;
  }

  /**
   * 로그인 처리 및 JWT 토큰 생성
   * @param user 인증된 사용자 정보
   * @returns JWT 토큰과 사용자 정보
   */
  async login(user: any) {
    // JWT 토큰에 포함될 페이로드
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name
    };
    
    // JWT 토큰 생성 및 사용자 정보와 함께 반환
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }
}
