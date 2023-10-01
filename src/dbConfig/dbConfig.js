import mongoose from "mongoose";

export async function conncect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection();

    connection.on("connected", () => {
      console.log("successfully connected with mongoose ");
    });

    connection.on("error", err => {
      console.log(
        "Hey theres something wrong with your server please check it " + err
      );
      process.exit();
    });
  } catch (e) {
    console.log(e.massage);
  } finally {
    console.log("successfully connected mongoose ");
  }
}
