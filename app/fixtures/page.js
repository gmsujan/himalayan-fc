'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Calendar, MapPin, Clock } from 'lucide-react'

const SAMPLE_FIXTURES = [
  { id: 1, home_team: 'Himalayan FC', away_team: 'Hamilton AFC', match_date: '2025-03-15T14:00', venue: 'Porritt Stadium', competition: 'Hamilton League', status: 'upcoming', home_score: null, away_score: null },
  { id: 2, home_team: 'Waikato United', away_team: 'Himalayan FC', match_date: '2025-03-22T15:00', venue: 'FMG Stadium', competition: 'Hamilton League', status: 'upcoming', home_score: null, away_score: null },
  { id: 3, home_team: 'Himalayan FC', away_team: 'Central FC', match_date: '2025-02-01T14:00', venue: 'Porritt Stadium', competition: 'Hamilton League', status: 'completed', home_score: 2, away_score: 1 },
  { id: 4, home_team: 'River City', away_team: 'Himalayan FC', match_date: '2025-01-18T13:00', venue: 'River Park', competition: 'Hamilton League', status: 'completed', home_score: 0, away_score: 3 },
]

function FixtureCard({ fixture }) {
  const isCompleted = fixture.status === 'completed'
  const date = new Date(fixture.match_date)
  const dateStr = date.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
  const timeStr = date.toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' })
  const isHimalayan = (team) => team.toLowerCase().includes('himalayan')

  return (
    <div className="bg-white rounded-sm border border-green-100 p-6 card-hover">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold tracking-widest uppercase" style={{color:'#1e6e1e'}}>{fixture.competition}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${
          isCompleted ? 'bg-gray-100 text-gray-600' : 'text-white'
        }`} style={!isCompleted ? {background:'#1e6e1e'} : {}}>
          {isCompleted ? 'FT' : 'Upcoming'}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className={`flex-1 text-right font-display font-bold text-lg ${isHimalayan(fixture.home_team) ? '' : 'text-gray-700'}`}
          style={isHimalayan(fixture.home_team) ? {color:'#1e6e1e'} : {}}>
          {fixture.home_team}
        </div>
        <div className="text-center px-4 py-2 rounded-sm min-w-[70px]" style={{background:'#f0faf0'}}>
          {isCompleted ? (
            <span className="font-display font-black text-xl">
              {fixture.home_score} – {fixture.away_score}
            </span>
          ) : (
            <span className="font-bold text-sm text-gray-500">VS</span>
          )}
        </div>
        <div className={`flex-1 font-display font-bold text-lg ${isHimalayan(fixture.away_team) ? '' : 'text-gray-700'}`}
          style={isHimalayan(fixture.away_team) ? {color:'#1e6e1e'} : {}}>
          {fixture.away_team}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3 flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar size={12} /> {dateStr}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} /> {timeStr}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {fixture.venue}
        </span>
      </div>
    </div>
  )
}

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState(SAMPLE_FIXTURES)
  const [tab, setTab] = useState('upcoming')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return
      setLoading(true)
      const { data, error } = await supabase
        .from('fixtures')
        .select('*')
        .order('match_date', { ascending: true })
      if (!error && data && data.length > 0) setFixtures(data)
      setLoading(false)
    }
    load()
  }, [])

  const upcoming = fixtures.filter(f => f.status === 'upcoming')
  const completed = fixtures.filter(f => f.status === 'completed')
  const shown = tab === 'upcoming' ? upcoming : completed

  return (
    <div className="pt-[72px]">
      <section className="py-20" style={{background:'#f0faf0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label">Schedule</div>
          <h1 className="font-display font-black text-5xl sm:text-6xl mt-2">Fixtures & Results</h1>
          <p className="text-gray-600 text-lg mt-4">Follow Himalayan FC through the season</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex rounded-sm overflow-hidden border border-green-200 mb-10 w-fit mx-auto">
            {['upcoming', 'results'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-3 text-sm font-bold tracking-widest uppercase transition-colors ${
                  tab === t ? 'text-white' : 'text-gray-600 bg-white hover:bg-green-50'
                }`}
                style={tab === t ? {background:'#1e6e1e'} : {}}
              >
                {t === 'upcoming' ? `Upcoming (${upcoming.length})` : `Results (${completed.length})`}
              </button>
            ))}
          </div>

          {loading && <p className="text-center text-gray-500">Loading fixtures...</p>}

          <div className="space-y-4">
            {shown.length > 0 ? (
              shown.map(f => <FixtureCard key={f.id} fixture={f} />)
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar size={48} className="mx-auto mb-3 opacity-30" />
                <p>No fixtures to display yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
