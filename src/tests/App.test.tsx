import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { expect, test } from 'vitest';

test('should have hello!', () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>,
  );
  const message = screen.getByText(/Hello!/i);
  expect(message).toBeDefined();
});
