"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ContactForm.module.css";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ defaultTopic = "general" }) {
  const { t, i18n } = useTranslation();
  const initial = useMemo(() => ({ name: "", organization: "", email: "", phone: "", topic: defaultTopic, message: "", consent: false, website: "" }), [defaultTopic]);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = t("contact.errors.name");
    if (!emailPattern.test(form.email.trim())) nextErrors.email = t("contact.errors.email");
    if (form.message.trim().length < 20) nextErrors.message = t("contact.errors.message");
    if (!form.consent) nextErrors.consent = t("contact.errors.consent");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale: i18n.language }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Request failed");
      setStatus("success");
      setForm(initial);
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <div className={styles.twoCol}>
        <Field label={t("contact.fields.name")} error={errors.name} required>
          <input name="name" value={form.name} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.name)} />
        </Field>
        <Field label={t("contact.fields.organization")}>
          <input name="organization" value={form.organization} onChange={update} autoComplete="organization" />
        </Field>
        <Field label={t("contact.fields.email")} error={errors.email} required>
          <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} />
        </Field>
        <Field label={t("contact.fields.phone")}>
          <input name="phone" value={form.phone} onChange={update} autoComplete="tel" />
        </Field>
      </div>
      <Field label={t("contact.fields.topic")}>
        <select name="topic" value={form.topic} onChange={update}>
          {Object.entries(t("contact.topics", { returnObjects: true })).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </Field>
      <Field label={t("contact.fields.message")} error={errors.message} required>
        <textarea name="message" rows="7" value={form.message} onChange={update} aria-invalid={Boolean(errors.message)} />
      </Field>
      <div className={styles.honeypot} aria-hidden="true">
        <label>{t("contact.fields.website")}<input name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={update} /></label>
      </div>
      <label className={styles.consent}>
        <input name="consent" type="checkbox" checked={form.consent} onChange={update} />
        <span>{t("contact.fields.consent")}</span>
      </label>
      {errors.consent && <p className={styles.error}>{errors.consent}</p>}
      <div className={styles.footerRow}>
        <button className={styles.submit} type="submit" disabled={status === "sending"}>
          {status === "sending" ? t("contact.sending") : t("contact.submit")}
          <span aria-hidden="true">→</span>
        </button>
        <div className={styles.status} aria-live="polite">
          {status === "success" && <p className={styles.success}>{t("contact.success")}</p>}
          {status === "error" && <p className={styles.error}>{t("contact.errors.generic")}</p>}
        </div>
      </div>
    </form>
  );
}

function Field({ label, error, required, children }) {
  return (
    <label className={styles.field}>
      <span>{label}{required ? " *" : ""}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  );
}
