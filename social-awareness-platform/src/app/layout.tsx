import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-gray-50">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
