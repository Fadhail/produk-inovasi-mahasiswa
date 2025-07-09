import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Galeri Produk Mahasiswa - IRC Gateway',
  description: 'Karya-karya kreatif dari mahasiswa Informatika - IRC Gateway.',
  icons: {
    icon: '/images/gateway.png',
    shortcut: '/images/gateway.png',
    apple: '/images/gateway.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
