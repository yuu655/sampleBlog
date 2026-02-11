import Image from "next/image";
import Link from "next/link";
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

export default async function Page() {
  const result = await fetch(`${API_URL}blogs?limit=100`, {
    headers: {
        "X-MICROCMS-API-KEY": API_KEY
      }
  }).then(res => res.json());
  console.log(result.contents[1].eyecatch);
  return (
    <>
      <h1>記事一覧</h1>
      <ul>
        {result.contents.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>{article.title}</Link>
            {article.eyecatch && (
              <Image
                src={article.eyecatch.url}
                alt={article.title}
                width={article.eyecatch.width}
                height={article.eyecatch.height}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
