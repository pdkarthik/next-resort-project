"use server";

import { auth } from "../auth";
import DBConnection from "../utils/config/db";
import BookingModel from "../utils/models/Booking";
import UserModel from "../utils/models/User";

export async function bookingAction(bookingDetails) {
  console.log("server bookingDetails:", bookingDetails);
  const session = await auth();
  console.log("email check:", session.email);

  try {
    await DBConnection();
    const user = await UserModel.findOne({ email: session.email });

    if (!user) {
      return { success: false, message: "user not found" };
    }

    const userId = user._id.toString();

    const userBookingDetails = await BookingModel.create({
      startDate: bookingDetails.selectedDates.startDate,
      endDate: bookingDetails.selectedDates.endDate,
      productName: bookingDetails.record.title,
      price: bookingDetails.record.price,
      offer: bookingDetails.record.offer,
      image: bookingDetails.record.image,
      user: user._id,
    });
    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { bookings: userBookingDetails._id },
      },
      { new: true },
    );

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create booking" };
  }
}
