'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { login } from '../../apiService/userService';
import './page.css';
export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState({ isError: false, errorMessage: "" });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      emailAddress: email,
      password: password
    }
    const response = await login(user);
    console.log('RESPONSE = ', response)
    if (response.name === 'Error') {
      setError({ isError: true, errorMessage: response.message });
      setEmail('');
      setPassword('');
      return;
    } else {
      setError({ isError: false, errorMessage: "" });
      setEmail('');
      setPassword('');
      router.push("/profile-edit");
    // This might need some extra steps as the app grows
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="logo-container">
          <Image
            src={"/new-logo-yellow.png"}
            alt="Collabor8 Logo"
            width={249}
            height={61}
            priority
          />
        </div>
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <Input
              required={true}
              type='email'
              name='email'
              label='Email'
              value={email}
              placeholder="Your email"
              status="default"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              required={true}
              type='password'
              name='password'
              label='Password'
              value={password}
              placeholder="Your password"
              status="default"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {error.isError && (
              <div className="login-form__error">
                <span className="bodytext3 bodytext3_semibold error">
                  {error.errorMessage}
                </span>
              </div>
            )}
            <div className="login-form__button">
              <Button
                variant="primary"
                type="submit"
                label="Login"
                disabled={false}
              />
            </div>
          </form>
          <div className="register">
            <span className="bodytext2">
              Don't have an account
              <Link href="/register">
                <span className="register__link">Register</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
