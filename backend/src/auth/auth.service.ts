/**
 * 인증 서비스
 * 사용자 인증, 토큰 생성, 비밀번호 해싱 등의 인증 관련 비즈니스 로직 처리
 */

import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * 회원가입 처리
   * 새로운 사용자를 생성하고 토큰을 발급
   * @param name 사용자 이름
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   * @returns 생성된 사용자 정보와 액세스 토큰
   * @throws ConflictException 이미 존재하는 이메일인 경우
   */
  async register(name: string, email: string, password: string) {
    try {
      this.logger.log(`회원가입 시도: ${email}`);

      // 이메일 중복 확인
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        this.logger.warn(`중복된 이메일 시도: ${email}`);
        throw new ConflictException('이미 등록된 이메일입니다.');
      }

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 10);

      // 사용자 생성
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      }).catch(error => {
        this.logger.error('사용자 생성 실패:', error);
        throw new InternalServerErrorException('사용자 생성 중 오류가 발생했습니다.');
      });

      // 토큰 생성
      const token = this.jwtService.sign({ 
        sub: user.id,
        email: user.email 
      });

      this.logger.log(`회원가입 성공: ${email}`);

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        access_token: token,
      };
    } catch (error) {
      if (error instanceof ConflictException || error instanceof InternalServerErrorException) {
        throw error;
      }
      this.logger.error('회원가입 처리 중 예상치 못한 오류:', error);
      throw new InternalServerErrorException('회원가입 처리 중 오류가 발생했습니다.');
    }
  }

  /**
   * 로그인 처리
   * 사용자 인증 후 토큰 발급
   * @param email 사용자 이메일
   * @param password 사용자 비밀번호
   * @returns 사용자 정보와 액세스 토큰
   * @throws UnauthorizedException 인증 실패 시
   */
  async login(email: string, password: string) {
    try {
      this.logger.log(`로그인 시도: ${email}`);

      // 사용자 조회
      const user = await this.prisma.user.findUnique({
        where: { email },
      }).catch(error => {
        this.logger.error('사용자 조회 실패:', error);
        throw new InternalServerErrorException('사용자 정보를 조회하는 중 오류가 발생했습니다.');
      });

      if (!user) {
        this.logger.warn(`존재하지 않는 이메일로 로그인 시도: ${email}`);
        throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
      }

      // 비밀번호 검증
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        this.logger.warn(`잘못된 비밀번호로 로그인 시도: ${email}`);
        throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
      }

      // 토큰 생성
      const token = this.jwtService.sign({ 
        sub: user.id,
        email: user.email 
      });

      this.logger.log(`로그인 성공: ${email}`);

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        access_token: token,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof InternalServerErrorException) {
        throw error;
      }
      this.logger.error('로그인 처리 중 예상치 못한 오류:', error);
      throw new InternalServerErrorException('로그인 처리 중 오류가 발생했습니다.');
    }
  }
}
