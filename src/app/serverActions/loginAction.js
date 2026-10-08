"use server";

import { signIn } from "../auth";

export async function loginAction(loginDetails) {
  console.log("Received loginDetails in loginAction:", loginDetails);

  try {
    const response = await signIn("credentials", {
      email: loginDetails.email,
      password: loginDetails.password,
      redirect: false,
    });
    if (!response || response.error) {
      console.log("Login Failed", response?.error);
      throw new Error("Login Failed, try again");
    }

    return { success: true };
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
}
