import mongoose  from "mongoose";

const connectDB = async ()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL)
    console.log("Database Connected")
    } catch (error) {
        console.log("Db error",error)
    }
}

export default connectDB