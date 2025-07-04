import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ErrorBoundary } from "@/components/providers/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { DevWarningBanner } from "@/components/dev-warning-banner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkedIn Writer AI - Content That Gets You Clients",
  description: "AI-powered LinkedIn content assistant that learns your voice and helps you attract ideal clients with engaging posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <AuthProvider>
            {children}
            <Toaster />
            <DevWarningBanner />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
