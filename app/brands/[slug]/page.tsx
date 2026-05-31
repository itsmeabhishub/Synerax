import { BRANDS, ALL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import "@/styles/home.css";
export default function Page({ params }: { params: { slug: string } }) {
  const brand = BRANDS.find(b => b.href.endsWith(params.slug));
  return (
    <div style={{maxWidth:1280,margin:"0 auto",padding:"32px 20px"}}>
      <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:32,padding:"24px",background:"#faf5ff",borderRadius:20}}>
        <div style={{width:72,height:72,borderRadius:"50%",background:brand?.color||"#673ab7",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:"#fff",fontSize:20}}>{brand?.logo}</div>
        <div>
          <h1 style={{fontSize:28,fontWeight:900,color:"#1a1a2e"}}>{brand?.name}</h1>
          <p style={{fontSize:13,color:"#888"}}>Premium products from {brand?.name}</p>
        </div>
      </div>
      <div className="products-grid">
        {ALL_PRODUCTS.map(p=><ProductCard key={p.id} p={p} badge={p.discount+"%"}/>)}
      </div>
    </div>
  );
}