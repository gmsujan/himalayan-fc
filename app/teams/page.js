'use client'
import { useState } from 'react'
import Link from 'next/link'

const SQUADS = {
  mens: {
    name: "Men's First Team",
    tag: 'Senior',
    color: '#1e6e1e',
    training: 'Tuesday & Thursday evenings',
    contact: 'info@himalayanfc.co.nz',
    players: [
      { id: 1,  name: 'Suresh Shrestha',       number: 1,  position: 'Goalkeeper', photo: 'suresh-shrestha.jpg',       nationality: '🇳🇵' },
      { id: 2,  name: 'Suresh Magar',           number: 20, position: 'Goalkeeper', photo: 'suresh-magar.jpg',           nationality: '🇳🇵' },
      { id: 3,  name: 'Uday Raj Gurung',        number: 2,  position: 'Defender',   photo: 'uday-raj-gurung.jpg',        nationality: '🇳🇵' },
      { id: 4,  name: 'Sammy Rokaha',           number: 3,  position: 'Defender',   photo: 'sammy-rokaha.jpg',           nationality: '🇳🇵' },
      { id: 5,  name: 'Arbin Shrestha',         number: 4,  position: 'Defender',   photo: 'arbin-shrestha.jpg',         nationality: '🇳🇵' },
      { id: 6,  name: 'Bidur Godar',            number: 5,  position: 'Defender',   photo: 'bidur-godar.jpg',            nationality: '🇳🇵' },
      { id: 7,  name: 'Sailesh Khadka',         number: 13, position: 'Defender',   photo: 'sailesh-khadka.jpg',         nationality: '🇳🇵' },
      { id: 8,  name: 'Sunil Sharma',           number: 15, position: 'Defender',   photo: 'sunil-sharma.jpg',           nationality: '🇳🇵' },
      { id: 9,  name: 'Kshitiz Ranabhat',       number: 21, position: 'Defender',   photo: 'kshitiz-ranabhat.jpg',       nationality: '🇳🇵' },
      { id: 10, name: 'Bishal Thapa',           number: 22, position: 'Defender',   photo: 'bishal-thapa.jpg',           nationality: '🇳🇵' },
      { id: 11, name: 'Sushil Dhakal',          number: 19, position: 'Defender',   photo: 'sushil-dhakal.jpg',          nationality: '🇳🇵' },
      { id: 12, name: 'Manish Khadka',          number: 11, position: 'Midfielder', photo: 'manish-khadka.jpg',          nationality: '🇳🇵' },
      { id: 13, name: 'Anmesh Karki',           number: 7,  position: 'Midfielder', photo: 'anmesh-karki.jpg',           nationality: '🇳🇵' },
      { id: 14, name: 'Aashish Babu Bhandari',  number: 12, position: 'Midfielder', photo:'aasshish-babu-bhandari.jpg',  nationality:'🇳🇵'},
      { id: 15, name:'Suraj Sunar',            number :8 , position: 'Midfielder',  photo: 'suraj-sunar.jpg', nationality:'🇳🇵'},
      { id: 16, name:'Balaram Basnet',            number :16 , position: 'Midfielder',  photo: 'balaram-basnet.jpg', nationality:'🇳🇵'},
      { id: 17, name: 'Sujan Bhandari',         number: 10, position: 'Forward',    photo: 'sujan-bhandari.jpg',         nationality: '🇳🇵' },
      { id: 18, name: 'Rhythm Ale Magar',       number: 9,  position: 'Forward',    photo: 'rhythm-ale-magar.jpg',       nationality: '🇳🇵' },
      { id: 19, name: 'Prajwal Pun',            number: 17, position: 'Forward',    photo: '/mensfirst/prajwal-pun.jpg',            nationality: '🇳🇵' },
      { id: 20, name: 'Saroj Gurung',           number: 14, position: 'Forward',    photo: 'saroj-gurung.jpg',           nationality: '🇳🇵' },
      { id: 21, name: 'Pashupati Dhakal',       number: 18, position: 'Forward',    photo: '/mensfirst/pashupati-dhakal.jpg',       nationality: '🇳🇵' },
      { id: 22, name: 'Govinda Joshi',          number: 6,  position: 'Forward',    photo:'govinda-joshi.jpg',          nationality:'🇳🇵'},
    ]
  }
  // womens: {
  //   name: "Women's Team",
  //   tag: 'Senior',
  //   color: '#2d8a2d',
  //   training: 'Wednesday evenings & Saturday mornings',
  //   contact: 'info@himalayanfc.co.nz',
  //   players: [
  //     { id: 1, name: 'Player Name', number: 1, position: 'Goalkeeper', photo: null, nationality: '🇳🇵' },
  //     { id: 2, name: 'Player Name', number: 2, position: 'Defender',   photo: null, nationality: '🇳🇵' },
  //     { id: 3, name: 'Player Name', number: 3, position: 'Midfielder', photo: null, nationality: '🇳🇵' },
  //     { id: 4, name: 'Player Name', number: 4, position: 'Forward',    photo: null, nationality: '🇳🇵' },
  //   ]
  // },
  // youth: {
  //   name: 'Youth Academy',
  //   tag: 'Youth U8–U16',
  //   color: '#4daa4d',
  //   training: 'Saturday mornings',
  //   contact: 'info@himalayanfc.co.nz',
  //   players: [
  //     { id: 1, name: 'Player Name', number: 1, position: 'Goalkeeper', photo: null, nationality: '🇳🇿' },
  //     { id: 2, name: 'Player Name', number: 2, position: 'Defender',   photo: null, nationality: '🇳🇿' },
  //     { id: 3, name: 'Player Name', number: 3, position: 'Midfielder', photo: null, nationality: '🇳🇿' },
  //     { id: 4, name: 'Player Name', number: 4, position: 'Forward',    photo: null, nationality: '🇳🇿' },
  //   ]
  // }
}

const POSITION_ORDER = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']

function PlayerCard({ player, color }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="bg-white rounded-sm border border-green-100 overflow-hidden card-hover group">
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden" style={{ background: '#f0faf0' }}>
        {player.photo && !imgError ? (
          <img
            src={`/mensfirst/${player.photo}`}
            alt={player.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#d9f0d9' }}>
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#4daa4d">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
            <span className="text-xs font-medium" style={{ color: '#4daa4d' }}>Photo Coming Soon</span>
          </div>
        )}
        {/* Jersey number */}
        <div
          className="absolute bottom-3 right-3 w-11 h-11 rounded-sm flex items-center justify-center font-display font-black text-white text-xl shadow-lg"
          style={{ background: color }}
        >
          {player.number}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color }}>
          {player.position}
        </div>
        <div className="font-display font-bold text-base leading-tight">{player.name}</div>
        <div className="text-lg mt-1">{player.nationality}</div>
      </div>
    </div>
  )
}

function SquadView({ squad, onBack }) {
  const grouped = POSITION_ORDER.reduce((acc, pos) => {
    const players = squad.players.filter(p => p.position === pos)
    if (players.length > 0) acc[pos] = players
    return acc
  }, {})

  return (
    <div>
      {/* Hero */}
      <section className="py-16" style={{ background: squad.color }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            ← Back to Teams
          </button>
          <div className="text-white/60 text-xs font-bold tracking-widest uppercase mb-1">{squad.tag}</div>
          <h1 className="font-display font-black text-5xl sm:text-6xl text-white mb-4">{squad.name}</h1>
          <div className="flex flex-wrap gap-6 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <span>🕐 {squad.training}</span>
            <span>📧 {squad.contact}</span>
            <span>👥 {squad.players.length} Players</span>
          </div>
        </div>
      </section>

      {/* Players grouped by position */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(grouped).map(([position, players]) => (
            <div key={position} className="mb-14">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight">
                  {position}s
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  {players.length} player{players.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {players
                  .sort((a, b) => a.number - b.number)
                  .map(player => (
                    <PlayerCard key={player.id} player={player} color={squad.color} />
                  ))}
              </div>
            </div>
          ))}

          <div className="mt-4 pt-10 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
            <button onClick={onBack} className="btn-outline">← Back to Teams</button>
            <Link href="/register" className="btn-primary">Join This Team</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState(null)

  if (selectedTeam) {
    return (
      <div className="pt-[72px]">
        <SquadView squad={SQUADS[selectedTeam]} onBack={() => setSelectedTeam(null)} />
      </div>
    )
  }

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20" style={{ background: '#f0faf0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label">Our Teams</div>
          <h1 className="font-display font-black text-5xl sm:text-6xl mt-2">Club Teams</h1>
          <p className="text-gray-600 text-lg mt-4 max-w-xl mx-auto">
            From youth to senior football, Himalayan FC has a team for every player.
            Click a team to view the full squad.
          </p>
        </div>
      </section>

      {/* Team cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {Object.entries(SQUADS).map(([key, team]) => (
            <div
              key={key}
              onClick={() => setSelectedTeam(key)}
              className="grid lg:grid-cols-3 gap-0 rounded-sm overflow-hidden border border-green-100 card-hover cursor-pointer"
            >
              {/* Color panel */}
              <div className="p-10 flex flex-col justify-center" style={{ background: team.color }}>
                <div className="text-5xl mb-4">⚽</div>
                <div className="text-white/60 text-xs font-bold tracking-widest uppercase mb-1">{team.tag}</div>
                <h2 className="font-display font-black text-3xl text-white mb-2">{team.name}</h2>
                <div className="text-white/70 text-sm">{team.players.length} Players</div>
              </div>

              {/* Info panel */}
              <div className="lg:col-span-2 p-10 flex flex-col justify-between">
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {POSITION_ORDER.map(pos => {
                      const count = team.players.filter(p => p.position === pos).length
                      return (
                        <div key={pos} className="p-3 rounded-sm text-center" style={{ background: '#f0faf0' }}>
                          <div className="font-display font-bold text-2xl" style={{ color: team.color }}>{count}</div>
                          <div className="text-xs font-medium text-gray-500 mt-0.5">{pos}s</div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="text-sm text-gray-500 mb-1.5">🕐 {team.training}</div>
                  <div className="text-sm text-gray-500">📧 {team.contact}</div>
                </div>
                <div className="mt-6 font-bold text-sm" style={{ color: team.color }}>
                  View Full Squad →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: '#f0faf0' }}>
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