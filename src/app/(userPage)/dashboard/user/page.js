import UserDashboard from "@/components/dashboard/user/UserDashboard";
import { createClient } from "@/lib/supabase/server";

export default async function UserPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [
    { data: profile },
    { data: mentors },
    { data: nextMeetings },
    { data: pastMeetings },
  ] = await Promise.all([
    supabase.from("users").select("*").eq("id", user.id).single(),
    supabase.from("mentors").select("*"),
    supabase.from("meetings").select("*").eq("user", user.id).eq("is_finished", false),
    supabase.from("meetings").select("*").eq("user", user.id).eq("is_finished", true),
  ]);

  const meetings = { next: nextMeetings ?? [], past: pastMeetings ?? [] };

  return (
    <UserDashboard
      profile={profile}
      meetings={meetings}
      mentors={mentors ?? []}
    />
  );
}
