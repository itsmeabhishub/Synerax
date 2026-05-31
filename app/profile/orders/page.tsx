"use client";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

function OrdersContent() {
  const orders = [
    {id:"GS4K9X2M",date:"May 20, 2025",status:"Delivered",items:["Vitamin C Serum"],total:399,sc:"#2e7d32",sb:"#e8f5e9"},
    {id:"GS7A3LMN",date:"May 15, 2025",status:"Processing",items:["Matte Lipstick"],total:299,sc:"#e65100",sb:"#fff3e0"},
  ];
  return (
    <div style={{maxWidth:720,margin:"0 auto",padding:"32px 20px"}}>
      <h1 style={{fontSize:24,fontWeight:900,color:"#1a1a2e",marginBottom:24}}>My Orders</h1>
      {orders.map(o=>(
        <div key={o.id} style={{background:"#fff",borderRadius:16,border:"1px solid #f0eaf8",padding:16,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
            <div><p style={{fontWeight:700,fontSize:14,color:"#1a1a2e"}}>Order #{o.id}</p><p style={{fontSize:12,color:"#aaa"}}>{o.date}</p></div>
            <span style={{fontSize:12,fontWeight:700,background:o.sb,color:o.sc,borderRadius:999,padding:"4px 12px"}}>{o.status}</span>
          </div>
          <p style={{fontSize:13,color:"#666"}}>{o.items.join(", ")}</p>
          <p style={{fontWeight:800,fontSize:16,marginTop:6}}>₹{o.total}</p>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}