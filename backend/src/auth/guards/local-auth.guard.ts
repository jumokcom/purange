/**
 * 로컬 인증을 처리하는 가드
 * Passport local 전략을 사용하여 사용자 인증을 수행
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {} 