"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { partnerUniversities } from "@/lib/universities-data";
import { finderFieldClass } from "@/components/CourseFinderBar";
import { allLocations, locationGroups } from "./data";

const popupClass = "absolute left-0 top-full z-30 mt-2 w-full min-w-0 overflow-hidden rounded-xl border border-[#e3e3e8] bg-white text-sm shadow-xl shadow-black/15";
const optionClass = "w-full px-4 py-2.5 text-left text-[#454550] hover:bg-[#f5f1fb] focus:bg-[#f5f1fb] focus:outline-none";

export function UniversityDropdown({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const selected = partnerUniversities.find((u) => u.slug === value);
  const options = partnerUniversities.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));

  function select(slug: string) {
    onChange(slug);
    setQuery("");
    setOpen(false);
    input.current?.focus();
  }

  return (
    <div className="relative min-w-0" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setQuery(""); } }}>
      <input
        ref={input} role="combobox" aria-label="Search University Name" aria-expanded={open}
        aria-controls="finder-university-options" aria-autocomplete="list"
        aria-activedescendant={open && options[activeIndex] ? `finder-university-${options[activeIndex].slug}` : undefined}
        autoComplete="off" placeholder="Search University Name"
        value={open ? query : selected?.name ?? ""}
        onClick={() => setOpen(true)}
        onChange={(event) => { setQuery(event.target.value); setOpen(true); setActiveIndex(0); onChange(""); }}
        onKeyDown={(event) => {
          if (event.key === "Escape") { event.preventDefault(); setOpen(false); setQuery(""); }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
            const next = open ? (activeIndex + (event.key === "ArrowDown" ? 1 : -1) + options.length) % Math.max(options.length, 1) : 0;
            setActiveIndex(next);
            requestAnimationFrame(() => document.getElementById(`finder-university-${options[next]?.slug}`)?.scrollIntoView({ block: "nearest" }));
          }
          if (event.key === "Enter" && open) { event.preventDefault(); if (options[activeIndex]) select(options[activeIndex].slug); }
        }}
        className={`${finderFieldClass} pr-9`}
      />
      <span className="pointer-events-none absolute right-4 top-3.5 text-[#777783]" aria-hidden="true">⌄</span>
      {open && (
        <div className={popupClass}>
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => select("")} className={optionClass}>All universities</button>
          <div id="finder-university-options" role="listbox" aria-label="Universities" className="max-h-64 overflow-y-auto">
            {options.map((u, index) => <button
              key={u.slug} id={`finder-university-${u.slug}`} type="button" role="option" tabIndex={-1}
              aria-selected={value === u.slug} onMouseDown={(event) => event.preventDefault()} onClick={() => select(u.slug)}
              className={`${optionClass} ${activeIndex === index ? "bg-[#f5f1fb]" : ""}`}
            >{u.name}</button>)}
          </div>
          {!options.length && <p role="status" className="px-4 py-3 text-[#666674]">No universities found.</p>}
        </div>
      )}
    </div>
  );
}

export function LocationDropdown({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState("");
  const trigger = useRef<HTMLButtonElement>(null);
  const selected = allLocations.find((location) => location.value === value);

  function select(location: string) {
    onChange(location);
    setOpen(false);
    setGroup("");
    trigger.current?.focus();
  }
  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") { event.preventDefault(); setOpen(false); trigger.current?.focus(); return; }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
    event.preventDefault();
    buttons[next]?.focus();
  }

  return (
    <div className="relative min-w-0" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button
        ref={trigger} type="button" aria-label={`Select Location${selected ? `: ${selected.label}` : ""}`}
        aria-expanded={open} aria-controls="finder-location-options"
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); setOpen(true); requestAnimationFrame(() => document.querySelector<HTMLButtonElement>("#finder-location-options button")?.focus()); } }}
        className={`${finderFieldClass} flex items-center justify-between gap-2 text-left`}
      ><span className="truncate">{selected?.label ?? "Select Location"}</span><span aria-hidden="true">⌄</span></button>
      {open && (
        <div id="finder-location-options" className={`${popupClass} max-h-80 overflow-y-auto`} onKeyDown={navigate}>
          <button type="button" onClick={() => select("")} className={optionClass}>All locations</button>
          {locationGroups.map((category) => (
            <div key={category.label}>
              <button type="button" aria-expanded={group === category.label} aria-controls={`finder-location-${category.label.replaceAll(" ", "-")}`} onClick={() => setGroup(group === category.label ? "" : category.label)} className={`${optionClass} flex justify-between font-semibold`}>
                {category.label} <span aria-hidden="true">{group === category.label ? "⌄" : "›"}</span>
              </button>
              {group === category.label && <div id={`finder-location-${category.label.replaceAll(" ", "-")}`} className="border-y border-[#eeeeF2] bg-[#faf9fc] pl-3">
                {category.options.map((location) => <button key={location.value} type="button" aria-pressed={value === location.value} onClick={() => select(location.value)} className={optionClass}>{location.label}</button>)}
              </div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
