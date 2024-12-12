import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "食費計算ツール",
    template: "%s | 食費計算ツール",
  },
  description: "自炊とお店での購入を比較する食費計算ツール",
  keywords: ["食費", "家計簿", "自炊", "コスト比較", "節約"],
  openGraph: {
    title: "食費計算ツール",
    description: "自炊とお店での購入を比較する食費計算ツール",
    type: "website",
    locale: "ja_JP",
    siteName: "食費計算ツール",
  },
  robots: {
    index: true,
    follow: true,
  },
  // SNSカード用のメタデータ
  twitter: {
    card: "summary_large_image",
    title: "食費計算ツール",
    description: "自炊とお店での購入を比較する食費計算ツール",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
