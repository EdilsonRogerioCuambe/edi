'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Script from 'next/script'
import { pageView } from '@/lib/page.view'

export default function GoogleAnalytics({
  GOOGLE_MEASUREMENT_ID,
}: {
  GOOGLE_MEASUREMENT_ID: string
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()

    pageView(GOOGLE_MEASUREMENT_ID, url)
  }, [pathname, searchParams, GOOGLE_MEASUREMENT_ID])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });

                gtag('config', '${GOOGLE_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                });
                `,
        }}
      />
    </>
  )
}
