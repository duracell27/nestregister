import Link from "next/link";
import React from "react";
import { SignUpForm } from "./SignUpForm";

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center justify-center">
      <h1 className="text-center mb-4 text-3xl font-bold">Sign Up</h1>

      <SignUpForm />
      <div className="flex justify-between text-sm">
        <p>Already have an account? </p>
        <Link className="font-bold" href="/auth/signin">
          {" "}
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
