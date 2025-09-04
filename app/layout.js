import { Roboto_Condensed } from "next/font/google";
import "./globals.css";

const geistSans = Roboto_Condensed({
  variable: "--Roboto_Condensed",
  subsets: ["latin"],
});

export const metadata = {
  title: "CSIR-Innovation Protection Unit Portal",
  description:
    "CSIR-Innovation Protection Unit (IPU) Portal created by Adrin (Research Intern)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
