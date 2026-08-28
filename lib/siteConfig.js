export const siteConfig = {
    // Set NEXT_PUBLIC_SITE_URL in production. The fallback keeps local metadata valid.
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    logo: "/images/uiir-logo.png",
    defaultOgImage: "/og-default.png",
    contact: {
        email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "[email]",
        phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "[номер]",
        social: process.env.NEXT_PUBLIC_SOCIAL_URL || "[посилання]",
    },
    heroMedia: {
        // Switch `type` to "video" and provide an MP4/WebM path to use video instead.
        type: "video",
        src: "/videos/bg-video.mp4",
        poster: "/videos/bg-video.mp4",
        alt: "",
    },
};
