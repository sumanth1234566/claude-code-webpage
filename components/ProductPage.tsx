import type { Metadata } from "next";
import { productBySlug, type ProductSlug } from "@/content/products";
import { CtaBand } from "./CtaBand";
import { Hero } from "./Hero";
import { CardGrid, CheckList, FAQ, ProductGrid, Section } from "./Sections";

export function productMetadata(slug: ProductSlug): Metadata {
  const p = productBySlug(slug);
  return {
    title: p.seo.title,
    description: p.seo.description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title: p.seo.title, description: p.seo.description, url: `/${slug}` },
  };
}

export function ProductPage({ slug }: { slug: ProductSlug }) {
  const p = productBySlug(slug);
  const location = `product:${slug}`;
  return (
    <>
      <Hero eyebrow="GoFIBER for business" title={p.name} subtitle={p.summary} location={location} />
      <Section id="benefits" title={`Why choose GoFIBER ${p.name}`} tone="white">
        <CardGrid items={p.benefits} cols={p.benefits.length === 4 ? 4 : 3} />
      </Section>
      {p.included.length > 0 && (
        <Section id="included" title="What's included" tone="muted">
          <CheckList items={p.included} />
        </Section>
      )}
      <Section id="related" title="Works well with" tone="white">
        <ProductGrid only={p.related} />
      </Section>
      <Section id="faq" title="Frequently asked questions" tone="muted">
        <FAQ items={p.faq} />
      </Section>
      <CtaBand location={location} />
    </>
  );
}
