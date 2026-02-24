import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{background:'#0f3d0f'}} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 relative">
                <Image src="/logo.png" alt="Himalayan FC" fill className="object-contain" />
              </div>
              <div>
                <div className="font-display font-black text-xl" style={{color:'#7ec87e'}}>HIMALAYAN FC</div>
                <div className="text-xs text-green-300 tracking-widest uppercase">Hamilton, New Zealand</div>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed max-w-xs">
              A football club rooted in community, culture, and the spirit of the mountains. 
              Bringing people together through the beautiful game since 2024.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/profile.php?id=61560016473754"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-green-200 hover:text-white transition-colors"
              >
                <Facebook size={18} />
                Follow on Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4" style={{color:'#7ec87e'}}>Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/teams', label: 'Our Teams' },
                { href: '/fixtures', label: 'Fixtures & Results' },
                { href: '/news', label: 'Latest News' },
                { href: '/gallery', label: 'Photo Gallery' },
                { href: '/register', label: 'Join the Club' },
                { href: '/contact', label: 'Contact Us' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-green-300 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4" style={{color:'#7ec87e'}}>Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-green-200">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{color:'#7ec87e'}} />
                Hamilton, Waikato<br/>New Zealand
              </li>
              <li className="flex items-center gap-2 text-sm text-green-200">
                <Mail size={16} style={{color:'#7ec87e'}} />
                <a href="mailto:info@himalayanfc.co.nz" className="hover:text-white transition-colors">
                  info@himalayanfc.co.nz
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-green-200">
                <Facebook size={16} style={{color:'#7ec87e'}} />
                <a
                  href="https://www.facebook.com/profile.php?id=61560016473754"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Himalayan FC on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{background:'#092609'}} className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-green-400 text-xs">© {new Date().getFullYear()} Himalayan FC. All rights reserved.</p>
          <p className="text-green-600 text-xs">Est. 2024 · Hamilton, New Zealand</p>
        </div>
      </div>
    </footer>
  )
}
