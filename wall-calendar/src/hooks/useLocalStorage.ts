'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Type-safe hook for persisting state in localStorage.
 * Delays the initial read until after mount to avoid SSR hydration mismatches.
 *
 * @param key          - The localStorage key
 * @param initialValue - Fallback value used on first render / if key not found
 * @returns [value, setValue, isMounted]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [mounted, setMounted]         = useState(false);

  // Read from localStorage after mount (safe from SSR)
  useEffect(() => {
    setMounted(true);
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to read key "${key}":`, err);
    }
  }, [key]);

  // Write to localStorage on every change (after mount only)
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const next = value instanceof Function ? value(prev) : value;
          if (mounted) {
            window.localStorage.setItem(key, JSON.stringify(next));
          }
          return next;
        });
      } catch (err) {
        console.warn(`[useLocalStorage] Failed to write key "${key}":`, err);
      }
    },
    [key, mounted]
  );

  return [storedValue, setValue, mounted];
}