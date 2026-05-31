import CategoryTemplate from "@/components/CategoryTemplate";

export default function OffersPage() {
  return <CategoryTemplate title="Offers" description="Discover latest deals and discounts." banner="/images/offers-hero.jpg" />;
}
import Link from "next/link";
import "@/styles/home.css";
const OFFERS = [
  {title:"FLAT 25% OFF",desc:"On orders above ₹999",code:"GLAM25",bg:"linear-gradient(135deg,#673ab7,#e91e8c)"},
  {title:"BUY 2 GET 1",desc:"On all lipsticks",code:"LIP3FOR2",bg:"linear-gradient(135deg,#e91e8c,#ff6b35)"},
  {title:"₹200 OFF",desc:"First order above ₹499",code:"FIRST200",bg:"linear-gradient(135deg,#00897b,#673ab7)"},
  {title:"10% CASHBACK",desc:"Pay via UPI",code:"UPI10",bg:"linear-gradient(135deg,#1565c0,#673ab7)"},
];
export default function Page() {
  return (
    <div style={{maxWidth:1280,margin:"0 auto",padding:"32px 20px"}}>
      <div style={{marginBottom:36,textAlign:"center"}}>
        <span className="section-label">Limited Time</span>
        <h1 className="section-title">Deals & Offers 🔥</h1>
        <div className="section-bar section-bar-center"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20}}>
        {OFFERS.map((o,i)=>(
          <div key={i} style={{borderRadius:20,background:o.bg,padding:"28px 24px",color:"#fff"}}>
            <h2 style={{fontSize:28,fontWeight:900,marginBottom:8}}>{o.title}</h2>
            <p style={{fontSize:14,opacity:0.8,marginBottom:16}}>{o.desc}</p>
            <code style={{background:"rgba(255,255,255,0.2)",padding:"6px 14px",borderRadius:8,fontSize:13,fontWeight:700}}>{o.code}</code>
          </div>
        ))}
      </div>
    </div>
  );
}