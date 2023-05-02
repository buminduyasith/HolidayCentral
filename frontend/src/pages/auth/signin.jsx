import React, { useRef } from 'react';
import Head from 'next/head';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Signin = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log("email",email)
    const result = await signIn("credentials",{
        username:email,
        password:password,
        redirect: true,
        callbackUrl:"/auth/callback"
    })
    // You could submit the form data to a server here
  }

  return (
    <>
      <div className="container my-5">
        <h1 className="mb-4">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" ref={emailRef} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" ref={passwordRef} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link href="/auth/resetpassword" passHref legacyBehavior>
          <button className="btn btn-primary">Reset Password</button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Signin;