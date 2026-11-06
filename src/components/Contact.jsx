import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/20/solid";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { cn } from "../utils/cn.ts";
import { reveal, spring } from "../utils/motion.ts";
import { SectionLabel } from "./ui/SectionLabel.jsx";

const CONTACT_EMAIL = "konelamine1122@gmail.com";

const socials = [
  { name: "LinkedIn", Icon: IconBrandLinkedin, url: "https://www.linkedin.com/in/mohamed-lamine-kon%C3%A9-b51999193/" },
  { name: "GitHub", Icon: IconBrandGithub, url: "https://github.com/malladev" },
];

const requiredFields = ["name", "email", "message"];

const fieldClass = (hasError) =>
  cn(
    "w-full border-b bg-transparent py-3 text-lg outline-none transition-colors duration-200 placeholder:text-paper-muted/80 focus:border-saffron",
    hasError ? "border-red-400" : "border-paper/25"
  );

// There is no backend yet: the message is handed to the visitor's own mail app, already written.
export const buildMailto = (data, intro) => {
  const subject = data.subject.trim() || `${intro} ${data.name.trim()}`;
  const body = `${data.message.trim()}\n\n${data.name.trim()}\n${data.email.trim()}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  const validate = (name, value) => {
    if (requiredFields.includes(name) && !value.trim()) return t('contact.form.errors.required');
    if (name === "email" && value.trim() && !/^\S+@\S+\.\S+$/.test(value.trim())) {
      return t('contact.form.errors.email');
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setOpened(false);
    // Clear an error as soon as it is fixed, without nagging while typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = Object.fromEntries(requiredFields.map((name) => [name, validate(name, formData[name])]));
    setErrors(nextErrors);

    const firstInvalid = requiredFields.find((name) => nextErrors[name]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    window.location.href = buildMailto(formData, t('contact.form.mailBody'));
    setOpened(true);
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(CONTACT_EMAIL);
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
    placeholder: t(`contact.form.${name}Placeholder`),
    className: fieldClass(Boolean(errors[name])),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const fieldError = (name) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-2 text-sm text-red-300">
        {errors[name]}
      </p>
    ) : null;

  const fieldLabel = (name) => (
    <label htmlFor={name} className="block font-mono text-sm text-paper-muted">
      {t(`contact.form.${name}`)}{" "}
      {requiredFields.includes(name) && <span aria-hidden="true">{t('contact.form.required')}</span>}
    </label>
  );

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 lg:py-32" aria-label={t('contact.ariaLabel')}>
      <div className="mx-auto grid max-w-7xl gap-16 border-t border-paper/10 pt-8 lg:grid-cols-2">
        <div>
          <SectionLabel index="06">{t('contact.label')}</SectionLabel>
          <motion.h2 {...reveal()} className="text-section mt-6">
            {t('contact.title')}{" "}
            <span className="font-serif font-normal italic tracking-[-0.02em] text-saffron">{t('contact.titleAccent')}</span>
          </motion.h2>
          <motion.p {...reveal(1)} className="mt-6 max-w-md text-lg leading-relaxed text-paper-muted">
            {t('contact.subtitle')}
          </motion.p>

          <motion.div {...reveal(2)} className="mt-8 flex flex-wrap items-center gap-2">
            <a href={`mailto:${CONTACT_EMAIL}`} className="pressable flex min-h-11 items-center break-all pr-1 font-medium underline decoration-saffron underline-offset-4">
              {CONTACT_EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={t(copied ? 'contact.copied' : 'contact.copy')}
              title={t(copied ? 'contact.copied' : 'contact.copy')}
              className="pressable flex h-11 w-11 items-center justify-center rounded-full border border-paper/20 hover:border-paper"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={copied ? "done" : "copy"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={spring}
                >
                  {copied ? <CheckIcon className="h-5 w-5 text-saffron" /> : <ClipboardIcon className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>

          <motion.ul {...reveal(3)} className="mt-4 flex gap-2">
            {socials.map(({ name, Icon, url }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable flex min-h-11 items-center gap-2 rounded-full border border-paper/20 px-4 hover:border-paper"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {name}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* noValidate: errors are shown inline, next to their field and translated */}
        <motion.form {...reveal(1)} onSubmit={handleSubmit} noValidate className="space-y-7">
          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              {fieldLabel("name")}
              <input type="text" required autoComplete="name" {...fieldProps("name")} />
              {fieldError("name")}
            </div>
            <div>
              {fieldLabel("email")}
              <input type="email" required autoComplete="email" {...fieldProps("email")} />
              {fieldError("email")}
            </div>
          </div>
          <div>
            {fieldLabel("subject")}
            <input type="text" {...fieldProps("subject")} />
          </div>
          <div>
            {fieldLabel("message")}
            <textarea required rows={5} {...fieldProps("message")} className={cn(fieldClass(Boolean(errors.message)), "resize-none")} />
            {fieldError("message")}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs text-paper-muted">{t('contact.form.requiredHint')}</p>
            <button
              type="submit"
              className="pressable min-h-12 rounded-full bg-saffron px-7 font-semibold text-ink hover:bg-paper"
            >
              {t('contact.form.send')}
            </button>
          </div>
          <p role="status" className="text-sm leading-relaxed text-paper-muted empty:hidden">
            {opened && (
              <>
                {t('contact.form.sent')}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-saffron underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>
              </>
            )}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
