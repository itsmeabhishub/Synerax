import CategoryTemplate from "@/components/CategoryTemplate";

export default function HaircarePage() {
  return <CategoryTemplate title="Haircare" description="Nourishing haircare for every hair type." banner="/images/haircare-hero.jpg" />;
}
import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Haircare Products | Glam Store",
  description: "Complete haircare range including shampoo, conditioner, oils, and treatments.",
  keywords: "haircare, shampoo, conditioner, hair oil, hair mask",
  openGraph: {
    title: "Haircare Products | Glam Store",
    description: "Complete haircare range including shampoo, conditioner, oils, and treatments.",
  },
};

export default function Page() {
  return <CategoryPage params={Promise.resolve({ slug: ["haircare"] })} />;
}