import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Switch from './Switch';
import ThemeContext from '../../context/ThemeContext';

describe('Switch component', () => {
  const renderWithThemeProvider = (dark: boolean, toggle: () => void) => {
    return render(
      <ThemeContext.Provider value={{ dark, toggle }}>
        <Switch />
      </ThemeContext.Provider>,
    );
  };

  it('calls toggle function when clicked', () => {
    const toggleMock = vi.fn();
    renderWithThemeProvider(false, toggleMock);

    fireEvent.click(screen.getByRole('button'));
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
