
import { productModel } from "../Models/product.js";

export const getById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await productModel.findById(id);
        if (!data)
            return res.status(400).json({ title: "error cannot get product by id", message: "somthing wrong" });
        res.json(data);
    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error cannot get product by id", message: "somthing wrong" });
    }
}

// export const getAllProducts = async (req, res) => {
//     try {
//         let data = await productModel.find();
//         res.json(data);
//     }
//     catch (err) {
//         console.log(err.message);
//         res.status(400).json({ title: "error cannot get all products", message: "somthing wrong" });
//     }
// }

export const getAllProducts = async(req, res) => {
    let lim = req.query.limit || 10;
    let page = req.query.page || 1;
    try {
        let data = await productModel.find().skip((page - 1) *
            lim).limit(lim);
        res.json(data);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({
            title: "error cannot get all", message: "somthing wrong"
        });
    }
}

export const getTotalCount = async(req, res) => {
    let lim = req.query.limit || 10;
    try {
        let data = await productModel.countDocuments();
        res.json({
            totalCount: data,
            pages: Math.ceil(data / lim),
            limit: lim
        })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot get all",
        massage: err.massage
    })
}
        }

export const deleteById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await productModel.findByIdAndDelete(id);
        if (!data)
            return res.status(404).json({ title: "error cannot delete product by id", message: "no valid id parameter found" });
        res.json(data);
    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error cannot delete product by id", message: "somthing wrong" });
    }
}

export const updateById = async (req, res) => {
    let { id } = req.params;
    if (req.body.name && req.body.name.lenght < 2) 
        return res.status(404).json({ title: "wrong name", message: "wrong data" });
    try {
        let data = await productModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot update product by id", message: "no valid id parameter found" });
        res.json(data);
    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error cannot update product by id", message: "somthing wrong" });
    }

}

export const addProduct = async (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.imgUrl || !req.body.categories || !req.body.descrabtion)
        return res.status(404).json({ title: "enter: name, price, imgUrl, categories, descrabtion ", message: "somthing wrong" });
    if (req.body.name && req.body.name.lenght < 2)
        return res.status(404).json({ title: "wrong name", message: "wrong data" });
    try {
        let newProduct = new productModel(req.body);
        let data = await newProduct.save();
        res.json(data);

    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error: cannot add product", message: "wrong data" });

    }
}



