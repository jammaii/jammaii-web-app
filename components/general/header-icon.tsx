import Link from 'next/link';

export const HeaderIcon = ({ url }: { url: string }) => {
  return (
    <Link href={url}>
      <h1 className="text-xl font-extrabold md:text-2xl">JAMMAII</h1>
    </Link>
  );
};
