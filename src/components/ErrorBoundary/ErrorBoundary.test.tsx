import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders error message when an error is thrown', () => {
    // Suppress error output in the test console
    const originalError = console.error;
    console.error = () => {};

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();

    // Restore the original console.error
    console.error = originalError;
  });
});
