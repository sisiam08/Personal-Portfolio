import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/provider/theme-provider";
import { env } from "../env";
import ScrollProgress from "./_components/ScrollProgress";
import BackToTop from "./_components/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.FRONTEND_URL),
  title: {
    default: "Shahariar Siam",
    template: "%s — Shahariar Siam",
  },
  description:
    "Full-stack developer building fast, scalable products end to end — from interface to infrastructure.",
  keywords: [
    "Shahariar Siam",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Md. Shahariar Islam Siam" }],
  openGraph: {
    title: "Shahariar Siam — Full Stack Developer",
    description:
      "Full-stack developer building fast, scalable products end to end — from interface to infrastructure.",
    type: "website",
    siteName: "Shahariar Siam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahariar Siam — Full Stack Developer",
    description:
      "Full-stack developer building fast, scalable products end to end.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#09090a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body
        className="page-texture min-h-svh bg-canvas font-sans text-ink antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="bottom-right"
            containerStyle={{
              bottom: "calc(1rem + env(safe-area-inset-bottom))",
              right: "calc(1rem + env(safe-area-inset-right))",
              left: "auto",
            }}
            toastOptions={{
              style: {
                background: "var(--surface)",
                color: "var(--ink)",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                fontSize: "0.85rem",
              },
            }}
          />
          <ScrollProgress />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
