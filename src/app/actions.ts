"use server";

import { isMailerConfigured, sendEnquiryEmail } from "@/lib/mailer";
import { contactFormDestinations } from "@/lib/site-config";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"firstName" | "lastName" | "email" | "mobile" | "destination" | "message", string>>;
};

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
  else if (firstName.length > 100) fieldErrors.firstName = "First name is too long.";
  if (!lastName) fieldErrors.lastName = "Enter your last name.";
  else if (lastName.length > 100) fieldErrors.lastName = "Last name is too long.";
  if (!email || !EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  else if (email.length > 255) fieldErrors.email = "Email address is too long.";
  if (!mobile || mobile.replace(/\D/g, "").length < 7) fieldErrors.mobile = "Enter a valid mobile number.";
  else if (mobile.length > 15) fieldErrors.mobile = "Mobile number is too long.";
  if (!destination) fieldErrors.destination = "Select a preferred destination.";
  else if (!(contactFormDestinations as readonly string[]).includes(destination))
    fieldErrors.destination = "Select a valid destination from the list.";
  if (!message || message.length < 10) fieldErrors.message = "Tell us a little more (at least 10 characters).";
  else if (message.length > 2000) fieldErrors.message = "Message is too long (max 2000 characters).";
  if (!consent) fieldErrors.message = fieldErrors.message || "Please confirm consent to be contacted.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const payload = { firstName, lastName, email, mobile, destination, message };

  if (!isMailerConfigured()) {
    // SMTP env vars aren't set. The enquiry is logged server-side so it's
    // not silently lost, but the visitor must never be told this succeeded
    // — no email was actually sent, so this is an error state.
    console.error("[contact] SMTP not configured, enquiry NOT sent:", payload);
    return {
      status: "error",
      message: "Sorry, we couldn't send your enquiry right now. Please call or WhatsApp us directly.",
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
