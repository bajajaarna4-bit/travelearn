import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import ClientShell from '@/components/ClientShell';

export const metadata: Metadata = {
  title: 'SukoonRoute — Slow, Low-Cost Travel & Sanctuary Community with Women Safety',
  description: 'A community platform for slow, low-budget roamers to travel cheaply through work-exchange, ashram stays, shared rides, skills barter, and women\'s safety.',
  keywords: 'slow travel India, work exchange India, ashram stays Rishikesh, women solo travel safety India, carpool Pushkar, low cost backpacking',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#FAF8F5" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🕉️</text></svg>" />
      </head>
      <body className="bg-[#FAF8F5] text-sand-900 antialiased">
        <AppProvider>
          <ClientShell>
            {children}
          </ClientShell>
        </AppProvider>
      </body>
    </html>
  );
}
