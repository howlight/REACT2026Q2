import './ErrorBoundary.css';

import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        <div className="error-boundary-fallback">
          <div className="error-boundary-content">
            <div className="error-boundary-icon">💥</div>
            <h2 className="error-boundary-title">Something went wrong</h2>
            <p className="error-boundary-message">
              The application encountered an unexpected error.
            </p>
            {error && (
              <details className="error-boundary-details">
                <summary>Technical details</summary>
                <pre className="error-boundary-info">{error.message}</pre>
              </details>
            )}
            <button className="error-boundary-button" onClick={this.handleReset}>
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
