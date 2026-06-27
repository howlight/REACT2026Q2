import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import { Link } from '~/i18n/navigation';

import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function AboutPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('About');

  return (
    <div className={styles.aboutPage}>
      <h1>{t('title')}</h1>
      <p>
        {t('author')}:{' '}
        <a href="https://github.com" target="_blank" rel="noreferrer">
          Howlight
        </a>
      </p>
      <a href="https://rs.school" target="_blank" rel="noreferrer">
        {t('course')}
      </a>
      <br />
      <Link href="/">{t('back')}</Link>
    </div>
  );
}
