import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import ProductModel from "@/app/utils/models/Product";
import DBConnection from "@/app/utils/config/db";

export async function GET() {
  await DBConnection();
  const records = await ProductModel.find({});
  return NextResponse.json({ data: records });
}

export async function POST(request) {
  const data = await request.formData();
  const title = data.get("title");
  const price = data.get("price");
  const offer = data.get("offer");
  const amen = data.get("amen");
  const desc = data.get("desc");
  const image = data.get("image");

  const uniqueName = `${Date.now()}-${image.name}`;
  const imagePath = path.join(process.cwd(), "public", "uploads", uniqueName);

  const bufferData = await image.arrayBuffer();
  const buffer = Buffer.from(bufferData);

  await DBConnection();

  try {
    await writeFile(imagePath, buffer);
    const newProduct = new ProductModel({
      title,
      price,
      offer,
      amen,
      desc,
      image: uniqueName,
    });
    await newProduct.save();
    return NextResponse.json(
      {
        response: "Successfully Uploaded",
        success: true,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
