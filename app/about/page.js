import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About | Himalayan FC',
  description: 'Learn about Himalayan FC – our story, mission, and values.',
}

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20 mountain-bg" style={{background:'#f0faf0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label">Est. 2024</div>
          <h1 className="font-display font-black text-5xl sm:text-6xl mt-2">Our Story</h1>
          <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
            Born from community, driven by passion, united by football.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label">Our Beginnings</div>
            <h2 className="font-display font-black text-4xl mt-2 mb-6">
              From the Himalayas<br/>
              <span style={{color:'#1e6e1e'}}>to Hamilton</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Himalayan FC was founded in 2024 by a passionate group of footballers who 
              wanted to create a club that reflected their cultural heritage while building 
              deep roots in their adopted home of Hamilton, New Zealand.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The club takes inspiration from the majesty and resilience of the Himalayan 
              mountains — qualities we seek to embody on and off the pitch. Just as the 
              mountains stand tall through any weather, we stand together as a community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, Himalayan FC is home to players from diverse backgrounds, united 
              by a shared love for the beautiful game and a commitment to making 
              Hamilton a better place through sport.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full opacity-10 blur-2xl" style={{background:'#1e6e1e'}} />
              <Image src="/logo.png" alt="Himalayan FC" width={360} height={360} className="relative z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{background:'#f0faf0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-label">What Drives Us</div>
            <h2 className="font-display font-black text-4xl mt-2">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Community',
                desc: 'We are more than a football club. We are a family that supports each other on and off the pitch, celebrating our shared culture and diverse backgrounds.',
                icon: '🤝'
              },
              {
                title: 'Excellence',
                desc: 'Like the peaks we draw inspiration from, we strive to reach the highest standards in everything we do — in training, in competition, and in life.',
                icon: '⛰️'
              },
              {
                title: 'Inclusion',
                desc: 'Football is for everyone. We welcome players of all abilities, ages, and backgrounds. Every person who walks through our door is valued.',
                icon: '🌍'
              },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-sm p-8 card-hover border border-green-100">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display font-bold text-2xl mb-3" style={{color:'#1e6e1e'}}>{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20" style={{background:'#1e6e1e'}}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-green-300 text-xs font-bold tracking-widest uppercase mb-3">Our Mission</div>
          <h2 className="font-display font-black text-4xl text-white mb-6">
            Develop Players, Build Community, Inspire Pride
          </h2>
          <p className="text-green-200 text-lg leading-relaxed">
            Himalayan FC exists to provide a supportive and competitive environment for football 
            development, to strengthen community bonds through sport, and to be a source of 
            pride for the Himalayan community in New Zealand.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <div className="section-label">Ready?</div>
        <h2 className="font-display font-black text-4xl mt-2 mb-6">Be Part of Our Story</h2>
        <Link href="/register" className="btn-primary">Register Now</Link>
      </section>
    </div>
  )
}
