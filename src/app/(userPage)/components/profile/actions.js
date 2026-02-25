'use server' // ← ファイルの先頭に必ずこれを書く

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function updateUserProfile(inputFiles) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('users')
    .update({ icon: inputFiles })
    .eq('id', user.id)

  if (!error) {
    revalidatePath('/dashboard/user') // これで画面が更新される
  }
}

export {updateUserProfile}