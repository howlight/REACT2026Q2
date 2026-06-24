import '~/styles/main.css';

import { ErrorTestButton } from '~/components/error-test-button';
import { Flyout } from '~/components/flyout';
import { Header } from '~/components/header';
import { RefreshDataButton } from '~/components/refresh-data-button';

import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rick & Morty</title>
        <meta name="description" content="Rick & Morty characters" />
      </head>
      <body>
        <Providers>
          <Header />
          <main className="container">{children}</main>
          <RefreshDataButton />
          <ErrorTestButton />
          <Flyout />
        </Providers>
      </body>
    </html>
  );
}
