import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import icon from "@/assets/dumbbell.png";
import Navbar from "@/components/Navbar";
import Logging from "@/components/Logging";
import AuthHydrator from "@/components/AuthHydrator";

const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gym Membership",
  description: "Self made project.",
  icons: {
    icon: icon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${font.className} h-full bg-bg text-fg antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          <AuthHydrator />
          <Navbar />
          <Logging />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
