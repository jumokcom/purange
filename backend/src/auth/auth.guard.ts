/**
 * JWT 인증 가드
 * 보호된 라우트에 대한 JWT 토큰 기반 인증을 처리
 */

// src/auth/auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
