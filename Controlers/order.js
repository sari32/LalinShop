// import { productModel } from "../Models/product.js";
import userModel from "../Models/user.js";
import { orderModel } from "../Models/order.js";
import { productModel } from "../Models/product.js";
// פונקציה המחזירה את כל ההזמנות
export const getAllOrders = async (req, res) => {
    try {
        let data = await orderModel.find();
        res.json(data);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ title: "error cannot get all orders", message: "somthing wrong" });
    }
}


// פונקציה מוסיפה הזמנה לטבלת ההזמנות
export const addOrder = async (req, res) => {
    if (!req.body.address || !req.body.userId || !req.body.products)
        return res.status(404).json({ title: "enter: products, userId, address", message: "somthing wrong" });
    if (req.body.products.length < 1)        //בדיקה שיש מוצרים במערך
        return res.status(404).json({ title: "wrong products", message: "wrong data" });
    try {
        let { userId, products } = req.body;
        // בדיקה האם המשתמש קיים בטבלת המשתמשים
        let user = await userModel.findOne({ _id: userId });
        if (!user)
            return res.status(404).json({ title: "error user by id", message: "no user with such id" });
        // בדיקה אם כל המוצרים קיימים ולוודא התאמת מחיר
        const productChecks = await Promise.all(products.map(async (prod) => {
            if (!prod._id) return { valid: false, error: "Missing product ID" };

            const product = await productModel.findOne({ _id: prod._id });//בדיקה שהמוצר קיים
            if (!product) return { valid: false, error: `Product not found: ${prod._id}` };

            if (prod.price !== product.price) {//בדיקה שהמחיר תואם למחיר האמיתי
                return { valid: false, error: `Price mismatch for product ${prod._id}. Expected: ${product.price}, Received: ${prod.price}` };
            }

            return { valid: true, product };
        }));
        // החזרת שגיאה אם קיימת
        const invalidProduct = productChecks.find(check => !check.valid);
        if (invalidProduct) {
            return res.status(400).json({ title: "Invalid product data", message: invalidProduct.error });
        }

        // חישוב סכום כולל
        let totalSum = 0
        products.forEach(prod => {
            totalSum += (prod.price) * (prod.count || 1)
        });
        let newOrder = new orderModel(req.body);
        newOrder.totalSum = totalSum + (newOrder.priceSending || 30);
        let data = await newOrder.save();
        res.json(data);

    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error: cannot add order", message: "wrong data" });

    }
}


export const deleteById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await orderModel.findById(id);
        if (!data)
            return res.status(404).json({ title: "error cannot delete order by id", message: "no valid id parameter found" });
        if (data.isSent)
            return res.status(404).json({ title: "error cannot delete order that is sent", message: "order sent" });
        data = await orderModel.findByIdAndDelete(id);
        res.json(data);
    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error cannot delete order by id", message: "somthing wrong" });
    }
}

export const getOrderByUserId = async (req, res) => {
    let { userId } = req.params;
    try {
        console.log(userId)
        let data = await orderModel.find({ userId: userId });
        console.log(data)
        if (!data)
            return res.status(404).json({ title: "error cannot get orders by id", message: "no valid id parameter found" });
        res.json(data);
    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error cannot get orders by id", message: "somthing wrong" });
    }
}

export const updateSentOrder = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await orderModel.findByIdAndUpdate(id, { isSent: true }, { new: true });
        if (!data)
            return res.status(403).json({ title: "error cannot update order sent by id", message: "no valid id parameter found" });
        res.json(data);
    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error cannot update order by id", message: "somthing wrong" });
    }
}










