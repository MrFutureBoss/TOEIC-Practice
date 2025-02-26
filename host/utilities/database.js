import mongoose from "mongoose";

const connectDB = ()=>{
    try{
        const db = mongoose.connect(process.env.URI_MONGODB);
        console.log("Connected mongodb successfully!!!");
        console.log(process.env.URI_MONGODB)

        return db;
    }
    catch(errors){
    console.log(errors.toString());
    }
}

export default connectDB;