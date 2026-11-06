import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Navbar from './Navbar';
import Contact from './Contact';
import Projects from './Projects';
import Recent from './Recent';
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
  const send = () => screen.getByRole('button', { name: 'Envoyer le message' });
  const subject = () => screen.getByRole('combobox', { name: /Sujet/ });

  const fillForm = async (user) => {
    await user.type(screen.getByRole('textbox', { name: /Nom/ }), 'Awa');
    await user.type(screen.getByRole('textbox', { name: /Email/ }), 'awa@test.ml');
    await user.selectOptions(subject(), 'mobile');
    await user.type(screen.getByRole('textbox', { name: /Message/ }), 'Bonjour');
  };

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  test('offers five subjects plus "Autre"', () => {
    withLanguage(<Contact />);

    const options = within(subject()).getAllByRole('option').filter((option) => !option.disabled);
    expect(options).toHaveLength(6);
    expect(options[5]).toHaveTextContent('Autre');
  });

  test('asks for a free text subject only with "Autre"', async () => {
    const user = userEvent.setup();
    withLanguage(<Contact />);
    expect(screen.queryByRole('textbox', { name: /Précisez/ })).not.toBeInTheDocument();

    await user.selectOptions(subject(), 'other');
    await user.click(send());

    expect(await screen.findByRole('textbox', { name: /Précisez/ })).toHaveAttribute('aria-invalid', 'true');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('shows inline errors and focuses the first invalid field', async () => {
    const user = userEvent.setup();
    withLanguage(<Contact />);

    await user.click(send());

    const name = screen.getByRole('textbox', { name: /Nom/ });
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription('Ce champ est obligatoire.');
    expect(subject()).toHaveAttribute('aria-invalid', 'true');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('rejects a malformed email as soon as the field is left', async () => {
    const user = userEvent.setup();
    withLanguage(<Contact />);

    await user.type(screen.getByRole('textbox', { name: /Email/ }), 'nope');
    await user.tab();

    expect(screen.getByText(/adresse e-mail valide/)).toBeInTheDocument();
  });

  test('posts to the server, confirms, and clears the form', async () => {
    const user = userEvent.setup();
    withLanguage(<Contact />);

    await fillForm(user);
    await user.click(send());

    expect(await screen.findByText(/Message envoyé/)).toBeInTheDocument();
    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe('/api/contact');
    expect(JSON.parse(options.body)).toMatchObject({ name: 'Awa', subject: 'mobile', company: '' });
    expect(screen.getByRole('textbox', { name: /Message/ })).toHaveValue('');
  });

  test('keeps the message and offers a way out when sending fails', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 502 });
    const user = userEvent.setup();
    withLanguage(<Contact />);

    await fillForm(user);
    await user.click(send());

    expect(await screen.findByRole('alert')).toHaveTextContent(/L'envoi a échoué/);
    expect(screen.getByRole('textbox', { name: /Message/ })).toHaveValue('Bonjour');
  });
});

describe('projects', () => {
  test('expose a named link for each project', () => {
    withLanguage(<Projects />);

    expect(screen.getByRole('link', { name: 'Ouvrir le projet EVIMO (nouvel onglet)' })).toHaveAttribute(
      'href',
      'https://apkpure.com/p/com.malladev.evimomobile'
    );
    expect(screen.getAllByRole('link', { name: /Ouvrir le projet/ })).toHaveLength(5);
    expect(screen.getByRole('link', { name: /La Claire Fontaine/ })).toHaveAttribute(
      'href',
      'https://www.claire-fontaine.org/'
    );
  });

  test('flag the two recent projects as still in development', () => {
    withLanguage(<Recent />);

    expect(screen.getByRole('link', { name: /BKO Gosp·N Grill/ })).toHaveAttribute(
      'href',
      'https://bko-gosp-grill.vercel.app/'
    );
    expect(screen.getByRole('link', { name: /MILLE EMOTIONS/ })).toHaveAttribute(
      'href',
      'https://mille-emotions.vercel.app/'
    );
    expect(screen.getAllByText('En développement')).toHaveLength(2);
  });
});
