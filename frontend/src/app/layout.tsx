import type { Metadata } from "next";
import { Inter, Lexend_Deca } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const LexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Taitotesti",
  description: "Taitaja Taitotesti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${LexendDeca.variable} ${inter.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
