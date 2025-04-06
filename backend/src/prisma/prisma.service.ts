/**
 * Prisma 서비스
 * 데이터베이스 연결 및 ORM 기능을 제공하는 서비스
 */

// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  /**
   * 모듈 초기화 시 데이터베이스 연결
   */
  async onModuleInit() {
    try {
      this.logger.log('데이터베이스 연결 시도 중...');
      await this.$connect();
      this.logger.log('데이터베이스 연결 성공');
    } catch (error) {
      this.logger.error('데이터베이스 연결 실패:', error);
      throw error;
    }
  }

  /**
   * 모듈 종료 시 데이터베이스 연결 해제
   */
  async onModuleDestroy() {
    try {
      this.logger.log('데이터베이스 연결 해제 중...');
      await this.$disconnect();
      this.logger.log('데이터베이스 연결 해제 완료');
    } catch (error) {
      this.logger.error('데이터베이스 연결 해제 실패:', error);
    }
  }

  /**
   * 데이터베이스 연결 상태 확인
   * @returns 연결 상태 메시지
   */
  async healthCheck() {
    try {
      await this.$queryRaw`SELECT 1`;
      this.logger.log('데이터베이스 상태 체크 성공');
      return { status: 'ok', message: '데이터베이스 연결이 정상입니다.' };
    } catch (error) {
      this.logger.error('데이터베이스 상태 체크 실패:', error);
      return { status: 'error', message: '데이터베이스 연결에 문제가 있습니다.' };
    }
  }
}
