import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata must be in a Server Component (RootLayout is one by default)
export const metadata = {
  title: "ChatUr-Bot",
  description: "AI-powered PDF chatbot",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="bg-black text-white">{children}</body>
      </html>
    </ClerkProvider>
  );
}
