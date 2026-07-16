import { useState } from 'react';

const CommentItem = ({ comment, isReply = false }) => {
  const [liked, setLiked] = useState(comment.liked || false);
  const [likesCount, setLikesCount] = useState(comment.likes);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const userInitial = comment.user?.name?.charAt(0) || '؟';

  return (
    <div className={`${isReply ? 'me-4 mt-2' : 'mb-3'}`}>
      <div className="d-flex gap-2 align-items-start">
        {/* Avatar */}
        <div
          className="rounded-circle bg-plum d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: '36px', height: '36px', color: '#e6ebe3', fontWeight: 'bold', fontSize: '0.9rem' }}
        >
          {userInitial}
        </div>

        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fw-bold text-charcoal small">{comment.user?.name}</span>
            <span className="text-charcoal" style={{ opacity: 0.6, fontSize: '0.8rem' }}>
              {comment.time}
            </span>
          </div>
          <p className="text-charcoal mb-1 text-start">{comment.text}</p>

          {/* Actions */}
          <div className="d-flex gap-3 small">
            <button
              onClick={handleLike}
              className={`btn btn-link p-0 text-decoration-none ${liked ? 'text-saffron' : 'text-charcoal'}`}
              style={{ opacity: 0.7, fontSize: '0.8rem' }}
            >
              ❤️ {likesCount > 0 ? likesCount : ''} {liked ? 'پسندیده‌شده' : 'پسندیدن'}
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="btn btn-link p-0 text-decoration-none text-charcoal"
              style={{ opacity: 0.7, fontSize: '0.8rem' }}
            >
              ↩️ پاسخ
            </button>
          </div>

          {/* Reply Form (simplified – inline) */}
          {showReplyForm && (
            <div className="mt-2">
              <textarea
                className="form-control form-control-sm bg-canvas text-charcoal mb-1"
                rows="2"
                placeholder="پاسخ خود را بنویسید..."
                style={{ borderColor: 'rgba(68,69,68,0.15)', resize: 'none' }}
              />
              <div className="text-start">
                <button className="btn btn-sm btn-saffron">ارسال پاسخ</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {comment.replies?.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;