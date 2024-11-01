import { useState } from 'react';
import { useRouter } from 'next/router';
import { login, setAuthToken } from '@/utils/authHelper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Form from '@/components/Form';
import { z } from 'zod';

const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Email or username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const user = await login(data.emailOrUsername, data.password);
      setAuthToken('dummy-token'); // Replace with actual token
      router.push('/');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const fields = [
    {
      name: 'emailOrUsername',
      label: 'Email or Username',
      type: 'text',
      placeholder: 'Enter your email or username',
      validation: loginSchema.shape.emailOrUsername,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      validation: loginSchema.shape.password,
    },
  ];

  return (
    <div className="min-h-screen bg-warhammer-50">
      <Header />
      <main className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-warhammer-800 mb-6">Login</h1>
          {error && (
            <div className="mb-4 p-4 rounded-md bg-red-50 text-red-600">
              {error}
            </div>
          )}
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Login"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}