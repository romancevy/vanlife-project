import mongoose from "mongoose";

const connectDB = (url) => {
  // aktiviert die strenge Überprüfung von Abfragen in Mongoose.
  // heißt: wenn Felder abgefragt werden, die nicht im dem Schema stehen,
  // wird ein Error ausgelöst.
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB 🚀"))
    .catch((err) => {
      console.error("❌ failed to connect with mongo", err);
    });
};

export default connectDB;
