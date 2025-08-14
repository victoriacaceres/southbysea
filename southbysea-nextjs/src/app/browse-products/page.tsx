'use client'
import { useEffect, useState } from 'react'

type Product = any

export default function BrowseProducts() {
  const [data, setData] = useState<Product[]|null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)

  useEffect(()=>{
    async function load(){
      setLoading(true)
      setError(null)
      try{
        const res = await fetch('/api/ssaw/products')
        const json = await res.json()
        if (res.ok) setData(json)
        else setError(json?.error || 'Failed to load')
      }catch(e:any){ setError(e?.message || 'Failed to load') }
      setLoading(false)
    }
    load()
  },[])

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-display mb-6">Browse Products</h1>
      {loading && <div>Loading inventory…</div>}
      {error && <div className="text-brand-red">{error}</div>}
      <div className="grid md:grid-cols-3 gap-6">
        {data?.slice(0,30).map((p:any)=> (
          <div key={p?.StyleID || p?.id} className="card p-4">
            <div className="aspect-[3/4] bg-black/5 rounded-md mb-3"/>
            <div className="font-semibold">{p?.BrandName ? `${p.BrandName} - ` : ''}{p?.StyleName || p?.name}</div>
            <div className="text-sm text-black/70">Style #{p?.StyleID || p?.id}</div>
            {p?.Colors && (
              <div className="mt-3 text-sm">
                <div className="font-medium mb-1">Inventory</div>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-auto">
                  {p.Colors.map((c:any, i:number)=> (
                    <div key={i} className="border rounded p-2">
                      <div className="truncate">{c.ColorName || c.color}</div>
                      <div className="text-xs text-black/60">{c?.QtyOnHand ?? c?.qty ?? '—'}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
