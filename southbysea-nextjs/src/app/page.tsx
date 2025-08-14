'use client'
import Link from 'next/link'
import { addDays, format } from 'date-fns'

function DeliveryBadge() {
  const d = addDays(new Date(), 10)
  const label = format(d, 'EEE MMM d')
  return (
    <span className="inline-block rounded-full bg-brand-accent px-3 py-1 text-xs font-medium">
      Delivery on/around {label}
    </span>
  )
}

export default function Home() {
  return (
    <div>
      <section className="relative">
        <div className="container py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="font-display text-4xl md:text-6xl leading-tight">We’re your source for custom apparel and promotional items!</h1>
            <p className="text-lg md:text-xl text-black/70">Greek life, college, business, or events, South by Sea is here wherever life takes you!</p>
            <div className="flex items-center gap-3">
              <Link href="/get-started" className="btn-primary">Let’s Get Started</Link>
              <DeliveryBadge />
            </div>
          </div>
          <div className="aspect-[4/3] bg-white rounded-xl2 shadow-soft border border-black/5 flex items-center justify-center text-black/60">Hero Image Area</div>
        </div>
      </section>

      <section className="container py-12 grid md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-2">Fast & Free Shipping</h3>
          <p className="text-black/70">Delivery on/around <strong>{format(addDays(new Date(),10),'EEE MMM d')}</strong> for orders placed by midnight, or ask about RUSH shipping!</p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-2">100% Customizable</h3>
          <p className="text-black/70">Choose from over 5,000 premade designs that we can modify for you, or start from scratch!</p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-2">We do it all!</h3>
          <p className="text-black/70">Industry‑leading DTF, embroidery, patches, or rhinestones — decorate however you want!</p>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full h-[300px]">
          <iframe
            src="https://cdn.lightwidget.com/widgets/placeholder.html"
            className="w-full h-full border-0 overflow-hidden"
            title="Instagram"
          ></iframe>
        </div>
      </section>
    </div>
  )
}
