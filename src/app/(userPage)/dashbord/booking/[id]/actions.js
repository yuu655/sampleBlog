"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export const submitBooking = async (formData) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    id: formData.get("mentorId"),
  };
  console.log(data.id)
  const { error } = await supabase.from("meetings").insert({
    title: data.title,
    description: data.description,
    mentor: data.id,
    user: user.id,
  });
  redirect("/dashbord/user")
};
