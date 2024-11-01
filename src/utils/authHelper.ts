import { User } from '@/types';

export async function login(emailOrUsername: string, password: string): Promise<User> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailOrUsername, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

export function getAuthToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
}

export function setAuthToken(token: string): void {
  localStorage.setItem('authToken', token);
}

export function removeAuthToken(): void {
  localStorage.removeItem('authToken');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}