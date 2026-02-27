'use server' // ← ファイルの先頭に必ずこれを書く

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function updateUserIcon(inputFiles) {
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
    redirect('/dashboard/user');
  }
}

async function updateUserProfile(prevState, formData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('users')
    .update({ name: formData.get("name"), grade: formData.get("grade") })
    .eq('id', user.id)

  if (!error) {
    revalidatePath('/dashboard/user') // これで画面が更新される
    redirect('/dashboard/user');
  }
}

async function updateMentorIcon(inputFiles) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('mentors')
    .update({ icon: inputFiles })
    .eq('id', user.id)

  if (!error) {
    revalidatePath('/dashboard/mentor') // これで画面が更新される
    redirect('/dashboard/mentor');
  }
}

async function updateMentorProfile(prevState, formData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('mentors')
    .update({ name: formData.get("name"), grade: formData.get("grade") })
    .eq('id', user.id)

  if (!error) {
    revalidatePath('/dashboard/mentor') // これで画面が更新される
    redirect('/dashboard/mentor');
  }
}

export {updateUserIcon, updateMentorIcon, updateUserProfile, updateMentorProfile};