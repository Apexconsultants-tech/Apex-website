import { trackEvent } from "./analytics";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

function setFieldError(form: HTMLFormElement, name: string, message: string | null) {
  const errorEl = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
  const input = form.querySelector<HTMLElement>(`#${name}`);
  if (errorEl) {
    errorEl.textContent = message ?? "";
    errorEl.classList.toggle("hidden", !message);
  }
  input?.classList.toggle("border-amber", Boolean(message));
  input?.classList.toggle("border-line", !message);
}

function initContactForm() {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  if (!form) return;

  const statusEl = form.querySelector<HTMLElement>("[data-form-status]");
  const submitBtn = form.querySelector<HTMLButtonElement>("button[type=submit]");
  const destinations = Array.from(
    form.querySelectorAll<HTMLOptionElement>("#destination option[value]:not([value=''])")
  ).map((o) => o.value);
  const fieldNames = ["first_name", "last_name", "email", "mobile", "destination", "message"];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    fieldNames.forEach((n) => setFieldError(form, n === "first_name" ? "firstName" : n, null));

    if ((data.get("company") as string | null)?.trim()) {
      if (statusEl) {
        statusEl.textContent = "Thanks, our team will reach out shortly.";
        statusEl.className = "rounded-lg bg-brand-tint px-4 py-3 text-sm text-brand-deep";
      }
      return;
    }

    const firstName = ((data.get("first_name") as string) || "").trim();
    const lastName = ((data.get("last_name") as string) || "").trim();
    const email = ((data.get("email") as string) || "").trim();
    const mobile = ((data.get("mobile") as string) || "").trim();
    const destination = ((data.get("destination") as string) || "").trim();
    const message = ((data.get("message") as string) || "").trim();
    const consent = data.get("consent");

    let hasError = false;
    const fail = (field: string, msg: string) => {
      setFieldError(form, field, msg);
      hasError = true;
    };

    if (!firstName) fail("firstName", "Enter your first name.");
    else if (firstName.length > 100) fail("firstName", "First name is too long.");
    if (!lastName) fail("lastName", "Enter your last name.");
    else if (lastName.length > 100) fail("lastName", "Last name is too long.");
    if (!email || !EMAIL_RE.test(email)) fail("email", "Enter a valid email address.");
    else if (email.length > 255) fail("email", "Email address is too long.");
    if (!mobile || mobile.replace(/\D/g, "").length < 7) fail("mobile", "Enter a valid mobile number.");
    else if (mobile.length > 15) fail("mobile", "Mobile number is too long.");
    if (!destination) fail("destination", "Select a preferred destination.");
    else if (!destinations.includes(destination)) fail("destination", "Select a valid destination from the list.");
    if (!message || message.length < 10) fail("message", "Tell us a little more (at least 10 characters).");
    else if (message.length > 2000) fail("message", "Message is too long (max 2000 characters).");
    if (!consent) fail("message", "Please confirm consent to be contacted.");

    if (hasError) {
      if (statusEl) {
        statusEl.textContent = "Please fix the highlighted fields.";
        statusEl.className = "hidden";
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting…";
    }

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
          message,
          consent: consent ? "1" : "",
        }),
      });

      const result = (await res.json()) as { success: boolean; message: string };

      if (statusEl) {
        if (!res.ok || !result.success) {
          statusEl.textContent =
            result.message || "Sorry, we couldn't send your enquiry right now. Please call or WhatsApp us directly.";
          statusEl.className = "rounded-lg bg-amber-tint px-4 py-3 text-sm text-amber";
        } else {
          statusEl.textContent = result.message;
          statusEl.className = "rounded-lg bg-brand-tint px-4 py-3 text-sm text-brand-deep";
          trackEvent("form_submit", { form_name: "contact_enquiry" });
          form.reset();
        }
      }
    } catch (error) {
      console.error("[contact] Failed to submit enquiry:", error);
      if (statusEl) {
        statusEl.textContent = "Sorry, we couldn't send your enquiry right now. Please call or WhatsApp us directly.";
        statusEl.className = "rounded-lg bg-amber-tint px-4 py-3 text-sm text-amber";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Enquiry";
      }
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContactForm);
} else {
  initContactForm();
}
