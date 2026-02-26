"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export const submitBooking = async (formData) => {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    id: formData.get("mentorId"),
  };
  if(data.title === "") {
    return { error: "相談内容を選択してください" };
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.from("meetings").insert({
    title: data.title,
    description: data.description,
    mentor: data.id,
    user: user.id,
  });
  if(error) return { error: "予約の作成に失敗しました" };
  redirect("/dashbord/user")
};
