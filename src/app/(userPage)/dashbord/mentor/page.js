"use server";
import DashbordComponent from "../../components/dashbordComponent";

import { createClient } from "@/lib/supabase/server";

export default async function DashbordUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("mentors")
    .select("*")
    .eq("id", user?.id)
    .single();

  const { data: mentors } = await supabase.from("mentors").select("*");

  const { data: nextMeetings } = await supabase
    .from("meetings")
    .select("*")
    .eq("mentor", user?.id)
    .eq("is_finished", false);

  const { data: pastMeetings } = await supabase
    .from("meetings")
    .select("*")
    .eq("mentor", user?.id)
    .eq("is_finished", true);

  const meetings = {
    next: nextMeetings,
    past: pastMeetings,
  };

  // console.log(profile, meetings)

  return (
    <DashbordComponent
      profile={profile}
      meetings={meetings}
      mentors={mentors}
      isMentor={true}
    />
  );
}
