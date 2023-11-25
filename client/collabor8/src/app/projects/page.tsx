import Link from 'next/link';

export default function MyProjects() {
  return (
    <>
      <h1 className="bodytext1">My Projects Page</h1>
      <Link href='/'>
        Go back
      </Link>
    </>
  )
}