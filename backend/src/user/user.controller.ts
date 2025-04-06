import { Controller, Get, Post, Body, Delete, Param, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput) {
    try {
      // 필수 필드 검증
      if (!data.email || !data.password || !data.name) {
        throw new HttpException(
          '이메일, 비밀번호, 이름은 필수 입력 사항입니다.',
          HttpStatus.BAD_REQUEST
        );
      }

      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new HttpException(
          '유효한 이메일 주소를 입력해주세요.',
          HttpStatus.BAD_REQUEST
        );
      }

      // 비밀번호 길이 검증
      if (data.password.length < 6) {
        throw new HttpException(
          '비밀번호는 최소 6자 이상이어야 합니다.',
          HttpStatus.BAD_REQUEST
        );
      }

      const user = await this.userService.create(data);
      return {
        message: '회원가입이 완료되었습니다.',
        user
      };
    } catch (error) {
      // Prisma의 고유 제약 조건 위반 에러 처리
      if (error.code === 'P2002') {
        throw new HttpException(
          '이미 사용 중인 이메일입니다.',
          HttpStatus.CONFLICT
        );
      }
      
      // 이미 HttpException인 경우 그대로 던지기
      if (error instanceof HttpException) {
        throw error;
      }

      // 기타 에러
      throw new HttpException(
        error.message || '회원가입에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput
  ) {
    return this.userService.update(+id, data);
  }
}