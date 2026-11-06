import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, ChevronDownIcon, ClipboardIcon } from "@heroicons/react/20/solid";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { cn } from "../utils/cn.ts";
import { reveal, spring } from "../utils/motion.ts";
import { SectionLabel } from "./ui/SectionLabel.jsx";

const CONTACT_EMAIL = "konelamine1122@gmail.com";
const SEND_TIMEOUT_MS = 15000;

const socials = [
  { name: "LinkedIn", Icon: IconBrandLinkedin, url: "https://www.linkedin.com/in/mohamed-lamine-kon%C3%A9-b51999193/" },
  { name: "GitHub", Icon: IconBrandGithub, url: "https://github.com/malladev" },
];

// Same keys as netlify/functions/contact.mjs. "other" opens a free text field.
const subjectKeys = ["web", "mobile", "design", "backend", "site", "other"];

const emptyForm = { name: "", email: "", subject: "", subjectOther: "", message: "" };

const requiredFields = (data) => [
  "name",
  "email",
  "subject",
  ...(data.subject === "other" ? ["subjectOther"] : []),
  "message",
];

const fieldClass = (hasError) =>
  cn(
    "w-full border-b bg-transparent py-3 text-lg outline-none transition-colors duration-200 placeholder:text-paper-muted/80 focus:border-saffron",
    hasError ? "border-red-400" : "border-paper/25"
  );

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);
  const honeypotRef = useRef(null);

  const validate = (name, value, data = formData) => {
    if (requiredFields(data).includes(name) && !value.trim()) return t('contact.form.errors.required');
    if (name === "email" && value.trim() && !/^\S+@\S+\.\S+$/.test(value.trim())) {
      return t('contact.form.errors.email');
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== "sending") setStatus("idle");
    // Clear an error as soon as it is fixed, without nagging while typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const fields = requiredFields(formData);
    const nextErrors = Object.fromEntries(fields.map((name) => [name, validate(name, formData[name])]));
    setErrors(nextErrors);

    const firstInvalid = fields.find((name) => nextErrors[name]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, company: honeypotRef.current?.value ?? "" }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`contact: ${response.status}`);

      setFormData(emptyForm);
      setStatus("sent");
    } catch {
      // What was typed stays in the form, so nothing is lost and a retry costs one click
      setStatus("failed");
    } finally {
      clearTimeout(timeout);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard?.writeText(CONTACT_EMAIL);
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  const errorProps = (name) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const fieldProps = (name, placeholderKey = `${name}Placeholder`) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
    placeholder: t(`contact.form.${placeholderKey}`),
    className: fieldClass(Boolean(errors[name])),
    ...errorProps(name),
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
      {requiredFields({ subject: "other" }).includes(name) && (
        <span aria-hidden="true">{t('contact.form.required')}</span>
      )}
    </label>
  );

  const isSending = status === "sending";

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
        <motion.form {...reveal(1)} onSubmit={handleSubmit} noValidate className="relative space-y-7">
          {/* Honeypot: invisible to people and skipped by the keyboard, filled by bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-0">
            <label>
              Company
              <input ref={honeypotRef} type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              {fieldLabel("name")}
              <input type="text" required maxLength={120} autoComplete="name" {...fieldProps("name")} />
              {fieldError("name")}
            </div>
            <div>
              {fieldLabel("email")}
              <input type="email" required maxLength={254} autoComplete="email" {...fieldProps("email")} />
              {fieldError("email")}
            </div>
          </div>

          <div>
            {fieldLabel("subject")}
            <div className="relative">
              <select
                required
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(
                  fieldClass(Boolean(errors.subject)),
                  "cursor-pointer appearance-none pr-8",
                  !formData.subject && "text-paper-muted/80"
                )}
                {...errorProps("subject")}
              >
                <option value="" disabled className="bg-ink-raised text-paper-muted">
                  {t('contact.form.subjectPlaceholder')}
                </option>
                {subjectKeys.map((key) => (
                  <option key={key} value={key} className="bg-ink-raised text-paper">
                    {t(`contact.form.subjects.${key}`)}
                  </option>
                ))}
              </select>
              <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 text-paper-muted" />
            </div>
            {fieldError("subject")}

            <AnimatePresence initial={false}>
              {formData.subject === "other" && (
                <motion.div
                  key="subject-other"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={spring}
                  className="mt-7"
                >
                  {fieldLabel("subjectOther")}
                  <input type="text" required maxLength={120} {...fieldProps("subjectOther")} />
                  {fieldError("subjectOther")}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            {fieldLabel("message")}
            <textarea
              required
              rows={5}
              maxLength={5000}
              {...fieldProps("message")}
              className={cn(fieldClass(Boolean(errors.message)), "resize-none")}
            />
            {fieldError("message")}
          </div>

          <p role="status" className="flex items-center gap-2 text-sm leading-relaxed text-saffron empty:hidden">
            {status === "sent" && (
              <>
                <CheckIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {t('contact.form.sent')}
              </>
            )}
          </p>
          <p role="alert" className="text-sm leading-relaxed text-red-300 empty:hidden">
            {status === "failed" && (
              <>
                {t('contact.form.failed')}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-paper underline underline-offset-4">
                  {CONTACT_EMAIL}
                </a>
              </>
            )}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs text-paper-muted">{t('contact.form.requiredHint')}</p>
            <button
              type="submit"
              disabled={isSending}
              aria-busy={isSending}
              className="pressable flex min-h-12 items-center gap-2 rounded-full bg-saffron px-7 font-semibold text-ink hover:bg-paper disabled:cursor-wait disabled:opacity-70"
            >
              {isSending && (
                <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
              )}
              {t(isSending ? 'contact.form.sending' : 'contact.form.send')}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
