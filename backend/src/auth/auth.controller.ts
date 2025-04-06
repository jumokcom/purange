import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() data: { email: string; password: string; name: string }) {
    try {
      const user = await this.userService.create(data);
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

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const user = await this.authService.validateUser(body.email, body.password);
      return this.authService.login(user);
    } catch (error) {
      throw new HttpException(
        error.message || '로그인에 실패했습니다.',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
