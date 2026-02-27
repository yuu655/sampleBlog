"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const submitBooking = async (mentorId, prevState, formData) => {
  const title = formData.get("title");
  const description = formData.get("description");

  // バリデーション
  if (!title) return { error: "相談内容を選択してください" };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "ログインが必要です" };

  // ロール確認
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "user") return { error: "権限がありません" };

  // mentorの存在確認
  const { data: mentor } = await supabase
    .from("mentors")
    .select("id")
    .eq("id", mentorId)
    .single();
  if (!mentor) return { error: "メンターが存在しません" };

  const { error } = await supabase.from("meetings").insert({
    title,
    description,
    mentor: mentorId,
    user: user.id,
  });

  if (error) return { error: "予約の作成に失敗しました" };

  redirect("/dashboard/user");
};