import { cn } from './cn';

describe('cn utility', () => {
  test('merges simple classes', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
  });

  test('resolves conflicting tailwind classes with twMerge', () => {
    expect(cn('px-2 text-red-500', 'px-4 text-blue-500')).toBe('px-4 text-blue-500');
  });

  test('handles conditional classes and falsy values', () => {
    expect(cn('base', false && 'hidden', null, undefined, 0 && 'zero', 'extra')).toBe('base extra');
  });

  test('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('', null, undefined)).toBe('');
  });

  test('handles arrays and objects', () => {
    expect(cn(['flex', 'items-center'], { 'bg-red-500': true, 'bg-blue-500': false })).toBe('flex items-center bg-red-500');
  });
});
