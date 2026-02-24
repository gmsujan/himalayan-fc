import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Trophy, Users, Calendar, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center mountain-bg stripe-accent overflow-hidden">
        {/* Decorative circle */}
        <div
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{background: 'radial-gradient(circle, #1e6e1e, transparent)'}}
        />
        <div
          className="absolute -left-20 bottom-0 w-80 h-80 rounded-full opacity-5"
          style={{background: '#1e6e1e'}}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="section-label fade-up">Hamilton, New Zealand · Est. 2024</div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-none mt-3 mb-6 fade-up fade-up-delay-1" style={{color:'#1a1a1a'}}>
              THE SPIRIT<br/>
              <span style={{color:'#1e6e1e'}}>OF THE</span><br/>
              MOUNTAINS
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md fade-up fade-up-delay-2">
              Himalayan FC is more than a football club - it&apos;s a community of passion, culture, 
              and shared pride. Join us as we build something extraordinary in Hamilton.
            </p>
            <div className="flex flex-wrap gap-4 fade-up fade-up-delay-3">
              <Link href="/register" className="btn-primary">
                Join the Club
              </Link>
              <Link href="/about" className="btn-outline">
                Our Story
              </Link>
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center lg:justify-end fade-up fade-up-delay-4">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full opacity-10 blur-3xl scale-110"
                style={{background:'#1e6e1e'}}
              />
              <Image
                src="/mensfirst/team.jpg"
                alt="Himalayan FC Logo"
                width={1020}
                height={1020}
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom diagonal */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{clipPath:'polygon(0 100%,100% 0,100% 100%)'}} />
      </section>

      {/* Stats bar */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Users size={28} />, value: '50+', label: 'Club Members' },
              { icon: <Trophy size={28} />, value: '2024', label: 'Founded' },
              { icon: <Calendar size={28} />, value: '3', label: 'Teams' },
              { icon: <Star size={28} />, value: 'HMT', label: 'Hamilton Based' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div style={{color:'#1e6e1e'}}>{s.icon}</div>
                <div className="font-display font-black text-4xl" style={{color:'#1e6e1e'}}>{s.value}</div>
                <div className="text-xs font-medium tracking-widest uppercase text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label">Who We Are</div>
            <h2 className="font-display font-black text-4xl sm:text-5xl mt-2 mb-6 leading-tight">
              Community First,<br/>
              <span style={{color:'#1e6e1e'}}>Football Always</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Himalayan FC was founded in 2024 by a group of passionate footballers 
              in Hamilton, New Zealand. Our club celebrates the rich culture and 
              determination of the Himalayan community while welcoming everyone 
              who shares a love for the beautiful game.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We compete in local leagues across all age groups and are committed 
              to developing players from grassroots to competitive levels.
            </p>
            <Link href="/about" className="btn-primary inline-flex items-center gap-2">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Men\'s Team', desc: 'Competing in Hamilton local leagues' },
              { title: 'Youth Academy', desc: 'Developing the next generation' },
              { title: 'Women\'s Team', desc: 'Growing with purpose and passion' },
              { title: 'Community', desc: 'Cultural events & social activities' },
            ].map((c, i) => (
              <div
                key={i}
                className="p-6 rounded-sm card-hover"
                style={{background: i % 2 === 0 ? '#f0faf0' : 'white', border:'1.5px solid #d9f0d9'}}
              >
                <div className="font-display font-bold text-lg mb-1" style={{color:'#1e6e1e'}}>{c.title}</div>
                <div className="text-sm text-gray-600">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming fixtures preview */}
      <section className="py-24" style={{background:'#f0faf0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label">Fixtures</div>
              <h2 className="font-display font-black text-4xl">Upcoming Matches</h2>
            </div>
            <Link href="/fixtures" className="btn-outline hidden sm:inline-flex items-center gap-2">
              All Fixtures <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { date: 'TBC', home: 'Himalayan FC', away: 'Hamilton AFC', comp: 'Hamilton League', venue: 'Porritt Stadium' },
              { date: 'TBC', home: 'Himalayan FC', away: 'Waikato United', comp: 'Hamilton League', venue: 'FMG Stadium' },
              { date: 'TBC', home: 'Central FC', away: 'Himalayan FC', comp: 'Hamilton League', venue: 'Central Park' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-sm p-6 card-hover border border-green-100">
                <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{color:'#1e6e1e'}}>{f.comp}</div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="font-display font-bold text-sm text-center flex-1">{f.home}</div>
                  <div className="px-3 py-1 text-xs font-bold text-white rounded-sm" style={{background:'#1e6e1e'}}>VS</div>
                  <div className="font-display font-bold text-sm text-center flex-1">{f.away}</div>
                </div>
                <div className="border-t border-gray-100 pt-3 text-xs text-gray-500 flex justify-between">
                  <span>{f.venue}</span>
                  <span className="font-semibold" style={{color:'#1e6e1e'}}>{f.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/fixtures" className="btn-outline">All Fixtures</Link>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-24" style={{background:'#1e6e1e'}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-green-300 text-xs font-bold tracking-widest uppercase mb-3">Ready to Play?</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-6">
            Become Part of<br/>Himalayan FC
          </h2>
          <p className="text-green-200 text-lg mb-8 max-w-xl mx-auto">
            Whether you&apos;re an experienced player or just starting out, 
            there&apos;s a place for you at Himalayan FC.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" style={{background:'white', color:'#1e6e1e'}} className="btn-primary">
              Register Now
            </Link>
            <Link href="/contact" style={{borderColor:'white', color:'white'}} className="btn-outline">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
