// Layout for All Pages
// Includes html & body tags, and a bunch of CSS imports

import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
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
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={ubuntu.className}>{children}</body>
    </html>
  );
}
