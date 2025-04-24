import Link from "next/link";
import React from "react";
import { SignUpForm } from "./SignInForm";
import { BACKEND_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center justify-center">
      <h1 className="text-center mb-4 text-3xl font-bold">Sign In</h1>

      <SignUpForm />
      <div className="flex justify-between text-sm">
        <p>Don't have an account? </p>
        <Link className="font-bold" href="/auth/signup">
          {" "}
          Sign Up
        </Link>
      </div>
      <hr />
      <div className="flex flex-col text-sm w-full">
        <p className="text-center mt-5">Or sign in with: </p>
        <Button className="w-full">
          <Link className="font-bold w-full" href={`${BACKEND_URL}/auth/google/login`}>
            {" "}
            Google
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
