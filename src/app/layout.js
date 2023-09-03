// Shared Layout for All Pages - html, body & fonts

import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Nunito_Sans } from "next/font/google";

const font = Nunito_Sans({
  weight: ["300", "400", "700", "800", "900"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "auto",
  fallback: ["system-ui", "arial", "verdana"],
});

export const metadata = {
  title: "Quick-R-Build",
  description:
    "A web app to help quickly make variants of a resume using a resume master.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
