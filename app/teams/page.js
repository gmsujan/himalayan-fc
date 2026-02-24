import Link from 'next/link'

export const metadata = {
  title: 'Teams | Himalayan FC',
  description: 'Explore the teams at Himalayan FC – Men\'s, Women\'s, and Youth.',
}

const teams = [
  {
    name: "Men's First Team",
    tag: 'Senior',
    description: 'Our flagship team competing in the Hamilton local football league. The Men\'s First Team represents the club with pride and passion every weekend.',
    training: 'Tuesday & Thursday evenings',
    contact: 'info@himalayanfc.co.nz',
    color: '#1e6e1e',
    emoji: '⚽',
  },
  {
    name: "Women's Team",
    tag: 'Senior',
    description: 'A growing and ambitious Women\'s team that welcomes players of all skill levels. We are building something special for women\'s football in Hamilton.',
    training: 'Wednesday evenings & Saturday mornings',
    contact: 'info@himalayanfc.co.nz',
    color: '#2d8a2d',
    emoji: '⚽',
  },
  {
    name: 'Youth Academy',
    tag: 'Youth U8–U16',
    description: 'Developing the next generation of Himalayan FC stars. Our youth program focuses on skill development, teamwork, and having fun on the pitch.',
    training: 'Saturday mornings',
    contact: 'info@himalayanfc.co.nz',
    color: '#4daa4d',
    emoji: '🌱',
  },
]

export default function TeamsPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20" style={{background:'#f0faf0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label">Our Teams</div>
          <h1 className="font-display font-black text-5xl sm:text-6xl mt-2">Club Teams</h1>
          <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
            From youth to senior football, Himalayan FC has a team for every player.
          </p>
        </div>
      </section>

      {/* Teams */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {teams.map((team, i) => (
            <div
              key={i}
              className={`grid lg:grid-cols-3 gap-0 rounded-sm overflow-hidden border border-green-100 card-hover ${
                i % 2 !== 0 ? 'lg:direction-rtl' : ''
              }`}
            >
              {/* Color bar */}
              <div
                className="p-10 flex flex-col justify-center"
                style={{background: team.color}}
              >
                <div className="text-5xl mb-4">{team.emoji}</div>
                <div className="text-white/60 text-xs font-bold tracking-widest uppercase mb-1">{team.tag}</div>
                <h2 className="font-display font-black text-3xl text-white">{team.name}</h2>
              </div>

              {/* Info */}
              <div className="lg:col-span-2 p-10">
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">{team.description}</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-sm" style={{background:'#f0faf0'}}>
                    <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{color:'#1e6e1e'}}>Training</div>
                    <div className="text-sm text-gray-700">{team.training}</div>
                  </div>
                  <div className="p-4 rounded-sm" style={{background:'#f0faf0'}}>
                    <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{color:'#1e6e1e'}}>Contact</div>
                    <div className="text-sm text-gray-700">{team.contact}</div>
                  </div>
                </div>
                <Link href="/register" className="btn-primary">Join This Team</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interest CTA */}
      <section className="py-16 text-center" style={{background:'#f0faf0'}}>
        <div className="section-label">Not sure which team?</div>
        <h2 className="font-display font-black text-3xl mt-2 mb-4">Come for a Trial</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Not sure which team is right for you? Get in touch and we&apos;ll help you find your perfect fit.
        </p>
        <Link href="/contact" className="btn-outline">Contact Us</Link>
      </section>
    </div>
  )
}
