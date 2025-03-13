import Link from 'next/link';
import Image from 'next/image';

export const HeaderIcon = ({ url }: { url: string }) => {
  return (
    <Link href={url}>
      <Image
        src={'/jammaii-logo.png'}
        height={100}
        width={150}
        alt="Avatar"
        className="mx-auto"
      />
    </Link>
  );
};
