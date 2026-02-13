import Image from 'next/image';
import ExitButton from '../components/button';

export default function Blog({ isDraft, result }) {
  return (
    <>
      {isDraft && <ExitButton redirectTo="/" />}
      <h1>{result.title}</h1>
      {result.eyecatch && (
        <Image
          src={result.eyecatch.url}
          alt={result.title}
          width={result.eyecatch.width}
          height={result.eyecatch.height}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: result.content }} />
    </>
  );
};
