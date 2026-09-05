import { prisma } from '~/server/utils/prisma'
import { requireAuth } from '~/server/utils/auth'
import { saveFile } from '~/server/utils/upload'
import { makeSlug } from '~/server/utils/slug'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const q = getQuery(event)
    const search = (q.search as string) || ''
    const page = parseInt((q.page as string) || '1')
    const perPage = 12
    const where = search ? { OR: [{ title: { contains: search, mode: 'insensitive' as const } }, { desc: { contains: search, mode: 'insensitive' as const } }] } : {}
    const [musics, total] = await Promise.all([
      prisma.music.findMany({ where, orderBy: { id: 'desc' }, skip: (page - 1) * perPage, take: perPage }),
      prisma.music.count({ where }),
    ])
    return { musics, total, pages: Math.ceil(total / perPage) }
  }

  if (event.method === 'POST') {
    const user = await requireAuth(event)
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'No form data' })
    const get = (k: string) => form.find(f => f.name === k)
    const title = get('title')?.data.toString()
    const desc = get('desc')?.data.toString()
    const imgFile = get('img')
    const trackFile = get('track')
    if (!title || !desc || !imgFile || !trackFile) throw createError({ statusCode: 400, message: 'All fields required' })
    const [img, track] = await Promise.all([
      saveFile({ arrayBuffer: async () => imgFile.data.buffer, name: imgFile.filename || 'img.jpg' }, 'music-cover-arts'),
      saveFile({ arrayBuffer: async () => trackFile.data.buffer, name: trackFile.filename || 'track.mp3' }, 'music-tracks'),
    ])
    return prisma.music.create({ data: { userId: user.id, title, desc, img, track, slug: makeSlug(title) } })
  }
})
