import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import ThemeContext, { ThemeProvider } from './ThemeContext';

describe('ThemeProvider', () => {
  const TestComponent = () => {
    const { dark, toggle } = React.useContext(ThemeContext);
    return (
      <div>
        <span data-testid="theme">{dark ? 'dark' : 'light'}</span>
        <button onClick={toggle}>Toggle Theme</button>
      </div>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('provides the default theme value', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('toggles the theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('applies the correct theme to the document', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(document.documentElement.style.cssText).toContain(
      '--background: white',
    );
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(document.documentElement.style.cssText).toContain(
      '--background: #2D2D2D',
    );
  });

  it('persists theme selection in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(localStorage.getItem('darkTheme')).toBe('true');
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(localStorage.getItem('darkTheme')).toBe('false');
  });

  it('initializes with theme from localStorage', () => {
    localStorage.setItem('darkTheme', 'true');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });
});
