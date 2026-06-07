import './MainPage.css';

import { FormControls } from './components/form-controls';
import { PageIntro } from './components/page-intro';
import { Submissions } from './components/submissions';

export const MainPage = () => (
  <main className="main-page">
    <PageIntro />
    <FormControls />
    <Submissions />
  </main>
);
