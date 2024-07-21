import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useStoredQuery from './useStoredQuery';

// Mock the localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('useStoredQuery', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));

    const { result } = renderHook(() =>
      useStoredQuery('testKey', 'initialValue'),
    );

    expect(result.current[0]).toBe('storedValue');
  });

  it('should initialize with initialValue if no value in localStorage', () => {
    const { result } = renderHook(() =>
      useStoredQuery('testKey', 'initialValue'),
    );

    expect(result.current[0]).toBe('initialValue');
  });

  it('should set and store the new value in localStorage', () => {
    const { result } = renderHook(() =>
      useStoredQuery('testKey', 'initialValue'),
    );

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });

  it('should handle JSON parse error gracefully', () => {
    localStorage.setItem('testKey', 'invalid JSON');

    const { result } = renderHook(() =>
      useStoredQuery('testKey', 'initialValue'),
    );

    expect(result.current[0]).toBe('initialValue');
  });
});
