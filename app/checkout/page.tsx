"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

type AddrKey = "name" | "phone" | "pincode" | "city" | "address" | "addressState";

function CheckoutContent() {
  const { state, cartTotal, dispatch } = useCart();
  const [step, setStep] = useState(0);
  const [addr, setAddr] = useState<Record<AddrKey, string>>({ name: "", phone: "", pincode: "", city: "", address: "", addressState: "" });
  const [pay, setPay] = useState("upi");
  const delivery = cartTotal > 499 ? 0 : 79;
  const total = cartTotal + delivery;

  const go = () => { dispatch({ type: "CLEAR" }); window.location.href = "/order-success"; };
  const inp = (k: AddrKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setAddr(p => ({ ...p, [k]: e.target.value }));

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 900, color: "#1a1a2e", marginBottom: 24 }}>Checkout</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        <div>
          {step === 0 && (
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0eaf8", padding: 24 }}>
              <h2 style={{ fontWeight: 800, marginBottom: 20, fontSize: 18, color: "#1a1a2e" }}>Delivery Address</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {(["name","phone","pincode","city"] as AddrKey[]).map(f => (
                  </div>
                ))}
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#999", display: "block", marginBottom: 6 }}>Full Address</label>
                  <textarea value={addr.address} onChange={inp("address")} rows={2} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e0d5f5", outline: "none", fontSize: 13, resize: "none" }} placeholder="House no, Street, Area" />
                </div>
              </div>
              <button onClick={() => setStep(1)} style={{ marginTop: 16, background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "12px 28px", fontWeight: 700, border: "none", cursor: "pointer" }}>
                Continue to Payment →
              </button>
            </div>
          )}
          {step === 1 && (
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0eaf8", padding: 24 }}>
              <h2 style={{ fontWeight: 800, marginBottom: 20, fontSize: 18, color: "#1a1a2e" }}>Payment Method</h2>
              {[["upi","UPI / GPay / PhonePe"],["card","Credit / Debit Card"],["cod","Cash on Delivery"]].map(([v, l]) => (
                <label key={v} style={{ display: "flex", gap: 12, padding: 14, borderRadius: 12, border: `2px solid ${pay === v ? "#673ab7" : "#f0eaf8"}`, marginBottom: 10, cursor: "pointer", background: pay === v ? "#faf5ff" : "#fff", alignItems: "center" }}>
                  <input type="radio" value={v} checked={pay === v} onChange={() => setPay(v)} />
                  <span style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{l}</span>
                </label>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button onClick={() => setStep(0)} style={{ padding: "11px 22px", borderRadius: 999, border: "1.5px solid #673ab7", color: "#673ab7", fontWeight: 700, background: "#fff", cursor: "pointer" }}>Back</button>
                <button onClick={go} style={{ flex: 1, background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "12px", fontWeight: 700, border: "none", cursor: "pointer" }}>
                  Place Order · Rs.{total}
                </button>
              </div>
            </div>
          )}
        </div>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0eaf8", padding: 20, height: "fit-content" }}>
          <h3 style={{ fontWeight: 800, marginBottom: 16, color: "#1a1a2e" }}>Order Summary</h3>
          {state.items.map(i => (
            <div key={i.id} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <img src={i.img} alt={i.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#1a1a2e" }}>{i.name}</p>
                <p style={{ fontSize: 12, color: "#673ab7", fontWeight: 700 }}>Rs.{i.price} x {i.quantity}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #f0eaf8", paddingTop: 12, marginTop: 8, display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 16, color: "#1a1a2e" }}>
            <span>Total</span><span>Rs.{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}
