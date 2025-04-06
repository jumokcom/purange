/**
 * 사용자 컨트롤러
 * 사용자 관련 엔드포인트 처리 (프로필 조회, 수정, 삭제)
 */

import { Controller, Get, Post, Body, Delete, Param, Patch, HttpException, HttpStatus, Put, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('사용자')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 현재 로그인한 사용자의 프로필 조회
   * @param req 인증된 사용자 정보를 포함한 요청 객체
   * @returns 사용자 프로필 정보
   */
  @ApiOperation({ summary: '프로필 조회', description: '현재 로그인한 사용자의 프로필을 조회합니다.' })
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  /**
   * 사용자 프로필 수정
   * @param req 인증된 사용자 정보를 포함한 요청 객체
   * @param updateData 수정할 사용자 정보
   * @returns 수정된 사용자 정보
   */
  @ApiOperation({ summary: '프로필 수정', description: '현재 로그인한 사용자의 프로필을 수정합니다.' })
  @ApiResponse({ status: 200, description: '프로필 수정 성공' })
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body() updateData: { name?: string; email?: string }
  ) {
    return this.userService.update(req.user.id, updateData);
  }

  /**
   * 사용자 계정 삭제
   * @param req 인증된 사용자 정보를 포함한 요청 객체
   * @returns 삭제 성공 메시지
   */
  @ApiOperation({ summary: '계정 삭제', description: '현재 로그인한 사용자의 계정을 삭제합니다.' })
  @ApiResponse({ status: 200, description: '계정 삭제 성공' })
  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  async deleteProfile(@Request() req) {
    await this.userService.delete(req.user.id);
    return { message: '계정이 성공적으로 삭제되었습니다.' };
  }

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