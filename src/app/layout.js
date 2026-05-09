import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/footer'
import CookieConsent from '@/components/CookieConsent'
import Script from 'next/script'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.soukafrica.ma';

export const metadata = {
  title: 'Votre marketplace de proximité au Maroc',
  description: "Retrouvez les boutiques, restaurant africain, sociétés de service et bien d'autres de votre zone",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Souk Africa - Votre marketplace de proximité au Maroc',
    description: "Retrouvez les boutiques, restaurant africain, sociétés de service et bien d'autres de votre zone",
    url: SITE_URL,
    siteName: 'Souk Africa',
    locale: 'fr_MA',
    type: 'website',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Souk Africa - Marketplace au Maroc',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Souk Africa - Votre marketplace de proximité au Maroc',
    description: "Retrouvez les boutiques, restaurant africain, sociétés de service et bien d'autres de votre zone",
    images: ['/images/og-default.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Google Analytics - Mode consentement */}
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Désactiver par défaut jusqu'au consentement
              gtag('consent', 'default', {
                'analytics_storage': 'denied'
              });
              
              gtag('config', 'G-7ZXJNV34NM', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7ZXJNV34NM"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}