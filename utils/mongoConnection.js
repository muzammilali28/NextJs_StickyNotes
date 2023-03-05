import mongoose from "mongoose";

const connection = {};

async function mongoConnection() {

    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected Successfully -> True -> ",connection.isConnected);
}

export default mongoConnection;