import mongoose from 'mongoose'

export const connectToDB = async () => {
  const connection = {}
  try {
    if (connection.isConnected) return
    const db = await mongoose.connectToDB(process.env.MONGO_URL)
    connection.isConnected = db.connection[0].readyState
  } catch (error) {
    throw new Error(error.message)
  }
}
