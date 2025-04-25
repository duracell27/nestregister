/* eslint-disable no-unsafe-finally */
"use server";

import { signUpFormData } from "@/app/auth/signup/SignUpForm";

import { signInFormData } from "@/app/auth/signin/SignInForm";
import { createSession, deleteSession, getSession, updateTokens } from "../session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { BACKEND_URL, FRONTEND_URL } from "../constants";
import { authFetch } from "../authFetch";

export const signUp = async (formData: signUpFormData) => {
  try {
   
    const response = await fetch(
      `${BACKEND_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      return {
        status: "success",
        message: "User created successfully!",
      };
    }else{
      return {
        status: "error",
        message: response.status === 409
        ? "The user is already existed!"
        : response.statusText,
      };
    }
  } catch (error: any) {
    return {
      status: "error",
      message: error.response.data.message,
    };
  }
};

export const signIn = async (formData: signInFormData) => {
  try {

    const response = await fetch(
      `${BACKEND_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      const result = await response.json();

      await createSession({
        user: {
          id: result.id,
          name: result.name,
          role: result.role,
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });

      return {
        status: "success",
        message: "User login successfully!",
      };
     
    }else{
      return {
        status: "error",
        message: response.status === 401
        ? "Invalid Credentials!"
        : response.statusText
      }
    }
  } catch (error: any) {
    console.log(error)
  }
};

export async function logout() {

  const response = await authFetch(`${BACKEND_URL}/auth/signout`,{
    method: 'POST'
  });

  if (response.ok) {
    await deleteSession();
  }

 
  revalidatePath("/");
  redirect("/");
}

export async function getProtectedData() {
  
  //  TEST
  const response = await authFetch(`${BACKEND_URL}/auth/protected`);

  const result = await response.json();
  return result;
}

export const refreshToken = async (
  oldRefreshToken: string
) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: oldRefreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to refresh token" + response.statusText
      );
    }

    const { accessToken, refreshToken } =
      await response.json();
    // update session with new tokens
    const updateRes = await fetch(
      `${FRONTEND_URL}/api/auth/update`,
      {
        method: "POST",
        body: JSON.stringify({
          accessToken,
          refreshToken,
        }),
      }
    );
    if (!updateRes.ok)
      throw new Error("Failed to update the tokens");

    return accessToken;
  } catch (err) {
    console.error("Refresh Token failed:", err);
    return null;
  }
};
