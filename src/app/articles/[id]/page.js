import Image from "next/image";
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export async function generateStaticParams() {
  const result = await fetch(`${API_URL}blogs?limit=100`, {
    headers: {
        "X-MICROCMS-API-KEY": API_KEY
      },
    next: { revalidate: 10, tags: ['blog'] },
  }).then(res => res.json());

  return result.contents.map((article) => ({
    id: article.id,
  }));
}

export default async function Page({ params }) {
  const { id } = await params;
  const result = await fetch(`${API_URL}blogs/${id}`, {
    next: { revalidate: 10 },
    headers: {
        "X-MICROCMS-API-KEY": API_KEY
      }
  }).then(res => res.json());
  console.log(result);
  return (
    <>
      <h1>{result.title}</h1>
      {result.eyecatch && (
        <Image
          src={result.eyecatch.url}
          alt={result.title}
          width={result.eyecatch.width}
          height={result.eyecatch.height}
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: result.content }}
      />
    </>
  );
}
