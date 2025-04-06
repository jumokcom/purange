/**
 * Prisma 모듈
 * 데이터베이스 연결 및 ORM 기능을 제공하는 모듈
 */

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
