import './AppLayout.css';

import { Outlet } from 'react-router';

import { ErrorTestButton } from '~/components/error-test-button';
import { Flyout } from '~/components/flyout';
import { Header } from '~/components/header';

export const AppLayout = () => (
  <>
    <Header />
    <main className="container">
      <Outlet />
      <ErrorTestButton />
    </main>
    <Flyout />
  </>
);
