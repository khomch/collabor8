'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import './page.css';

export default function Register() {

  const [form, setForm] = useState({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    repeatPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted!');
    // TODO add register logic
  };

  return (
    <>
      <div className='register-page'>
        <div className='logo-container'>
          <Image
            src={'/new-logo-yellow.png'}
            alt='Collabor8 Logo'
            width={249}
            height={61}
            priority
          />
        </div>
        <div className='register-container'>
          <form onSubmit={handleSubmit} className='register-form'>
            <Input
              type='email'
              name='email'
              label='Email'
              value={form.email}
              placeholder='Your email'
              status='default'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Input
              type='text'
              name='username'
              label='Username'
              value={form.username}
              placeholder='Your username'
              status='default'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Input
              type='text'
              name='firstname'
              label='First name'
              value={form.firstname}
              placeholder='Your first name'
              status='default'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Input
              type='text'
              name='lastname'
              label='Last name'
              value={form.lastname}
              placeholder='Your last name'
              status='default'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Input
              type='password'
              name='password'
              label='Password'
              value={form.password}
              placeholder='Your password'
              status='default'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Input
              type='password'
              name='repeatPassword'
              label='Repeat password'
              value={form.repeatPassword}
              placeholder='Repeat your password'
              status='default'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <div className='register-form__button'>
              <Button
                variant='primary'
                type='submit'
                label='Register'
                disabled={false}
              />
            </div>
          </form>
          <div className='login'>
            <span className='bodytext2'>
              Already have and account?&nbsp;
              <Link href='/login'>
                <span className='login__link'>Login</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
