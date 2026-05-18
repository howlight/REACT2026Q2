import './NotFoundPage.css';

import { Link } from 'react-router';

export const NotFoundPage = () => (
  <div className="not-found-page">
    <h1>404</h1>

    <p>Page not found</p>

    <Link to="/">Go Home</Link>
  </div>
);
