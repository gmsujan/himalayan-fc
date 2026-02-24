import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Himalayan FC | Hamilton, New Zealand',
  description: 'Himalayan FC – A football club rooted in community, culture, and the spirit of the mountains. Based in Hamilton, New Zealand. Est. 2024.',
  openGraph: {
    title: 'Himalayan FC',
    description: 'Football club based in Hamilton, New Zealand.',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
