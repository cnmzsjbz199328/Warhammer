import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { message: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { emailOrUsername, password } = req.body;

  // Mock authentication - replace with actual authentication logic
  if (emailOrUsername === 'admin' && password === 'password') {
    const user: User = {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return res.status(200).json(user);
  }

  return res.status(401).json({ message: 'Invalid credentials' });
}