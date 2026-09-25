import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

config({ path: '.env' })

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const filename = '812281491_1618340003245797_3930328719509812750_n.jpg'
const file = readFileSync(`public/uploads/messages/${filename}`)

const { error } = await supabase.storage
  .from('uploads')
  .upload(`messages/${filename}`, file, { contentType: 'image/jpeg', upsert: true })

if (error) console.error(error)
else console.log('Uploaded successfully')
