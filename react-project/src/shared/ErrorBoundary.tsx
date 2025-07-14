import React from 'react';

export class ErrorBoundary extends React.Component<{ hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('Caught in error boundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Try refreshing the page.</h2>;
    }
    return this.props.children;
  }
}
