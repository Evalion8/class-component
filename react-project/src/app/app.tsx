import { ErrorBoundary } from '../shared/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <h1>Hello</h1>
      </div>
    </ErrorBoundary>
  );
}
