"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth";
import "@/styles/pages.css";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register, isAuthenticated, isLoading } = useAuth();
  
  const [tab, setTab] = useState<"signin"|"register">("signin");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    }
  }, [isAuthenticated, isLoading, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (tab === "signin") {
        if (!form.email || !form.password) {
          setError("Please enter email and password");
          setIsSubmitting(false);
          return;
        }
        await login(form.email, form.password);
      } else {
        if (!form.name || !form.email || !form.password) {
          setError("Please fill all fields");
          setIsSubmitting(false);
          return;
        }
        await register(form.name, form.email, form.password);
      }

      // Redirect to intended route or home
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (err) {
      setError("Authentication failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1800&q=80" alt="" className="login-bg" />
      <div className="login-overlay" />

      <div className="login-layout">
        {/* Left Hero */}
        <div className="login-hero">
          <span className="login-hero-label">Luxury Beauty</span>
          <h1 className="login-hero-title">Luxury Beauty<br />Starts Here</h1>
          <p className="login-hero-desc">Discover premium skincare, makeup and wellness products curated for a luxurious self-care experience.</p>
          <div className="login-hero-features">
            {[["Curated Collections","Handpicked products from the world's finest brands."],["Exclusive offers","Members enjoy private drops, rewards and premium shipping."]].map(([t, d]) => (
              <div key={t}>
                <p className="login-feature-title">{t}</p>
                <p className="login-feature-desc">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div className="login-card">
          <p className="login-card-store-name">Glamour Store</p>
          <h2 className="login-card-title">Premium Account Access</h2>
          <p className="login-card-sub">Secure your checkout and enjoy personalised beauty recommendations.</p>

          {/* Tabs */}
          <div className="login-tabs">
            {(["signin","register"] as const).map(t => (
              <button key={t} className={`login-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                {t === "signin" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          {/* Social */}
          <div className="login-social">
            <button className="login-social-btn">
              <svg width="17" height="17" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.388 17.64 12.08 17.64 9.2z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/><path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.45.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="login-social-btn">
              <svg width="14" height="17" viewBox="0 0 814 1000" fill="#1a1a2e"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-38.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 135.4-317.9 269-317.9 70.9 0 130 46.4 172.1 46.4 39.6 0 107.2-49.4 186.5-49.4zm-5.3-150.4c21.9-28.5 37-68.4 37-108.4 0-5.5-.5-11-.9-16.5-35.4 1.5-77.5 23.7-103.1 52.8-19.6 22.1-38.1 61.3-38.1 101.8 0 6 1 12.4 1.5 14.4 2.5.5 6.3 1 10.1 1 31.5 0 71.1-21.3 93.5-45.1z"/></svg>
              Apple
            </button>
          </div>

          {/* Divider */}
          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">or sign in with email</span>
            <div className="login-divider-line" />
          </div>

          {/* Fields */}
          <form onSubmit={handleSubmit}>
            {tab === "register" && (
              <div className="login-field">
                <label className="login-field-label">Full Name</label>
                <input type="text" className="login-field-input" value={form.name} onChange={set("name")} placeholder="Enter your name" disabled={isSubmitting} />
              </div>
            )}
            <div className="login-field">
              <label className="login-field-label">Email Address</label>
              <input type="email" className="login-field-input" value={form.email} onChange={set("email")} placeholder="Enter email" disabled={isSubmitting} />
            </div>
            <div className="login-field">
              <label className="login-field-label">Password</label>
              <div className="login-field-pw-wrap">
                <input type={showPass ? "text" : "password"} className="login-field-input" value={form.password} onChange={set("password")} placeholder="Enter password" disabled={isSubmitting} />
                <button type="button" className="login-field-pw-toggle" onClick={() => setShowPass(p => !p)} disabled={isSubmitting}>
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                padding: "12px",
                marginBottom: "16px",
                background: "#fee",
                border: "1px solid #f99",
                borderRadius: "6px",
                color: "#c33",
                fontSize: "13px",
                textAlign: "center",
              }}>
                {error}
              </div>
            )}

            <div className="login-links-row">
              <button type="button" className="login-link" disabled={isSubmitting}>Forgot password?</button>
              <button type="button" className="login-link" disabled={isSubmitting}>Need help?</button>
            </div>

            <button type="submit" className="login-cta-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}>
              {isSubmitting ? "Loading..." : (tab === "signin" ? "Sign In" : "Create Account")}
            </button>
          </form>

          <p className="login-terms">By continuing, you agree to our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
      </div>
    </div>
  );
}
