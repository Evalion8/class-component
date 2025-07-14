import React from 'react';
import { Header } from './feature/Header';
import { Main } from './Main';
import { ErrorBoundary } from './feature/ErrorBoundary';

export default class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Header />
        <Main />
      </ErrorBoundary>
    );
  }
}
