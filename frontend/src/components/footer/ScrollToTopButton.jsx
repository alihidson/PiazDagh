const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="btn btn-mint rounded-circle d-flex align-items-center justify-content-center shadow"
      style={{
        width: '44px',
        height: '44px',
        fontSize: '1.2rem',
      }}
      aria-label="بازگشت به بالا"
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;