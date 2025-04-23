import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String,
    descrabtion: String,
    productionDate: { type: Date, default: Date.now },
    imgUrl: String,
    imgUrlHover:String,
    price: Number,
    categories: [String]
})
export const productModel=mongoose.model("product", productSchema);