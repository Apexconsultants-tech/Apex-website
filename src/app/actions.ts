"use server";

import { isMailerConfigured, sendEnquiryEmail } from "@/lib/mailer";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"firstName" | "lastName" | "email" | "mobile" | "destination" | "message", string>>;
};

export const initialEnquiryState: EnquiryState = { status: "idle", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(_prevState: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot, real users never fill this hidden field.
  if ((formData.get("company") as string | null)?.trim()) {
    return { status: "success", message: "Thanks, our team will reach out shortly." };
  }

  const firstName = ((formData.get("first_name") as string) || "").trim();
  const lastName = ((formData.get("last_name") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").trim();
  const mobile = ((formData.get("mobile") as string) || "").trim();
  const destination = ((formData.get("destination") as string) || "").trim();
  const message = ((formData.get("message") as string) || "").trim();
  const consent = formData.get("consent");

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (!firstName) fieldErrors.firstName = "Enter your first name.";
  if (!lastName) fieldErrors.lastName = "Enter your last name.";
  if (!email || !EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (!mobile || mobile.replace(/\D/g, "").length < 7) fieldErrors.mobile = "Enter a valid mobile number.";
  if (!destination) fieldErrors.destination = "Select a preferred destination.";
  if (!message || message.length < 10) fieldErrors.message = "Tell us a little more (at least 10 characters).";
  if (!consent) fieldErrors.message = fieldErrors.message || "Please confirm consent to be contacted.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const payload = { firstName, lastName, email, mobile, destination, message };

  if (!isMailerConfigured()) {
    // Pre-launch state: SMTP_USER / SMTP_PASS aren't set yet, so we can't
    // actually deliver mail via Hostinger. Nothing is silently discarded,
    // the validated enquiry is logged server-side so it's still visible
    // during development, and the UI is honest with the visitor.
    console.warn("[contact] SMTP not configured, logging enquiry instead of sending:", payload);
    return {
      status: "success",
      message:
        "Thanks, your enquiry was received. (Email delivery isn't configured yet; this submission was logged on the server.)",
    };
  }

  try {
    await sendEnquiryEmail(payload);
    return { status: "success", message: "Thanks, our team will reach out shortly, usually within one business day." };
  } catch (error) {
    console.error("[contact] Failed to send enquiry email:", error);
    return {
      status: "error",
      message: "Something went wrong sending your enquiry. Please call or WhatsApp us directly.",
    };
  }
}
