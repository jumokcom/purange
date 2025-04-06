/**
 * 인증 컨트롤러
 * 사용자 인증 관련 엔드포인트 처리 (로그인, 회원가입)
 */

import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 회원가입 엔드포인트
   * 새로운 사용자를 생성하고 토큰을 반환
   * @param name 사용자 이름
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   * @returns 생성된 사용자 정보와 액세스 토큰
   */
  @ApiOperation({ summary: '회원가입', description: '새로운 사용자 계정을 생성합니다.' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(name, email, password);
  }

  /**
   * 로그인 엔드포인트
   * 사용자 인증 후 토큰 발급
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   * @returns 사용자 정보와 액세스 토큰
   */
  @ApiOperation({ summary: '로그인', description: '이메일과 비밀번호로 로그인합니다.' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }
}
