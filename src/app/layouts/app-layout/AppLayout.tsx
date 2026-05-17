import './AppLayout.css';

import { Outlet } from 'react-router';

import { ErrorTestButton } from '~/components/error-test-button';

export const AppLayout = () => (
  <>
    <main className="container">
      <Outlet />
      <ErrorTestButton />
    </main>
  </>
);
