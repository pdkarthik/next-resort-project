import DBConnection from "@/app/utils/config/db";
import ProductModel from "@/app/utils/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  console.log("Dynamic id:", id);

  await DBConnection();
  try {
    if (!id) {
      return NextResponse.json(
        { success: false, message: "No product found" },
        { status: 404 },
      );
    }
    const product = await ProductModel.findById(id);
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "ID is missing" });
  }
}
