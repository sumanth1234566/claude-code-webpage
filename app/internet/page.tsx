import { ProductPage, productMetadata } from "@/components/ProductPage";

export const metadata = productMetadata("internet");

export default function Page() {
  return <ProductPage slug="internet" />;
}
