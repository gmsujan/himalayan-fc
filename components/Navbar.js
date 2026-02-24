'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/teams', label: 'Teams' },
  { href: '/fixtures', label: 'Fixtures' },
  { href: '/news', label: 'News' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
    }`}>
      {/* Top bar */}
      <div style={{background:'#1e6e1e'}} className="text-white text-xs py-1.5 text-center font-medium tracking-widest uppercase">
        Hamilton, New Zealand · Est. 2024
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 relative">
              <Image
                src="/logo.png"
                alt="Himalayan FC"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-black text-lg leading-tight" style={{color:'#1e6e1e'}}>
                HIMALAYAN FC
              </div>
              <div className="text-xs text-gray-500 tracking-widest uppercase">Hamilton, NZ</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link text-sm font-medium transition-colors ${
                  pathname === l.href ? 'text-green-700 active' : 'text-gray-700 hover:text-green-700'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/register" className="btn-primary text-sm ml-4">
              Join the Club
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  pathname === l.href
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Link href="/register" onClick={() => setOpen(false)} className="btn-primary w-full text-center block">
                Join the Club
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
