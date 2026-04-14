import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="new-home-page">
      <div className="new-hero-section">
        <div className="container new-hero-grid">
          <div className="new-hero-content">
            <span className="new-hero-pill">Premium Pet Essentials</span>
            <h1>Care, Comfort and Style For Every Pet</h1>
            <p>
              Explore a premium collection of pet food, accessories, grooming kits,
              care products, toys and wellness essentials for dogs, cats, birds and aquatic pets.
            </p>

            <div className="new-hero-actions">
              <Link to="/products" className="hero-main-btn">
                Explore Products
              </Link>
              <Link to="/about" className="hero-secondary-btn">
                About Us
              </Link>
            </div>

            <div className="hero-quick-stats">
              <div>
                <h3>1200+</h3>
                <p>Curated Products</p>
              </div>
              <div>
                <h3>5000+</h3>
                <p>Happy Customers</p>
              </div>
              <div>
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>

          <div className="new-hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80"
              alt="Premium pet store"
            />
          </div>
        </div>
      </div>

      <div className="container home-sections-space">
        <div className="lux-section-title">
          <span>Collections</span>
          <h2>Shop by Category</h2>
          <p>Explore care essentials by pet type.</p>
        </div>

        <div className="lux-category-grid">
          <div className="lux-category-card">
            <img
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80"
              alt="Dog"
            />
            <div>
              <h3>Dog Essentials</h3>
              <p>Food, toys, collars, beds and grooming kits.</p>
            </div>
          </div>

          <div className="lux-category-card">
            <img
              src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80"
              alt="Cat"
            />
            <div>
              <h3>Cat Comfort</h3>
              <p>Scratching posts, litter care and premium nutrition.</p>
            </div>
          </div>

          <div className="lux-category-card">
            <img
              src="https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80"
              alt="Bird"
            />
            <div>
              <h3>Bird Care</h3>
              <p>Cages, feed and accessories for active birds.</p>
            </div>
          </div>

          <div className="lux-category-card">
            <img
              src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80"
              alt="Fish"
            />
            <div>
              <h3>Aquatic Care</h3>
              <p>Filters, tanks and healthy habitat essentials.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;