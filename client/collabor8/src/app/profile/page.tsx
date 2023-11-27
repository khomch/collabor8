'use client';
import Modal from '@/components/modal/modal';
import Link from 'next/link';
import { useState } from 'react';
import './profile.css';
import Review from '@/components/review/review';

export default function Profile() {
  const [showModal, setShowModal] = useState(false);

  // TODO delete modal and class profile__button
  return (
    <div className="profile">
      <h1 className="bodytext1">Profile Page</h1>
      <Link href="/">Go back</Link>
      <button className="profile__button" onClick={() => setShowModal(true)}>
        Show modal
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Review />
        </Modal>
      )}
    </div>
  );
}
