'use client'
export const dynamic = "force-dynamic";

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// ============================================
// ADD YOUR IMAGES HERE
// Put your image files in /public/gallery/
// Then list them below with caption and category
// Categories: 'Training' | 'Matches' | 'Events' | 'Youth' | 'Community'
// ============================================
const GALLERY = [
  { id: 1,  url: '/gallery/1.jpg',  caption: 'Team Training Session',  category: 'Training'   },
  { id: 2,  url: '/gallery/2.jpg',  caption: 'Match Day',              category: 'Matches'    },
  { id: 3,  url: '/gallery/3.jpg',  caption: 'Club Celebrations',      category: 'Events'     },
  { id: 4,  url: '/gallery/4.jpg',  caption: 'Youth Academy',          category: 'Youth'      },
  { id: 5,  url: '/gallery/5.jpg',  caption: 'Training Ground',        category: 'Training'   },
  { id: 6,  url: '/gallery/1.jpg',  caption: 'Community Event',        category: 'Community'  },
  // Add more images below — just copy and paste a line and change the details:
  // { id: 7, url: '/gallery/photo7.jpg', caption: 'Your Caption', category: 'Matches' },
]

const CATEGORIES = ['All', 'Training', 'Matches', 'Events', 'Youth', 'Community']

export default function GalleryPage() {
  const [filter, setFilter]   = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const shown = filter === 'All' ? GALLERY : GALLERY.filter(g => g.category === filter)

  const prev = () => {
    const idx = shown.findIndex(g => g.id === lightbox.id)
    setLightbox(shown[(idx - 1 + shown.length) % shown.length])
  }
  const next = () => {
    const idx = shown.findIndex(g => g.id === lightbox.id)
    setLightbox(shown[(idx + 1) % shown.length])
  }

  return (
    <div className="pt-[72px]">
      <section className="py-20" style={{ background: '#f0faf0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label">Media</div>
          <h1 className="font-display font-black text-5xl sm:text-6xl mt-2">Photo Gallery</h1>
          <p className="text-gray-600 text-lg mt-4">Moments from the pitch and beyond</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map(cat => {
              const count = cat === 'All' ? GALLERY.length : GALLERY.filter(g => g.category === cat).length
              if (count === 0 && cat !== 'All') return null
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 text-sm font-bold tracking-widest uppercase rounded-sm transition-colors border ${
                    filter === cat
                      ? 'text-white border-transparent'
                      : 'text-gray-600 border-gray-200 bg-white hover:border-green-300'
                  }`}
                  style={filter === cat ? { background: '#1e6e1e' } : {}}
                >
                  {cat} <span className="opacity-60 font-normal">({count})</span>
                </button>
              )
            })}
          </div>

          {/* Grid */}
          {shown.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No photos in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {shown.map((item) => (
                <div
                  key={item.id}
                  className="relative group overflow-hidden rounded-sm cursor-pointer aspect-[4/3] bg-gray-100"
                  onClick={() => setLightbox(item)}
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Shows a placeholder if image not found
                      e.target.style.display = 'none'
                      e.target.parentElement.style.background = '#f0faf0'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
                    <p className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {item.caption}
                    </p>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-2 py-1 rounded-sm text-white opacity-0 group-hover:opacity-100 transition-all"
                      style={{ background: '#1e6e1e' }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12 pt-10 border-t border-gray-100">
            <p className="text-gray-500 mb-4">See more photos and videos on our Facebook page</p>
            <a
              href="https://www.facebook.com/profile.php?id=61560016473754"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            <ChevronLeft size={48} />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
            <img
              src={lightbox.url}
              alt={lightbox.caption}
              className="w-full max-h-[80vh] object-contain rounded-sm"
            />
            <p className="text-white text-center mt-3 font-medium">{lightbox.caption}</p>
            <p className="text-green-400 text-center text-xs mt-1 tracking-widest uppercase">{lightbox.category}</p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </div>
  )
}