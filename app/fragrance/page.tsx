import CategoryTemplate from "@/components/CategoryTemplate";

export default function FragrancePage() {
  return <CategoryTemplate title="Fragrance" description="Luxury perfumes and body mists." banner="/images/fragrance-hero.jpg" />;
}
import { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Fragrance & Perfume | Glam Store",
  description: "Browse our collection of perfumes, body mists, and premium attars.",
  keywords: "perfume, fragrance, body mist, attar, deodorant",
  openGraph: {
    title: "Fragrance & Perfume | Glam Store",
    description: "Browse our collection of perfumes, body mists, and premium attars.",
  },
};

export default function Page() {
  return <CategoryPage params={Promise.resolve({ slug: ["fragrance"] })} />;
}