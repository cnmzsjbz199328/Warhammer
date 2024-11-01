import { useRouter } from 'next/router';
import { Post, Comment as CommentType, User } from '@/types';
import { api } from '@/utils/apiHelper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Comment from '@/components/Comment';

interface PostPageProps {
  post: Post;
  comments: CommentType[];
  authors: Record<number, User>;
}

export default function PostPage({ post, comments, authors }: PostPageProps) {
  return (
    <div className="min-h-screen bg-warhammer-50">
      <Header />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-warhammer-800 mb-4">{post.title}</h1>
          <p className="text-sm text-warhammer-500 mb-6">
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div className="prose prose-warhammer max-w-none">
            {post.content}
          </div>
        </article>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-warhammer-800">Comments</h2>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              author={authors[comment.authorId]}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
  try {
    const [post, comments, authors] = await Promise.all([
      api.get<Post>(`/api/posts/${params.id}`),
      api.get<CommentType[]>(`/api/posts/${params.id}/comments`),
      api.get<Record<number, User>>(`/api/posts/${params.id}/authors`),
    ]);

    return {
      props: {
        post,
        comments,
        authors,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}