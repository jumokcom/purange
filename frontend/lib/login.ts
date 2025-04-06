// src/lib/login.ts (로그인 요청 함수)
interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || '로그인에 실패했습니다.');
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('로그인 중 오류가 발생했습니다.');
  }
}
  