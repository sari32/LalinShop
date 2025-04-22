import jwt from "jsonwebtoken"

export function generateToken(user) {
    let token = jwt.sign({
        userId: user._id,
        role: user.role,
        username: user.userName
    },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    )
    return token;
}
