import { Comment as CommentType, User } from '@/types';

interface CommentProps {
  comment: CommentType;
  author: User;
}

export default function Comment({ comment, author }: CommentProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center space-x-2">
        {author.avatarUrl && (
          <img
            src={author.avatarUrl}
            alt={author.username}
            className="h-8 w-8 rounded-full"
          />
        )}
        <span className="font-medium text-warhammer-800">{author.username}</span>
        <span className="text-sm text-warhammer-500">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-warhammer-700">{comment.content}</p>
    </div>
  );
}