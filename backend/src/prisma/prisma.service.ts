/**
 * Prisma 클라이언트를 관리하는 서비스
 * 데이터베이스 연결 및 종료를 처리
 */

// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * 모듈 초기화 시 데이터베이스 연결을 수행
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * 모듈 종료 시 데이터베이스 연결을 종료
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
