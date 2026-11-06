import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';

test('renders portfolio greeting and lazy loaded content', async () => {
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
  const nameElement = screen.getByText(/Mohamed Lamine KONE/i);
  expect(nameElement).toBeInTheDocument();

  // Await lazy-loaded sections to avoid unhandled act() warnings in React 19
  const footerElement = await screen.findByRole('contentinfo', {}, { timeout: 4000 });
  expect(footerElement).toBeInTheDocument();
});
