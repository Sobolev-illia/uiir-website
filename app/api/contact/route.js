import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_TOPICS = new Set(["general", "proposal", "partnership", "membership"]);

const ALLOWED_LOCALES = new Set(["uk", "en"]);

const TOPIC_LABELS = {
    general: {
        uk: "Загальне звернення",
        en: "General enquiry",
    },

    proposal: {
        uk: "Пропозиція",
        en: "Proposal",
    },

    partnership: {
        uk: "Партнерство",
        en: "Partnership",
    },

    membership: {
        uk: "Членство в УМІВ",
        en: "UIIR membership",
    },
};

function clean(value, max = 5000) {
    return String(value ?? "")
        .trim()
        .slice(0, max);
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function htmlText(value) {
    return escapeHtml(value).replace(/\n/g, "<br>");
}

function getTransporter() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
        throw new Error("SMTP configuration is incomplete");
    }

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),

        // Port 465 uses implicit TLS.
        secure: Number(SMTP_PORT) === 465,

        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD,
        },
    });
}

function buildHtmlEmail(payload) {
    const locale = payload.locale === "en" ? "en" : "uk";

    const topic = TOPIC_LABELS[payload.topic]?.[locale] || payload.topic;

    const submittedAt = new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-GB", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Europe/Kyiv",
    }).format(new Date());

    const valueOrDash = (value) => (value ? htmlText(value) : `<span style="color:#8a8a8a;">—</span>`);

    return `
<!doctype html>
<html lang="${locale}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>UIIR Contact Form</title>
</head>

<body
    style="
        margin:0;
        padding:0;
        background:#f3f3ef;
        font-family:Arial,Helvetica,sans-serif;
        color:#151515;
    "
>
    <table
        role="presentation"
        width="100%"
        cellspacing="0"
        cellpadding="0"
        border="0"
        style="background:#f3f3ef;"
    >
        <tr>
            <td
                align="center"
                style="padding:40px 16px;"
            >

                <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="
                        width:100%;
                        max-width:720px;
                        background:#ffffff;
                        border:1px solid #ddddda;
                    "
                >

                    <!-- Header -->
                    <tr>
                        <td
                            style="
                                padding:28px 32px;
                                background:#171717;
                                color:#ffffff;
                            "
                        >
                            <div
                                style="
                                    margin-bottom:10px;
                                    font-size:11px;
                                    line-height:1.4;
                                    letter-spacing:1.5px;
                                    text-transform:uppercase;
                                    color:#b7d632;
                                "
                            >
                                UIIR · Website
                            </div>

                            <div
                                style="
                                    font-size:27px;
                                    line-height:1.15;
                                    font-weight:600;
                                "
                            >
                                ${locale === "uk" ? "Нове звернення з сайту" : "New website enquiry"}
                            </div>
                        </td>
                    </tr>

                    <!-- Meta -->
                    <tr>
                        <td
                            style="
                                padding:20px 32px;
                                border-bottom:1px solid #e5e5e1;
                            "
                        >
                            <table
                                role="presentation"
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                            >
                                <tr>
                                    <td
                                        style="
                                            padding:5px 0;
                                            font-size:12px;
                                            color:#777777;
                                        "
                                    >
                                        ${locale === "uk" ? "Тема" : "Topic"}
                                    </td>

                                    <td
                                        align="right"
                                        style="
                                            padding:5px 0;
                                            font-size:13px;
                                            font-weight:600;
                                        "
                                    >
                                        ${escapeHtml(topic)}
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style="
                                            padding:5px 0;
                                            font-size:12px;
                                            color:#777777;
                                        "
                                    >
                                        ${locale === "uk" ? "Надіслано" : "Submitted"}
                                    </td>

                                    <td
                                        align="right"
                                        style="
                                            padding:5px 0;
                                            font-size:13px;
                                        "
                                    >
                                        ${escapeHtml(submittedAt)}
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style="
                                            padding:5px 0;
                                            font-size:12px;
                                            color:#777777;
                                        "
                                    >
                                        ${locale === "uk" ? "Мова" : "Language"}
                                    </td>

                                    <td
                                        align="right"
                                        style="
                                            padding:5px 0;
                                            font-size:13px;
                                        "
                                    >
                                        ${locale === "uk" ? "Українська" : "English"}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Contact information -->
                    <tr>
                        <td style="padding:30px 32px 12px;">

                            <div
                                style="
                                    margin-bottom:20px;
                                    font-size:11px;
                                    font-weight:700;
                                    letter-spacing:1.2px;
                                    text-transform:uppercase;
                                    color:#777777;
                                "
                            >
                                ${locale === "uk" ? "Контактні дані" : "Contact details"}
                            </div>

                            <table
                                role="presentation"
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                            >

                                <tr>
                                    <td
                                        style="
                                            width:150px;
                                            padding:10px 0;
                                            border-bottom:1px solid #eeeeeb;
                                            vertical-align:top;
                                            font-size:12px;
                                            color:#777777;
                                        "
                                    >
                                        ${locale === "uk" ? "Імʼя" : "Name"}
                                    </td>

                                    <td
                                        style="
                                            padding:10px 0;
                                            border-bottom:1px solid #eeeeeb;
                                            font-size:14px;
                                            font-weight:600;
                                        "
                                    >
                                        ${valueOrDash(payload.name)}
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style="
                                            padding:10px 0;
                                            border-bottom:1px solid #eeeeeb;
                                            vertical-align:top;
                                            font-size:12px;
                                            color:#777777;
                                        "
                                    >
                                        ${locale === "uk" ? "Організація" : "Organisation"}
                                    </td>

                                    <td
                                        style="
                                            padding:10px 0;
                                            border-bottom:1px solid #eeeeeb;
                                            font-size:14px;
                                        "
                                    >
                                        ${valueOrDash(payload.organization)}
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style="
                                            padding:10px 0;
                                            border-bottom:1px solid #eeeeeb;
                                            vertical-align:top;
                                            font-size:12px;
                                            color:#777777;
                                        "
                                    >
                                        Email
                                    </td>

                                    <td
                                        style="
                                            padding:10px 0;
                                            border-bottom:1px solid #eeeeeb;
                                            font-size:14px;
                                        "
                                    >
                                        <a
                                            href="mailto:${escapeHtml(payload.email)}"
                                            style="
                                                color:#151515;
                                                text-decoration:underline;
                                            "
                                        >
                                            ${escapeHtml(payload.email)}
                                        </a>
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        style="
                                            padding:10px 0;
                                            vertical-align:top;
                                            font-size:12px;
                                            color:#777777;
                                        "
                                    >
                                        ${locale === "uk" ? "Телефон" : "Phone"}
                                    </td>

                                    <td
                                        style="
                                            padding:10px 0;
                                            font-size:14px;
                                        "
                                    >
                                        ${valueOrDash(payload.phone)}
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>

                    <!-- Message -->
                    <tr>
                        <td style="padding:24px 32px 34px;">

                            <div
                                style="
                                    margin-bottom:12px;
                                    font-size:11px;
                                    font-weight:700;
                                    letter-spacing:1.2px;
                                    text-transform:uppercase;
                                    color:#777777;
                                "
                            >
                                ${locale === "uk" ? "Повідомлення" : "Message"}
                            </div>

                            <div
                                style="
                                    padding:20px;
                                    background:#f5f5f1;
                                    border-left:3px solid #b7d632;
                                    font-size:15px;
                                    line-height:1.65;
                                "
                            >
                                ${htmlText(payload.message)}
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td
                            style="
                                padding:20px 32px;
                                border-top:1px solid #e5e5e1;
                                font-size:11px;
                                line-height:1.6;
                                color:#888888;
                            "
                        >
                            ${
                                locale === "uk"
                                    ? "Цей лист автоматично сформований контактною формою сайту Українського міжнародного інституту відновлення."
                                    : "This email was automatically generated by the Ukrainian International Institute for Recovery website contact form."
                            }
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>
</body>
</html>
    `;
}

function buildTextEmail(payload) {
    const locale = payload.locale === "en" ? "en" : "uk";

    const topic = TOPIC_LABELS[payload.topic]?.[locale] || payload.topic;

    return `
UIIR WEBSITE CONTACT FORM

Topic: ${topic}
Name: ${payload.name}
Organisation: ${payload.organization || "—"}
Email: ${payload.email}
Phone: ${payload.phone || "—"}
Language: ${payload.locale}

MESSAGE

${payload.message}
    `.trim();
}

export async function POST(request) {
    try {
        /*
         * Reject obviously oversized requests before parsing JSON.
         */
        const contentLength = Number(request.headers.get("content-length") || 0);

        if (contentLength > 50_000) {
            return NextResponse.json(
                {
                    ok: false,
                    message: "Request too large",
                },
                {
                    status: 413,
                },
            );
        }

        const body = await request.json();

        /*
         * Honeypot.
         *
         * Real users never fill this hidden field.
         * Bots often do.
         *
         * Return success so the bot does not learn
         * that it has been detected.
         */
        if (clean(body.website, 200)) {
            return NextResponse.json({
                ok: true,
            });
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

        if (payload.name.length < 2) {
            errors.name = "invalid_name";
        }

        if (!EMAIL_PATTERN.test(payload.email)) {
            errors.email = "invalid_email";
        }

        if (payload.message.length < 20) {
            errors.message = "message_too_short";
        }

        if (!payload.consent) {
            errors.consent = "consent_required";
        }

        if (!ALLOWED_TOPICS.has(payload.topic)) {
            errors.topic = "invalid_topic";
        }

        if (!ALLOWED_LOCALES.has(payload.locale)) {
            errors.locale = "invalid_locale";
        }

        if (Object.keys(errors).length) {
            return NextResponse.json(
                {
                    ok: false,
                    errors,
                },
                {
                    status: 400,
                },
            );
        }

        const transporter = getTransporter();

        const fromAddress = process.env.CONTACT_FROM || process.env.SMTP_USER;

        const toAddress = process.env.CONTACT_TO || "office@uiir.org";

        const topicLabel = TOPIC_LABELS[payload.topic]?.[payload.locale] || payload.topic;

        await transporter.sendMail({
            from: {
                name: "UIIR Website",
                address: fromAddress,
            },

            to: toAddress,

            /*
             * Pressing Reply in the mail client will
             * reply directly to the visitor.
             */
            replyTo: {
                name: payload.name,
                address: payload.email,
            },

            subject: `[UIIR] ${topicLabel} — ${payload.name}`,

            text: buildTextEmail(payload),

            html: buildHtmlEmail(payload),
        });

        return NextResponse.json(
            {
                ok: true,
            },
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("UIIR contact form error:", error);

        /*
         * Do not expose SMTP errors/passwords/host
         * information to the browser.
         */
        return NextResponse.json(
            {
                ok: false,
                message: "Unable to send message",
            },
            {
                status: 500,
            },
        );
    }
}
