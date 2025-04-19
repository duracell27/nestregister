/* eslint-disable no-unsafe-finally */
"use server";

import { signUpFormData } from "@/app/auth/signup/SignUpForm";
import api from "../api";

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
