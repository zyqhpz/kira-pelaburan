import { Inter } from 'next/font/google'
import './globals.css'
import SEO from './components/seo'
import OgImage from '../../public/og.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kira Pelaburan',
  description: 'Kira pelaburan anda dengan "Compound Interest"',
  imageUrl: OgImage,
  url: 'https://kira-pelaburan.vercel.app/',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SEO {...metadata} />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
