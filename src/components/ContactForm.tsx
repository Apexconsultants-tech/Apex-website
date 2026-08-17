"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { contactFormDestinations } from "@/lib/site-config";

type FieldErrors = Partial<Record<"firstName" | "lastName" | "email" | "mobile" | "destination" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";
type PhpResponse = { success: boolean; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never fill this. contact.php checks it again
    // server-side; this just avoids the round-trip entirely for obvious bots.
    if ((data.get("company") as string | null)?.trim()) {
      setStatus("success");
      setMessage("Thanks, our team will reach out shortly.");
      return;
    }

    const firstName = ((data.get("first_name") as string) || "").trim();
    const lastName = ((data.get("last_name") as string) || "").trim();
    const email = ((data.get("email") as string) || "").trim();
    const mobile = ((data.get("mobile") as string) || "").trim();
    const destination = ((data.get("destination") as string) || "").trim();
    const message_ = ((data.get("message") as string) || "").trim();
    const consent = data.get("consent");

    const errors: FieldErrors = {};
    if (!firstName) errors.firstName = "Enter your first name.";
    else if (firstName.length > 100) errors.firstName = "First name is too long.";
    if (!lastName) errors.lastName = "Enter your last name.";
    else if (lastName.length > 100) errors.lastName = "Last name is too long.";
    if (!email || !EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
    else if (email.length > 255) errors.email = "Email address is too long.";
    if (!mobile || mobile.replace(/\D/g, "").length < 7) errors.mobile = "Enter a valid mobile number.";
    else if (mobile.length > 15) errors.mobile = "Mobile number is too long.";
    if (!destination) errors.destination = "Select a preferred destination.";
    else if (!(contactFormDestinations as readonly string[]).includes(destination))
      errors.destination = "Select a valid destination from the list.";
    if (!message_ || message_.length < 10) errors.message = "Tell us a little more (at least 10 characters).";
    else if (message_.length > 2000) errors.message = "Message is too long (max 2000 characters).";
    if (!consent) errors.message = errors.message || "Please confirm consent to be contacted.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          first_name: firstName,
          last_name: lastName,
          email,
          mobile,
          destination,
          message: message_,
          consent: consent ? "1" : "",
        }),
      });

      const result = (await res.json()) as PhpResponse;

      if (!res.ok || !result.success) {
        setStatus("error");
        setMessage(result.message || "Sorry, we couldn't send your enquiry right now. Please call or WhatsApp us directly.");
        return;
      }

      setStatus("success");
      setMessage(result.message);
      trackEvent("form_submit", { form_name: "contact_enquiry" });
      formRef.current?.reset();
    } catch (error) {
      console.error("[contact] Failed to submit enquiry:", error);
      setStatus("error");
      setMessage("Sorry, we couldn't send your enquiry right now. Please call or WhatsApp us directly.");
    }
  }

  const pending = status === "submitting";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot, hidden from real users and left empty by them */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="First Name" name="first_name" error={fieldErrors.firstName} required>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            maxLength={100}
            placeholder="Your first name"
            className={inputClass(Boolean(fieldErrors.firstName))}
          />
        </Field>

        <Field label="Last Name" name="last_name" error={fieldErrors.lastName} required>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            maxLength={100}
            placeholder="Your last name"
            className={inputClass(Boolean(fieldErrors.lastName))}
          />
        </Field>

        <Field label="Email ID" name="email" error={fieldErrors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={255}
            placeholder="you@email.com"
            className={inputClass(Boolean(fieldErrors.email))}
          />
        </Field>

        <Field label="Mobile Number" name="mobile" error={fieldErrors.mobile} required>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            maxLength={15}
            placeholder="+92 300 0000000"
            className={inputClass(Boolean(fieldErrors.mobile))}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Preferred study destination" name="destination" error={fieldErrors.destination} required>
            <select
              id="destination"
              name="destination"
              required
              defaultValue=""
              className={inputClass(Boolean(fieldErrors.destination))}
            >
              <option value="" disabled>
                Select destination
              </option>
              {contactFormDestinations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="How can we help you?" name="message" error={fieldErrors.message} required>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={2000}
              placeholder="Tell us about your study plans, preferred intake, or any questions..."
              className={inputClass(Boolean(fieldErrors.message))}
            />
          </Field>
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-soft">
        <input
          type="checkbox"
          name="consent"
          value="1"
          required
          defaultChecked
          className="mt-0.5 h-4 w-4 rounded border-line text-brand focus:ring-brand"
        />
        <span>
          I consent to receiving calls, WhatsApp, and email from Apex to assist with this enquiry, per the{" "}
          <Link href="/privacy-policy" className="font-semibold text-brand-text underline underline-offset-2 hover:decoration-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:shadow-xl hover:shadow-brand/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none sm:w-auto"
      >
        {pending ? "Submitting…" : "Submit Enquiry"}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="rounded-lg bg-brand-tint px-4 py-3 text-sm text-brand-deep">{message}</p>
        )}
        {status === "error" && Object.keys(fieldErrors).length === 0 && (
          <p className="rounded-lg bg-amber-tint px-4 py-3 text-sm text-amber">{message}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-amber">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-amber" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint",
    "focus:outline-none focus:ring-2 focus:ring-brand/40",
    hasError ? "border-amber" : "border-line focus:border-brand",
  ].join(" ");
}
