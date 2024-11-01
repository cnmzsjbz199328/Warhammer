import { useState } from 'react';
import { Post } from '@/types';
import { api } from '@/utils/apiHelper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Form from '@/components/Form';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
});

export default function Admin() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      await api.post('/api/posts', data);
      setMessage('Post created successfully!');
    } catch (error) {
      setMessage('Failed to create post. Please try again.');
    }
  };

  const fields = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Enter post title',
      validation: postSchema.shape.title,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'text',
      placeholder: 'Select category',
      validation: postSchema.shape.category,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      placeholder: 'Write your post content',
      validation: postSchema.shape.content,
    },
  ];

  return (
    <div className="min-h-screen bg-warhammer-50">
      <Header />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-warhammer-800 mb-8">Admin Dashboard</h1>
        {message && (
          <div className="mb-4 p-4 rounded-md bg-warhammer-100 text-warhammer-800">
            {message}
          </div>
        )}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-warhammer-800 mb-4">Create New Post</h2>
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            submitLabel="Create Post"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}