import { useState } from "react";
import api from "../api/axios";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    await api.post("/contact", form);
    alert("Message sent successfully");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="premium-contact-page">
      <div className="container contact-page-grid">
        <div className="contact-page-info">
          <span>Contact Us</span>
          <h2>We’re Here To Help</h2>
          <p>
            Reach out for order support, product enquiries, bulk purchase
            requests or general pet care information.
          </p>

          <div className="contact-info-premium-box">
            <h4>Customer Support</h4>
            <p>+91 98765 43210</p>
          </div>

          <div className="contact-info-premium-box">
            <h4>Email Address</h4>
            <p>support@petsphereworld.com</p>
          </div>

          <div className="contact-info-premium-box">
            <h4>Office Address</h4>
            <p>
              2nd Floor, Premium Pet Plaza,
              <br />
              Indiranagar, Bengaluru, Karnataka
            </p>
          </div>
        </div>

        <form className="contact-form-premium-new" onSubmit={submitForm}>
          <h3>Send Message</h3>

          <div className="grid-2">
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Write your message"
            value={form.message}
            onChange={handleChange}
            rows="6"
            required
          />

          <button className="admin-primary-btn" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;