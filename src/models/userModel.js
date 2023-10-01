import mongoose, { model, models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please provide a email adress"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please provide a password "],
    },
    isVerified: {
      type: Boolean,
      defautl: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    VerifyTokenExpiry: Date,
  },
  {
    timestamps: true,
  }
);

const Client = models.Client || model("Client", userSchema);

export default Client;
