// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import Query from './layoutCliente'; // client component

export const metadata = {
  title: 'Power Moendas',
  description: 'Dashboards e integrações',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-br'>
      <body className='h-screen antialiased'>
        <Query>
          <Analytics />
          {children}
        </Query>
      </body>
    </html>
  );
}
