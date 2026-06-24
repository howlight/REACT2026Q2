import Link from 'next/link';

import styles from './not-found.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <h1>404</h1>

      <p>Page not found</p>

      <Link href="/">Go Home</Link>
    </div>
  );
}
