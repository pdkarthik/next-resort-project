import DBConnection from "@/app/utils/config/db";
import UserModel from "@/app/utils/models/User";
import { NextResponse } from "next/server";
import BookingModel from "@/app/utils/models/Booking";

export async function GET(request, { params }) {
  const { id } = await params;
  console.log("Dynamic id:", id);

  await DBConnection();
  try {
    if (!id) {
      return NextResponse.json(
        { success: false, message: "No user found" },
        { status: 404 },
      );
    }
    const user = await UserModel.findById(id).populate("bookings");
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "ID is missing" });
  }
}
