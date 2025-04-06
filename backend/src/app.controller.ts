/**
 * 애플리케이션의 기본 컨트롤러
 * 루트 경로('/') 및 기본 엔드포인트 처리
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('기본')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 헬스 체크 엔드포인트
   * 서버의 상태를 확인하기 위한 GET 요청 처리
   * @returns 서버 상태 메시지
   */
  @ApiOperation({ summary: '서버 상태 확인', description: 'API 서버가 정상적으로 동작하는지 확인합니다.' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}