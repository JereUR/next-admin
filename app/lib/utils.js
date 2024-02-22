const mongoose = require('mongoose')

export const connectToDB = async () => {
  const connection = {}
  try {
    if (connection.isConnected) return
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(connection)
    connection.isConnected = db.connections[0].readyState
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}