'use client';

import { useState } from 'react';

import styles from './ErrorTestButton.module.css';

export function ErrorTestButton() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleTestError = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Test error triggered by user!');
  }

  return (
    <button className={styles.errorTestButton} onClick={handleTestError} type="button">
      Test Error Boundary
    </button>
  );
}
