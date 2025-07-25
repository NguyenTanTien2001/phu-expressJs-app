import mongoose from "mongoose"

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL ?? 'mongodb://localhost:27017').then(() => console.log('MongoDB connected!'))
  } catch (err) {
    console.log("Mongo connection error ==> ", err);
    throw err
  }
}