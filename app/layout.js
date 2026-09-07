import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

export const metadata = {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
        default: "Український міжнародний інститут відновлення",
        template: "%s | УМІВ",
    },
    icons: {
        icon: "/images/favicon.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="uk" suppressHydrationWarning>
            <head>
                {/* <link rel="icon" type="image/x-icon" href="/images/favicon.png"></link> */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

                <link href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap" rel="stylesheet" />

                <link href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Play:wght@400;700&display=swap" rel="stylesheet"></link>
            </head>
            <body>{children}</body>
        </html>
    );
}
