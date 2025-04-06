/**
 * 인증 관련 엔드포인트를 처리하는 컨트롤러
 * 로그인, 회원가입 등의 라우트를 관리
 */

import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * 로그인 엔드포인트
   * @route POST /auth/login
   * @param req 인증된 사용자 정보를 포함한 요청 객체
   * @returns JWT 토큰과 사용자 정보
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   * 회원가입 엔드포인트
   * @route POST /auth/register
   * @param createUserDto 새로운 사용자 정보
   * @returns 생성된 사용자 정보
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        message: '회원가입이 완료되었습니다.',
        user
      };
    } catch (error) {
      throw new HttpException(
        error.message || '회원가입에 실패했습니다.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
