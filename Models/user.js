import mongoose  from "mongoose";

const userSchema=mongoose.Schema({
    userName:{type:String, require:true},
    email:{type:String, require:true},
    phone:{type:String, require:true},
    passWord:{type:String, require:true},
    role:{type:String, default:"USER"}
})
// export const userModel=mongoose.model("user", userSchema);
const userModel = mongoose.model("user", userSchema);

export default userModel;
