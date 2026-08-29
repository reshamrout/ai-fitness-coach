import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"OptiFit AI" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Error sending email:`, error);
    return false;
  }
};

export const sendVerificationEmail = async (to: string, token: string) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const verifyLink = `${clientUrl}/verify-email?token=${token}`;
  
  const html = `
    <h2>Welcome to OptiFit AI!</h2>
    <p>Please click the link below to verify your email address and activate your account:</p>
    <a href="${verifyLink}" style="display:inline-block;padding:10px 20px;background:#6366f1;color:#fff;text-decoration:none;border-radius:5px;">Verify Email</a>
    <p>Or copy and paste this link in your browser:</p>
    <p>${verifyLink}</p>
  `;
  
  return sendEmail(to, 'Verify your email address - OptiFit AI', html);
};

export const sendPasswordResetEmail = async (to: string, token: string) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const resetLink = `${clientUrl}/reset-password?token=${token}`;
  
  const html = `
    <h2>Password Reset Request</h2>
    <p>You requested a password reset. Click the link below to set a new password:</p>
    <a href="${resetLink}" style="display:inline-block;padding:10px 20px;background:#6366f1;color:#fff;text-decoration:none;border-radius:5px;">Reset Password</a>
    <p>Or copy and paste this link in your browser:</p>
    <p>${resetLink}</p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  `;
  
  return sendEmail(to, 'Password Reset - OptiFit AI', html);
};
