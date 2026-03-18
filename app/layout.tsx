import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Concrete, Stucco & Siding Contractor in Utah County | A.P.I. Construction",
  description:
    "A.P.I. Construction provides expert concrete, stucco, and siding services in Utah County and Salt Lake County. Licensed & insured. Free estimates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* GOOGLE ANALYTICS */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KWXDWXRE7N"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KWXDWXRE7N');
            `,
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
