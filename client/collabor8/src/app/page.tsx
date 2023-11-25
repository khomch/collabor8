"use client";
export default function LandingPage() {
import Link from 'next/link';
  return (
    <>
      <h1 className="bodytext1">Landing Page / Login</h1>
      <Link href="/register">
        Register
      </Link>
    </>
  );
}
