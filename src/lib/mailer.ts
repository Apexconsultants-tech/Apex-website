import nodemailer from "nodemailer";

// Hostinger's SMTP endpoint. Override via env if the mailbox lives elsewhere.
const SMTP_HOST = process.env.SMTP_HOST || "smtp.hostinger.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || SMTP_USER;

export function isMailerConfigured() {
  return Boolean(SMTP_USER && SMTP_PASS && CONTACT_TO_EMAIL);
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

  const html = `
    <h2>New enquiry from apexconsultants.org</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Mobile:</strong> ${escapeHtml(payload.mobile)}</p>
    <p><strong>Preferred destination:</strong> ${escapeHtml(payload.destination)}</p>
    <p><strong>Message:</strong><br />${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
  `.trim();

  await getTransporter().sendMail({
    from: `"Apex Website" <${SMTP_USER}>`,
    to: CONTACT_TO_EMAIL,
    replyTo: payload.email,
    subject: `New enquiry: ${payload.firstName} ${payload.lastName} (${payload.destination})`,
    html,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
