"use client";
import Link from 'next/link';
export default function LandingPage() {
  return (
    <>
      <h1 className="bodytext1">Landing Page / Login</h1>
      <Link href="/register">
        Register
      </Link>
    </>
  );
}
