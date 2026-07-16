import { Link } from 'react-router-dom';

const LoginPrompt = () => {
  return (
    <div className="alert bg-mint-subtle border-0 text-center mb-4">
      <span className="text-charcoal">
        برای ثبت نظر ابتدا{' '}
        <Link to="/auth" className="text-saffron fw-bold">
          وارد حساب کاربری
        </Link>{' '}
        خود شوید.
      </span>
    </div>
  );
};

export default LoginPrompt;