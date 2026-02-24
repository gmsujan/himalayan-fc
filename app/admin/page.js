'use client'
export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Users, MessageSquare, Calendar, Newspaper, Plus, Trash2, Eye, EyeOff, LogOut } from 'lucide-react'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'himalayan2024'

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white rounded-sm border border-green-100 p-6 flex items-center gap-4">
      <div className="p-3 rounded-sm" style={{background:'#f0faf0', color: color || '#1e6e1e'}}>{icon}</div>
      <div>
        <div className="text-2xl font-display font-black" style={{color: color || '#1e6e1e'}}>{value}</div>
        <div className="text-xs font-bold tracking-widest uppercase text-gray-500">{label}</div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [tab, setTab] = useState('registrations')
  const [registrations, setRegistrations] = useState([])
  const [contacts, setContacts] = useState([])
  const [fixtures, setFixtures] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [newFixture, setNewFixture] = useState({ home_team: 'Himalayan FC', away_team: '', match_date: '', venue: '', competition: 'Hamilton League', status: 'upcoming' })
  const [newArticle, setNewArticle] = useState({ title: '', content: '', category: 'Club News' })

  useEffect(() => {
    const saved = sessionStorage.getItem('hfc_admin')
    if (saved === 'true') setAuthed(true)
  }, [])

  const login = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
      sessionStorage.setItem('hfc_admin', 'true')
    } else {
      alert('Incorrect password')
    }
  }

  const logout = () => {
    setAuthed(false)
    sessionStorage.removeItem('hfc_admin')
  }

  useEffect(() => {
    if (!authed || !process.env.NEXT_PUBLIC_SUPABASE_URL) return
    setLoading(true)
    Promise.all([
      supabase.from('registrations').select('*').order('created_at', { ascending: false }),
      supabase.from('contacts').select('*').order('created_at', { ascending: false }),
      supabase.from('fixtures').select('*').order('match_date', { ascending: true }),
      supabase.from('news').select('*').order('published_at', { ascending: false }),
    ]).then(([r, c, f, n]) => {
      if (r.data) setRegistrations(r.data)
      if (c.data) setContacts(c.data)
      if (f.data) setFixtures(f.data)
      if (n.data) setNews(n.data)
      setLoading(false)
    })
  }, [authed])

  const addFixture = async () => {
    if (!newFixture.away_team || !newFixture.match_date) return alert('Please fill required fields')
    const { data, error } = await supabase.from('fixtures').insert([newFixture]).select()
    if (!error && data) {
      setFixtures(prev => [...prev, ...data])
      setNewFixture({ home_team: 'Himalayan FC', away_team: '', match_date: '', venue: '', competition: 'Hamilton League', status: 'upcoming' })
    }
  }

  const deleteFixture = async (id) => {
    await supabase.from('fixtures').delete().eq('id', id)
    setFixtures(prev => prev.filter(f => f.id !== id))
  }

  const addArticle = async () => {
    if (!newArticle.title || !newArticle.content) return alert('Please fill all fields')
    const { data, error } = await supabase.from('news').insert([{...newArticle, published_at: new Date().toISOString()}]).select()
    if (!error && data) {
      setNews(prev => [data[0], ...prev])
      setNewArticle({ title: '', content: '', category: 'Club News' })
    }
  }

  const deleteArticle = async (id) => {
    await supabase.from('news').delete().eq('id', id)
    setNews(prev => prev.filter(a => a.id !== id))
  }

  if (!authed) {
    return (
      <div className="pt-[72px] min-h-screen" style={{background:'#f0faf0'}}>
        <div className="max-w-md mx-auto px-4 py-24">
          <div className="text-center mb-8">
            <div className="section-label">Restricted Area</div>
            <h1 className="font-display font-black text-4xl mt-2">Admin Login</h1>
          </div>
          <div className="bg-white rounded-sm border border-green-100 p-8">
            <form onSubmit={login} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Admin Password</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={pw}
                    onChange={e => setPw(e.target.value)}
                    className="form-input pr-10"
                    placeholder="Enter admin password"
                    required
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const TABS = [
    { key: 'registrations', label: 'Registrations', icon: <Users size={16} /> },
    { key: 'contacts', label: 'Messages', icon: <MessageSquare size={16} /> },
    { key: 'fixtures', label: 'Fixtures', icon: <Calendar size={16} /> },
    { key: 'news', label: 'News', icon: <Newspaper size={16} /> },
  ]

  return (
    <div className="pt-[72px] min-h-screen" style={{background:'#f8f5f0'}}>
      {/* Top bar */}
      <div style={{background:'#1e6e1e'}} className="text-white px-6 py-4 flex items-center justify-between">
        <h1 className="font-display font-bold text-xl">Admin Dashboard — Himalayan FC</h1>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-green-200 hover:text-white transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users size={20} />} label="Registrations" value={registrations.length} />
          <StatCard icon={<MessageSquare size={20} />} label="Messages" value={contacts.length} />
          <StatCard icon={<Calendar size={20} />} label="Fixtures" value={fixtures.length} />
          <StatCard icon={<Newspaper size={20} />} label="Articles" value={news.length} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 flex-wrap">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-sm transition-colors ${
                tab === t.key ? 'text-white' : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
              }`}
              style={tab === t.key ? {background:'#1e6e1e'} : {}}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-500 py-8 text-center">Loading data...</p>}

        {/* Registrations */}
        {tab === 'registrations' && (
          <div className="bg-white rounded-sm border border-green-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl">Player Registrations</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{background:'#f0faf0'}}>
                    {['Name', 'Email', 'Phone', 'Position', 'Team', 'Experience', 'Date'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold tracking-widest uppercase text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {registrations.length === 0 && (
                    <tr><td colSpan={7} className="text-center py-8 text-gray-400">No registrations yet</td></tr>
                  )}
                  {registrations.map((r, i) => (
                    <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-medium">{r.full_name}</td>
                      <td className="px-4 py-3 text-gray-600">{r.email}</td>
                      <td className="px-4 py-3 text-gray-600">{r.phone || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{r.position || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{r.preferred_team || '—'}</td>
                      <td className="px-4 py-3 text-gray-600">{r.experience || '—'}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{new Date(r.created_at).toLocaleDateString('en-NZ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contacts */}
        {tab === 'contacts' && (
          <div className="bg-white rounded-sm border border-green-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-display font-bold text-xl">Contact Messages</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {contacts.length === 0 && <p className="text-center py-8 text-gray-400">No messages yet</p>}
              {contacts.map(c => (
                <div key={c.id} className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleDateString('en-NZ')}</span>
                  </div>
                  <div className="text-sm text-green-700 mb-2">{c.email}</div>
                  <p className="text-sm text-gray-600">{c.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fixtures */}
        {tab === 'fixtures' && (
          <div className="space-y-6">
            {/* Add fixture form */}
            <div className="bg-white rounded-sm border border-green-100 p-6">
              <h3 className="font-display font-bold text-lg mb-4" style={{color:'#1e6e1e'}}>Add New Fixture</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <input value={newFixture.home_team} onChange={e=>setNewFixture({...newFixture, home_team: e.target.value})}
                  className="form-input" placeholder="Home Team" />
                <input value={newFixture.away_team} onChange={e=>setNewFixture({...newFixture, away_team: e.target.value})}
                  className="form-input" placeholder="Away Team *" />
                <input type="datetime-local" value={newFixture.match_date} onChange={e=>setNewFixture({...newFixture, match_date: e.target.value})}
                  className="form-input" />
                <input value={newFixture.venue} onChange={e=>setNewFixture({...newFixture, venue: e.target.value})}
                  className="form-input" placeholder="Venue" />
                <input value={newFixture.competition} onChange={e=>setNewFixture({...newFixture, competition: e.target.value})}
                  className="form-input" placeholder="Competition" />
                <select value={newFixture.status} onChange={e=>setNewFixture({...newFixture, status: e.target.value})} className="form-input">
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button onClick={addFixture} className="btn-primary mt-4 flex items-center gap-2">
                <Plus size={16} /> Add Fixture
              </button>
            </div>

            {/* Fixtures list */}
            <div className="bg-white rounded-sm border border-green-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-display font-bold text-xl">All Fixtures</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {fixtures.length === 0 && <p className="text-center py-8 text-gray-400">No fixtures yet</p>}
                {fixtures.map(f => (
                  <div key={f.id} className="flex items-center justify-between p-4">
                    <div>
                      <div className="font-medium">{f.home_team} vs {f.away_team}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(f.match_date).toLocaleDateString('en-NZ')} · {f.venue} · {f.competition}
                      </div>
                    </div>
                    <button onClick={() => deleteFixture(f.id)} className="text-red-400 hover:text-red-600 p-1.5">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* News */}
        {tab === 'news' && (
          <div className="space-y-6">
            <div className="bg-white rounded-sm border border-green-100 p-6">
              <h3 className="font-display font-bold text-lg mb-4" style={{color:'#1e6e1e'}}>Publish New Article</h3>
              <div className="space-y-3">
                <input value={newArticle.title} onChange={e=>setNewArticle({...newArticle, title: e.target.value})}
                  className="form-input" placeholder="Article title *" />
                <select value={newArticle.category} onChange={e=>setNewArticle({...newArticle, category: e.target.value})} className="form-input">
                  <option>Club News</option>
                  <option>Match Report</option>
                  <option>Registrations</option>
                  <option>Events</option>
                  <option>Community</option>
                </select>
                <textarea value={newArticle.content} onChange={e=>setNewArticle({...newArticle, content: e.target.value})}
                  className="form-input resize-none" rows={5} placeholder="Article content *" />
              </div>
              <button onClick={addArticle} className="btn-primary mt-4 flex items-center gap-2">
                <Plus size={16} /> Publish Article
              </button>
            </div>

            <div className="bg-white rounded-sm border border-green-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-display font-bold text-xl">Published Articles</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {news.length === 0 && <p className="text-center py-8 text-gray-400">No articles yet</p>}
                {news.map(a => (
                  <div key={a.id} className="flex items-start justify-between p-4">
                    <div>
                      <div className="font-medium">{a.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{a.category} · {new Date(a.published_at).toLocaleDateString('en-NZ')}</div>
                    </div>
                    <button onClick={() => deleteArticle(a.id)} className="text-red-400 hover:text-red-600 p-1.5 shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
