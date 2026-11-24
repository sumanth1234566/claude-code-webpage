import { ProductPage, productMetadata } from "@/components/ProductPage";

export const metadata = productMetadata("voice");

export default function Page() {
  return <ProductPage slug="voice" />;
}
