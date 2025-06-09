import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Платформа соціальної обізнаності",
  description: "Веб-ресурс для підвищення обізнаності та освіти щодо соціальних питань",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex flex-col min-h-screen">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
