import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NextBody — See Your Body 3 Months From Now',
  description:
    'AI analyzes your current body and shows your future transformation — before you even start. Join the waitlist.',
  openGraph: {
    title: 'NextBody — See Your Body 3 Months From Now',
    description:
      'AI analyzes your current body and shows your future transformation — before you even start.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}
