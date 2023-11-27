"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import { register } from "../../apiService/userService";
import "./page.css";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState({ isError: false, errorMessage: "" });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.repeatPassword) {
      setForm({
        ...form,
        password: "",
        repeatPassword: "",
      });
      setError({ isError: true, errorMessage: "Passwords did not match." });
      return;
    } else {
      setError({ isError: false, errorMessage: "" });
    }

    const newUser = {
      emailAddress: form.email,
      userName: form.username,
      password: form.password,
      firstName: form.firstname,
      lastName: form.lastname,
    };

    const response = await register(newUser);

    if (response.message) {
      setError({ isError: true, errorMessage: response.message });
      setForm({
        email: "",
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        repeatPassword: "",
      });
      return;
    }
    localStorage.setItem("token", response);
    router.push('/');
    // This might need some extra steps as the app grows
  };

  return (
    <>
      <div className="register-page">
        <div className="logo-container">
          <Image
            src={"/new-logo-yellow.png"}
            alt="Collabor8 Logo"
            width={249}
            height={61}
            priority
          />
        </div>
        <div className="register-container">
          <form onSubmit={handleSubmit} className="register-form">
            <Input
              required={true}
              type="email"
              name="email"
              label="Email"
              value={form.email}
              placeholder="Your email"
              status="default"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Input
              required={true}
              type="text"
              name="username"
              label="Username"
              value={form.username}
              placeholder="Your username"
              status="default"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Input
              required={true}
              type="text"
              name="firstname"
              label="First name"
              value={form.firstname}
              placeholder="Your first name"
              status="default"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Input
              required={true}
              type="text"
              name="lastname"
              label="Last name"
              value={form.lastname}
              placeholder="Your last name"
              status="default"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Input
              required={true}
              type="password"
              name="password"
              label="Password"
              value={form.password}
              placeholder="Your password"
              status={
                error.errorMessage === `Passwords did not match.`
                  ? "error"
                  : "default"
              }
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <Input
              required={true}
              type="password"
              name="repeatPassword"
              label="Repeat password"
              value={form.repeatPassword}
              placeholder="Repeat your password"
              status={
                error.errorMessage === `Passwords did not match.`
                  ? "error"
                  : "default"
              }
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {error.isError && (
              <div className="register-form__error">
                <span className="bodytext3 bodytext3_semibold error">
                  {error.errorMessage}
                </span>
              </div>
            )}
            <div className="register-form__button">
              <Button
                variant="primary"
                type="submit"
                label="Register"
                disabled={false}
              />
            </div>
          </form>
          <div className="login">
            <span className="bodytext2">
              Already have and account?&nbsp;
              <Link href="/login">
                <span className="login__link">Login</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
