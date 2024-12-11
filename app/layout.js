import "./globals.css";
import { Providers } from './providers'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'Fast DeFi',
  description: 'Learn DeFi by trying',
  openGraph: {
    title: 'Fast DeFi',
    description: 'Learn DeFi by trying',
    url: 'https://www.fast-defi.com',
    siteName: 'Fast DeFi',
    images: [
      {
        url: 'https://www.fast-defi.com/images/fdt-social-1200-x630.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast DeFi',
    description: 'Learn DeFi by trying',
    images: ['https://www.fast-defi.com/images/fdt-social-1200-x630.png'], // Replace with your image path
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>          
        <Providers>
          {children}
          <Analytics />
        </Providers>          
      </body>
    </html>
  );
}
