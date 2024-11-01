import { Post } from '@/types';
import Link from 'next/link';
import styles from '@/styles/PostCard.module.css';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`/post/${post.id}`}>
        <div className={styles.content}>
          <h3 className={styles.title}>
            {post.title}
          </h3>
          <p className={styles.meta}>
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div className={styles.excerpt}>
            {post.content}
          </div>
        </div>
      </Link>
    </article>
  );
}