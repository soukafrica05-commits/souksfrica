import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/footer'
import CookieConsent from '@/components/CookieConsent'
import Script from 'next/script'

export const metadata = {
  title: 'Souk Africa - Votre marketplace de proximité au Maroc',
  description: "Découvrez les meilleures entreprises, produits et opportunités d'affaires au Maroc",
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
              
              gtag('config', 'G-VOTRE-ID-ANALYTICS', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VOTRE-ID-ANALYTICS"
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