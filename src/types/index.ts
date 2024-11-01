export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  category: string;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: number;
  postId: number;
  authorId: number;
  content: string;
  parentCommentId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}