import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <h1 className="bodytext1">Dashboard Page</h1>
      <Link href='/'>
        Go back
      </Link>
    </>
  )
}