
import { Link } from 'react-router-dom';
import { ArrowLeft, SearchX } from 'lucide-react';

function NotFoundPage() {
  return (
    <main className="not-found-page">

      <div className="not-found-icon">
        <SearchX size={45} />
      </div>

      <span>ERROR 404</span>

      <h1>Page not found</h1>

      <p>
        The page you are looking for doesn't exist
        or may have been moved.
      </p>

      <Link to="/" className="not-found-button">
        <ArrowLeft size={18} />
        Back to Home
      </Link>

    </main>
  );
}

export default NotFoundPage;
