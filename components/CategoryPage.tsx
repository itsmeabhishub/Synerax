"use client";
import { useState } from "react";
import Link from "next/link";
import { Filter, ChevronDown } from "lucide-react";
import { CATEGORIES, SUBCATEGORIES, getCategoryMetadata } from "@/lib/categories";
import { ALL_PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import "@/styles/pages.css";

interface CategoryPageProps {
  params: {
    slug?: string[];
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [sortBy, setSortBy] = useState("popular");

  // Resolve params
  const { slug = [] } = params;
  const categoryPath = slug.join("/");

  // Find category configuration
  let categoryTitle = "Products";
  let categoryDescription = "Browse our collection";
  let categoryBanner = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80";
  let subCategories: typeof SUBCATEGORIES["makeup/face"] = [];

  if (slug.length === 1) {
    // First level category (e.g., /makeup)
    const mainCategory = CATEGORIES.find((c) => c.slug === slug[0]);
    if (mainCategory) {
      categoryTitle = mainCategory.label;
      categoryDescription = `Explore our exclusive collection of ${mainCategory.label.toLowerCase()}`;
      subCategories = mainCategory.children || [];
    }
  } else if (slug.length >= 2) {
    // Second level category (e.g., /makeup/face)
    const mainCategory = CATEGORIES.find((c) => c.slug === slug[0]);
    const subCategory = mainCategory?.children?.find((c) => c.slug === slug[1]);

    if (subCategory) {
      categoryTitle = `${subCategory.label} ${mainCategory?.label}`;
      categoryDescription = subCategory.description || `Shop ${subCategory.label}`;

      // Get sub-subcategories if available
      const subcatKey = `${slug[0]}/${slug[1]}`;
      if (SUBCATEGORIES[subcatKey]) {
        subCategories = SUBCATEGORIES[subcatKey];
      }
    }
  }

  // Get metadata
  const metadata = getCategoryMetadata(categoryPath);

  // Filter products (mock - in real app, would filter by category)
  let products = ALL_PRODUCTS.slice(0, 20);

  // Sort products
  if (sortBy === "price-low") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    products = [...products].sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    products = [...products].reverse();
  }

  return (
    <>
      {/* Hero Banner */}
      <div
        style={{
          background: `url(${metadata.banner}) center/cover`,
          height: "240px",
          position: "relative",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "flex-end",
            padding: "40px 20px",
          }}
        >
          <div style={{ maxWidth: "1400px", width: "100%", margin: "0 auto" }}>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 8 }}>
              {categoryTitle}
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
              {categoryDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Sub-categories tabs */}
      {subCategories.length > 0 && (
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 20px 24px",
            borderBottom: "1px solid #f0eaf8",
            overflow: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <div style={{ display: "flex", gap: "12px", minWidth: "min-content" }}>
            {subCategories.map((sub) => (
              <Link
                key={sub.id}
                href={`/${slug[0]}/${sub.slug}`}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  background: "#f5f0ff",
                  color: "#673ab7",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#673ab7";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f5f0ff";
                  e.currentTarget.style.color = "#673ab7";
                }}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "24px" }}>
          {/* Filter Sidebar */}
          <div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "12px",
                background: "none",
                border: "1.5px solid #e0d5f5",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 600,
                color: "#1a1a2e",
                marginBottom: "16px",
              }}
            >
              <Filter size={16} />
              Filters
            </button>

            {filtersOpen && (
              <div style={{ padding: "16px 0" }}>
                {/* Price Filter */}
                <div style={{ marginBottom: "24px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#999", marginBottom: "12px", textTransform: "uppercase" }}>
                    Price
                  </p>
                  {[
                    { label: "Under ₹500", value: "0-500" },
                    { label: "₹500 - ₹1,000", value: "500-1000" },
                    { label: "₹1,000 - ₹2,000", value: "1000-2000" },
                    { label: "Above ₹2,000", value: "2000+" },
                  ].map((range) => (
                    <label
                      key={range.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 0",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      <input type="checkbox" style={{ cursor: "pointer" }} />
                      {range.label}
                    </label>
                  ))}
                </div>

                {/* Rating Filter */}
                <div style={{ marginBottom: "24px" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#999", marginBottom: "12px", textTransform: "uppercase" }}>
                    Rating
                  </p>
                  {[4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 0",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      <input type="checkbox" style={{ cursor: "pointer" }} />
                      {"⭐".repeat(rating)} & up
                    </label>
                  ))}
                </div>

                {/* Discount Filter */}
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#999", marginBottom: "12px", textTransform: "uppercase" }}>
                    Discount
                  </p>
                  {[
                    { label: "10% or more", value: "10" },
                    { label: "25% or more", value: "25" },
                    { label: "50% or more", value: "50" },
                  ].map((disc) => (
                    <label
                      key={disc.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 0",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      <input type="checkbox" style={{ cursor: "pointer" }} />
                      {disc.label}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Products Section */}
          <div>
            {/* Sort Dropdown */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Showing {products.length} products
              </p>
              <div style={{ position: "relative", minWidth: "160px" }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1.5px solid #e0d5f5",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 500,
                    background: "#fff",
                    cursor: "pointer",
                    appearance: "none",
                    paddingRight: "32px",
                  }}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown
                  size={16}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#673ab7",
                  }}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} badge={p.discount + "%"} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
