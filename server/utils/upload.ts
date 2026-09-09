import { extname } from 'path'

export async function saveFile(file: { arrayBuffer: () => Promise<ArrayBuffer>, name: string }, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const ext = extname(file.name) || '.jpg'
  const name = `${Date.now()}${ext}`
  const path = `${folder}/${name}`

  const supabaseUrl = process.env.SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_KEY!

  const res = await fetch(`${supabaseUrl}/storage/v1/object/uploads/${path}`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/octet-stream',
      'x-upsert': 'true',
    },
    body: buffer,
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Upload failed: ${err}`)
  }

  return `${supabaseUrl}/storage/v1/object/public/uploads/${path}`
}
