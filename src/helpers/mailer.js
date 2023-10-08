import nodemailer from "nodemailer";
import Client from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update user model based on emailType
    if (emailType === "VERIFY") {
      await Client.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await Client.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "liam63@ethereal.email",
        pass: "nwQUmZfdpFdBcGmfFH",
      },
    });

    // Construct and send the email
    await transporter.sendMail({
      from: "abibdipto@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "upPass"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/${
        emailType === "VERIFY" ? "verifyemail" : "upPass"
      }?token=${hashedToken}</p>`,
    });

    // Return a success response or handle as needed
    return new NextResponse("Email sent successfully.");
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error sending email:", error);

    // Return an error response or handle as needed
    return new NextResponse(JSON.stringify(error.message));
  }
};
