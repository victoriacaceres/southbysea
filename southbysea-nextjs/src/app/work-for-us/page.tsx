'use client'
import { useState } from 'react'

export default function WorkForUs(){
  const [open, setOpen] = useState(false)
  return (
    <div className="container py-10">
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-display">Like planning + creating t‑shirt designs?</h1>
          <p>South By Sea Campus Managers are college students who help their fellow students find the perfect products + designs for their organization's custom apparel needs.</p>
          <button className="btn-primary" onClick={()=>setOpen(true)}>APPLY NOW</button>
        </div>
        <div className="aspect-[4/3] bg-white rounded-xl2 shadow-soft border border-black/5"/>
      </section>

      <section className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="card p-6"><h3 className="font-semibold mb-2">Who we are</h3><p className="text-sm text-black/70">Add copy and imagery.</p></div>
        <div className="card p-6"><h3 className="font-semibold mb-2">About the job</h3><p className="text-sm text-black/70">Add copy and imagery.</p></div>
        <div className="card p-6"><h3 className="font-semibold mb-2">What you'll do</h3><p className="text-sm text-black/70">Add copy and imagery.</p></div>
        <div className="card p-6"><h3 className="font-semibold mb-2">Schedule</h3><p className="text-sm text-black/70">Add copy and imagery.</p></div>
        <div className="card p-6"><h3 className="font-semibold mb-2">Testimonials</h3><p className="text-sm text-black/70">Cards with quotes from current/past CMs.</p></div>
        <div className="card p-6"><h3 className="font-semibold mb-2">Requirements</h3><p className="text-sm text-black/70">List eligibility details.</p></div>
      </section>

      {open && (
        <dialog open className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="card p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Campus Manager Application</h3>
              <button onClick={()=>setOpen(false)} className="text-sm">Close</button>
            </div>
            <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e)=>{e.preventDefault(); alert('Application submitted!')}}>
              {['First Name','Last Name','Email','Phone Number','Social Media Handle','School Name','Major','Expected Graduation Date (MM/YYYY)','Organization'].map((label,i)=> (
                <label key={i} className="block sm:col-span-1">
                  {label}
                  <input required className="mt-1 w-full p-3 border rounded-md" />
                </label>
              ))}
              <label className="sm:col-span-2 block">Are you a member of any organizations or clubs on campus, and if so have you held any leadership positions?
                <textarea required className="mt-1 w-full p-3 border rounded-md min-h-[100px]" />
              </label>
              <label className="sm:col-span-2 block">What Sororities & Fraternities are you well connected with on your campus?
                <textarea required className="mt-1 w-full p-3 border rounded-md min-h-[100px]" />
              </label>
              <label className="sm:col-span-2 block">Why are you a good fit to become a Campus Manager for South By Sea?
                <textarea required className="mt-1 w-full p-3 border rounded-md min-h-[100px]" />
              </label>
              <label className="sm:col-span-2 block">How would you differentiate yourself from other Greek apparel campus representatives?
                <textarea required className="mt-1 w-full p-3 border rounded-md min-h-[100px]" />
              </label>
              <label className="sm:col-span-2 block">How many hours per week would you be available for this position?
                <textarea required className="mt-1 w-full p-3 border rounded-md min-h-[100px]" />
              </label>
              <label className="sm:col-span-2 block">How did you hear about us?
                <textarea required className="mt-1 w-full p-3 border rounded-md min-h-[100px]" />
              </label>
              <button className="btn-primary sm:col-span-2">Submit Application</button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  )
}
