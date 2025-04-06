/**
 * 애플리케이션의 기본 서비스
 * 헬스 체크 및 기본 API 엔드포인트를 위한 서비스 로직
 */

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * 기본 헬스 체크 메서드
   * 서버가 정상적으로 동작하는지 확인하는 엔드포인트에서 사용
   * @returns 서버 상태 메시지
   */
  getHello(): string {
    return 'Purange API is running!';
  }
}
