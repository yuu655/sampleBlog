import Mentor from "./components/mentors";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export default async function Mentors() {
  const mentors = await fetch(`${API_URL}mentors?limit=3`, {
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
    },
    next: { revalidate: 10, tags: ["mentor"] },
  }).then((res) => res.json());

  return (
    <>
      <Mentor mentors={mentors.contents} />
    </>
  );
}
