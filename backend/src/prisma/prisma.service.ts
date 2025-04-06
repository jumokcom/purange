/**
 * Prisma 서비스
 * 데이터베이스 연결 및 ORM 기능을 제공하는 서비스
 */

// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

interface QueryEvent {
  timestamp: Date;
  query: string;
  params: string;
  duration: number;
  target: string;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
  }

  /**
   * 모듈 초기화 시 데이터베이스 연결
   */
  async onModuleInit() {
    this.logger.log('데이터베이스 연결 시도 중...');
    try {
      await this.$connect();
      this.logger.log('데이터베이스 연결 성공');

      // 쿼리 실행 시 로깅
      this.$use(async (params, next) => {
        const startTime = Date.now();
        const result = await next(params);
        const duration = Date.now() - startTime;
        
        this.logger.debug(`Query: ${params.model}.${params.action}`);
        this.logger.debug(`Duration: ${duration}ms`);
        
        return result;
      });
    } catch (error) {
      this.logger.error(`데이터베이스 연결 실패: ${error.message}`);
      throw error;
    }
  }

  /**
   * 모듈 종료 시 데이터베이스 연결 해제
   */
  async onModuleDestroy() {
    this.logger.log('데이터베이스 연결 종료 중...');
    try {
      await this.$disconnect();
      this.logger.log('데이터베이스 연결 종료 완료');
    } catch (error) {
      this.logger.error(`데이터베이스 연결 종료 실패: ${error.message}`);
      throw error;
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
