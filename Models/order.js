import mongoose from "mongoose";

const minimalSchema = mongoose.Schema({
    name: String,
    price: Number,
    count: { type: Number, default: 1 },
    _id: String
})

const orderSchema = mongoose.Schema({
    orderDate: { type: Date, default: new Date() },
    targetDate: { type: Date, default: new Date() },
    address: String,
    userId: String,
    products: [minimalSchema],
    isSent: { type: Boolean, default: false },
    priceSending: { type: Number, default: 30 },
    totalSum: Number
})
export const orderModel = mongoose.model("order", orderSchema);