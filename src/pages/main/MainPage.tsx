import './MainPage.css';

import { useState } from 'react';

import { Modal } from '~/components/modal';
import { ReactHookForm } from '~/components/react-hook-form';
import { UncontrolledForm } from '~/components/uncontrolled-form';

import { FormControls } from './components/form-controls';
import { PageIntro } from './components/page-intro';
import { Submissions } from './components/submissions';

export const MainPage = () => {
  const [activeForm, setActiveForm] = useState<'uncontrolled' | 'rhf' | null>(null);

  const handleOpenForm = (type: 'uncontrolled' | 'rhf') => {
    setActiveForm(type);
  };

  const handleCloseModal = () => {
    setActiveForm(null);
  };

  const renderFormContent = () => {
    switch (activeForm) {
      case 'uncontrolled':
        return <UncontrolledForm onClose={handleCloseModal} />;
      case 'rhf':
        return <ReactHookForm onClose={handleCloseModal} />;
      default:
        return null;
    }
  };

  const modalTitle = activeForm === 'uncontrolled' ? 'Uncontrolled Form' : 'React Hook Form';

  return (
    <main className="main-page">
      <PageIntro />

      <FormControls onOpenForm={handleOpenForm} />

      <Submissions />

      <Modal isOpen={activeForm !== null} onClose={handleCloseModal} title={modalTitle}>
        {renderFormContent()}
      </Modal>
    </main>
  );
};
