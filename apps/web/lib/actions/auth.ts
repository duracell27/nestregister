/* eslint-disable no-unsafe-finally */
"use server";

import { signUpFormData } from "@/app/auth/signup/SignUpForm";
import api from "../api";
import { signInFormData } from "@/app/auth/signin/SignInForm";
import { createSession, deleteSession, getSession } from "../session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const signUp = async (formData: signUpFormData) => {
  try {
    const response = await api.post("/auth/signup", formData);

    if (response.status === 201) {
      return {
        status: "success",
        message: "User created successfully!",
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
    const response = await api.post("/auth/signin", formData);

    if (response.status === 201) {
      await createSession({
        user: {
          id: response.data.id,
          name: response.data.name,
        },
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });

      return {
        status: "success",
        message: "User login successfully!",
      };
    }
  } catch (error: any) {
    console.log("error", error);
    return {
      status: "error",
      message: error.response?.data?.message,
    };
  }
};

export async function logout() {
  await deleteSession();
  revalidatePath("/");
  redirect("/");
}

export async function getProtectedData() {
 const session = await getSession();
 

  try {
    const response = await api.get("/auth/protected", {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    return response.data
  } catch (error) {
    console.log('web',error);
  }
  

  
}
