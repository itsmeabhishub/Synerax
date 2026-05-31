import CategoryTemplate from "@/components/CategoryTemplate";

export default function BrandsPage() {
  return <CategoryTemplate title="Brands" description="Shop by top brands." banner="/images/brands-hero.jpg" />;
}
import Link from "next/link";
import { BRANDS } from "@/lib/data";
import "@/styles/home.css";
export default function Page() {
  return (
    <div style={{maxWidth:1280,margin:"0 auto",padding:"32px 20px"}}>
      <div style={{marginBottom:36,textAlign:"center"}}>
        <span className="section-label">Discover</span>
        <h1 className="section-title">All Brands</h1>
        <div className="section-bar section-bar-center"/>
      </div>
      <div className="brands-grid">
        {BRANDS.map(b=>(
          <Link key={b.name} href={b.href} className="brand-item">
            <div className="brand-circle" style={{background:b.color}}>{b.logo}</div>
            <span className="brand-name">{b.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}