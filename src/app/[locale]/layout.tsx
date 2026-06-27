import '~/styles/main.css';

import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { ReactNode } from 'react';

import { ErrorTestButton } from '~/components/error-test-button';
import { Flyout } from '~/components/flyout';
import { Header } from '~/components/header';
import { RefreshDataButton } from '~/components/refresh-data-button';
import { routing } from '~/i18n/routing';

import { Providers } from '../providers';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata = {
  title: 'Rick & Morty',
  description: 'Rick & Morty characters',
  icons: {
    icon: '/favicon.svg',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Header />
            <main className="container">{children}</main>
            <RefreshDataButton />
            <ErrorTestButton />
            <Flyout />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
