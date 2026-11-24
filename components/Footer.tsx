import Link from "next/link";
import { contact, site } from "@/content/site";
import { products, productHref } from "@/content/products";
import { TrackedLink } from "./TrackedLink";
import { btn } from "./buttons";

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-white/85">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-xl font-extrabold tracking-tight text-white">
            Go<span className="text-[#c9b5f5]">FIBER</span>
          </p>
          <p className="mt-4 text-sm">
            Business internet, VoIP and managed network services over our own fiber network in Southern California.
          </p>
          <TrackedLink href="/contact" location="footer" label="Get a Quote" className={`${btn.onDark} mt-6`}>
            Get a Quote
          </TrackedLink>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={productHref(p.slug)} className="hover:text-white">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About GoFIBER</Link></li>
            <li><Link href="/coverage" className="hover:text-white">Coverage</Link></li>
            <li><Link href="/support" className="hover:text-white">Support</Link></li>
            <li><Link href="/contact?intent=sales" className="hover:text-white">Talk to Sales</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>Headquarters: {site.hq}</p>
            <p>Serving {site.areas.join(" and ")}</p>
            <p>
              Phone: <a href={contact.phoneHref} className="hover:text-white hover:underline">{contact.phone}</a>
            </p>
            <p className="[overflow-wrap:anywhere]">
              Email: <a href={contact.emailHref} className="hover:text-white hover:underline">{contact.email}</a>
            </p>
            <p>Hours: {contact.hours}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs text-white/70">
          <p>
            © {new Date().getFullYear()} {site.name}. Serving Southern California businesses since {site.founded}.
          </p>
          <ul className="flex gap-6">
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
