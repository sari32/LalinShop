import mongoose from "mongoose";
export const connectToDB=async () =>{
    try{
        let con=await mongoose.connect(process.env.DB_URI);
        console.log("mongo db connected");
    }
    catch(err){
        console.log("cannot DB: "+err);
        process.exit(1);
    }
}