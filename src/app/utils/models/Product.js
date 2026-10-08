import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  amen: {
    type: [String],
    default: ["Ac", "Geyser", "Tv", "Wi-Fi", "Elevator", "Break-fast"],
    set: function (amen) {
      const defaultValues = [
        "Ac",
        "Geyser",
        "Tv",
        "Wi-Fi",
        "Elevator",
        "Break-fast",
      ];

      if (typeof amen === "string") {
        amen = amen.split(",").map((item) => item.trim());
      }

      return Array.from(new Set([...defaultValues, ...amen]));
    },
  },
});

const ProductModel =
  mongoose.models.product || mongoose.model("product", ProductSchema);

export default ProductModel;
