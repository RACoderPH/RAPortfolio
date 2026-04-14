import { useState, useEffect, useRef } from "react";

const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        font-family: 'DM Sans', sans-serif;
        background: #080810;
        color: #e2e8f0;
        overflow-x: hidden;
      }
      h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: #080810; }
      ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }

      @keyframes pulseDot {
        0%,100% { opacity:1; transform:scale(1); }
        50% { opacity:0.3; transform:scale(0.6); }
      }
      @keyframes float1 {
        0%,100% { transform: translate(0,0); }
        50% { transform: translate(40px,-35px); }
      }
      @keyframes float2 {
        0%,100% { transform: translate(0,0); }
        50% { transform: translate(-30px,40px); }
      }
      @keyframes float3 {
        0%,100% { transform: translate(0,0); }
        50% { transform: translate(20px,-20px); }
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .fade-sec {
        opacity: 0;
        transform: translateY(36px);
        transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
      }
      .fade-sec.vis {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

// ─── DATA ───────────────────────────────────────────────────────────────────
const SKILLS = [
  { icon: "📱", label: "Mobile Dev",  tags: ["React Native","Flutter","Expo","Dart","Redux","Firebase"] },
  { icon: "🌐", label: "Frontend",    tags: ["React.js","JavaScript ES6+","HTML5","CSS3","Tailwind","Next.js"] },
  { icon: "⚙️",  label: "Backend",    tags: ["Node.js","Express","PHP","Laravel","REST APIs","GraphQL"] },
  { icon: "🎮", label: "Game Dev",    tags: ["C#","Unity","Physics","2D/3D"] },
  { icon: "🗄️",  label: "Database",   tags: ["MySQL","MsSQL","Firebase"] },
  { icon: "🛠️",  label: "DevOps",     tags: ["Git","GitHub","Postman"] },
];

const PROJECTS = [
  { emoji:"📱", title:"FitTrack Mobile",     tags:["React Native","Node.js","MongoDB"],  desc:"Cross-platform fitness app with real-time workout logging, charts & social challenges." },
  { emoji:"🌐", title:"ShopHub E-Commerce",  tags:["React.js","PHP","MySQL"],            desc:"Full-stack e-commerce platform — cart, payments, admin dashboard & REST API." },
  { emoji:"🎮", title:"Space Odyssey",       tags:["C#","Unity","Game Dev"],             desc:"2D space shooter with procedural levels, dynamic AI enemies & global leaderboards." },
  { emoji:"🤖", title:"FlutterChat AI",      tags:["Flutter","Dart","Firebase"],         desc:"AI-powered chat assistant built in Flutter with OpenAI API & offline caching." },
  { emoji:"📊", title:"Analytics Dashboard", tags:["React.js","Node.js","WebSocket"],    desc:"Real-time metrics dashboard with live charts, KPIs & WebSocket data streams." },
  { emoji:"🔐", title:"SecureAuth API",      tags:["Node.js","JWT","PostgreSQL"],        desc:"Enterprise-grade auth microservice — JWT, OAuth2, RBAC & rate limiting." },
];

const EXPERIENCE = [
  { period:"2024 – Present", role:"Junior Fullstack Developer", company:"Baliwag Water District · Full-time",
    desc:"Leading mobile app development with React Native & Flutter. Architecting scalable Node.js microservices and mentoring 4 junior devs." },
  { period:"2024", role:"Mobile Developer Intern", company:"PixelForge Interactive · Full-time",
    desc:"Shipped 3 Unity games (C#) and 2 consumer apps in React Native. Integrated Firebase multiplayer, App Store & Play Store releases." },
];

const SOCIALS = [
  { icon:"✉️", bg:"linear-gradient(135deg,#0077cc,#004080)", label:"Email",    sub:"angelesronmel@gmail.com" },
  { icon:"💼", bg:"linear-gradient(135deg,#0077b5,#005885)", label:"LinkedIn", sub:"linkedin.com/in/ronmel-angeles-17900a299" },
  { icon:"🐙", bg:"linear-gradient(135deg,#2d333b,#1c2128)", label:"GitHub",   sub:"github.com/RACoderPH" },
];

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useIntersect(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── UTILITIES ───────────────────────────────────────────────────────────────
const Tag = ({ children, accent }) => (
  <span style={{
    display: "inline-block", padding: "3px 10px", borderRadius: 6,
    fontSize: 12, fontWeight: 500,
    background: accent ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.07)",
    border: `1px solid ${accent ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.12)"}`,
    color: accent ? "#7dd3fc" : "#cbd5e1",
  }}>{children}</span>
);

const SectionLabel = ({ num, text }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
    <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#38bdf8" }}>
      {num} · {text}
    </span>
    <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(56,189,248,0.3),transparent)" }} />
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize:"clamp(1.9rem,4vw,2.7rem)", fontWeight:800, letterSpacing:"-1px", lineHeight:1.1, marginBottom:8, color:"#f1f5f9" }}>
    {children}
  </h2>
);

const GradientText = ({ children }) => (
  <span style={{ background:"linear-gradient(135deg,#38bdf8,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
    {children}
  </span>
);

const Divider = () => (
  <div style={{ width:48, height:3, borderRadius:2, background:"linear-gradient(90deg,#38bdf8,#a78bfa)", margin:"16px 0 40px" }} />
);

// ─── CARD ────────────────────────────────────────────────────────────────────
function Card({ children, style = {}, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: "#0f1020",
        border: `1px solid ${hovered ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: 20, padding: "1.5rem", position: "relative", overflow: "hidden",
        transition: "border-color .3s, transform .3s, box-shadow .3s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.1)" : "none",
        ...style,
      }}
    >
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background:"linear-gradient(135deg,rgba(56,189,248,0.025) 0%,transparent 55%)",
        borderRadius:20,
      }} />
      {children}
    </div>
  );
}

// ─── FADE SECTION ────────────────────────────────────────────────────────────
function FadeSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useIntersect();
  return (
    <div ref={ref} className={`fade-sec${visible ? " vis" : ""}`}
      style={{ transitionDelay:`${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

// ─── ORBS & BACKGROUND ───────────────────────────────────────────────────────
function Background() {
  return (
    <>
      {/* Grid */}
      <div style={{
        position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        backgroundImage:`linear-gradient(rgba(255,255,255,0.013) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.013) 1px,transparent 1px)`,
        backgroundSize:"64px 64px",
      }} />
      {/* Orbs */}
      {[
        { w:520, h:520, bg:"rgba(56,189,248,0.055)",  top:"-100px", left:"-100px",  anim:"float1 11s ease-in-out infinite" },
        { w:400, h:400, bg:"rgba(167,139,250,0.065)", top:"200px",  right:"-80px",  anim:"float2 14s ease-in-out infinite" },
        { w:280, h:280, bg:"rgba(244,114,182,0.04)",  bottom:"100px",left:"30%",    anim:"float3 9s ease-in-out infinite" },
      ].map((o, i) => (
        <div key={i} style={{
          position:"fixed", width:o.w, height:o.h, borderRadius:"50%",
          background:o.bg, filter:"blur(90px)", pointerEvents:"none", zIndex:0,
          top:o.top, left:o.left, right:o.right, bottom:o.bottom,
          animation:o.anim,
        }} />
      ))}
    </>
  );
}

// ─── CURSOR GLOW ─────────────────────────────────────────────────────────────
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const move = (e) => { if (el) { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; } };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={ref} style={{
      position:"fixed", width:300, height:300, borderRadius:"50%",
      background:"radial-gradient(circle,rgba(56,189,248,0.04) 0%,transparent 70%)",
      pointerEvents:"none", zIndex:0, transform:"translate(-50%,-50%)",
      transition:"left .08s linear, top .08s linear",
    }} />
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  return (
    <section id="hero" style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", textAlign:"center",
      padding:"6rem 2rem 4rem", position:"relative", maxWidth:"100%",
    }}>
      {/* Badge */}
      <div style={{
        display:"inline-flex", alignItems:"center", gap:8,
        padding:"5px 16px", borderRadius:999,
        border:"1px solid rgba(56,189,248,0.35)", background:"rgba(56,189,248,0.07)",
        fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase",
        color:"#38bdf8", marginBottom:32,
      }}>
        <span style={{ width:7, height:7, borderRadius:"50%", background:"#38bdf8", animation:"pulseDot 2s infinite" }} />
        Available for hire
      </div>

      <h1 style={{
        fontSize:"clamp(3rem,8vw,6rem)", fontWeight:800, letterSpacing:"-3px",
        lineHeight:1.0, marginBottom:20, color:"#f1f5f9",
      }}>
        Hi, I'm{" "}
        <span style={{ background:"linear-gradient(135deg,#38bdf8 0%,#a78bfa 45%,#f472b6 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Ronmel Angeles
        </span>
        <br />Fullstack Developer
      </h1>

      <p style={{ fontSize:"1rem", color:"#94a3b8", lineHeight:1.8, marginBottom:28, maxWidth:480 }}>
        I craft pixel-perfect mobile apps, scalable backends &amp; immersive games that users love.
      </p>

      {/* Stack pills */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:36 }}>
        {["React Native","Flutter","C# · Unity","React.js","Node.js","PHP · Laravel"].map(t => (
          <span key={t} style={{
            padding:"4px 14px", borderRadius:99,
            background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)",
            fontSize:12, color:"#cbd5e1",
          }}>{t}</span>
        ))}
      </div>

      <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
        <button onClick={() => scrollTo("projects")} style={{
          padding:"13px 30px", borderRadius:12,
          background:"linear-gradient(135deg,#38bdf8,#6366f1)",
          color:"#fff", border:"none",
          fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14,
          cursor:"pointer", letterSpacing:"0.04em",
          boxShadow:"0 0 30px rgba(56,189,248,0.2)",
          transition:"transform .2s, box-shadow .2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 36px rgba(56,189,248,.35)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 0 30px rgba(56,189,248,.2)"; }}
        >View My Work</button>

        <button onClick={() => scrollTo("contact")} style={{
          padding:"13px 30px", borderRadius:12,
          background:"rgba(255,255,255,0.06)", color:"#cbd5e1",
          border:"1px solid rgba(255,255,255,0.18)",
          fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14,
          cursor:"pointer", letterSpacing:"0.04em",
          transition:"border-color .2s, color .2s, background .2s, transform .2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(56,189,248,.5)"; e.currentTarget.style.color="#38bdf8"; e.currentTarget.style.background="rgba(56,189,248,0.07)"; e.currentTarget.style.transform="translateY(-3px)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.18)"; e.currentTarget.style.color="#cbd5e1"; e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.transform="none"; }}
        >Let's Talk</button>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:6,
        color:"#475569", fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase",
      }}>
        <span>Scroll</span>
        <div style={{ width:1, height:44, background:"linear-gradient(180deg,#475569,transparent)" }} />
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ maxWidth:1140, margin:"0 auto", padding:"6rem 2rem" }}>
      <FadeSection>
        <SectionLabel num="01" text="About Me" />
        <SectionTitle>The developer <GradientText>behind the code</GradientText></SectionTitle>
        <Divider />
      </FadeSection>

      <div style={{ display:"grid", gridTemplateColumns:"240px 1fr", gap:"3.5rem", alignItems:"start" }}>
        {/* Avatar */}
        <FadeSection delay={100}>
          <div style={{ display:"flex", justifyContent:"center", position:"sticky", top:100 }}>
            <div style={{ position:"relative", display:"inline-block" }}>
              <div style={{ width:200, height:200, borderRadius:"50%", padding:3, background:"linear-gradient(135deg,#38bdf8,#a78bfa)", position:"relative" }}>
                <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"#0f1020", display:"flex", alignItems:"center", justifyContent:"center", fontSize:72 }}>👨‍💻</div>
              </div>
              <div style={{ position:"absolute", inset:-10, borderRadius:"50%", border:"1.5px dashed rgba(56,189,248,0.2)", animation:"spin 22s linear infinite" }} />
              <div style={{
                position:"absolute", bottom:10, right:10,
                background:"linear-gradient(135deg,#fbbf24,#f59e0b)", color:"#1a0f00",
                fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:11,
                padding:"3px 10px", borderRadius:99,
              }}>🚀 6+ YRS</div>
            </div>
          </div>
        </FadeSection>

        {/* Text */}
        <FadeSection delay={200}>
          <p style={{ color:"#94a3b8", lineHeight:1.85, marginBottom:16, fontSize:"0.92rem" }}>
            I'm a passionate fullstack developer with 6+ years of experience building production-grade
            applications across mobile, web, and game platforms. I love turning complex problems into
            elegant, performant solutions.
          </p>
          <p style={{ color:"#94a3b8", lineHeight:1.85, fontSize:"0.92rem", marginBottom:32 }}>
            From cross-platform apps in React Native &amp; Flutter, to Unity game mechanics in C#,
            to robust REST APIs in Node.js and PHP — I thrive at every layer of the stack.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
            {[["40+","Projects Done"],["6+","Years Exp."],["12","Tech Stacks"]].map(([n,l]) => (
              <div key={l} style={{ textAlign:"center", padding:"1rem .75rem", background:"#13142a", borderRadius:14, border:"1px solid rgba(255,255,255,0.09)" }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"2rem", fontWeight:800, background:"linear-gradient(90deg,#38bdf8,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{n}</div>
                <div style={{ fontSize:"0.65rem", color:"#94a3b8", marginTop:4, letterSpacing:"0.08em", textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ maxWidth:1140, margin:"0 auto", padding:"6rem 2rem" }}>
      <FadeSection>
        <SectionLabel num="02" text="Skills" />
        <SectionTitle>My <GradientText>tech arsenal</GradientText></SectionTitle>
        <Divider />
      </FadeSection>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:"1.1rem" }}>
        {SKILLS.map((s, i) => (
          <FadeSection key={s.label} delay={i * 70}>
            <Card>
              <span style={{ fontSize:22, marginBottom:12, display:"block" }}>{s.icon}</span>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:"#7dd3fc", marginBottom:14 }}>{s.label}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {s.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </Card>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  const [expanded, setExpanded] = useState(null);
  return (
    <section id="projects" style={{ maxWidth:1140, margin:"0 auto", padding:"6rem 2rem" }}>
      <FadeSection>
        <SectionLabel num="03" text="Projects" />
        <SectionTitle>Things I've <GradientText>built</GradientText></SectionTitle>
        <Divider />
      </FadeSection>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:"1.1rem" }}>
        {PROJECTS.map((p, i) => {
          const isOpen = expanded === i;
          return (
            <FadeSection key={p.title} delay={i * 70}>
              <Card style={{ cursor:"pointer", userSelect:"none" }}>
                <div onClick={() => setExpanded(isOpen ? null : i)}>
                  <span style={{ fontSize:36, display:"block", marginBottom:14 }}>{p.emoji}</span>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:17, marginBottom:8, color:"#f1f5f9" }}>{p.title}</div>
                  <p style={{ fontSize:13, color:"#94a3b8", lineHeight:1.7, marginBottom:14 }}>{p.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                    {p.tags.map(t => <Tag key={t} accent>{t}</Tag>)}
                  </div>
                  <div style={{ fontSize:11, color: isOpen ? "#a78bfa" : "#38bdf8", letterSpacing:"0.06em", fontWeight:600 }}>
                    {isOpen ? "▲ Collapse" : "▼ Expand"}
                  </div>
                </div>
                <div style={{ overflow:"hidden", maxHeight: isOpen ? 80 : 0, transition:"max-height .4s cubic-bezier(.22,1,.36,1)" }}>
                  <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", marginTop:14, paddingTop:14, display:"flex", gap:8 }}>
                    <button style={{
                      flex:1, padding:"8px 0", borderRadius:10,
                      background:"linear-gradient(135deg,#38bdf8,#6366f1)",
                      color:"#fff", border:"none",
                      fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12,
                      cursor:"pointer", letterSpacing:"0.04em",
                    }}>Live Demo ↗</button>
                    <button style={{
                      flex:1, padding:"8px 0", borderRadius:10,
                      background:"rgba(255,255,255,0.07)", color:"#cbd5e1",
                      border:"1px solid rgba(255,255,255,0.14)",
                      fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12,
                      cursor:"pointer", letterSpacing:"0.04em",
                    }}>View Code</button>
                  </div>
                </div>
              </Card>
            </FadeSection>
          );
        })}
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" style={{ maxWidth:1140, margin:"0 auto", padding:"6rem 2rem" }}>
      <FadeSection>
        <SectionLabel num="04" text="Experience" />
        <SectionTitle>My <GradientText>journey</GradientText></SectionTitle>
        <Divider />
      </FadeSection>
      <div style={{ position:"relative", paddingLeft:"2rem" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:2, background:"linear-gradient(180deg,#38bdf8,#a78bfa,transparent)", borderRadius:2 }} />
        {EXPERIENCE.map((e, i) => (
          <FadeSection key={e.period} delay={i * 100}>
            <div style={{ position:"relative", marginBottom:24 }}>
              <div style={{
                position:"absolute", left:"-2.55rem", top:"1.8rem",
                width:12, height:12, borderRadius:"50%",
                background:"#38bdf8", border:"2.5px solid #080810",
                boxShadow:"0 0 14px rgba(56,189,248,.55)",
              }} />
              <Card hover={false} style={{ cursor:"default" }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#38bdf8", marginBottom:6 }}>{e.period}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:18, marginBottom:4, color:"#f1f5f9" }}>{e.role}</div>
                <div style={{ fontSize:13, color:"#94a3b8", marginBottom:10 }}>{e.company}</div>
                <p style={{ fontSize:13, color:"#94a3b8", lineHeight:1.75 }}>{e.desc}</p>
              </Card>
            </div>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm]   = useState({ name:"", email:"", message:"" });
  const [sent, setSent]   = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { setError("Please fill in all fields."); return; }
    setError("");
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name:"", email:"", message:"" }); }, 3500);
  };

  const inputStyle = {
    width:"100%", padding:"11px 14px",
    background:"#13142a", border:"1px solid rgba(255,255,255,0.11)",
    borderRadius:12, color:"#e2e8f0",
    fontFamily:"'DM Sans',sans-serif", fontSize:14,
    outline:"none", transition:"border-color .2s",
  };

  return (
    <section id="contact" style={{ maxWidth:1140, margin:"0 auto", padding:"6rem 2rem 8rem" }}>
      <FadeSection>
        <SectionLabel num="05" text="Contact" />
        <SectionTitle>Let's <GradientText>work together</GradientText></SectionTitle>
        <Divider />
      </FadeSection>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", alignItems:"start" }}>
        {/* Left */}
        <FadeSection delay={100}>
          <div>
            <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:700, marginBottom:10, color:"#f1f5f9" }}>Got a project in mind?</h3>
            <p style={{ color:"#94a3b8", fontSize:14, lineHeight:1.8, marginBottom:28 }}>
              Whether you need a mobile app, web platform, game, or a solid backend — let's talk.
              Open to freelance, contracts &amp; full-time roles.
            </p>
            {SOCIALS.map(s => (
              <div key={s.label} style={{
                display:"flex", alignItems:"center", gap:12,
                padding:"12px 16px", background:"#0f1020", borderRadius:14,
                border:"1px solid rgba(255,255,255,0.09)", cursor:"default",
                marginBottom:10, transition:"border-color .2s, transform .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(56,189,248,.28)"; e.currentTarget.style.transform="translateX(5px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"; e.currentTarget.style.transform="none"; }}
              >
                <div style={{ width:38, height:38, borderRadius:10, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, color:"#e2e8f0" }}>{s.label}</div>
                  <div style={{ fontSize:12, color:"#94a3b8" }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* Right — form */}
        <FadeSection delay={200}>
          <Card hover={false} style={{ cursor:"default" }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:16, marginBottom:20, color:"#f1f5f9" }}>Send a Message</div>
            {sent ? (
              <div style={{ textAlign:"center", padding:"3rem 0" }}>
                <div style={{ fontSize:46, marginBottom:12 }}>✅</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:18, color:"#38bdf8" }}>Message sent!</div>
                <p style={{ color:"#94a3b8", fontSize:13, marginTop:6 }}>I'll get back to you soon.</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {error && (
                  <div style={{ padding:"9px 14px", borderRadius:10, background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.25)", color:"#fca5a5", fontSize:13 }}>{error}</div>
                )}
                {[
                  { key:"name",  label:"Your Name",     type:"text",  ph:"John Doe" },
                  { key:"email", label:"Email Address",  type:"email", ph:"john@example.com" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize:12, color:"#94a3b8", display:"block", marginBottom:5, letterSpacing:"0.05em" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={form[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor="rgba(56,189,248,.45)"}
                      onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.11)"}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize:12, color:"#94a3b8", display:"block", marginBottom:5, letterSpacing:"0.05em" }}>Message</label>
                  <textarea placeholder="Tell me about your project..." value={form.message} rows={5}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize:"none" }}
                    onFocus={e => e.target.style.borderColor="rgba(56,189,248,.45)"}
                    onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.11)"}
                  />
                </div>
                <button onClick={handleSubmit} style={{
                  width:"100%", padding:"13px",
                  background:"linear-gradient(135deg,#38bdf8,#6366f1)",
                  border:"none", borderRadius:12, color:"#fff",
                  fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14,
                  cursor:"pointer", letterSpacing:"0.04em",
                  boxShadow:"0 4px 20px rgba(56,189,248,.18)",
                  transition:"transform .2s, box-shadow .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(56,189,248,.32)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 4px 20px rgba(56,189,248,.18)"; }}
                >Send Message →</button>
              </div>
            )}
          </Card>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop:"1px solid rgba(255,255,255,0.06)", textAlign:"center", padding:"1.75rem 2rem", color:"#475569", fontSize:13 }}>
      Crafted with 🧠 by{" "}
      <span style={{ background:"linear-gradient(90deg,#38bdf8,#a78bfa)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:600 }}>
        Ronmel Angeles
      </span>
      {" "}· 2026 · All rights reserved
    </footer>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Background />
      <CursorGlow />
      <div style={{ position:"relative", zIndex:1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </>
  );
}