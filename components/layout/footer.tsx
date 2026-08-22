// import Link from "next/link";
// import Image from "next/image";
// import { Logo } from "@/components/ui/logo";
// import { IndiaFlag, USAFlag } from "@/components/ui/flags";
// import {
//   FaLinkedinIn,
//   FaInstagram,
//   FaWhatsapp,
//   FaFacebookF,
//   FaXTwitter,
//   FaPhone,
//   FaEnvelope,
//   FaLocationDot,
// } from "react-icons/fa6";
// import { BsYoutube } from "react-icons/bs";

// // ─── Data ─────────────────────────────────────────────────────────────────────
// const socials = [
//   { icon: FaLinkedinIn, label: "LinkedIn",  href: "https://www.linkedin.com/company/primeqasolutions" },
//   { icon: FaInstagram,  label: "Instagram", href: "https://www.instagram.com/primeqasolutions/" },
//   { icon: FaWhatsapp,   label: "WhatsApp",  href: "https://wa.me/919558408386" },
//   { icon: FaFacebookF, label: "Facebook",  href: "https://www.facebook.com/people/Primeqasolutions/100063743336772/" },
//   { icon: FaXTwitter,   label: "X",         href: "https://x.com/piyushpatel974" },
//   { icon: BsYoutube,    label: "Youtube",   href: "https://www.youtube.com/@PrimeQASolutions" },
// ];

// const offices = [
//   {
//     FlagComponent: IndiaFlag,
//     country: "INDIA",
//     address: "A-904, Ganesh Glory 11, Jagatpur Rd,\nnear BSNL Office, Off SG Highway, Jagatpur,\nAhmedabad, Gujarat 382470, INDIA",
//     phone: "+91 95584 08386",
//     email: "piyush@PrimeQAsolutions.com",
//   },
//   {
//     FlagComponent: USAFlag,
//     country: "USA",
//     address: "PrimeQA Solutions Inc.,\n28 GEARY ST SUITE 650\nSAN FRANCISCO, CA 94108",
//     phone: "+1 (415) 639-9555",
//     email: "piyush@PrimeQAsolutions.com",
//   },
// ];

// const navColumns = [
//   {
//     heading: "Services",
//     links: [
//       { label: "Test Automation",   href: "/services/test-automation" },
//       {label:"AI Testing",href:"/services/ai-testing"},
//       // { label: "Performance Testing",  href: "/services/performance-testing-services" },
//       { label: "API Testing Services", href: "/services/api-testing-services" },
//       { label: "Functional Testing",   href: "/services/functional-testing" },
//       { label: "Mobile App Testing",   href: "/services/mobile-testing-services" },
//       { label: "Security Testing",     href: "/services/security-testing-services" },
//     ],
//   },
//   {
//     heading: "Company",
//     links: [
//       { label: "About Us",          href: "/company/about-us" },
//       { label: "Life At PrimeQA",   href: "/company/life-at-primeqa" },
//       { label: "Blogs",             href: "/blog" },
//       { label: "Careers",           href: "/company/careers" },
//     ],
//   },
//   {
//     heading: "Legal",
//     links: [
//       { label: "Privacy Policy", href: "#" },
//       { label: "Refund Policy",  href: "#" },
//       { label: "Cookie Policy",  href: "#" },
//     ],
//   },
// ];

// const badges = [
//   "/images/cirtifications/badge-4.png",
//   "/images/cirtifications/badge-5.png",
//   "/images/cirtifications/badge-6.png",
//   "/images/cirtifications/badge-1.png",
//   "/images/cirtifications/badge-2.png",
// ];

// const COPYRIGHT_YEAR = "2026";

// // ─── Component ────────────────────────────────────────────────────────────────
// export function Footer() {
//   return (
//     <footer className="bg-neutral-950 text-white">
//       {/* ── Top section: Logo + badges ── */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6  pt-14 pb-10">
//         <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

//           {/* Left — brand block */}
//           <div className="flex flex-col gap-5 max-w-md">
//             {/* Logo */}
//             <Logo variant="light" className="h-auto w-40" />

//             {/* Tagline */}
//             <p className="text-sm text-[#A3A3A3] leading-relaxed">
//               PrimeQA Solutions delivers innovative software testing solutions tailored for global enterprises.
//             </p>

//             {/* Social icons */}
//             <div className="flex items-center gap-3 mt-1">
//               {socials.map(({ icon: Icon, label, href }) => (
//                 <Link
//                   key={label}
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={label}
//                   className="flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
//                 >
//                   <Icon className="size-4" />
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Right — award badges */}
//           <div className="flex items-center gap-3 flex-wrap lg:justify-end">
//             {badges.map((src) => (
//               <div key={src} className="size-24 shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-200">
//                 <Image
//                   src={src}
//                   alt="Award badge"
//                   width={100}
//                   height={100}
//                   className="h-full w-auto object-contain"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Horizontal divider ── */}
//       <div className="border-t border-white/8  mx-auto px-4 sm:px-6 lg:px-20" />

//       {/* ── Middle: Offices + Nav ── */}
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 overflow-hidden">

    
//         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14">

//           {/* Offices */}
//           <div className="flex flex-col gap-6">
//             <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A3A3A3] ">
//               Headquarters
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//               {offices.map((office) => (
//                 <div key={office.country} className="flex flex-col gap-3">
//                   {/* Country heading */}
//                   <p className="flex items-center gap-2 text-sm font-semibold text-white">
//                     <office.FlagComponent width={20} height={14} className="rounded-sm shrink-0" />
//                     {office.country}
//                   </p>
//                   {/* Address */}
//                   <p className="flex gap-2.5 text-sm text-[#A3A3A3] leading-relaxed ">
//                     {/* <FaLocationDot className="size-3.5 shrink-0 text-primary/70 mt-[3px]" /> */}
//                     {office.address}
//                   </p>
//                   {/* Phone */}
//                   {office.phone && (
//                     <Link
//                       href={`tel:${office.phone.replace(/\s/g, "")}`}
//                       className="flex items-center gap-2.5 text-sm text-[#A3A3A3] hover:text-primary transition-colors duration-150"
//                     >
//                       {/* <FaPhone className="size-3.5 shrink-0 text-primary/70" /> */}
//                       {office.phone}
//                     </Link>
//                   )}
//                   {/* Email */}
//                   {office.email && (
//                     <Link
//                       href={`mailto:${office.email}`}
//                       className="flex items-center gap-2.5 text-sm text-[#A3A3A3] hover:text-primary transition-colors duration-150"
//                     >
//                       {/* <FaEnvelope className="size-3.5 shrink-0 text-primary/70" /> */}
//                       {office.email}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Nav columns */}
//           <div className="grid justify-self-start lg:justify-self-end grid-cols-2 lg:grid-cols-3 gap-10">
//             {navColumns.map((col) => (
//               <div key={col.heading} className="flex flex-col gap-4">
//                 <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#A3A3A3]">
//                   {col.heading}
//                 </p>
//                 <ul className="flex flex-col gap-2.5">
//                   {col.links.map((link) => (
//                     <li key={link.label}>
//                       <Link
//                         href={link.href}
//                         className="text-sm text-[#A3A3A3] hover:text-white transition-colors duration-150"
//                       >
//                         {link.label}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Bottom bar ── */}
//       <div className="border-t max-w-7xl sm:px-6 mx-auto border-white/10">
//         <div className="mx-auto py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
//           <p className="text-sm text-[#a3a3a3]" suppressHydrationWarning>
//             © {COPYRIGHT_YEAR} PrimeQA Solutions. All rights reserved.
//           </p>
//           <p className="text-sm text-[#a3a3a3] flex items-center gap-1.5">
//             Designed &amp; developed with{" "}
//             <span className="text-primary">🧡</span>{" "}
//             in India by{" "}
//             <Link
//               href="https://echovyn.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-[#a3a3a3] underline-offset-2 hover:text-white hover:underline transition-colors duration-150"
//             >
//               Echovyn Labs
//             </Link>
//           </p>
//         </div>
//       </div>

//     </footer>
//   );
// }


import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui/logo";
import { IndiaFlag, USAFlag } from "@/components/ui/flags";
import {
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import { BsYoutube } from "react-icons/bs";

// ─── Data ─────────────────────────────────────────────────────────────────────
const socials = [
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/primeqasolutions",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/primeqasolutions/",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/919558408386",
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/people/Primeqasolutions/100063743336772/",
  },
  {
    icon: FaXTwitter,
    label: "X",
    href: "https://x.com/piyushpatel974",
  },
  {
    icon: BsYoutube,
    label: "Youtube",
    href: "https://www.youtube.com/@PrimeQASolutions",
  },
];

const offices = [
  {
    FlagComponent: IndiaFlag,
    country: "INDIA",
    address:
      "A-904, Ganesh Glory 11, Jagatpur Rd,\nnear BSNL Office, Off SG Highway, Jagatpur,\nAhmedabad, Gujarat 382470, INDIA",
    phone: "+91 95584 08386",
    email: "piyush@PrimeQAsolutions.com",
  },
  {
    FlagComponent: USAFlag,
    country: "USA",
    address:
      "PrimeQA Solutions Inc.,\n28 GEARY ST SUITE 650\nSAN FRANCISCO, CA 94108",
    phone: "+1 (415) 639-9555",
    email: "piyush@PrimeQAsolutions.com",
  },
];

const navColumns = [
  {
    heading: "Services",
    links: [
      { label: "Test Automation", href: "/services/test-automation" },
      { label: "AI Testing", href: "/services/ai-testing" },
      { label: "API Testing Services", href: "/services/api-testing-services" },
      { label: "Functional Testing", href: "/services/functional-testing" },
      { label: "Mobile App Testing", href: "/services/mobile-testing-services" },
      { label: "Security Testing", href: "/services/security-testing-services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/company/about-us" },
      { label: "Life At PrimeQA", href: "/company/life-at-primeqa" },
      { label: "Blogs", href: "/blog" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const badges = [
  "/images/cirtifications/badge-4.png",
  "/images/cirtifications/badge-5.png",
  "/images/cirtifications/badge-6.png",
  "/images/cirtifications/badge-1.png",
  "/images/cirtifications/badge-2.png",
];

const COPYRIGHT_YEAR = "2026";

// ─── Component ────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100">
      {/* ── Top section: Logo + badges ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

          {/* Left — brand block */}
          <div className="flex flex-col gap-5 max-w-md">

            {/* Logo */}
            <Logo variant="default" className="h-auto w-40" />

            {/* Tagline */}
            <p className="text-sm text-secondary leading-relaxed">
              PrimeQA Solutions delivers innovative software testing
              solutions tailored for global enterprises.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socials.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-secondary/20 text-secondary transition-all duration-200 hover:brightness-[0.97] hover:bg-primary/5 hover:text-primary/80"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right — award badges */}
          <div className="flex items-center gap-3 flex-wrap lg:justify-end">
            {badges.map((src) => (
              <div
                key={src}
                className="size-24 shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-200"
              >
                <Image
                  src={src}
                  alt="Award badge"
                  width={100}
                  height={100}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Horizontal divider ── */}
      <div className="border-t border-secondary/10" />

      {/* ── Middle: Offices + Nav ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Offices */}
          <div className="flex flex-col gap-6">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary/80">
              Headquarters
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {offices.map((office) => (
                <div key={office.country} className="flex flex-col gap-3">

                  {/* Country heading */}
                  <p className="flex items-center gap-2 text-sm font-semibold text-primary/80">
                    <office.FlagComponent
                      width={20}
                      height={14}
                      className="rounded-sm shrink-0"
                    />
                    {office.country}
                  </p>

                  {/* Address */}
                  <p className="text-sm text-secondary leading-relaxed whitespace-pre-line">
                    {office.address}
                  </p>

                  {/* Phone */}
                  {office.phone && (
                    <Link
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="text-sm text-secondary hover:text-primary/80 transition-colors duration-150"
                    >
                      {office.phone}
                    </Link>
                  )}

                  {/* Email */}
                  {office.email && (
                    <Link
                      href={`mailto:${office.email}`}
                      className="text-sm text-secondary hover:text-primary/80 transition-colors duration-150"
                    >
                      {office.email}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid justify-self-start lg:justify-self-end grid-cols-2 lg:grid-cols-3 gap-10">
            {navColumns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">

                {/* Column heading */}
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary/70">
                  {col.heading}
                </p>

                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-secondary hover:text-primary/80 transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-secondary/10 max-w-7xl sm:px-6 mx-auto">
        <div className="mx-auto py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p
            className="text-sm text-secondary"
            suppressHydrationWarning
          >
            © {COPYRIGHT_YEAR} PrimeQA Solutions. All rights reserved.
          </p>

          <p className="text-sm text-secondary flex items-center gap-1.5">
            Designed &amp; developed with{" "}
            <span className="text-primary">🧡</span>{" "}
            in India by{" "}
            <Link
              href="https://echovyn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline-offset-2 hover:text-primary/80 hover:underline transition-colors duration-150"
            >
              Echovyn Labs
            </Link>
          </p>

        </div>
      </div>
    </footer>
  );
}
