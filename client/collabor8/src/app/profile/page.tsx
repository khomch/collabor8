import Link from 'next/link';

export default function Profile() {
  return (
    <>
      <h1 className="bodytext1">Profile Page</h1>
      <Link href='/'>
        Go back
      </Link>
    </>
  )
}