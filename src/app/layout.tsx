import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// page for an api test in http://localhost:8080/tvshows
// the model is a tvshow with the response: {"id": 1,"title": "Breaking Bad","genre": "Drama","season": 5,"episode": 62},
// create a form to send a post request to http://localhost:8080/tvshows with the fields above

export const metadata: Metadata = {
  title: "TVShows API Test",
  description: "tester",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
