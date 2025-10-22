import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

export const sendOtpMail = async (to,otp) => {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: to,
        subject: "Your OTP for Password Reset",
        html: `<p>Your OTP for password reset is <b>${otp}</b>. It is valid for 10 minutes.</p>`
    });
}

