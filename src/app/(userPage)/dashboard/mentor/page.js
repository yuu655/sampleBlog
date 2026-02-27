import MentorDashboard from "@/components/dashboard/mentor/MentorDashboard";
import { createClient } from "@/lib/supabase/server";

export default async function MentorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [
    { data: profile },
    { data: nextMeetings },
    { data: pastMeetings },
  ] = await Promise.all([
    supabase.from("mentors").select("*").eq("id", user.id).single(),
    supabase.from("meetings").select("*").eq("mentor", user.id).eq("is_finished", false),
    supabase.from("meetings").select("*").eq("mentor", user.id).eq("is_finished", true),
  ]);

  const meetings = { next: nextMeetings ?? [], past: pastMeetings ?? [] };

  // meetingsに登場するuserのIDを集めてまとめて取得
  const allMeetings = [...(nextMeetings ?? []), ...(pastMeetings ?? [])];
  const userIds = [...new Set(allMeetings.map((m) => m.user))];
  const { data: users } = userIds.length > 0
    ? await supabase.from("users").select("*").in("id", userIds)
    : { data: [] };

  return (
    <MentorDashboard
      profile={profile}
      meetings={meetings}
      users={users ?? []}
    />
  );
}
