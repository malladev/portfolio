import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from './LanguageContext';

const TestComponent = () => {
  const { language, toggleLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <span data-testid="translated">{t('hero.greeting')}</span>
      <span data-testid="fallback">{t('non.existent.key')}</span>
      <button onClick={toggleLanguage}>Toggle</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
  });

  test('provides default language fr and translates correctly', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('fr');
    expect(screen.getByTestId('translated')).toHaveTextContent('Salut, je suis');
    expect(screen.getByTestId('fallback')).toHaveTextContent('non.existent.key');
    expect(document.documentElement.lang).toBe('fr');
  });

  test('toggles language to en and updates document.documentElement.lang', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    await user.click(screen.getByRole('button', { name: /toggle/i }));

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    expect(screen.getByTestId('translated')).toHaveTextContent("Hi, I'm");
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('portfolio-language')).toBe('en');
  });

  test('throws error when useLanguage is used outside LanguageProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow(
      'useLanguage must be used within a LanguageProvider'
    );
    spy.mockRestore();
  });
});
