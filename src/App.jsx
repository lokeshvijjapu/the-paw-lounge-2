import { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";

const NAV_LINKS = ["Home", "Services", "Products", "Pets", "Contact"];

const SERVICES = [
  {
    icon: "✂️",
    title: "Pet Grooming",
    desc: "Full luxury grooming for dogs and cats — cuts, styling, nail trimming and finishing touches fit for royalty.",
    color: "#C89B3C",
  },
  {
    icon: "🛁",
    title: "Spa & Bathing",
    desc: "Comfort-focused bathing with premium shampoos, aromatherapy rinses, and coat conditioning treatments.",
    color: "#0B2341",
  },
  {
    icon: "🎀",
    title: "Pet Accessories",
    desc: "Curated premium collars, leashes, toys, and grooming essentials for the discerning pet owner.",
    color: "#C89B3C",
  },
  {
    icon: "🥣",
    title: "Premium Pet Food",
    desc: "Nutritionist-approved, natural and grain-free food ranges crafted for optimal pet health and vitality.",
    color: "#0B2341",
  },
];

const PETS = [
  {
    name: "Golden Retriever",
    category: "Dog",
    image: "/pets/dog.png",
    desc: "Gentle, loving, and perfect for families. Fully vaccinated and health checked.",
    color: "#FFF3D4"
  },
  {
    name: "Persian Cat",
    category: "Cat",
    image: "/pets/cat.png",
    desc: "Elegant and affectionate long-haired companion. Groomed and socialized.",
    color: "#F0E8FF"
  },
  {
    name: "Rabbit",
    category: "Rabbit",
    image: "/pets/rabbit.png",
    desc: "Adorably floppy-eared and docile. Litter trained and ready to love.",
    color: "#E8F5E9"
  },
  {
    name: "Parrot",
    category: "Bird",
    image: "/pets/parrot.png",
    desc: "Playful, vocal and intelligent. Hand-tamed and cage-ready with accessories.",
    color: "#FFF8E1"
  }
];

const PRODUCTS = [
  {
    name: "Royal Canin Dog Food",
    cat: "Dog Food",
    image: "/products/dog-food.png",
    bg: "#FFF3D4"
  },
  {
    name: "Whiskas Premium",
    cat: "Cat Food",
    image: "/products/cat-food.png",
    bg: "#E8F5E9"
  },
  {
    name: "Rope Tug Toy",
    cat: "Toys",
    image: "/products/toy.png",
    bg: "#F0E8FF"
  },
  {
    name: "Leather Premium Leash",
    cat: "Leashes",
    image: "/products/leash.png",
    bg: "#FFF8E1"
  },
  {
    name: "Stainless Steel Bowl",
    cat: "Bowls",
    image: "/products/bowl.png",
    bg: "#E8F4FF"
  },
  {
    name: "De-Shedding Brush",
    cat: "Grooming",
    image: "/products/brush.png",
    bg: "#FFF0F0"
  }
];

const WHY_US = [
  { icon: "🏆", title: "Expert Care", desc: "Trained professional groomers with 5+ years of experience." },
  { icon: "💚", title: "Healthy Pets", desc: "Vet-approved care protocols for every service we offer." },
  { icon: "⭐", title: "Premium Products", desc: "Only the finest brands available in our curated store." },
  { icon: "🤝", title: "Friendly Environment", desc: "Calm, stress-free atmosphere designed with your pet in mind." },
  { icon: "🫧", title: "Hygiene First", desc: "Thoroughly sanitised facilities after every single session." },
];

const GALLERY = [
  { emoji: "🐶", label: "Happy golden after grooming", color: "#FFF3D4" },
  { emoji: "🛁", label: "Spa bathing session", color: "#E8F4FF" },
  { emoji: "🐱", label: "Persian cat styling", color: "#F0E8FF" },
  { emoji: "🐾", label: "Paw treatment closeup", color: "#FFF8E1" },
  { emoji: "✂️", label: "Precision trimming", color: "#E8F5E9" },
  { emoji: "😺", label: "Freshly groomed cat", color: "#FFF0F0" },
  { emoji: "🏪", label: "Our premium store", color: "#FFF3D4" },
  { emoji: "👑", label: "VIP pet lounge area", color: "#F5EFE6" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(-40px)", right: "translateX(40px)" };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(11,35,65,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(200,155,60,0.2)" : "none",
      transition: "all 0.4s ease",
      padding: "0 5%",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <img
            src="/hero/logo.png"
            alt="The Paw Lounge"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              transform: "translateY(8px)",
            }}
          />
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#C89B3C", lineHeight: 1.1 }}>The Paw Lounge</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>Pet Grooming & Spa</div>
          </div>
        </div>
        <div style={{ display: window.innerWidth < 768 ? "none" : "flex", gap: 36, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 13,
              letterSpacing: 1, textTransform: "uppercase", fontWeight: 500,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#C89B3C"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.85)"}
            >{l}</a>
          ))}
          <a href="tel:9542905904" style={{
            background: "linear-gradient(135deg, #C89B3C, #E8C46A)",
            color: "#0B2341", padding: "10px 22px", borderRadius: 50,
            fontWeight: 700, fontSize: 13, textDecoration: "none",
            letterSpacing: 0.5, whiteSpace: "nowrap",
            boxShadow: "0 4px 20px rgba(200,155,60,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 30px rgba(200,155,60,0.5)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 20px rgba(200,155,60,0.35)"; }}
          >📞 Call Now</a>
        </div>
        {window.innerWidth < 768 && (
          <div
            style={{
              color: "#fff",
              fontSize: "28px",
              cursor: "pointer"
            }}
          >
            ☰
          </div>
        )}
      </div>
    </nav>
  );
}

function Hero() {
  const [float, setFloat] = useState(0);
  useEffect(() => {
    let frame;
    const animate = (t) => {
      setFloat(Math.sin(t / 1200) * 12);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <section id="home" style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #050f1e 0%, #0B2341 45%, #0f2d50 100%)",
      position: "relative", display: "flex", alignItems: "center", overflow: "hidden",
    }}>
      {/* Decorative orbs */}
      <div style={{ position: "absolute", top: "10%", right: "5%", width: window.innerWidth < 768 ? 280 : 500, height: window.innerWidth < 768 ? 280 : 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,155,60,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "0%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,155,60,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", left: "30%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Gold arc */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", opacity: 0.07 }} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0,200 C360,60 1080,60 1440,200 Z" fill="#C89B3C" />
      </svg>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 5% 80px", display: "grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr", gap: 60, alignItems: "center" }}>
        {/* Left */}
        <div>
          <FadeIn delay={0}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,155,60,0.15)", border: "1px solid rgba(200,155,60,0.3)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C89B3C", display: "inline-block" }} />
              <span style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Hyderabad's Premium Pet Spa</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(38px,5vw,64px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 24px" }}>
              Luxury Care for<br />
              <span style={{ background: "linear-gradient(135deg, #C89B3C, #E8C46A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Your Beloved Pets</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.8, marginBottom: 40, maxWidth: 500 }}>
              Professional grooming, indulgent bathing, premium pet food, accessories, and healthy pets for loving homes — all under one luxurious roof.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#services" style={{
                background: "linear-gradient(135deg, #C89B3C, #E8C46A)", color: "#0B2341",
                padding: "16px 36px", borderRadius: 50, fontWeight: 700, fontSize: 14,
                textDecoration: "none", letterSpacing: 0.5,
                boxShadow: "0 8px 30px rgba(200,155,60,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 12px 40px rgba(200,155,60,0.6)"; }}
                onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 8px 30px rgba(200,155,60,0.4)"; }}
              >Explore Services ✦</a>
              <a href="#contact" style={{
                border: "1.5px solid rgba(200,155,60,0.5)", color: "#C89B3C",
                padding: "16px 36px", borderRadius: 50, fontWeight: 600, fontSize: 14,
                textDecoration: "none", letterSpacing: 0.5, background: "transparent",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.target.style.background = "rgba(200,155,60,0.1)"; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; }}
              >Contact Us</a>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 12, marginTop: 48, flexWrap: "wrap" }}>
              {["🏙️ Trusted in Hyderabad", "✨ Premium Pet Care", "💚 Healthy Pets Guaranteed"].map((b, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 50, padding: "8px 16px", fontSize: 12, color: "rgba(255,255,255,0.75)",
                  transform: `translateY(${float * (i % 2 === 0 ? 1 : -1) * 0.5}px)`,
                  transition: "transform 0.1s",
                }}>{b}</div>
              ))}
            </div>
          </FadeIn>
        </div>
        {/* Right - Hero visual */}
        <FadeIn delay={0.2} direction="left">
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              width: window.innerWidth < 768 ? 320 : 480, height: window.innerWidth < 768 ? 320 : 480, borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(200,155,60,0.2), rgba(200,155,60,0.05))",
              border: "2px solid rgba(200,155,60,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: `translateY(${float}px)`,
              transition: "transform 0.1s linear",
              position: "relative",
            }}>
              <div style={{
                width: window.innerWidth < 768 ? 300 : 460, height: window.innerWidth < 768 ? 300 : 460, borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(11,35,65,0.8), rgba(15,45,80,0.9))",
                border: "1px solid rgba(200,155,60,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 140, userSelect: "none", overflow: "hidden", position: "relative",
              }}>
              <img
                src="/hero/logo.png"
                alt="The Paw Lounge"
                style={{
                  position: "absolute",
                  width: window.innerWidth < 768 ? "190%" : "200%",
                  height: window.innerWidth < 768 ? "190%" : "200%",
                  objectFit: "contain",
                  objectPosition: "center",
                  top: "50%",
                  left: "50%",
                  transform: window.innerWidth < 768
                    ? "translate(-50%, -40%)"
                    : "translate(-50%, -40%)",
                  filter: "drop-shadow(0 0 30px rgba(200,155,60,0.35))",
                  animation: "float 4s ease-in-out infinite"
                }}
              />
              </div>
              {/* Floating badges */}
              <div style={{
                position: "absolute", top: -10, right: 10,
                background: "linear-gradient(135deg, #C89B3C, #E8C46A)", borderRadius: 50,
                padding: "10px 18px", fontSize: 12, fontWeight: 700, color: "#0B2341",
                boxShadow: "0 8px 24px rgba(200,155,60,0.4)",
                transform: `translateY(${float * -0.8}px)`,
              }}>🐕 Dogs & Cats</div>
              <div style={{
                position: "absolute", bottom: 20, left: -20,
                background: "rgba(255,255,255,0.95)", borderRadius: 16,
                padding: "12px 18px", fontSize: 11, fontWeight: 600, color: "#0B2341",
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                transform: `translateY(${float * 0.6}px)`,
              }}>⭐⭐⭐⭐⭐<br /><span style={{ fontSize: 12, color: "#555" }}>100+ Happy Pets</span></div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding: "100px 5%", background: "#FFF8F0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <p style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>What We Offer</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#0B2341", margin: "0 0 16px" }}>Premium Services</h2>
            <p style={{ color: "#666", maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>Every service designed with your pet's comfort and well-being as the absolute priority.</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <ServiceCard {...s} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        borderRadius: 24,
        padding: "40px 32px",
        minHeight: "350px",
        boxShadow: hov ? "0 24px 60px rgba(11,35,65,0.14)" : "0 4px 20px rgba(11,35,65,0.06)",
        transform: hov ? "translateY(-8px)" : "none",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        border: `1px solid ${hov ? "rgba(200,155,60,0.3)" : "rgba(0,0,0,0.05)"}`,
        cursor: "default",
      }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: 18, fontSize: 28,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: color === "#C89B3C" ? "rgba(200,155,60,0.1)" : "rgba(11,35,65,0.06)",
        marginBottom: 24,
        transition: "transform 0.3s",
        transform: hov ? "scale(1.1) rotate(5deg)" : "none",
      }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#0B2341", margin: "0 0 12px" }}>{title}</h3>
      <p style={{ color: "#777", lineHeight: 1.75, fontSize: 14, margin: 0 }}>{desc}</p>
    </div>
  );
}

function FeaturedPets() {
  return (
    <section id="pets" style={{ padding: "100px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <p style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Available Now</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#0B2341", margin: "0 0 16px" }}>Find Your Companion</h2>
            <p style={{ color: "#666", maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>Each pet is health-checked, vaccinated and lovingly cared for — ready for their forever home.</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 28 }}>
          {PETS.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <PetCard {...p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PetCard({ name, category, image, desc, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 24, overflow: "hidden",
        boxShadow: hov ? "0 24px 60px rgba(11,35,65,0.14)" : "0 4px 20px rgba(11,35,65,0.06)",
        transform: hov ? "translateY(-8px)" : "none",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "default", background: "#fff",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div style={{
        background: color, height: 180, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 90,
        transition: "transform 0.4s",
        transform: hov ? "scale(1.08)" : "none",
      }}>
        <img
          src={image}
          alt={name}
          style={{
            width: "150px",
            height: "195px",
            objectFit: "contain"
          }}
        />
      </div>
      <div style={{ padding: "24px 24px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#0B2341", margin: 0 }}>{name}</h3>
          <span style={{ background: "rgba(200,155,60,0.12)", color: "#C89B3C", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 50, letterSpacing: 0.5 }}>{category}</span>
        </div>
        <p style={{ color: "#777", fontSize: 13, lineHeight: 1.7, margin: "0 0 16px" }}>{desc}</p>
        {/* <a href="#contact" style={{
          display: "inline-block", background: "#0B2341", color: "#C89B3C",
          padding: "10px 20px", borderRadius: 50, fontSize: 12, fontWeight: 700,
          textDecoration: "none", letterSpacing: 0.5,
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.target.style.background = "#C89B3C"}
          onMouseLeave={e => e.target.style.background = "#0B2341"}
        >Enquire Now</a> */}
      </div>
    </div>
  );
}

function Products() {
  const [active, setActive] = useState("All");
  const cats = ["All", "Dog Food", "Cat Food", "Toys", "Leashes", "Bowls", "Grooming"];
  const filtered = active === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === active);
  return (
    <section id="products" style={{ padding: "100px 5%", background: "#F5EFE6" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <p style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Our Store</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#0B2341", margin: "0 0 16px" }}>Premium Products</h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 50 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActive(c)} style={{
                padding: "10px 22px", borderRadius: 50, border: "none", cursor: "pointer",
                background: active === c ? "#0B2341" : "#fff",
                color: active === c ? "#C89B3C" : "#555",
                fontWeight: active === c ? 700 : 500, fontSize: 13,
                transition: "all 0.25s",
                boxShadow: active === c ? "0 4px 20px rgba(11,35,65,0.2)" : "0 2px 8px rgba(0,0,0,0.06)",
              }}>{c}</button>
            ))}
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {filtered.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.08}>
              <ProductCard {...p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ name, cat, image, bg }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        boxShadow: hov ? "0 16px 40px rgba(11,35,65,0.12)" : "0 2px 12px rgba(11,35,65,0.06)",
        transform: hov ? "translateY(-6px)" : "none",
        transition: "all 0.3s ease", cursor: "default",
      }}
    >
      <div style={{ background: bg, height: 150, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60 }}>
        <img
          src={image}
          alt={name}
          style={{
            width: "150px",
            height: "110px",
            objectFit: "contain"
          }}
        />
      </div>
      <div style={{ padding: "16px 20px 20px" }}>
        <p style={{ color: "#C89B3C", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, margin: "0 0 6px" }}>{cat}</p>
        <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, color: "#0B2341", margin: 0 }}>{name}</h4>
      </div>
    </div>
  );
}

function WhyUs() {
  return (
    <section style={{ padding: "100px 5%", background: "#0B2341", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,155,60,0.08), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <p style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Our Promise</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#fff", margin: 0 }}>Why Choose The Paw Lounge</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 28 }}>
          {WHY_US.map((w, i) => (
            <FadeIn key={w.title} delay={i * 0.1}>
              <WhyCard {...w} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(200,155,60,0.12)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "rgba(200,155,60,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20, padding: "36px 28px", textAlign: "center",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-6px)" : "none",
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#C89B3C", margin: "0 0 10px" }}>{title}</h3>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{desc}</p>
    </div>
  );
}



function GalleryItem({ emoji, label, color, i }) {
  const [hov, setHov] = useState(false);
  const heights = [160, 220, 180, 240, 170, 200, 190, 210];
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: color, borderRadius: 20, marginBottom: 20, overflow: "hidden",
        height: heights[i % heights.length],
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        position: "relative", cursor: "default",
        transform: hov ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.35s ease",
        boxShadow: hov ? "0 16px 40px rgba(11,35,65,0.15)" : "0 2px 10px rgba(11,35,65,0.05)",
        breakInside: "avoid",
      }}
    >
      <div style={{ fontSize: 60, transition: "transform 0.3s", transform: hov ? "scale(1.15)" : "none" }}>{emoji}</div>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(transparent, rgba(11,35,65,0.7))",
        padding: "30px 16px 14px", opacity: hov ? 1 : 0,
        transition: "opacity 0.3s",
      }}>
        <p style={{ color: "#fff", fontSize: 12, fontWeight: 600, margin: 0, textAlign: "center" }}>{label}</p>
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => { if (form.name && form.phone) setSent(true); };
  return (
    <section id="contact" style={{ padding: "100px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <p style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Get In Touch</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#0B2341", margin: "0 0 16px" }}>Visit Our Store Today</h2>
            <p style={{ color: "#666", maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>We'd love to meet you and your pet. Drop by or reach out — we're always happy to help.</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr", gap: 50, alignItems: "start" }}>
          <FadeIn direction="right">
            <div style={{ background: "#0B2341", borderRadius: 28, padding: "48px 44px", color: "#fff" }}>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 700, color: "#C89B3C", margin: "0 0 32px" }}>Contact Information</h3>
              {[
                { icon: "📍", label: "Location", val: "Hyderabad, Telangana" },
                { icon: "📞", label: "Phone", val: "9542905904", link: "tel:9542905904" },
                { icon: "💬", label: "WhatsApp", val: "9542905904", link: "https://wa.me/919542905904" },
                { icon: "✉️", label: "Email", val: "sentryx.solutions@gmail.com", link: "mailto:sentryx.solutions@gmail.com" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 26 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(200,155,60,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 4px" }}>{c.label}</p>
                    {c.link ? (
                      <a href={c.link} style={{ color: "#fff", fontSize: 14, fontWeight: 500, textDecoration: "none" }}
                        onMouseEnter={e => e.target.style.color = "#C89B3C"}
                        onMouseLeave={e => e.target.style.color = "#fff"}
                      >{c.val}</a>
                    ) : (
                      <p style={{ color: "#fff", fontSize: 14, fontWeight: 500, margin: 0 }}>{c.val}</p>
                    )}
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 36, padding: "20px", background: "rgba(200,155,60,0.1)", borderRadius: 16, border: "1px solid rgba(200,155,60,0.2)" }}>
                <p style={{ color: "#C89B3C", fontWeight: 600, fontSize: 14, margin: "0 0 6px" }}>Business Hours</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, margin: 0, lineHeight: 1.7 }}>Mon–Sat: 9:00 AM – 7:00 PM<br />Sunday: 10:00 AM – 5:00 PM</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <div
              style={{
                background: "#F8F4EC",
                borderRadius: "28px",
                padding: "20px",
                width: "100%",
                minHeight: "440px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
              }}
            >
              <h3
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#0B2A52",
                  marginBottom: "20px"
                }}
              >
                Visit Us
              </h3>

              <iframe
                src="https://www.google.com/maps?q=Hyderabad,Telangana&output=embed"
                width="100%"
                height="350"
                style={{
                  border: "none",
                  borderRadius: "20px"
                }}
                loading="lazy"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#050f1e", padding: "70px 5% 30px", borderTop: "1px solid rgba(200,155,60,0.15)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <img
                src="/hero/logo.png"
                alt="The Paw Lounge"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain"
                }}
              />
              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#C89B3C" }}>The Paw Lounge</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase" }}>Pet Grooming & Spa</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.8, maxWidth: 280, margin: "0 0 24px" }}>Hyderabad's most trusted premium pet care destination. Luxury grooming, spa treatments, and more — for pets who deserve only the best.</p>
            
          </div>
          <div>
            <h4 style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Quick Links</h4>
            {["Home", "Services", "Products", "Pets", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#C89B3C"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
              >{l}</a>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Services</h4>
            {["Pet Grooming", "Spa & Bathing", "Accessories", "Pet Food", "Adoption"].map(s => (
              <p key={s} style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: "0 0 10px" }}>{s}</p>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Contact</h4>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: "0 0 10px" }}>📍 Hyderabad, Telangana</p>
            <a href="tel:9542905904" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", margin: "0 0 10px" }}>📞 9542905904</a>
            <a href="https://wa.me/919542905904" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", margin: "0 0 10px" }}>💬 WhatsApp Us</a>
            <a href="mailto:sentryx.solutions@gmail.com" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none" }}>✉️ sentryx.solutions@gmail.com</a>
          </div>
        </div>
        <div style={{ paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, margin: 0 }}>© 2025 The Paw Lounge. All rights reserved.</p>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, margin: 0 }}>Made with 🐾 in Hyderabad</p>
        </div>
      </div>
    </footer>
  );
}

export default function PawLounge() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.googleapis.com";
    document.head.appendChild(link);
    const link2 = document.createElement("link");
    link2.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap";
    link2.rel = "stylesheet";
    document.head.appendChild(link2);
    document.title = "The Paw Lounge — Pet Grooming & Spa, Hyderabad";
  }, []);
  return (
    <div style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <Services />
      <FeaturedPets />
      <Products />
      <WhyUs />
      <Contact />
      <Footer />
      <a
        href="https://wa.me/919542905904?text=Hi%20The%20Paw%20Lounge"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "68px",
          height: "68px",
          borderRadius: "50%",
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 25px rgba(37,211,102,0.45)",
          zIndex: 9999,
          textDecoration: "none"
        }}
      >
        <FaWhatsapp
          style={{
            color: "white",
            fontSize: "38px"
          }}
        />
      </a>
    </div>
  );
}
