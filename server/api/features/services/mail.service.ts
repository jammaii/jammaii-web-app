import { TRPCError } from "@trpc/server";
import { ReactNode } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  template: ReactNode;
}

export class MailService {
  static async sendEmail({ to, subject, template }: SendEmailOptions) {
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "info@jammaii.com",
        to,
        subject,
        react: template,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to send email",
        cause: error,
      });
    }
  }
}
