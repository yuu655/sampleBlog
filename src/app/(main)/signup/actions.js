"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: "ログインに失敗しました: " + error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard/account"); // 成功時はリダイレクト
}

export async function signup(formData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: "サインアップに失敗しました: " + error.message };
  }

  // サインアップ成功時は、メール確認が必要なためリダイレクトせずにメッセージを期待する
  return { success: true };
}