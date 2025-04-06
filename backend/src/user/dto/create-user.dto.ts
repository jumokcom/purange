/**
 * 사용자 생성 시 필요한 데이터 전송 객체(DTO)
 */
export class CreateUserDto {
  /**
   * 사용자 이메일
   * @example "user@example.com"
   */
  email: string;

  /**
   * 사용자 비밀번호
   * 최소 6자 이상이어야 함
   * @example "password123"
   */
  password: string;

  /**
   * 사용자 이름
   * @example "홍길동"
   */
  name: string;
} 