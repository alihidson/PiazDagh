const CommentItem = ({ comment }) => {
  const userInitial = comment.user?.name?.charAt(0) || "؟";

  return (
    <div className="mb-3">
      <div className="d-flex gap-2 align-items-start">
        {/* Avatar */}
        <div
          className="rounded-circle bg-plum d-flex align-items-center justify-content-center flex-shrink-0"
          style={{
            width: "36px",
            height: "36px",
            color: "#e6ebe3",
            fontWeight: "bold",
            fontSize: "0.9rem",
          }}
        >
          {userInitial}
        </div>

        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fw-bold text-charcoal small">
              {comment.user?.name}
            </span>
            <span
              className="text-charcoal"
              style={{ opacity: 0.6, fontSize: "0.8rem" }}
            >
              {comment.time}
            </span>
          </div>
          <p className="text-charcoal mb-0 text-start">{comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
