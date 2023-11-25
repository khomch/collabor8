'use client';
import Link from 'next/link';
import Modal from '@/components/modal/modal';

export default function LandingPage() {
  return (
    <>
      <h1 className="bodytext1">Landing Page / Login</h1>
      <Modal onClose={() => console.log('MODAL CLOSED')}>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </Modal>
      <Link href="/register">Register</Link>
    </>
  );
}
