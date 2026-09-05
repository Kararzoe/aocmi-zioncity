import { SignJWT, jwtVerify } from 'jose'
import { getCookie } from 'h3'

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || 'aocmi-zioncity-secret-key-2024')

export async function signToken(payload: object) {
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(await secret())
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, await secret())
    return payload as any
  } catch {
    return null
  }
}

export async function requireAuth(event: any) {
  const token = getCookie(event, 'auth_token')
  if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })
  const payload = await verifyToken(token)
  if (!payload) throw createError({ statusCode: 401, message: 'Unauthorized' })
  return payload
}

export async function requireSuperAdmin(event: any) {
  const user = await requireAuth(event)
  if (!user.isSuperAdmin) throw createError({ statusCode: 403, message: 'Forbidden' })
  return user
}
