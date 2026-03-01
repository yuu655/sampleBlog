import MentorDashboard from "@/components/dashboard/mentor/MentorDashboard";
import { createClient } from "@/lib/supabase/server";
import { unstable_cache } from "next/cache";

export default async function MentorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // supabaseとuserIdをキャッシュの外で取得してから渡す
  const getCachedData = (supabase, userId) => unstable_cache(
    async () => {
      const [
        { data: profile },
        { data: nextMeetings },
        { data: pastMeetings },
      ] = await Promise.all([
        supabase.from("mentors").select("*").eq("id", userId).single(),
        supabase.from("meetings").select("*").eq("mentor", userId).eq("is_finished", false),
        supabase.from("meetings").select("*").eq("mentor", userId).eq("is_finished", true),
      ]);

      const allMeetings = [...(nextMeetings ?? []), ...(pastMeetings ?? [])];
      const userIds = [...new Set(allMeetings.map((m) => m.user))];
      const { data: users } = userIds.length > 0
        ? await supabase.from("users").select("id, name, grade, icon").in("id", userIds)
        : { data: [] };

      return {
        profile,
        meetings: { next: nextMeetings ?? [], past: pastMeetings ?? [] },
        users: users ?? [],
      };
    },
    [`dashboard-mentor-${userId}`],  // userIdは引数から取得
    { revalidate: 60, tags: [`dashboard-mentor-${userId}`, "meetings"] }
  );

  const { profile, meetings, users } = await getCachedData(supabase, user.id)();

  return (
    <MentorDashboard
      profile={profile}
      meetings={meetings}
      users={users}
    />
  );
}
