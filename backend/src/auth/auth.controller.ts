import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
