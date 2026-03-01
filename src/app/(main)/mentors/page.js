import Mentor from "./components/mentors";
import { createClient } from "@/lib/supabase/server";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export default async function Mentors() {
  const supabase = await createClient();
  const { data: mentors } = await supabase.from("mentors").select("*").limit(3);
  console.log(mentors);
  // const mentors = await fetch(`${API_URL}mentors?limit=3`, {
  //   headers: {
  //     "X-MICROCMS-API-KEY": API_KEY,
  //   },
  //   next: { revalidate: 10, tags: ["mentor"] },
  // }).then((res) => res.json());
  // console.log(mentors);

  return (
    <>
      <Mentor mentors={mentors} />
    </>
  );
}
