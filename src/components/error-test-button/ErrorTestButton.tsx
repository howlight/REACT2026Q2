import './ErrorTestButton.css';

import { Component } from 'react';

type State = {
  shouldThrowError: boolean;
};

export class ErrorTestButton extends Component<Record<string, never>, State> {
  state = {
    shouldThrowError: false,
  };

  handleTestError = (): void => {
    this.setState({ shouldThrowError: true });
  };

  render() {
    const { shouldThrowError } = this.state;

    if (shouldThrowError) {
      throw new Error('Test error triggered by user!');
    }

    return (
      <button className="error-test-button" onClick={this.handleTestError} type="button">
        Test Error Boundary
      </button>
    );
  }
}
