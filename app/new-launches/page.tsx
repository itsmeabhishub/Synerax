import CategoryTemplate from "@/components/CategoryTemplate";

export default function NewPage() {
  return <CategoryTemplate title="New" description="Just launched and trending products." banner="/images/new-hero.jpg" />;
}
import { NEW_LAUNCHES } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import "@/styles/home.css";
export default function Page() {
  return (
    <div style={{maxWidth:1280,margin:"0 auto",padding:"32px 20px"}}>
      <div style={{marginBottom:32,textAlign:"center"}}>
        <span className="section-label">Just Arrived</span>
        <h1 className="section-title">New Launches ✨</h1>
        <div className="section-bar section-bar-center"/>
      </div>
      <div className="products-grid">
        {NEW_LAUNCHES.map(p=><ProductCard key={p.id} p={p} badge="NEW"/>)}
      </div>
    </div>
  );
}