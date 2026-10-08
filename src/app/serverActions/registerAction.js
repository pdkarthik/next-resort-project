"use server";

import DBConnection from "../utils/config/db";
import UserModel from "../utils/models/User";

export async function registerAction(registerDetails) {
  await DBConnection();

  console.log("Received registerDetails in registerAction:", registerDetails);

  try {
    await UserModel.create(registerDetails);
    return { success: true };
  } catch (error) {
    console.log(error);
  }
}
