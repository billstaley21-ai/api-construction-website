import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Concrete, Stucco & Siding Contractor in Utah County | A.P.I. Construction",
  description:
    "A.P.I. Construction provides expert concrete, stucco, and siding services in Utah County and Salt Lake County. Licensed & insured. Free estimates.",
  keywords: [
    "concrete contractor Utah County",
    "stucco contractor Utah County",
    "siding contractor Utah County",
    "concrete contractor Orem Utah",
    "Hardie board siding Utah",
    "stucco repair Utah County",
  ],
  openGraph: {
    title: "A.P.I. Construction",
    description:
      "Premium concrete, stucco, and siding work built to last in Utah County and Salt Lake County.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
