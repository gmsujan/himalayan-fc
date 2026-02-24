'use client'
export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

const SAMPLE_NEWS = [
  {
    id: 1,
    title: 'Himalayan FC Officially Founded — Welcome to the Family!',
    content: 'We are thrilled to announce the official founding of Himalayan FC in Hamilton, New Zealand. This club is the result of months of hard work by a passionate group of individuals who share a love for football and community. We welcome everyone to join us on this exciting journey.',
    published_at: '2024-06-01',
    category: 'Club News',
  },
  {
    id: 2,
    title: 'Player Registrations Now Open for the 2025 Season',
    content: 'Registration for the 2025 football season is now open! We are looking for players of all ages and abilities to join our Men\'s, Women\'s, and Youth teams. Visit our registration page to sign up or get in touch for more information.',
    published_at: '2024-11-15',
    category: 'Registrations',
  },
  {
    id: 3,
    title: 'Himalayan FC Joins Hamilton Local Football Competition',
    content: 'We are proud to confirm that Himalayan FC has officially registered to compete in the Hamilton local football league for the 2025 season. This marks a major milestone for our club and we can\'t wait to represent our community on the pitch.',
    published_at: '2024-12-01',
    category: 'Club News',
  },
]

function NewsCard({ article }) {
  const date = new Date(article.published_at).toLocaleDateString('en-NZ', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="bg-white rounded-sm border border-green-100 overflow-hidden card-hover flex flex-col">
      <div className="h-2" style={{background:'#1e6e1e'}} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-sm" style={{background:'#f0faf0', color:'#1e6e1e'}}>
            {article.category}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar size={11} /> {date}
          </span>
        </div>
        <h3 className="font-display font-bold text-xl mb-3 leading-tight">{article.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">{article.content}</p>
      </div>
    </div>
  )
}

export default function NewsPage() {
  const [articles, setArticles] = useState(SAMPLE_NEWS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return
      setLoading(true)
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })
      if (!error && data && data.length > 0) setArticles(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="pt-[72px]">
      <section className="py-20" style={{background:'#f0faf0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label">Latest Updates</div>
          <h1 className="font-display font-black text-5xl sm:text-6xl mt-2">Club News</h1>
          <p className="text-gray-600 text-lg mt-4">Stay up to date with everything happening at Himalayan FC</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <p className="text-center text-gray-500 mb-8">Loading news...</p>}

          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map(a => <NewsCard key={a.id} article={a} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No news articles yet. Check back soon!</p>
            </div>
          )}

          <div className="text-center mt-12 pt-10 border-t border-gray-100">
            <p className="text-gray-500 mb-4">Follow us on Facebook for the latest updates</p>
            <a
              href="https://www.facebook.com/profile.php?id=61560016473754"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Follow on Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
