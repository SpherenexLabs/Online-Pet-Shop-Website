import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const testimonials = [
  {
    name: "Aarav",
    role: "Dog Parent",
    text: "Excellent quality products and the website feels premium. My dog loves the food and toys.",
  },
  {
    name: "Meera",
    role: "Cat Parent",
    text: "Very smooth shopping experience. The UI is clean and product browsing feels easy.",
  },
  {
    name: "Rahul",
    role: "Bird Keeper",
    text: "Fast support and useful product collection. The bird accessories were really good.",
  },
];

const categoryHighlights = [
  {
    title: "Food",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80",
    text: "Nutritious premium food collections for everyday pet wellness.",
  },
  {
    title: "Accessories",
    image:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80",
    text: "Comfortable and stylish accessories for every pet lifestyle.",
  },
  {
    title: "Housing",
    image:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80",
    text: "Safe, spacious and elegant housing options for birds and pets.",
  },
  {
    title: "Aquatic",
    image:
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80",
    text: "Aquarium essentials, filters and fish habitat care products.",
  },
];

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [petType, setPetType] = useState("All");
  const [category, setCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((item) => item.category))];
    return ["All", ...unique];
  }, [products]);

  const petTypes = useMemo(() => {
    const unique = [...new Set(products.map((item) => item.petType))];
    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.petType.toLowerCase().includes(search.toLowerCase());

      const matchesPetType = petType === "All" || item.petType === petType;
      const matchesCategory = category === "All" || item.category === category;

      return matchesSearch && matchesPetType && matchesCategory;
    });
  }, [products, search, petType, category]);

  const featuredProducts = products.slice(0, 8);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    alert(`Subscribed successfully: ${newsletterEmail}`);
    setNewsletterEmail("");
  };

  return (
    <section className="page">
      <div className="container">
        <div className="lux-section-title left">
          <span>Premium Collection</span>
          <h2>Our Products</h2>
          <p>
            Browse premium food, accessories, grooming kits, toys and care essentials.
          </p>
        </div>

        <div className="product-filter-bar">
          <input
            type="text"
            placeholder="Search by product, category or pet type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={petType} onChange={(e) => setPetType(e.target.value)}>
            {petTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="lux-section-title">
          <span>Category Highlights</span>
          <h2>Shop By Product Type</h2>
          <p>Explore key product categories with premium collections.</p>
        </div>

        <div className="category-highlight-grid">
          {categoryHighlights.map((item) => (
            <div
              key={item.title}
              className="category-highlight-card"
              onClick={() => setCategory(item.title)}
            >
              <img src={item.image} alt={item.title} />
              <div className="category-highlight-overlay">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <button className="overlay-btn" type="button">
                  View {item.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lux-section-title" style={{ marginTop: "50px" }}>
          <span>Featured Products</span>
          <h2>Best Picks For Your Pets</h2>
          <p>Top premium products selected from our collection.</p>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="lux-section-title" style={{ marginTop: "50px" }}>
          <span>All Products</span>
          <h2>Explore Full Collection</h2>
          <p>{filteredProducts.length} products found</p>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="lux-section-title" style={{ marginTop: "60px" }}>
          <span>Testimonials</span>
          <h2>What Our Customers Say</h2>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>{item.text}</p>
              <h4>{item.name}</h4>
              <span>{item.role}</span>
            </div>
          ))}
        </div>

        <div className="newsletter-box">
          <div>
            <span className="newsletter-badge">Newsletter</span>
            <h3>Get Pet Care Updates and New Arrivals</h3>
            <p>Subscribe for premium product updates, offers and care tips.</p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="admin-primary-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Products;