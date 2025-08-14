import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const search = url.searchParams.toString()
  const base = process.env.SSAW_BASE_URL || 'https://api.ssactivewear.com/v2'
  const endpoint = `${base}/products${search ? `?${search}` : ''}`

  const username = process.env.SSAW_USERNAME!
  const password = process.env.SSAW_PASSWORD!
  const apiKey = process.env.SSAW_API_KEY!

  const auth = Buffer.from(`${username}:${password}`).toString('base64')

  try {
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Basic ${auth}`,
        'x-api-key': apiKey,
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: `S&S error ${res.status}`, detail: text }, { status: 502 })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (e: any) {
    return NextResponse.json({ error: 'Upstream failed', detail: e?.message }, { status: 500 })
  }
}
