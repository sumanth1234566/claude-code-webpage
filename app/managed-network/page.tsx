import { ProductPage, productMetadata } from "@/components/ProductPage";

export const metadata = productMetadata("managed-network");

export default function Page() {
  return <ProductPage slug="managed-network" />;
}
