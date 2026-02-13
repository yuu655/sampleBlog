import Image from "next/image";
import { draftMode } from "next/headers";
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export async function generateStaticParams() {
  const result = await fetch(`${API_URL}blogs?limit=10`, {
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
  const { id } = params;
  const isDraft = (await draftMode()).isEnabled;
  const draftKey = searchParams.draftKey;

  const endpoint = new URL(
    `${API_URL}blog/${id}`
  );

  // draftMode 中だけ下書きを取得
  if (isDraft && draftKey) {
    endpoint.searchParams.set('draftKey', draftKey);
  }


  const result = await fetch(endpoint, {
    next: { revalidate: 10 },
    headers: {
        "X-MICROCMS-API-KEY": API_KEY
      }
  }).then(res => res.json());
  // console.log(result);
  return (
    <>
      <button onClick={async() => {
        await fetch('api/exit_draft?redirect=/articles/');
      }}></button>
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
