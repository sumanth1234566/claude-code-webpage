import Image from "next/image";
import Link from "next/link";
import ich1 from "@/public/media/ich1.png";
import ich2 from "@/public/media/ich2.png";

/** Support-team illustrations. Illustrations only: no names, titles or quotes. */
export function SupportTeam({ showLink = true }: { showLink?: boolean }) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div className="flex justify-center gap-6 md:justify-start">
        {[ich1, ich2].map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="Illustration of a GoFIBER support team member"
            sizes="(min-width: 768px) 220px, 40vw"
            className={`w-2/5 max-w-[220px] rounded-3xl shadow-lg ${i === 1 ? "md:translate-y-10" : ""}`}
            placeholder="blur"
          />
        ))}
      </div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight md:text-3xl">Talk to a real person.</h3>
        <p className="mt-4 text-lg text-text-muted">
          Our local support team is here to help, from planning your installation to everyday questions about your service.
          We answer, we follow through, and we know our network because we own it.
        </p>
        {showLink && (
          <Link href="/support" className="mt-6 inline-block font-semibold text-brand-purple hover:underline">
            How to reach support <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
