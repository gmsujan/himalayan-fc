'use client'
import { useState } from 'react'
import { Mail, MapPin, Facebook, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    if (!formspreeId) {
      // Dev mode — just simulate success
      setTimeout(() => setStatus('success'), 1000)
      return
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pt-[72px]">
      <section className="py-20" style={{background:'#f0faf0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="section-label">Get In Touch</div>
          <h1 className="font-display font-black text-5xl sm:text-6xl mt-2">Contact Us</h1>
          <p className="text-gray-600 text-lg mt-4">We&apos;d love to hear from you</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-display font-bold text-2xl mb-6">Reach Out</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm mt-0.5" style={{background:'#f0faf0'}}>
                  <MapPin size={18} style={{color:'#1e6e1e'}} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-0.5">Location</div>
                  <div className="text-gray-600 text-sm">Hamilton, Waikato<br/>New Zealand</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm mt-0.5" style={{background:'#f0faf0'}}>
                  <Mail size={18} style={{color:'#1e6e1e'}} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-0.5">Email</div>
                  <a href="mailto:info@himalayanfc.co.nz" className="text-green-700 text-sm hover:underline">
                    info@himalayanfc.co.nz
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-sm mt-0.5" style={{background:'#f0faf0'}}>
                  <Facebook size={18} style={{color:'#1e6e1e'}} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-0.5">Facebook</div>
                  <a
                    href="https://www.facebook.com/profile.php?id=61560016473754"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 text-sm hover:underline"
                  >
                    Himalayan FC
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-sm border border-green-100" style={{background:'#f0faf0'}}>
              <h3 className="font-display font-bold text-lg mb-2" style={{color:'#1e6e1e'}}>Training Enquiries</h3>
              <p className="text-sm text-gray-600">
                Interested in joining a team or watching a training session? 
                Send us a message and we&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <CheckCircle size={64} className="mb-4" style={{color:'#1e6e1e'}} />
                <h3 className="font-display font-bold text-3xl mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                <button onClick={() => setStatus(null)} className="btn-outline">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="form-input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    className="form-input"
                    required
                  >
                    <option value="">Select a subject...</option>
                    <option>General Enquiry</option>
                    <option>Player Registration</option>
                    <option>Sponsorship</option>
                    <option>Media / Press</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="form-input resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-red-600 text-sm">Something went wrong. Please try again or email us directly.</p>
                )}
                <button type="submit" className="btn-primary w-full text-center" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
