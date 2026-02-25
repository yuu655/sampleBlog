"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function submitUser(formData) {
  const data = {
    name: formData.get("name"),
    grade: formData.get("grade")
  };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error_update } = await supabase
    .from("profiles")
    .update({
      role: "user",
    })
    .eq("id", user.id);
  const { error } = await supabase.from("users").insert([
    {
    id: user.id,
      name: data.name,
      grade: data.grade
    },
  ]);
  console.log(error)
  redirect("/dashbord/user");
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
  const { error_update } = await supabase
    .from("profiles")
    .update({
      role: "mentor",
    })
    .eq("id", user.id);
  const { error_insert } = await supabase.from("mentors").insert([
    {
    id: user.id,
      name: data.name,
      university: data.university,
      faculty: data.faculty,
      description: data.description,
      region: data.region,
    },
  ]);
  console.log(error_update, error_insert)
  // type-casting here for convenience
  // in practice, you should validate your inputs

  console.log(data);
  redirect("/dashbord/mentor");
}

export { submitMentor, submitUser };
