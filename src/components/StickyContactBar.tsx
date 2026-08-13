import { contact } from "@/lib/site-config";

export default function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-surface/95 backdrop-blur lg:hidden">
      <a
        href={contact.phoneHref} data-track="phone_click"
        className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold text-ink-soft"
      >
        <PhoneIcon /> Call
      </a>
      <div className="w-px bg-line" />
      <a
        href={contact.whatsappHref} data-track="whatsapp_click"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-[#167e3d] py-3 text-sm font-semibold text-white"
      >
        <WhatsAppIcon /> WhatsApp
      </a>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.3 2.6 3.4 4.6 6 6l2-2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.9c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.3 1l-2 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.33 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.84 14.24c-.25.7-1.24 1.28-2.02 1.44-.55.11-1.26.2-3.67-.79-3.08-1.27-5.06-4.4-5.22-4.6-.15-.21-1.25-1.67-1.25-3.19 0-1.51.79-2.26 1.08-2.57.25-.27.6-.39.94-.39.11 0 .22 0 .32.01.28.01.42.02.6.44.23.54.78 1.87.85 2.01.07.14.11.3.02.48-.08.19-.13.3-.26.45-.14.16-.28.35-.4.47-.14.13-.28.28-.12.55.15.27.68 1.12 1.46 1.81 1 .89 1.84 1.17 2.11 1.3.28.14.44.12.6-.06.16-.18.68-.79.87-1.06.18-.27.36-.22.6-.13.25.09 1.58.75 1.85.89.28.14.46.2.53.32.07.12.07.68-.18 1.38Z" />
    </svg>
  );
}
