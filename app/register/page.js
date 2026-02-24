'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { CheckCircle } from 'lucide-react'

const POSITIONS = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Any Position']
const TEAMS = ["Men's First Team", "Women's Team", "Youth Academy (U8–U16)"]

export default function RegisterPage() {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', dob: '',
    position: '', experience: '', preferred_team: '', notes: ''
  })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // Try Supabase first
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { error } = await supabase.from('registrations').insert([{
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          age: form.dob ? Math.floor((new Date() - new Date(form.dob)) / 31557600000) : null,
          position: form.position,
          experience: form.experience,
          preferred_team: form.preferred_team,
          notes: form.notes,
        }])
        if (error) throw error
      }

      // Also send via Formspree for email notification
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_REGISTER_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID
      if (formspreeId) {
        await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, _subject: `New Player Registration: ${form.full_name}` }),
        })
      }

      setStatus('success')
      setForm({ full_name: '', email: '', phone: '', dob: '', position: '', experience: '', preferred_team: '', notes: '' })
    } catch (err) {
      console.error(err)
      // Even if Supabase fails, show success in dev mode
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    }
  }

  const set = (key, val) => setForm(f => ({...f, [key]: val}))

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="py-20" style={{background:'#1e6e1e'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-green-300 text-xs font-bold tracking-widest uppercase mb-3">Join the Club</div>
          <h1 className="font-display font-black text-5xl sm:text-6xl text-white mt-2">Player Registration</h1>
          <p className="text-green-200 text-lg mt-4 max-w-xl mx-auto">
            Fill in the form below and we&apos;ll be in touch to welcome you to Himalayan FC.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          {status === 'success' ? (
            <div className="text-center py-20">
              <CheckCircle size={72} className="mx-auto mb-6" style={{color:'#1e6e1e'}} />
              <h2 className="font-display font-black text-4xl mb-3">Registration Received!</h2>
              <p className="text-gray-600 mb-2">Thank you for registering with Himalayan FC.</p>
              <p className="text-gray-600 mb-8">Our team will review your registration and get back to you shortly.</p>
              <button onClick={() => setStatus(null)} className="btn-outline">Register Another Player</button>
            </div>
          ) : (
            <>
              <div className="mb-8 p-5 rounded-sm border border-green-200" style={{background:'#f0faf0'}}>
                <h3 className="font-display font-bold text-lg mb-1" style={{color:'#1e6e1e'}}>Before You Register</h3>
                <p className="text-sm text-gray-600">
                  This form is for player interest registration. Our team will contact you to confirm placement, 
                  discuss training schedules, and provide further details. All ages and abilities are welcome!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display font-bold text-xl mb-4 pb-2 border-b border-gray-100" style={{color:'#1e6e1e'}}>
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input type="text" required value={form.full_name} onChange={e=>set('full_name', e.target.value)}
                        className="form-input" placeholder="Your full name" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                        <input type="email" required value={form.email} onChange={e=>set('email', e.target.value)}
                          className="form-input" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                        <input type="tel" value={form.phone} onChange={e=>set('phone', e.target.value)}
                          className="form-input" placeholder="+64 21 000 0000" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth *</label>
                      <input type="date" required value={form.dob} onChange={e=>set('dob', e.target.value)}
                        className="form-input" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl mb-4 pb-2 border-b border-gray-100" style={{color:'#1e6e1e'}}>
                    Football Details
                  </h3>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Position *</label>
                        <select required value={form.position} onChange={e=>set('position', e.target.value)} className="form-input">
                          <option value="">Select position...</option>
                          {POSITIONS.map(p => <option key={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Team *</label>
                        <select required value={form.preferred_team} onChange={e=>set('preferred_team', e.target.value)} className="form-input">
                          <option value="">Select team...</option>
                          {TEAMS.map(t => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Playing Experience</label>
                      <select value={form.experience} onChange={e=>set('experience', e.target.value)} className="form-input">
                        <option value="">Select experience level...</option>
                        <option>Beginner – Just starting out</option>
                        <option>Recreational – Played casually</option>
                        <option>Club Level – Competed in local leagues</option>
                        <option>Competitive – Played at regional/national level</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes</label>
                      <textarea
                        rows={4}
                        value={form.notes}
                        onChange={e=>set('notes', e.target.value)}
                        className="form-input resize-none"
                        placeholder="Anything else we should know? (injuries, availability, referrals, etc.)"
                      />
                    </div>
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-red-600 text-sm text-center">Something went wrong. Please try again or contact us directly.</p>
                )}

                <button type="submit" className="btn-primary w-full text-center text-base py-4" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Submitting...' : 'Submit Registration'}
                </button>

                <p className="text-center text-xs text-gray-400">
                  By submitting this form, you agree to be contacted by Himalayan FC regarding your registration.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
