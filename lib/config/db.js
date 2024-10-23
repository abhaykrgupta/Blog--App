import mongoose from "mongoose";

const ConnectDB = async () => {
 try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Db connected");
 } catch (error) {
    console.log(`Database connection error: ${error.message}`);

 }
};
export default ConnectDB;