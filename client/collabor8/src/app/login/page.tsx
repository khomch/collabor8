'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import './page.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted!');
    // TODO: Add login functionality
  };

  return (
    <>
      <div className='login-page'>
        <div className='logo-container'>
          <Image
            src={'/new-logo-yellow.png'}
            alt='Collabor8 Logo'
            width={249}
            height={61}
            priority
          />
        </div>
        <div className='login-container'>
          <form onSubmit={handleSubmit} className='login-form'>
            <Input
              type='email'
              name='email'
              label='Email'
              value={email}
              placeholder='Your email'
              status='default'
              onChange={() => {
                setEmail(email);
              }}
            />
            <Input
              type='password'
              name='password'
              label='Password'
              value={password}
              placeholder='Your password'
              status='default'
              onChange={() => {
                setPassword(password);
              }}
            />#
            <div className="login-form__button">
              <Button
                variant='primary'
                type='button'
                label='Login'
                onClick={() => {
                  SubmitEvent;
                }}
                disabled={false}
                />
            </div>
          </form>
          <div className='register'>
            <span className='bodytext2'>
              Don't have an account?&nbsp;
              <Link href='/register'>
                <span className='register__link'>Register</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
