import slugify from 'slugify'

export function makeSlug(title: string) {
  return slugify(title, { lower: true, strict: true }) + '-' + Date.now().toString(36)
}
