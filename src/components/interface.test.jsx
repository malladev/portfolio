import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Navbar from './Navbar';
import Contact, { buildMailto } from './Contact';
import Projects from './Projects';
import { LanguageProvider } from '../contexts/LanguageContext';

const withLanguage = (ui) => render(<LanguageProvider>{ui}</LanguageProvider>);

beforeEach(() => {
  localStorage.clear();
});

describe('page structure', () => {
  test('has one h1, and keeps navigation and footer outside main', async () => {
    const { container } = withLanguage(<App />);
    await screen.findByRole('contentinfo', {}, { timeout: 4000 });
    await waitFor(() => expect(container.querySelector('#contact')).toBeInTheDocument(), { timeout: 4000 });

    expect(container.querySelectorAll('h1')).toHaveLength(1);
    const main = screen.getByRole('main');
    expect(main).not.toContainElement(screen.getByRole('navigation'));
    expect(main).not.toContainElement(screen.getByRole('contentinfo'));
  });

  test('has no leftover section on performance and security', async () => {
    const { container } = withLanguage(<App />);
    await waitFor(() => expect(container.querySelector('#contact')).toBeInTheDocument(), { timeout: 4000 });

    expect(screen.queryByRole('heading', { name: /Performance & /i })).not.toBeInTheDocument();
  });
});

describe('mobile menu', () => {
  test('opens from a real button, moves focus in, and Escape returns it', async () => {
    const user = userEvent.setup();
    withLanguage(<Navbar />);

    const openButton = screen.getByRole('button', { name: 'Ouvrir le menu' });
    openButton.focus();
    await user.keyboard('{Enter}');

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toContainElement(document.activeElement);
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    expect(openButton).toHaveFocus();
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe('');
  });

  test('keeps Tab inside the dialog', async () => {
    const user = userEvent.setup();
    withLanguage(<Navbar />);

    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }));
    const dialog = await screen.findByRole('dialog');
    await user.tab({ shift: true });
    expect(dialog).toContainElement(document.activeElement);
    await user.tab();
    expect(dialog).toContainElement(document.activeElement);
  });
});

describe('contact form', () => {
  test('shows inline errors and focuses the first invalid field', async () => {
    const user = userEvent.setup();
    withLanguage(<Contact />);

    await user.click(screen.getByRole('button', { name: 'Continuer dans ma messagerie' }));

    const name = screen.getByRole('textbox', { name: /Nom/ });
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription('Ce champ est obligatoire.');
  });

  test('rejects a malformed email as soon as the field is left', async () => {
    const user = userEvent.setup();
    withLanguage(<Contact />);

    await user.type(screen.getByRole('textbox', { name: /Email/ }), 'nope');
    await user.tab();

    expect(screen.getByText(/adresse e-mail valide/)).toBeInTheDocument();
  });

  test('prepares the whole message for the mail app', () => {
    const url = buildMailto(
      { name: 'Awa', email: 'awa@test.ml', subject: '', message: 'Bonjour & merci' },
      'Message de'
    );

    expect(url).toContain('subject=Message%20de%20Awa');
    expect(decodeURIComponent(url)).toContain('Bonjour & merci\n\nAwa\nawa@test.ml');
  });
});

describe('projects', () => {
  test('expose a named link for each project', () => {
    withLanguage(<Projects />);

    expect(screen.getByRole('link', { name: 'Ouvrir le projet EVIMO (nouvel onglet)' })).toHaveAttribute(
      'href',
      'https://apkpure.com/p/com.malladev.evimomobile'
    );
    expect(screen.getAllByRole('link', { name: /Ouvrir le projet/ })).toHaveLength(3);
  });
});
