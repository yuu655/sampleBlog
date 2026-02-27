"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function submitUser(formData) {
  const data = {
    name: formData.get("name"),
    grade: formData.get("grade"),
  };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error: error_update } = await supabase
    .from("profiles")
    .update({
      role: "user",
    })
    .eq("id", user.id);
  if (error_update) {
    throw error_update;
  }
  const { error: error_insert } = await supabase.from("users").insert([
    {
      id: user.id,
      name: data.name,
      grade: data.grade,
    },
  ]);
  if (error_insert) {
    throw error_insert;
  }
  redirect("/dashboard/user");
}

async function submitMentor(formData) {
  const data = {
    name: formData.get("name"),
    university: formData.get("university"),
    faculty: formData.get("faculty"),
    description: formData.get("description"),
    region: formData.get("region"),
  };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error: error_update } = await supabase
    .from("profiles")
    .update({
      role: "mentor",
    })
    .eq("id", user.id);
  if (error_update) {
    throw error_update;
  }
  const { error: error_insert } = await supabase.from("mentors").insert([
    {
      id: user.id,
      name: data.name,
      university: data.university,
      faculty: data.faculty,
      description: data.description,
      region: data.region,
    },
  ]);
  if (error_insert) {
    throw error_insert;
  }
  redirect("/dashboard/mentor");
}

export { submitMentor, submitUser };
