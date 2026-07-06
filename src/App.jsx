import { useState, useEffect, useRef } from "react";

// ─── DESIGN CONCEPT ───────────────────────────────────────────────────────────
// "Title Block" — the page is treated like an engineering drawing sheet.
// Sheet numbers replace decorative 01/02/03 markers, panels carry corner
// registration ticks like a drafting sheet, and the hero's signature element
// is an exploded axonometric diagram of the tech stack — a fullstack dev's
// literal stack, laid out plate by plate.

const TOKENS = {
  paper: "#EAEFEE",
  paper2: "#F5F7F6",
  ink: "#10222B",
  inkSoft: "#4B5C63",
  line: "#1D4E89",
  lineSoft: "rgba(29,78,137,0.28)",
  accent: "#FF5A1F",
  accentSoft: "rgba(255,90,31,0.10)",
  white: "#FFFFFF",
};

const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
      html { scroll-behavior: smooth; }
      body {
        font-family:'IBM Plex Sans', sans-serif;
        background:${TOKENS.paper};
        color:${TOKENS.ink};
      }
      ::selection { background:${TOKENS.accent}; color:#fff; }
      ::-webkit-scrollbar { width:8px; }
      ::-webkit-scrollbar-track { background:${TOKENS.paper}; }
      ::-webkit-scrollbar-thumb { background:${TOKENS.lineSoft}; border-radius:0; }

      .grid-paper {
        background-image:
          linear-gradient(${TOKENS.lineSoft} 1px, transparent 1px),
          linear-gradient(90deg, ${TOKENS.lineSoft} 1px, transparent 1px);
        background-size: 42px 42px;
      }

      .fade-sec {
        opacity:0;
        transform:translateY(28px);
        transition:opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1);
      }
      .fade-sec.vis { opacity:1; transform:translateY(0); }

      @keyframes dash {
        to { stroke-dashoffset: -24; }
      }
      .leader-line { animation: dash 2.4s linear infinite; }

      a, button { font-family: inherit; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

// ─── DATA (unchanged content) ─────────────────────────────────────────────────
const SKILLS = [
  { icon: "01", label: "Mobile Dev", tags: ["React Native", "Flutter", "Expo", "Dart", "Redux", "Firebase"] },
  { icon: "02", label: "Frontend",   tags: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind", "Next.js"] },
  { icon: "03", label: "Backend",    tags: ["Node.js", "Express", "PHP", "Laravel", "REST APIs", "GraphQL"] },
  { icon: "04", label: "Game Dev",   tags: ["C#", "Unity", "Physics", "2D/3D"] },
  { icon: "05", label: "Database",   tags: ["MySQL", "MsSQL", "Firebase"] },
  { icon: "06", label: "DevOps",     tags: ["Git", "GitHub", "Postman"] },
];

const PROJECTS = [
  { emoji: "01", title: "FitTrack Mobile",     tags: ["React Native", "Node.js", "MongoDB"], desc: "Cross-platform fitness app with real-time workout logging, charts & social challenges." },
  { emoji: "02", title: "ShopHub E-Commerce",  tags: ["React.js", "PHP", "MySQL"],           desc: "Full-stack e-commerce platform — cart, payments, admin dashboard & REST API." },
  { emoji: "03", title: "Space Odyssey",       tags: ["C#", "Unity", "Game Dev"],            desc: "2D space shooter with procedural levels, dynamic AI enemies & global leaderboards." },
  { emoji: "04", title: "FlutterChat AI",      tags: ["Flutter", "Dart", "Firebase"],         desc: "AI-powered chat assistant built in Flutter with OpenAI API & offline caching." },
  { emoji: "05", title: "Analytics Dashboard", tags: ["React.js", "Node.js", "WebSocket"],    desc: "Real-time metrics dashboard with live charts, KPIs & WebSocket data streams." },
  { emoji: "06", title: "SecureAuth API",      tags: ["Node.js", "JWT", "PostgreSQL"],        desc: "Enterprise-grade auth microservice — JWT, OAuth2, RBAC & rate limiting." },
];

const EXPERIENCE = [
  { period: "2024 — Present", role: "Junior Fullstack Developer", company: "Baliwag Water District · Full-time",
    desc: "Leading mobile app development with React Native & Flutter. Architecting scalable Node.js microservices and mentoring 4 junior devs." },
  { period: "2024", role: "Mobile Developer Intern", company: "PixelForge Interactive · Full-time",
    desc: "Shipped 3 Unity games (C#) and 2 consumer apps in React Native. Integrated Firebase multiplayer, App Store & Play Store releases." },
];

const SOCIALS = [
  { icon: "✉", label: "Email",    sub: "angelesronmel@gmail.com" },
  { icon: "in", label: "LinkedIn", sub: "linkedin.com/in/ronmel-angeles-17900a299" },
  { icon: "gh", label: "GitHub",   sub: "github.com/RACoderPH" },
];

// ─── HOOKS ─────────────────────────────────────────────────────────────────────
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

function FadeSection({ children, delay = 0, style = {} }) {
  const [ref, visible] = useIntersect();
  return (
    <div ref={ref} className={`fade-sec${visible ? " vis" : ""}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

// ─── STRUCTURAL PRIMITIVES ─────────────────────────────────────────────────────

// Corner registration ticks — the recurring drafting-sheet motif.
const CornerTicks = ({ color = TOKENS.line }) => (
  <>
    {[
      { top: -1, left: -1, b: "borderTop,borderLeft" },
      { top: -1, right: -1, b: "borderTop,borderRight" },
      { bottom: -1, left: -1, b: "borderBottom,borderLeft" },
      { bottom: -1, right: -1, b: "borderBottom,borderRight" },
    ].map((c, i) => {
      const borders = {};
      c.b.split(",").forEach((k) => (borders[k] = `2px solid ${color}`));
      return (
        <span
          key={i}
          style={{
            position: "absolute",
            width: 12, height: 12,
            top: c.top, left: c.left, right: c.right, bottom: c.bottom,
            ...borders,
            pointerEvents: "none",
          }}
        />
      );
    })}
  </>
);

const Tag = ({ children, accent }) => (
  <span style={{
    display: "inline-block", padding: "3px 9px",
    fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 500,
    background: accent ? TOKENS.accentSoft : "rgba(16,34,43,0.05)",
    border: `1px solid ${accent ? "rgba(255,90,31,0.35)" : TOKENS.lineSoft}`,
    color: accent ? TOKENS.accent : TOKENS.inkSoft,
  }}>{children}</span>
);

const SheetLabel = ({ n, total = "06", text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
    <span style={{
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600,
      letterSpacing: "0.1em", color: TOKENS.accent, whiteSpace: "nowrap",
    }}>
      SHEET {n} / {total}
    </span>
    <div style={{ flex: 1, height: 1, background: TOKENS.lineSoft }} />
    <span style={{
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em",
      color: TOKENS.inkSoft, textTransform: "uppercase", whiteSpace: "nowrap",
    }}>{text}</span>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{
    fontFamily: "'IBM Plex Serif', serif", fontWeight: 600,
    fontSize: "clamp(1.8rem,3.6vw,2.5rem)", letterSpacing: "-0.5px",
    lineHeight: 1.15, marginBottom: 34, color: TOKENS.ink, maxWidth: 640,
  }}>{children}</h2>
);

function Panel({ children, style = {}, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        position: "relative", background: TOKENS.white,
        border: `1px solid ${hovered ? TOKENS.line : TOKENS.lineSoft}`,
        padding: "1.6rem", transition: "border-color .25s, transform .25s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        ...style,
      }}
    >
      <CornerTicks color={hovered ? TOKENS.accent : TOKENS.line} />
      {children}
    </div>
  );
}

// ─── TITLE BLOCK HEADER ────────────────────────────────────────────────────────
function TitleBlockHeader() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const fields = [
    { label: "Drawn by", value: "R. Angeles" },
    { label: "Discipline", value: "Fullstack" },
    { label: "Rev", value: "2026.07" },
    { label: "Scale", value: "1:1" },
  ];
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 20,
      background: "rgba(234,239,238,0.92)", backdropFilter: "blur(6px)",
      borderBottom: `1.5px solid ${TOKENS.ink}`,
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto", padding: "0 2rem",
        display: "flex", alignItems: "stretch", flexWrap: "wrap",
      }}>
        <div
          onClick={() => scrollTo("hero")}
          style={{
            padding: "14px 22px 14px 0", display: "flex", alignItems: "center", gap: 10,
            cursor: "pointer", borderRight: `1px solid ${TOKENS.lineSoft}`, marginRight: 22,
          }}
        >
          <span style={{
            width: 26, height: 26, border: `1.5px solid ${TOKENS.ink}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600,
          }}>RA</span>
          <span style={{ fontFamily: "'IBM Plex Serif', serif", fontWeight: 600, fontSize: 15 }}>Ronmel Angeles</span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: 22, flex: 1 }}>
          {["about", "skills", "projects", "experience"].map((id) => (
            <span key={id} onClick={() => scrollTo(id)} style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: "0.06em",
              textTransform: "uppercase", color: TOKENS.inkSoft, cursor: "pointer",
            }}>{id}</span>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {fields.map((f, i) => (
            <div key={f.label} style={{
              padding: "10px 16px", borderLeft: i === 0 ? `1px solid ${TOKENS.lineSoft}` : "none",
              borderRight: `1px solid ${TOKENS.lineSoft}`, display: "none",
            }} className="title-field">
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: TOKENS.inkSoft, letterSpacing: "0.08em" }}>{f.label.toUpperCase()}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 500 }}>{f.value}</div>
            </div>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            padding: "9px 18px", background: TOKENS.ink, color: TOKENS.paper2,
            border: "none", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", marginLeft: 16,
          }}>Contact →</button>
        </div>
      </div>
      <style>{`@media (min-width:900px){ .title-field{ display:block !important; } }`}</style>
    </header>
  );
}

// ─── EXPLODED STACK DIAGRAM (signature element) ───────────────────────────────
function ExplodedStack() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 380, height: 420, margin: "0 auto" }}>
      {SKILLS.map((s, i) => {
        const offset = i * 30;
        return (
          <div key={s.label} style={{
            position: "absolute", left: offset * 0.6, top: offset,
            width: 280, zIndex: SKILLS.length - i,
          }}>
            {i > 0 && (
              <svg width="2" height="30" style={{ position: "absolute", top: -30, left: 16 }}>
                <line x1="1" y1="0" x2="1" y2="30" stroke={TOKENS.line} strokeWidth="1.5" strokeDasharray="4 4" className="leader-line" />
              </svg>
            )}
            <div style={{
              background: TOKENS.white, border: `1.5px solid ${TOKENS.ink}`,
              padding: "10px 16px", display: "flex", alignItems: "center", gap: 12,
              boxShadow: `6px 6px 0 ${TOKENS.lineSoft}`,
            }}>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700,
                color: TOKENS.accent, width: 20,
              }}>{s.icon}</span>
              <span style={{ fontFamily: "'IBM Plex Serif', serif", fontWeight: 600, fontSize: 14 }}>{s.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="hero" className="grid-paper" style={{
      minHeight: "92vh", maxWidth: 1180, margin: "0 auto", padding: "4.5rem 2rem 3rem",
      display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "2rem", alignItems: "center",
    }}>
      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 26,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em",
          color: TOKENS.accent, border: `1px solid rgba(255,90,31,0.35)`,
          background: TOKENS.accentSoft, padding: "5px 12px",
        }}>
          <span style={{ width: 6, height: 6, background: TOKENS.accent, borderRadius: "50%" }} />
          STATUS: OPEN FOR WORK
        </div>

        <h1 style={{
          fontFamily: "'IBM Plex Serif', serif", fontWeight: 600,
          fontSize: "clamp(2.6rem,5.2vw,4.2rem)", letterSpacing: "-1.5px",
          lineHeight: 1.05, marginBottom: 22, color: TOKENS.ink,
        }}>
          Ronmel Angeles —<br />
          <span style={{ color: TOKENS.line, fontStyle: "italic" }}>fullstack</span> by trade,<br />
          builder by nature.
        </h1>

        <p style={{ fontSize: 15, color: TOKENS.inkSoft, lineHeight: 1.75, marginBottom: 30, maxWidth: 460 }}>
          I design and ship mobile apps, web platforms, games and the backends that
          run them — six disciplines, one continuous stack.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("projects")} style={{
            padding: "13px 28px", background: TOKENS.ink, color: TOKENS.paper2, border: "none",
            fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 13,
            letterSpacing: "0.05em", cursor: "pointer", transition: "background .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = TOKENS.accent}
            onMouseLeave={e => e.currentTarget.style.background = TOKENS.ink}
          >VIEW PROJECTS</button>
          <button onClick={() => scrollTo("contact")} style={{
            padding: "13px 28px", background: "transparent", color: TOKENS.ink,
            border: `1.5px solid ${TOKENS.ink}`, fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 600, fontSize: 13, letterSpacing: "0.05em", cursor: "pointer",
          }}>GET IN TOUCH</button>
        </div>
      </div>

      <FadeSection>
        <ExplodedStack />
      </FadeSection>
    </section>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ maxWidth: 1180, margin: "0 auto", padding: "5rem 2rem" }}>
      <FadeSection>
        <SheetLabel n="01" text="Profile" />
      </FadeSection>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "3rem" }}>
        <FadeSection delay={80}>
          <SectionTitle>The developer behind the drawings.</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, border: `1px solid ${TOKENS.lineSoft}` }}>
            {[["40+", "Projects"], ["6+", "Years"], ["12", "Stacks"]].map(([n, l], i) => (
              <div key={l} style={{
                textAlign: "center", padding: "1.2rem .5rem",
                borderLeft: i > 0 ? `1px solid ${TOKENS.lineSoft}` : "none",
              }}>
                <div style={{ fontFamily: "'IBM Plex Serif', serif", fontSize: "1.8rem", fontWeight: 600, color: TOKENS.line }}>{n}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: TOKENS.inkSoft, marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeSection>
        <FadeSection delay={160}>
          <p style={{ color: TOKENS.inkSoft, lineHeight: 1.9, marginBottom: 18, fontSize: 15 }}>
            I'm a fullstack developer with 6+ years of experience building production-grade
            applications across mobile, web, and game platforms. I like problems that span
            layers — where a mobile screen, an API, and a database schema all have to agree.
          </p>
          <p style={{ color: TOKENS.inkSoft, lineHeight: 1.9, fontSize: 15 }}>
            From cross-platform apps in React Native and Flutter, to Unity game mechanics in
            C#, to REST APIs in Node.js and PHP — I work at every layer of the stack, not just
            the one that's comfortable.
          </p>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── SKILLS ────────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ maxWidth: 1180, margin: "0 auto", padding: "5rem 2rem" }}>
      <FadeSection><SheetLabel n="02" text="Disciplines" /></FadeSection>
      <FadeSection delay={60}><SectionTitle>Six plates, one stack.</SectionTitle></FadeSection>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1.2rem" }}>
        {SKILLS.map((s, i) => (
          <FadeSection key={s.label} delay={i * 60}>
            <Panel>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: TOKENS.accent, fontWeight: 700 }}>{s.icon}</span>
                <span style={{ fontFamily: "'IBM Plex Serif', serif", fontWeight: 600, fontSize: 16, color: TOKENS.ink }}>{s.label}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </Panel>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}

// ─── PROJECTS ──────────────────────────────────────────────────────────────────
function Projects() {
  const [expanded, setExpanded] = useState(null);
  return (
    <section id="projects" style={{ maxWidth: 1180, margin: "0 auto", padding: "5rem 2rem" }}>
      <FadeSection><SheetLabel n="03" text="Built Works" /></FadeSection>
      <FadeSection delay={60}><SectionTitle>Things I've shipped.</SectionTitle></FadeSection>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.2rem" }}>
        {PROJECTS.map((p, i) => {
          const isOpen = expanded === i;
          return (
            <FadeSection key={p.title} delay={i * 60}>
              <Panel style={{ cursor: "pointer", userSelect: "none" }}>
                <div onClick={() => setExpanded(isOpen ? null : i)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: TOKENS.accent, fontWeight: 700 }}>{p.emoji}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: isOpen ? TOKENS.accent : TOKENS.inkSoft }}>{isOpen ? "− COLLAPSE" : "+ EXPAND"}</span>
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Serif', serif", fontWeight: 600, fontSize: 17, marginBottom: 8, color: TOKENS.ink }}>{p.title}</div>
                  <p style={{ fontSize: 13.5, color: TOKENS.inkSoft, lineHeight: 1.7, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tags.map(t => <Tag key={t} accent>{t}</Tag>)}
                  </div>
                </div>
                <div style={{ overflow: "hidden", maxHeight: isOpen ? 70 : 0, transition: "max-height .4s cubic-bezier(.22,1,.36,1)" }}>
                  <div style={{ borderTop: `1px solid ${TOKENS.lineSoft}`, marginTop: 14, paddingTop: 14, display: "flex", gap: 8 }}>
                    <button style={{
                      flex: 1, padding: "8px 0", background: TOKENS.ink, color: TOKENS.paper2,
                      border: "none", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 11, cursor: "pointer",
                    }}>LIVE DEMO ↗</button>
                    <button style={{
                      flex: 1, padding: "8px 0", background: "transparent", color: TOKENS.ink,
                      border: `1px solid ${TOKENS.ink}`, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 11, cursor: "pointer",
                    }}>VIEW CODE</button>
                  </div>
                </div>
              </Panel>
            </FadeSection>
          );
        })}
      </div>
    </section>
  );
}

// ─── EXPERIENCE ────────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" style={{ maxWidth: 1180, margin: "0 auto", padding: "5rem 2rem" }}>
      <FadeSection><SheetLabel n="04" text="Revision History" /></FadeSection>
      <FadeSection delay={60}><SectionTitle>My journey, logged.</SectionTitle></FadeSection>
      <div>
        {EXPERIENCE.map((e, i) => (
          <FadeSection key={e.period} delay={i * 90}>
            <div style={{
              display: "grid", gridTemplateColumns: "160px 1fr", gap: "1.5rem",
              padding: "1.6rem 0", borderTop: `1px solid ${TOKENS.lineSoft}`,
              borderBottom: i === EXPERIENCE.length - 1 ? `1px solid ${TOKENS.lineSoft}` : "none",
            }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: TOKENS.accent, fontWeight: 600, letterSpacing: "0.05em" }}>{e.period}</div>
              <div>
                <div style={{ fontFamily: "'IBM Plex Serif', serif", fontWeight: 600, fontSize: 18, marginBottom: 4, color: TOKENS.ink }}>{e.role}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: TOKENS.inkSoft, marginBottom: 10 }}>{e.company}</div>
                <p style={{ fontSize: 14, color: TOKENS.inkSoft, lineHeight: 1.75, maxWidth: 560 }}>{e.desc}</p>
              </div>
            </div>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { setError("Please fill in all fields."); return; }
    setError("");
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", message: "" }); }, 3200);
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px", background: TOKENS.paper2,
    border: `1px solid ${TOKENS.lineSoft}`, borderRadius: 0, color: TOKENS.ink,
    fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, outline: "none",
    transition: "border-color .2s",
  };

  return (
    <section id="contact" style={{ maxWidth: 1180, margin: "0 auto", padding: "5rem 2rem 7rem" }}>
      <FadeSection><SheetLabel n="05" text="Contact" /></FadeSection>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <FadeSection delay={80}>
          <SectionTitle>Let's put a project on the board.</SectionTitle>
          <p style={{ color: TOKENS.inkSoft, fontSize: 14, lineHeight: 1.8, marginBottom: 26, maxWidth: 420 }}>
            Whether it's a mobile app, a web platform, a game, or the backend underneath —
            open to freelance, contract, and full-time work.
          </p>
          {SOCIALS.map(s => (
            <div key={s.label} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "12px 0",
              borderBottom: `1px solid ${TOKENS.lineSoft}`,
            }}>
              <div style={{
                width: 32, height: 32, border: `1.5px solid ${TOKENS.ink}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, flexShrink: 0,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5, color: TOKENS.ink }}>{s.label}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: TOKENS.inkSoft }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </FadeSection>

        <FadeSection delay={160}>
          <Panel hover={false} style={{ cursor: "default" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.08em", marginBottom: 18, color: TOKENS.inkSoft, textTransform: "uppercase" }}>Send a message</div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2.6rem 0" }}>
                <div style={{ fontFamily: "'IBM Plex Serif', serif", fontWeight: 600, fontSize: 18, color: TOKENS.line, marginBottom: 6 }}>Message sent.</div>
                <p style={{ color: TOKENS.inkSoft, fontSize: 13 }}>I'll get back to you soon.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {error && (
                  <div style={{ padding: "9px 14px", background: TOKENS.accentSoft, border: "1px solid rgba(255,90,31,.35)", color: TOKENS.accent, fontSize: 13 }}>{error}</div>
                )}
                {[
                  { key: "name", label: "Your Name", type: "text", ph: "John Doe" },
                  { key: "email", label: "Email Address", type: "email", ph: "john@example.com" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: TOKENS.inkSoft, display: "block", marginBottom: 6, letterSpacing: "0.05em" }}>{f.label.toUpperCase()}</label>
                    <input type={f.type} placeholder={f.ph} value={form[f.key]}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = TOKENS.line}
                      onBlur={e => e.target.style.borderColor = TOKENS.lineSoft}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: TOKENS.inkSoft, display: "block", marginBottom: 6, letterSpacing: "0.05em" }}>MESSAGE</label>
                  <textarea placeholder="Tell me about your project..." value={form.message} rows={5}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={e => e.target.style.borderColor = TOKENS.line}
                    onBlur={e => e.target.style.borderColor = TOKENS.lineSoft}
                  />
                </div>
                <button onClick={handleSubmit} style={{
                  width: "100%", padding: "13px", background: TOKENS.ink, border: "none",
                  color: TOKENS.paper2, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600,
                  fontSize: 13, letterSpacing: "0.05em", cursor: "pointer", transition: "background .2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = TOKENS.accent}
                  onMouseLeave={e => e.currentTarget.style.background = TOKENS.ink}
                >SEND MESSAGE →</button>
              </div>
            )}
          </Panel>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      borderTop: `1.5px solid ${TOKENS.ink}`, padding: "1.4rem 2rem",
      display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
      maxWidth: 1180, margin: "0 auto",
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: TOKENS.inkSoft,
    }}>
      <span>© 2026 RONMEL ANGELES — ALL RIGHTS RESERVED</span>
      <span>SHEET 06 / 06 · END OF DOCUMENT</span>
    </footer>
  );
}

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <GlobalStyles />
      <TitleBlockHeader />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}