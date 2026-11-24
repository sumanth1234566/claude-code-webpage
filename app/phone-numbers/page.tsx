import { ProductPage, productMetadata } from "@/components/ProductPage";

export const metadata = productMetadata("phone-numbers");

export default function Page() {
  return <ProductPage slug="phone-numbers" />;
}
