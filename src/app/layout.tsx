import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Agnieszka Przybyła Portfolio",
  description: "Portfolio w Next.js + MUI",
  icons: {
    icon: "/icons/ap_inicials.png",
    shortcut: "/icons/ap_inicials.png",
    apple: "/icons/ap_inicials.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}