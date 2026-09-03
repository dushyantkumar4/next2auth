import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URL! as string);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongoDB connected");
    });
    connection.on("error", (err) => {
      console.log(
        "mongoDB connecton error, Please make sure db is up and running" + err,
      );
      process.exit();
    });
  } catch (error:unknown) {
    if (error instanceof Error) {
      console.log("something went wrong", error.message);
    }
  }
}
