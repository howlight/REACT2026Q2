import { useTranslations } from 'next-intl';

import { Link } from '~/i18n/navigation';

import styles from './not-found.module.css';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className={styles.notFoundPage}>
      <h1>404</h1>
      <p>{t('description')}</p>
      <Link href="/">{t('goHome')}</Link>
    </div>
  );
}
