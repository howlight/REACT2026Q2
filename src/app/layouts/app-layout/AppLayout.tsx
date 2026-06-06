import './AppLayout.css';

import { Outlet } from 'react-router';

import { ErrorTestButton } from '~/components/error-test-button';
import { Flyout } from '~/components/flyout';
import { Header } from '~/components/header';
import { RefreshDataButton } from '~/components/refresh-data-button';

export const AppLayout = () => (
  <>
    <Header />
    <main className="container">
      <Outlet />
    </main>
    <RefreshDataButton />
    <ErrorTestButton />
    <Flyout />
  </>
);
