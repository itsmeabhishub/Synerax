"use client";
import Link from "next/link";
import { User, Package, Heart, MapPin, CreditCard, Bell, LogOut, ChevronRight, Gift, Settings, Star } from "lucide-react";
import { useAuth } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/styles/pages.css";

const MENU = [
  { icon: Package,    label: "My Orders",       sub: "Track, return or buy again",  href: "/profile/orders", bg: "#f0eaf8", color: "#673ab7" },
  { icon: Heart,      label: "Wishlist",         sub: "Products you love",           href: "/wishlist",       bg: "#fce4ec", color: "#e91e8c" },
  { icon: MapPin,     label: "Saved Addresses",  sub: "Manage delivery addresses",   href: "#",               bg: "#e3f2fd", color: "#1565c0" },
  { icon: CreditCard, label: "Payment Methods",  sub: "Cards, UPI & wallets",        href: "#",               bg: "#f3e5f5", color: "#7b1fa2" },
  { icon: Gift,       label: "Coupons & Offers", sub: "View available deals",        href: "/offers",         bg: "#fff3e0", color: "#e65100" },
  { icon: Bell,       label: "Notifications",    sub: "Manage alerts & updates",     href: "#",               bg: "#e8f5e9", color: "#2e7d32" },
  { icon: Settings,   label: "Account Settings", sub: "Privacy, password & more",    href: "#",               bg: "#f5f5f5", color: "#555" },
];

function ProfileContent() {
  const { user, logout } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-hero-inner">
          <div className="profile-avatar-row">
            <img
              src={user?.avatar}
              alt={user?.name}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "16px",
              }}
            />
            <div>
              <h1 className="profile-name">{user?.name}</h1>
              <p className="profile-email">{user?.email}</p>
            </div>
          </div>
          <div className="profile-stats">
            {[["📦","0","Orders"],["❤️","0","Wishlist"],["⭐","0","Reviews"]].map(([icon, val, label]) => (
              <div key={label} className="profile-stat">
                <div className="profile-stat-icon">{icon}</div>
                <p className="profile-stat-val">{val}</p>
                <p className="profile-stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-body">
        {/* Glamour Points */}
        <div className="profile-points-card">
          <div>
            <p className="profile-pts-label">Glamour Points</p>
            <p className="profile-pts-val">250 <span style={{ fontSize: 13, opacity: 0.6, fontWeight: 500 }}>pts</span></p>
            <p className="profile-pts-sub">Redeem for exclusive rewards</p>
            <p className="profile-member-badge">✦ Silver Member</p>
          </div>
          <Star size={44} color="rgba(255,255,255,0.15)" fill="rgba(255,255,255,0.15)" />
        </div>

        {/* Recent Orders */}
        <div className="profile-card">
          <div className="profile-card-header">
            <span className="profile-card-title">Recent Orders</span>
            <Link href="/profile/orders" className="profile-card-link">View All →</Link>
          </div>
          <div style={{ padding: "24px 20px", textAlign: "center" }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>📦</p>
            <p style={{ fontSize: 13, color: "#aaa", fontWeight: 500 }}>No orders yet. Start shopping!</p>
            <Link href="/" style={{ display: "inline-block", marginTop: 12, background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", borderRadius: 999, padding: "8px 20px", fontSize: 12, fontWeight: 700 }}>
              Shop Now →
            </Link>
          </div>
        </div>

        {/* Menu */}
        <div className="profile-card">
          {MENU.map(({ icon: Icon, label, sub, href, bg, color }, i) => (
            <Link key={label} href={href} className="profile-menu-item">
              <div className="profile-menu-icon" style={{ background: bg }}>
                <Icon size={19} color={color} />
              </div>
              <div style={{ flex: 1 }}>
                <p className="profile-menu-label">{label}</p>
                <p className="profile-menu-sub">{sub}</p>
              </div>
              <ChevronRight size={16} color="#ccc" />
            </Link>
          ))}
        </div>

        <button
          onClick={logout}
          className="profile-logout-btn"
          style={{ cursor: "pointer" }}
        >
          <LogOut size={16} /> Logout from Account
        </button>

        {/* App download */}
        <div style={{ background: "linear-gradient(135deg,#1a0a2e,#4a1a8e)", borderRadius: 16, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>📱 Get the Glam Store App</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Extra 10% OFF on your first app order</p>
          </div>
          <button style={{ background: "linear-gradient(90deg,#673ab7,#9c27b0)", color: "#fff", border: "none", borderRadius: 999, padding: "9px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Download</button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
