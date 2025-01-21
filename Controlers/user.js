import userModel from "../Models/user.js";

export const getAllUsers = async (req, res) => {
    try {
        let data = await userModel.find();
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ title: "error cannot get all users", message: "somthing wrong" });
    }
}

export const getById = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await userModel.findById(id);
        if (!data)
            return res.status(400).json({ title: "error cannot get user by id", message: "somthing wrong" });
        res.json(data);
    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error cannot get user by id", message: "somthing wrong" });
    }
}

export const addUser = async (req, res) => {//שישנה רק את הקוד
    if (!req.body.passWord || !req.body.phone || !req.body.email || !req.body.userName)
        res.status(404).json({ title: "enter: passWord, phone, email, userName", message: "somthing wrong" });
    if (req.body.userNeme && req.body.userNeme.lenght < 2)
        return res.status(404).json({ title: "wrong name", message: "wrong data" });
    try {
        let newUser = new userModel(req.body);
        let data = await newUser.save();
        res.json(data);

    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error: cannot add user", message: "wrong data" });
    }
}

export const updateById = async (req, res) => {
    let { id } = req.params;
    if (req.body.userNeme && req.body.userNeme.lenght < 2)
        return res.status(404).json({ title: "wrong user name", message: "wrong data" });
    try {
        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot update user by id", message: "no valid id parameter found" });
        res.json(data);
    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error! cannot update user by id", message: "somthing wrong" });
    }

}

export const updatePasswordById = async (req, res) => {
    let { id } = req.params;
    if (!req.body.passWord || req.body.passWord.lenght < 4)
        return res.status(404).json({ title: "wrong password", message: "wrong data" });
    try {
        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ title: "error cannot update password", message: "no valid id parameter found" });
        res.json(data);
    }
    catch (err) {
        console.log("err: " + err.message);
        res.status(400).json({ title: "error! cannot update password", message: "somthing wrong" });
    }

}

export const getUserByNamePassword = async (req, res) => {
    try {
        let { userName, passWord } = req.body;
        if (!userName || !passWord)
            return res.status(400).json({ title: "missing user name or password", message: "missing details" });
        let data = await userModel.findOne({ userName: userName, passWord: passWord },{new:true});
        if (!data)
            return res.status(404).json({ title: "cannot login "+passWord+" "+userName, message: "missing details" });
        res.json(data)
    }
    catch (err) {
        console.log("err: " + err.message);
        req.status(400).json({ title: "cannot login", message: "misssing details" });
    }
}


