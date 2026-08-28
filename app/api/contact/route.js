import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_TOPICS = new Set(["general", "proposal", "partnership", "membership"]);
const ALLOWED_LOCALES = new Set(["uk", "en"]);

function clean(value, max = 5000) {
  return String(value ?? "").replace(/[<>]/g, "").trim().slice(0, max);
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot: bots often fill hidden fields. Return success without processing.
    if (clean(body.website, 200)) {
      return NextResponse.json({ ok: true });
    }

    const payload = {
      name: clean(body.name, 120),
      organization: clean(body.organization, 180),
      email: clean(body.email, 240).toLowerCase(),
      phone: clean(body.phone, 80),
      topic: clean(body.topic, 40),
      message: clean(body.message, 8000),
      consent: body.consent === true,
      locale: clean(body.locale, 8),
    };

    const errors = {};
    if (payload.name.length < 2) errors.name = "invalid_name";
    if (!EMAIL_PATTERN.test(payload.email)) errors.email = "invalid_email";
    if (payload.message.length < 20) errors.message = "message_too_short";
    if (!payload.consent) errors.consent = "consent_required";
    if (!ALLOWED_TOPICS.has(payload.topic)) errors.topic = "invalid_topic";
    if (!ALLOWED_LOCALES.has(payload.locale)) errors.locale = "invalid_locale";

    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // TODO: connect your provider here (Resend, SendGrid, CRM, serverless DB, etc.).
    // Never expose provider secrets through NEXT_PUBLIC_* variables.
    // Example:
    // await resend.emails.send({ from: process.env.CONTACT_FROM, to: process.env.CONTACT_TO, ... });

    console.info("Validated UIIR contact request", {
      topic: payload.topic,
      locale: payload.locale,
      hasOrganization: Boolean(payload.organization),
      hasPhone: Boolean(payload.phone),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body" }, { status: 400 });
  }
}
