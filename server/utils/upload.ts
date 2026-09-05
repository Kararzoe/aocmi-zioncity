import { writeFile, mkdir } from 'fs/promises'
import { join, extname } from 'path'

export async function saveFile(file: { arrayBuffer: () => Promise<ArrayBuffer>, name: string }, folder: string): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const ext = extname(file.name)
  const name = `${Date.now()}${ext}`
  const dir = join(process.cwd(), 'public', 'uploads', folder)
  await mkdir(dir, { recursive: true })
  await writeFile(join(dir, name), buffer)
  return name
}
