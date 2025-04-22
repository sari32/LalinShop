import jwt from "jsonwebtoken"

export function check(req, res, next) {
    let token = req.headers.authorization
    if (!token)
        return res.status(401).json({ title: "unauthorized", message: "first log in!" })
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.user = result;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ title: "unauthorized", message: "first log in!" });
    }
}

export function checkManager(req, res, next) {
    let token = req.headers.authorization
    if (!token)
        return res.status(401).json({ title: "unauthorized", message: "first log in!" })
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.user = result;
        if (result.role == "ADMIN")
            next();
        else
            return res.status(403).json({ title: "missing permissions" })
    }
    catch (err) {
        return res.status(401).json({ title: "unauthorized", message: "first log in!" })
    }
}