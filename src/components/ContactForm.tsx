"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { initialEnquiryState, submitEnquiry } from "@/app/actions";
import { trackEvent } from "@/lib/analytics";
import { contactFormDestinations } from "@/lib/site-config";

export default function ContactForm() {
  const [state, formAction] = useActionState(submitEnquiry, initialEnquiryState);
  const tracked = useRef(false);

  useEffect(() => {
    if (state.status === "success" && !tracked.current) {
      tracked.current = true;
      trackEvent("form_submit", { form_name: "contact_enquiry" });
    }
    if (state.status !== "success") {
      tracked.current = false;
    }
  }, [state.status]);

  return (
    <form action={formAction} className="space-y-5" noValidate>
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
        <Field label="First Name" name="first_name" error={state.fieldErrors?.firstName} required>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            maxLength={100}
            placeholder="Your first name"
            className={inputClass(Boolean(state.fieldErrors?.firstName))}
          />
        </Field>

        <Field label="Last Name" name="last_name" error={state.fieldErrors?.lastName} required>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            maxLength={100}
            placeholder="Your last name"
            className={inputClass(Boolean(state.fieldErrors?.lastName))}
          />
        </Field>

        <Field label="Email ID" name="email" error={state.fieldErrors?.email} required>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={255}
            placeholder="you@email.com"
            className={inputClass(Boolean(state.fieldErrors?.email))}
          />
        </Field>

        <Field label="Mobile Number" name="mobile" error={state.fieldErrors?.mobile} required>
          <input
            id="mobile"
            name="mobile"
            type="tel"
            required
            maxLength={15}
            placeholder="+92 300 0000000"
            className={inputClass(Boolean(state.fieldErrors?.mobile))}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Preferred study destination" name="destination" error={state.fieldErrors?.destination} required>
            <select
              id="destination"
              name="destination"
              required
              defaultValue=""
              className={inputClass(Boolean(state.fieldErrors?.destination))}
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
          <Field label="How can we help you?" name="message" error={state.fieldErrors?.message} required>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={2000}
              placeholder="Tell us about your study plans, preferred intake, or any questions..."
              className={inputClass(Boolean(state.fieldErrors?.message))}
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
          <Link href="/privacy-policy" className="font-semibold text-brand hover:underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <SubmitButton />

      <div role="status" aria-live="polite">
        {state.status === "success" && (
          <p className="rounded-lg bg-brand-tint px-4 py-3 text-sm text-brand-deep">{state.message}</p>
        )}
        {state.status === "error" && !state.fieldErrors && (
          <p className="rounded-lg bg-amber-tint px-4 py-3 text-sm text-amber">{state.message}</p>
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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-gradient-to-b from-brand to-brand-deep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:shadow-xl hover:shadow-brand/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none sm:w-auto"
    >
      {pending ? "Submitting…" : "Submit Enquiry"}
    </button>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint",
    "focus:outline-none focus:ring-2 focus:ring-brand/40",
    hasError ? "border-amber" : "border-line focus:border-brand",
  ].join(" ");
}
