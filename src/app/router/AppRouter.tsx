import { Route, Routes } from 'react-router';

import { AppLayout } from '~/app/layouts/app-layout';
import { DetailsPanel } from '~/components/details-panel';
import { AboutPage } from '~/pages/about/';
import { MainPage } from '~/pages/main/';
import { NotFoundPage } from '~/pages/not-found/';

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route path="/" element={<MainPage />}>
        <Route path="details/:characterId" element={<DetailsPanel />} />
      </Route>
      <Route path="about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
