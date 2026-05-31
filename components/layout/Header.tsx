"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, User, Menu, X, Search, LogOut } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import "@/styles/header.css";
import { NAVIGATION } from "@/src/data/navigation";

const PRIMARY_NAV_SLUGS = [
  "makeup",
  "skincare",
  "haircare",
  "fragrance",
  "bath-body",
  "men",
  "brands",
  "offers",
  "new-launches",
];

export default function Header() {
  const { cartCount, state } = useCart();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  return (
    <>
      <header className="header">
        {/* Top bar */}
        <div className="header-top-bar">
          <span>🎉 Free delivery on orders above ₹499</span>
          <span className="top-bar-links" style={{ display: "flex", gap: 20 }}>
            <Link href="/offers">Offers</Link>
            <Link href="/profile/orders">Track Order</Link>
            <Link href="/beauty-blog">Blog</Link>
          </span>
        </div>

        {/* Main row */}
        <div className="header-main">
          {/* Logo */}
          <Link href="/" className="header-logo">
            <div className="header-logo-circle">G</div>
            <div className="header-logo-text">
              <div className="header-logo-name">Glam Store</div>
              <div className="header-logo-sub">Luxury Beauty</div>
            </div>
          </Link>

          {/* Search */}
          <div className="header-search">
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Link href={`/search?q=${search}`}>
              <button className="header-search-btn">Search</button>
            </Link>
          </div>

          {/* Icons */}
          <div className="header-icons">
            <Link href="/wishlist" className="header-icon-btn">
              <Heart size={18} />
              {mounted && state.wishlist.length > 0 && (
                <span className="header-cart-badge">{state.wishlist.length}</span>
              )}
            </Link>
            <Link href="/cart" className="header-icon-btn">
              <ShoppingBag size={18} />
              {mounted && cartCount > 0 && (
                <span className="header-cart-badge">{cartCount}</span>
              )}
            </Link>

            {/* Auth Section */}
            {mounted && !isLoading && (
              isAuthenticated && user ? (
                <div style={{ position: "relative" }}>
                  <button
                    className="header-icon-btn"
                    onClick={() => setProfileOpen(!profileOpen)}
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a2e", maxWidth: "80px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {user.name}
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      marginTop: "8px",
                      background: "#fff",
                      border: "1px solid #e5dff0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      zIndex: 300,
                      minWidth: "180px",
                      overflow: "hidden",
                    }}>
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        style={{
                          display: "block",
                          padding: "12px 16px",
                          color: "#1a1a2e",
                          fontSize: "14px",
                          fontWeight: 500,
                          borderBottom: "1px solid #f0eaf8",
                          textDecoration: "none",
                        }}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/profile/orders"
                        onClick={() => setProfileOpen(false)}
                        style={{
                          display: "block",
                          padding: "12px 16px",
                          color: "#1a1a2e",
                          fontSize: "14px",
                          fontWeight: 500,
                          borderBottom: "1px solid #f0eaf8",
                          textDecoration: "none",
                        }}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          background: "none",
                          border: "none",
                          color: "#c33",
                          fontSize: "14px",
                          fontWeight: 500,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          textAlign: "left",
                        }}
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="header-icon-btn">
                  <User size={18} />
                </Link>
              )
            )}

            <button className="header-icon-btn header-mobile-menu-btn" onClick={() => setMobileOpen(p => !p)}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Primary Nav with Mega Menu */}
        <nav className="header-nav">
          <div className="header-nav-inner">
            {PRIMARY_NAV_SLUGS.map((slug) => {
              const item = NAVIGATION.find((i) => i.slug === slug);
              const label = item ? item.name : (slug === "new-launches" ? "New" : slug);
              const href = slug === "new-launches" ? "/new-launches" : `/${slug}`;
              return (
                <div
                    key={slug}
                    className="header-nav-item"
                    onMouseEnter={() => setHover(slug)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <Link href={href} className="header-nav-link" onFocus={() => setHover(slug)} onBlur={() => setHover(null)}>{label}</Link>

                  {/* Mega menu */}
                  {hover === slug && item && item.children && (
                    <div className="mega-menu" onMouseEnter={() => setHover(slug)} onMouseLeave={() => setHover(null)}>
                      <div className="mega-menu-inner">
                        {item.children.map((col) => (
                          <div key={col.slug} className="mega-col">
                            <Link href={`/${item.slug}/${col.slug}`} className="mega-col-title">{col.name}</Link>
                            {col.children && (
                              <ul className="mega-col-list">
                                {col.children.map((c) => (
                                  <li key={c.slug} className="mega-col-item">
                                    <Link href={`/${item.slug}/${col.slug}/${c.slug}`} className="mega-col-link">{c.name}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {col.description && <div className="mega-col-desc">{col.description}</div>}
                          </div>
                        ))}
                        {/* Right column: CTA / Banner */}
                        <div className="mega-cta">
                          <Link href={`/${item.slug}`} className="mega-cta-link">Shop all {item.name}</Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#fff", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid #f0eaf8" }}>
            <span style={{ fontWeight: 900, fontSize: 16, color: "#1a1a2e" }}>Glam Store</span>
            <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={22} /></button>
          </div>
          <div style={{ padding: "8px 12px" }}>
            {PRIMARY_NAV_SLUGS.map((slug) => {
              const item = NAVIGATION.find((i) => i.slug === slug);
              const label = item ? item.name : (slug === "new-launches" ? "New" : slug);
              const href = slug === "new-launches" ? "/new-launches" : `/${slug}`;
              return (
                <Link key={slug} href={href} onClick={() => setMobileOpen(false)} style={{ display: "block", padding: "14px 12px", fontSize: 14, fontWeight: 700, color: "#1a1a2e", borderBottom: "1px solid #f5eef5", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
