import "./globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Chat bot",
  description: "This is an AI powered chat bot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans`}>{children}</body>
    </html>
  );
}
