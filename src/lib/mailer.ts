import nodemailer from "nodemailer";
import { site } from "@/lib/site-config";

// No default host: the mailbox is on HostGator, not a provider we can guess
// a shared SMTP hostname for. Must be set explicitly via env (see
// .env.example for where to find this in cPanel).
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || SMTP_USER;

export function isMailerConfigured() {
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_TO_EMAIL);
}

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

export type EnquiryPayload = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  destination: string;
  message: string;
};

export async function sendEnquiryEmail(payload: EnquiryPayload) {
  if (!isMailerConfigured()) {
    throw new Error("MAILER_NOT_CONFIGURED");
  }

  const fullName = `${payload.firstName} ${payload.lastName}`.trim();
  const submittedAt = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Karachi",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const fields: [string, string][] = [
    ["Name", fullName],
    ["Email", payload.email],
    ["Mobile", payload.mobile],
    ["Preferred destination", payload.destination],
  ];

  const html = `
    <h2 style="margin:0 0 16px;font-family:sans-serif;color:#14181a;">New website enquiry</h2>
    <table cellpadding="0" cellspacing="0" style="font-family:sans-serif;font-size:14px;color:#14181a;">
      ${fields
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#454e55;white-space:nowrap;"><strong>${escapeHtml(label)}:</strong></td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;font-size:14px;color:#14181a;"><strong>Message:</strong><br />${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
    <p style="margin-top:20px;font-family:sans-serif;font-size:12px;color:#8a9199;">Submitted ${escapeHtml(submittedAt)} (PKT) via ${site.domain}/contact-us</p>
  `.trim();

  const text = [
    "New website enquiry",
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    payload.message,
    "",
    `Submitted ${submittedAt} (PKT) via ${site.domain}/contact-us`,
  ].join("\n");

  await getTransporter().sendMail({
    from: `"${site.name} Website" <${SMTP_USER}>`,
    to: CONTACT_TO_EMAIL,
    replyTo: payload.email,
    subject: `New Website Enquiry – ${fullName}`,
    html,
    text,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
