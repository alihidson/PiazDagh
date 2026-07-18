import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import LoginPrompt from "./LoginPrompt";
import { useAuth } from "../../hooks/useAuth";

const CommentSection = ({ comments, onAddComment }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container px-4 py-5">
      <h5 className="fw-bold text-mint mb-4 text-start">💬 نظرات کاربران</h5>

      {/* Comment Form */}
      {isAuthenticated ? (
        <CommentForm onSubmit={onAddComment} />
      ) : (
        <LoginPrompt />
      )}

      {/* Comments List */}
      <div>
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-charcoal text-center">هنوز نظری ثبت نشده است.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
