import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'daily.dev | Where developers suffere together',
  description: 'Where developers suffere together',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
