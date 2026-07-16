import { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="d-flex gap-2 align-items-start">
        {/* Placeholder avatar for current user */}
        <div
          className="rounded-circle bg-mint d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: '40px', height: '40px', color: '#e6ebe3', fontWeight: 'bold' }}
        >
          👤
        </div>
        <div className="flex-grow-1">
          <textarea
            className="form-control bg-canvas text-charcoal mb-2"
            rows="3"
            placeholder="نظر خود را بنویسید..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ borderColor: 'rgba(68,69,68,0.15)', resize: 'vertical' }}
          />
          <div className="text-start">
            <button type="submit" className="btn btn-saffron">
              ارسال نظر
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;