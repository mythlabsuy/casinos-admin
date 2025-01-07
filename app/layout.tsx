import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  //TODO update metadata
  title: {
    template: '%s ',
    default: 'Panel',
  },
  description: 'Panel de control.',
  // metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} antialiased h-full bg-gray-100`}>{children}</body>
    </html>
  );
}
