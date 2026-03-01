import Mentor from "./components/mentors";
import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const getMentors = unstable_cache(
  async () => {
    const supabase = await createClient();
    const { data: mentors } = await supabase
      .from("mentors")
      .select("id, name, university, faculty, icon, specialties, region, bio");
      // .limit(3) も外れてますがこれは意図的？全件取得でいいですか？
    return mentors ?? [];
  },
  ["mentors-list"],
  { revalidate: 3600, tags: ["mentors"] }  // 1時間キャッシュ
);

export default async function Mentors() {
  // const supabase = await createClient();
  // const { data: mentors } = await supabase.from("mentors").select("*").limit(3);
  // console.log(mentors);
  // const mentors = await fetch(`${API_URL}mentors?limit=3`, {
  //   headers: {
  //     "X-MICROCMS-API-KEY": API_KEY,
  //   },
  //   next: { revalidate: 10, tags: ["mentor"] },
  // }).then((res) => res.json());
  // console.log(mentors);
  const mentors = await getMentors();
  return (
    <>
      <Mentor mentors={mentors} />
    </>
  );
}
