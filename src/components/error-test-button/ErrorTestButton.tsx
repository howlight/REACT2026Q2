import './ErrorTestButton.css';

import { useState } from 'react';

export const ErrorTestButton = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleTestError = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Test error triggered by user!');
  }

  return (
    <button className="error-test-button" onClick={handleTestError} type="button">
      Test Error Boundary
    </button>
  );
};
