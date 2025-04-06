/**
 * 인증 컨트롤러
 * 사용자 인증 관련 엔드포인트 처리 (로그인, 회원가입)
 */

import { Body, Controller, Post, HttpCode, HttpStatus, Logger, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  @IsString({ message: '이름은 문자열이어야 합니다.' })
  name: string;

  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password: string;
}

export class LoginDto {
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  /**
   * 회원가입 엔드포인트
   * 새로운 사용자를 생성하고 토큰을 반환
   * @param registerDto 회원가입 데이터
   * @returns 생성된 사용자 정보와 액세스 토큰
   */
  @ApiOperation({ summary: '회원가입', description: '새로운 사용자 계정을 생성합니다.' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      this.logger.log(`회원가입 시도: ${registerDto.email}`);
      const result = await this.authService.register(
        registerDto.name,
        registerDto.email,
        registerDto.password
      );
      this.logger.log(`회원가입 성공: ${registerDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(`회원가입 실패: ${error.message}`);
      throw error;
    }
  }

  /**
   * 로그인 엔드포인트
   * 사용자 인증 후 토큰 발급
   * @param loginDto 로그인 데이터
   * @returns 사용자 정보와 액세스 토큰
   */
  @ApiOperation({ summary: '로그인', description: '이메일과 비밀번호로 로그인합니다.' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      this.logger.log(`로그인 시도: ${loginDto.email}`);
      const result = await this.authService.login(
        loginDto.email,
        loginDto.password
      );
      this.logger.log(`로그인 성공: ${loginDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(`로그인 실패: ${error.message}`);
      throw error;
    }
  }
}
