import { ProductPage, productMetadata } from "@/components/ProductPage";

export const metadata = productMetadata("messaging");

export default function Page() {
  return <ProductPage slug="messaging" />;
}
