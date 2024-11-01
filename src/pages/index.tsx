import { Post } from '@/types';
import { api } from '@/utils/apiHelper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import styles from '@/styles/index.module.css';

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts = [] }: HomeProps) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <Sidebar />
          <div className={styles.postsContainer}>
            <h1 className={styles.pageTitle}>Latest Posts</h1>
            <div className={styles.postsGrid}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const posts = await api.get<Post[]>('/api/posts');
    return { props: { posts } };
  } catch (error) {
    return { props: { posts: [] } };
  }
}