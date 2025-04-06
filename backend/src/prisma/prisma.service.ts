/**
 * Prisma 서비스
 * 데이터베이스 연결 및 ORM 기능을 제공하는 서비스
 */

// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * 모듈 초기화 시 데이터베이스 연결
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * 모듈 종료 시 데이터베이스 연결 해제
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * 데이터베이스 연결 상태 확인
   * @returns 연결 상태 메시지
   */
  async healthCheck() {
    try {
      await this.$queryRaw`SELECT 1`;
      return { status: 'ok', message: '데이터베이스 연결이 정상입니다.' };
    } catch (error) {
      return { status: 'error', message: '데이터베이스 연결에 문제가 있습니다.' };
    }
  }
}
