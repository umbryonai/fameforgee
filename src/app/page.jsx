import { useState, useEffect } from "react";

// ── STATS — Mercado primero ────────────────────────────────────────────────
const STATS = [
  { icon:"💰", value:"12K+",   label:"Precios Live",  glow:"#f97316", href:"#mercado" },
  { icon:"👥", value:"2,400+", label:"Jugadores",     glow:"#a855f7", href:"#guild"   },
  { icon:"⚔️", value:"3,847",  label:"Kills Tracked", glow:"#c9a84c", href:"#kills"   },
  { icon:"🛡️", value:"98+",    label:"Builds META",   glow:"#10b981", href:"#builds"  },
  { icon:"🏆", value:"2.4B",   label:"Fama Trackeada",glow:"#c9a84c", href:"#fama"    },
];

const FEATURES = [
  { icon:"💰", title:"Mercado en Vivo",       desc:"Precios reales de todas las ciudades. Detecta oportunidades de flipping automáticamente. La herramienta más poderosa del juego.", tag:"GRATIS", color:"#f97316" },
  { icon:"⚡", title:"Fama Tracker",           desc:"Trackea tu fama y plata por sesión en tiempo real. Proyecciones automáticas de 1h, 4h y 8h.", tag:"GRATIS", color:"#c9a84c" },
  { icon:"🛡️", title:"Builds META",           desc:"Las mejores builds actualizadas cada temporada filtradas por rol, contenido y tier de dificultad.", tag:"GRATIS", color:"#10b981" },
  { icon:"👥", title:"Guild Dashboard",        desc:"Stats completos de tu guild: kills, muertes, KDA, fama y ranking global actualizado.", tag:"GRATIS", color:"#a855f7" },
  { icon:"🖥️", title:"App de Escritorio",     desc:"Script Python que lee tus logs de Albion automáticamente. Sin input manual, todo en tiempo real.", tag:"PRO", color:"#8b5cf6" },
  { icon:"🔔", title:"Alertas de Precio",      desc:"Recibe notificaciones cuando un ítem baje al precio que quieres en cualquier ciudad del servidor.", tag:"PRO", color:"#ef4444" },
];

const STEPS = [
  { num:"1", title:"Descarga el Tracker", desc:"Un script Python liviano. Se instala en segundos.",
    code:["pip install requests watchdog","python albionforge.py --user TuNick"] },
  { num:"2", title:"Farmea normalmente",  desc:"Juega como siempre. El tracker corre en segundo plano sin afectar tu FPS." },
  { num:"3", title:"Ve tus métricas",     desc:"Tu dashboard se actualiza en vivo: fama/hora, plata ganada, eficiencia por zona." },
];

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkScroll = () => setScrolled(window.scrollY > 40);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", checkScroll);
    return () => { window.removeEventListener("resize", checkMobile); window.removeEventListener("scroll", checkScroll); };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  };

  return (
    <div style={{ minHeight:"100vh", background:"#0e0a06", fontFamily:"Georgia,serif", color:"#e8dcc8", overflowX:"hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow    { 0%,100%{box-shadow:0 0 20px rgba(201,168,76,.35)} 50%{box-shadow:0 0 44px rgba(201,168,76,.7)} }
        @keyframes shimmer { 0%{opacity:.6} 50%{opacity:1} 100%{opacity:.6} }
        .a1{animation:fadeUp .55s ease-out .05s both}
        .a2{animation:fadeUp .55s ease-out .15s both}
        .a3{animation:fadeUp .55s ease-out .25s both}
        .a4{animation:fadeUp .55s ease-out .35s both}
        .a5{animation:fadeUp .55s ease-out .45s both}
        .btn-gold { transition:all .22s ease; }
        .btn-gold:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(201,168,76,.6)!important; }
        .btn-gold:active { transform:scale(.97); }
        .stat-c { transition:all .22s ease; cursor:pointer; }
        .stat-c:hover { transform:translateY(-4px); border-color:rgba(201,168,76,.65)!important; box-shadow:0 8px 28px rgba(0,0,0,.5)!important; }
        .feat-c { transition:all .22s ease; cursor:default; }
        .feat-c:hover { transform:translateY(-3px); border-color:rgba(201,168,76,.35)!important; }
        .step-c { transition:all .22s ease; }
        .step-c:hover { transform:translateY(-2px); border-color:rgba(201,168,76,.4)!important; }
        .nav-lnk { transition:color .18s; }
        .nav-lnk:hover { color:#c9a84c!important; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:rgba(201,168,76,.3); border-radius:2px; }
      `}</style>

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        background: scrolled ? "rgba(14,10,6,.96)" : "rgba(14,10,6,.7)",
        backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,.18)" : "1px solid transparent",
        padding: isMobile ? "13px 18px" : "14px 40px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        transition:"all .3s ease",
      }}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
          <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,rgba(139,92,246,.55),rgba(100,55,0,.7))",border:"1px solid rgba(201,168,76,.45)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,boxShadow:"0 0 16px rgba(139,92,246,.25)"}}>⚔️</div>
          <span style={{fontSize:19,fontWeight:700,color:"#c9a84c",letterSpacing:"-.3px"}}>AlbionForge</span>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{display:"flex",gap:4,alignItems:"center"}}>
            {[["Mercado","mercado"],["Características","features"],["Cómo Funciona","como"],["Dashboard","dashboard"]].map(([label,id])=>(
              <button key={id} className="nav-lnk" onClick={()=>scrollTo(id)}
                style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",fontSize:13,cursor:"pointer",fontFamily:"Georgia,serif",padding:"6px 12px",letterSpacing:".2px"}}>
                {label}
              </button>
            ))}
            <div style={{width:1,height:20,background:"rgba(255,255,255,.12)",margin:"0 8px"}}/>
            <button className="btn-gold" onClick={()=>scrollTo("download")}
              style={{padding:"8px 20px",borderRadius:8,fontSize:13,fontWeight:700,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,.8)",color:"#0e0a06",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 16px rgba(201,168,76,.35)"}}>
              Descargar Tracker
            </button>
          </div>
        )}

        {/* Mobile CTA */}
        {isMobile && (
          <button className="btn-gold" onClick={()=>scrollTo("download")}
            style={{padding:"7px 16px",borderRadius:8,fontSize:12,fontWeight:700,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,.8)",color:"#0e0a06",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 2px 12px rgba(201,168,76,.3)"}}>
            Descargar
          </button>
        )}
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",overflow:"hidden",paddingTop:60}}>

        {/* Backgrounds */}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#1a0d2e 0%,#2d1810 28%,#1a0f06 58%,#0e0a06 100%)"}}/>
        <div style={{position:"absolute",top:0,right:0,width:"65%",height:"60%",background:"radial-gradient(ellipse at 85% 15%,rgba(139,92,246,.25) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"15%",left:"5%",width:"55%",height:"50%",background:"radial-gradient(ellipse,rgba(201,168,76,.07) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:"25%",right:"10%",width:"40%",height:"40%",background:"radial-gradient(ellipse,rgba(201,168,76,.05) 0%,transparent 65%)",pointerEvents:"none"}}/>

        {/* Castle SVG */}
        <svg style={{position:"absolute",bottom:0,left:0,right:0,width:"100%",height:"45%",opacity:.45}} viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice">
          <path d="M0,400 L0,280 L50,280 L50,250 L65,250 L65,232 L82,232 L82,215 L100,215 L100,232 L118,232 L118,250 L135,250 L135,280 L200,280 L200,220 L215,220 L215,195 L232,175 L250,155 L268,175 L285,195 L285,220 L300,220 L300,265 L360,265 L360,210 L375,210 L375,185 L392,162 L410,140 L428,118 L445,100 L462,118 L478,140 L495,162 L512,185 L512,210 L528,210 L528,265 L580,265 L580,240 L595,240 L595,218 L612,198 L630,178 L648,198 L665,218 L665,240 L680,240 L680,265 L740,265 L740,210 L755,210 L755,188 L772,168 L790,148 L808,168 L825,188 L825,210 L840,210 L840,265 L900,265 L900,290 L950,290 L950,268 L965,268 L965,255 L980,255 L980,268 L995,268 L995,290 L1050,290 L1050,270 L1065,270 L1065,258 L1080,258 L1080,270 L1100,270 L1100,290 L1200,290 L1200,400Z" fill="#150a1a"/>
          <rect x="443" y="108" width="10" height="15" rx="5" fill="rgba(139,92,246,.75)"/>
          <rect x="628" y="186" width="9" height="13" rx="4.5" fill="rgba(201,168,76,.55)"/>
          <rect x="788" y="156" width="9" height="13" rx="4.5" fill="rgba(139,92,246,.45)"/>
          <rect x="248" y="163" width="8" height="12" rx="4" fill="rgba(201,168,76,.4)"/>
        </svg>

        {/* Fog */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:200,background:"linear-gradient(0deg,rgba(14,10,6,1) 0%,rgba(14,10,6,.55) 55%,transparent 100%)",pointerEvents:"none"}}/>

        {/* Hero content — desktop: side by side, mobile: stacked */}
        <div style={{
          position:"relative",zIndex:5,flex:1,display:"flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent:"space-between",
          padding: isMobile ? "40px 20px 0" : "80px 60px 0",
          gap:40,maxWidth:1200,margin:"0 auto",width:"100%",
        }}>
          {/* Left text */}
          <div style={{flex:1,maxWidth: isMobile?"100%":580}}>
            <div className="a1" style={{fontSize:9,letterSpacing:5,color:"rgba(139,92,246,.9)",fontFamily:"monospace",marginBottom:16}}>
              ⚡ POWERED BY UMBRYON ARTIFICIAL INTELLIGENCE
            </div>
            <h1 className="a2" style={{
              fontSize: isMobile?"clamp(30px,8vw,44px)":"clamp(38px,4vw,62px)",
              fontWeight:700,color:"#c9a84c",lineHeight:1.08,letterSpacing:"-1px",
              marginBottom:16,textShadow:"0 2px 40px rgba(201,168,76,.4)",
            }}>
              Optimiza tu farmeo<br/>
              <span style={{color:"white"}}>en Albion como un pro</span>
            </h1>
            <p className="a3" style={{fontSize: isMobile?14:16,color:"rgba(255,255,255,.62)",lineHeight:1.7,marginBottom:32,maxWidth:480}}>
              Precios de mercado en vivo, tracker de fama por sesión, builds META y guild dashboard — todo en un solo lugar.
            </p>
            <div className="a4" style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <button className="btn-gold" id="download" onClick={()=>scrollTo("como")}
                style={{padding:"14px 32px",borderRadius:8,fontSize:15,fontWeight:700,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,.85)",color:"#0e0a06",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 22px rgba(201,168,76,.42)"}}>
                Descargar Tracker
              </button>
              <button onClick={()=>scrollTo("mercado")}
                style={{padding:"14px 24px",borderRadius:8,fontSize:14,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.18)",color:"rgba(255,255,255,.75)",cursor:"pointer",fontFamily:"Georgia,serif",backdropFilter:"blur(10px)",transition:"all .2s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.11)";e.currentTarget.style.borderColor="rgba(255,255,255,.3)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)";e.currentTarget.style.borderColor="rgba(255,255,255,.18)";}}>
                Ver Mercado →
              </button>
            </div>
          </div>

          {/* Right — desktop only: live market preview card */}
          {!isMobile && (
            <div className="a4" style={{width:340,flexShrink:0}}>
              <div style={{background:"rgba(15,10,5,.92)",border:"1px solid rgba(201,168,76,.22)",borderRadius:16,padding:20,boxShadow:"0 16px 60px rgba(0,0,0,.7),0 0 40px rgba(201,168,76,.06)"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,paddingBottom:12,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:14}}>💰</span>
                    <span style={{fontSize:13,fontWeight:700,color:"#c9a84c"}}>Mercado en Vivo</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 6px #22c55e",animation:"pulse 1.5s infinite"}}/>
                    <span style={{fontSize:9,color:"rgba(255,255,255,.35)",fontFamily:"monospace",letterSpacing:1}}>LIVE</span>
                  </div>
                </div>
                {/* Market rows */}
                {[
                  {item:"Broadsword T6", sell:"48,200 🪙", buy:"44,800 🪙", diff:"+7.5%", pos:true},
                  {item:"Planks T5",     sell:"12,400 🪙", buy:"11,900 🪙", diff:"+4.2%", pos:true},
                  {item:"Metal Bar T4",  sell:"6,800 🪙",  buy:"6,750 🪙",  diff:"+0.7%", pos:false},
                  {item:"Cloth T4",      sell:"3,200 🪙",  buy:"2,950 🪙",  diff:"+8.5%", pos:true},
                ].map((row,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                    <div>
                      <div style={{fontSize:12,color:"#e8dcc8",fontWeight:600}}>{row.item}</div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,.25)",fontFamily:"monospace",marginTop:1}}>Caerleon</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:11,color:"#22c55e",fontFamily:"monospace"}}>{row.sell}</div>
                      <div style={{fontSize:10,color:row.pos?"#c9a84c":"rgba(255,255,255,.3)",fontFamily:"monospace",marginTop:1}}>{row.diff}</div>
                    </div>
                  </div>
                ))}
                <button onClick={()=>scrollTo("mercado")} style={{width:"100%",marginTop:14,padding:"9px",borderRadius:8,background:"rgba(201,168,76,.15)",border:"1px solid rgba(201,168,76,.3)",color:"#c9a84c",fontSize:11,fontFamily:"monospace",letterSpacing:2,cursor:"pointer",transition:"all .2s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,.25)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(201,168,76,.15)"}>
                  VER TODOS LOS PRECIOS →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STAT CARDS */}
        <div className="a5" style={{
          position:"relative",zIndex:5,
          padding: isMobile?"0 12px 32px":"0 40px 40px",
          marginTop: isMobile?28:40,
          display:"flex",gap:10,
          overflowX: isMobile?"auto":"visible",
          flexWrap: isMobile?"nowrap":"wrap",
          justifyContent: isMobile?"flex-start":"center",
          scrollbarWidth:"none",maxWidth:1200,margin: isMobile?"28px 0 0":"40px auto 0",width:"100%",
        }}>
          {STATS.map((s,i)=>(
            <a key={i} href={s.href} style={{textDecoration:"none"}}
              onClick={e=>{e.preventDefault();scrollTo(s.href.replace("#",""));}}>
              <div className="stat-c" style={{
                flexShrink:0,background:"rgba(15,10,5,.87)",
                border:"1px solid rgba(201,168,76,.25)",borderRadius:13,
                padding: isMobile?"11px 14px":"14px 22px",
                textAlign:"center",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",
                boxShadow:`0 4px 20px rgba(0,0,0,.5),0 0 18px ${s.glow}14`,
                minWidth: isMobile?90:110,position:"relative",overflow:"hidden",
              }}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.55),transparent)"}}/>
                <div style={{fontSize: isMobile?18:22,marginBottom:5}}>{s.icon}</div>
                <div style={{fontSize: isMobile?16:20,fontWeight:700,color:"#c9a84c",lineHeight:1,textShadow:`0 0 16px ${s.glow}80`}}>{s.value}</div>
                <div style={{fontSize: isMobile?8:9,color:"rgba(255,255,255,.4)",fontFamily:"monospace",letterSpacing:1.5,marginTop:5}}>{s.label.toUpperCase()}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ MERCADO SECTION ══════════════════════════════════════════════════ */}
      <section id="mercado" style={{padding: isMobile?"50px 20px":"80px 60px",background:"linear-gradient(180deg,#0e0a06,#110d07 50%,#0e0a06)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.35),transparent)",marginBottom: isMobile?40:56}}/>
          <div style={{marginBottom: isMobile?28:40,display:"flex",alignItems:isMobile?"flex-start":"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
            <div>
              <div style={{fontSize:9,letterSpacing:4,color:"rgba(201,168,76,.6)",fontFamily:"monospace",marginBottom:10}}>💰 HERRAMIENTA PRINCIPAL</div>
              <h2 style={{fontSize: isMobile?"clamp(24px,6vw,32px)":"clamp(28px,3vw,40px)",color:"#c9a84c",fontWeight:700,letterSpacing:"-.5px",textShadow:"0 0 28px rgba(201,168,76,.3)"}}>Precios de Mercado en Vivo</h2>
              <p style={{fontSize:14,color:"rgba(255,255,255,.45)",marginTop:8,lineHeight:1.6,maxWidth:500}}>Compara precios en todas las ciudades y detecta oportunidades de flipping automáticamente. Datos reales de la API oficial de Albion.</p>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["Caerleon","Bridgewatch","Fort Sterling","Black Market"].map(c=>(
                <span key={c} style={{fontSize:10,padding:"4px 10px",borderRadius:20,background:"rgba(201,168,76,.1)",border:"1px solid rgba(201,168,76,.25)",color:"rgba(201,168,76,.8)",fontFamily:"monospace",letterSpacing:1}}>{c}</span>
              ))}
            </div>
          </div>

          {/* Market table preview */}
          <div style={{background:"rgba(12,8,4,.9)",border:"1px solid rgba(201,168,76,.18)",borderRadius:16,overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,.6)"}}>
            <div style={{padding:"14px 20px",borderBottom:"1px solid rgba(201,168,76,.1)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 6px #22c55e",animation:"pulse 1.5s infinite"}}/>
                <span style={{fontSize:11,color:"rgba(255,255,255,.4)",fontFamily:"monospace",letterSpacing:1}}>ACTUALIZANDO EN TIEMPO REAL</span>
              </div>
              <button onClick={()=>scrollTo("dashboard")} style={{fontSize:10,padding:"5px 14px",borderRadius:20,background:"rgba(201,168,76,.18)",border:"1px solid rgba(201,168,76,.35)",color:"#c9a84c",cursor:"pointer",fontFamily:"monospace",letterSpacing:1,transition:"all .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,.28)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(201,168,76,.18)"}>
                ABRIR DASHBOARD COMPLETO →
              </button>
            </div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                    {["Ítem","Mejor Venta","Mejor Compra","Margen","Ciudad","Oportunidad"].map(h=>(
                      <th key={h} style={{padding:"11px 16px",textAlign:"left",fontSize:8,color:"rgba(201,168,76,.45)",letterSpacing:2,fontFamily:"monospace",whiteSpace:"nowrap"}}>{h.toUpperCase()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {item:"Broadsword T6",  sell:"48,200",  buy:"44,800", margin:"7.5%", city:"Caerleon",      opp:true},
                    {item:"Planks T5",      sell:"12,400",  buy:"11,900", margin:"4.2%", city:"Bridgewatch",   opp:true},
                    {item:"Knight Helmet T5",sell:"34,800", buy:"33,100", margin:"5.1%", city:"Fort Sterling",  opp:true},
                    {item:"Metal Bar T4",   sell:"6,800",   buy:"6,750",  margin:"0.7%", city:"Lymhurst",      opp:false},
                    {item:"Cloth T4",       sell:"3,200",   buy:"2,950",  margin:"8.5%", city:"Martlock",      opp:true},
                  ].map((row,i)=>(
                    <tr key={i} style={{borderBottom:"1px solid rgba(255,255,255,.03)",transition:"background .15s",cursor:"default"}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,.04)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={{padding:"12px 16px",fontSize:13,color:"#e8dcc8",fontWeight:600}}>{row.item}</td>
                      <td style={{padding:"12px 16px",fontSize:12,color:"#22c55e",fontFamily:"monospace"}}>{row.sell} 🪙</td>
                      <td style={{padding:"12px 16px",fontSize:12,color:"#f97316",fontFamily:"monospace"}}>{row.buy} 🪙</td>
                      <td style={{padding:"12px 16px",fontSize:12,color:"#c9a84c",fontFamily:"monospace",fontWeight:700}}>{row.margin}</td>
                      <td style={{padding:"12px 16px",fontSize:11,color:"rgba(255,255,255,.4)",fontFamily:"monospace"}}>{row.city}</td>
                      <td style={{padding:"12px 16px"}}>
                        {row.opp
                          ? <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,background:"rgba(34,197,94,.15)",border:"1px solid rgba(34,197,94,.3)",color:"#22c55e",fontFamily:"monospace",letterSpacing:1}}>✓ FLIP</span>
                          : <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",color:"rgba(255,255,255,.2)",fontFamily:"monospace"}}>—</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ═════════════════════════════════════════════════════════ */}
      <section id="features" style={{padding: isMobile?"50px 20px":"80px 60px",background:"#0a0704"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)",marginBottom: isMobile?36:52}}/>
          <div style={{textAlign:"center",marginBottom: isMobile?28:44}}>
            <div style={{fontSize:9,letterSpacing:4,color:"rgba(201,168,76,.6)",fontFamily:"monospace",marginBottom:10}}>FUNCIONALIDADES</div>
            <h2 style={{fontSize: isMobile?"clamp(22px,6vw,30px)":"clamp(26px,3vw,38px)",color:"white",fontWeight:700,letterSpacing:"-.5px"}}>
              Todo lo que necesitas para dominar Albion
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns: isMobile?"1fr 1fr":"repeat(3,1fr)",gap:12}}>
            {FEATURES.map((f,i)=>(
              <div key={i} className="feat-c" style={{
                background:"rgba(14,10,5,.85)",
                border:`1px solid ${f.tag==="PRO"?"rgba(139,92,246,.25)":"rgba(201,168,76,.13)"}`,
                borderRadius:14,padding: isMobile?"14px 12px":"20px",
                position:"relative",overflow:"hidden",
              }}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${f.color}60,transparent)`}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <span style={{fontSize: isMobile?20:26}}>{f.icon}</span>
                  <span style={{fontSize:8,padding:"2px 7px",borderRadius:20,fontFamily:"monospace",letterSpacing:1,
                    background:f.tag==="PRO"?"rgba(139,92,246,.2)":"rgba(34,197,94,.12)",
                    border:`1px solid ${f.tag==="PRO"?"rgba(139,92,246,.4)":"rgba(34,197,94,.3)"}`,
                    color:f.tag==="PRO"?"#a78bfa":"#4ade80"}}>
                    {f.tag}
                  </span>
                </div>
                <div style={{fontSize: isMobile?11:13,fontWeight:700,color:"white",marginBottom:6,lineHeight:1.3}}>{f.title}</div>
                <div style={{fontSize: isMobile?9:11,color:"rgba(255,255,255,.42)",lineHeight:1.65}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CÓMO FUNCIONA ════════════════════════════════════════════════════ */}
      <section id="como" style={{padding: isMobile?"50px 20px":"80px 60px",background:"linear-gradient(180deg,#0a0704,#0e0a06)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)",marginBottom: isMobile?36:52}}/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom: isMobile?32:48}}>
            <div style={{height:1,flex:1,maxWidth:100,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.45))"}}/>
            <h2 style={{fontSize: isMobile?"clamp(20px,5vw,26px)":"clamp(24px,2.5vw,34px)",color:"#c9a84c",fontWeight:700,whiteSpace:"nowrap",textShadow:"0 0 24px rgba(201,168,76,.3)"}}>Cómo Funciona</h2>
            <div style={{height:1,flex:1,maxWidth:100,background:"linear-gradient(270deg,transparent,rgba(201,168,76,.45))"}}/>
          </div>

          <div style={{display:"grid",gridTemplateColumns: isMobile?"1fr":"repeat(3,1fr)",gap: isMobile?12:20,alignItems:"stretch"}}>
            {STEPS.map((step,i)=>(
              <div key={i} style={{display:"flex",gap:0,flexDirection:"column"}}>
                {isMobile ? (
                  /* Mobile: horizontal with number */
                  <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                      <div style={{width:34,height:34,borderRadius:8,background:"rgba(201,168,76,.14)",border:"1px solid rgba(201,168,76,.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:"#c9a84c"}}>{step.num}</div>
                      {i<STEPS.length-1&&<div style={{width:1,flex:1,minHeight:16,background:"rgba(201,168,76,.15)",margin:"6px 0"}}/>}
                    </div>
                    <div className="step-c" style={{background:"rgba(14,10,5,.88)",border:"1px solid rgba(201,168,76,.18)",borderRadius:12,padding:"13px 15px",flex:1,position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.35),transparent)"}}/>
                      <div style={{fontSize:14,fontWeight:700,color:"#c9a84c",marginBottom:4}}>{step.title}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.42)",marginBottom:step.code?10:0,lineHeight:1.5}}>{step.desc}</div>
                      {step.code&&<div style={{background:"rgba(0,0,0,.45)",borderRadius:8,padding:"8px 10px",fontFamily:"monospace",fontSize:10,lineHeight:1.9,border:"1px solid rgba(255,255,255,.05)"}}>
                        {step.code.map((line,j)=><div key={j} style={{color:"rgba(201,168,76,.75)"}}><span style={{color:"rgba(139,92,246,.6)",marginRight:5}}>›</span>{line}</div>)}
                      </div>}
                      {step.num==="2"&&<div style={{height:60,background:"linear-gradient(135deg,rgba(139,92,246,.1),rgba(180,100,20,.1))",borderRadius:8,border:"1px solid rgba(201,168,76,.07)",display:"flex",alignItems:"center",justifyContent:"center",marginTop:8}}><span style={{fontSize:24,opacity:.4}}>🗺️</span></div>}
                      {step.num==="3"&&<div style={{background:"rgba(0,0,0,.4)",borderRadius:8,padding:"8px 10px",border:"1px solid rgba(201,168,76,.07)",marginTop:8}}>
                        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                          <span style={{fontSize:9,color:"#a78bfa",fontFamily:"monospace"}}>⚡ 3.2M/hora</span>
                          <span style={{fontSize:9,color:"#22c55e",fontFamily:"monospace",fontWeight:700}}>↑ LIVE</span>
                        </div>
                        <div style={{display:"flex",alignItems:"flex-end",gap:2,height:24}}>
                          {[40,65,45,80,55,90,70,85,60,95].map((h,j)=><div key={j} style={{flex:1,height:`${h}%`,borderRadius:"1px 1px 0 0",background:`rgba(201,168,76,${0.2+h/200})`}}/>)}
                        </div>
                      </div>}
                    </div>
                  </div>
                ) : (
                  /* Desktop: vertical cards */
                  <div className="step-c" style={{background:"rgba(14,10,5,.88)",border:"1px solid rgba(201,168,76,.18)",borderRadius:16,padding:24,flex:1,position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.4),transparent)"}}/>
                    <div style={{fontSize:28,fontWeight:700,color:"rgba(201,168,76,.65)",marginBottom:12,lineHeight:1}}>{step.num}.</div>
                    <div style={{fontSize:17,fontWeight:700,color:"#c9a84c",marginBottom:6}}>{step.title}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,.42)",marginBottom:step.code?16:0,lineHeight:1.65}}>{step.desc}</div>
                    {step.code&&<div style={{background:"rgba(0,0,0,.48)",borderRadius:10,padding:"12px 14px",fontFamily:"monospace",fontSize:12,lineHeight:2,border:"1px solid rgba(255,255,255,.06)"}}>
                      {step.code.map((line,j)=><div key={j} style={{color:"rgba(201,168,76,.8)"}}><span style={{color:"rgba(139,92,246,.65)",marginRight:6}}>›</span>{line}</div>)}
                    </div>}
                    {step.num==="2"&&<div style={{height:90,background:"linear-gradient(135deg,rgba(139,92,246,.12),rgba(180,100,20,.12))",borderRadius:10,border:"1px solid rgba(201,168,76,.08)",display:"flex",alignItems:"center",justifyContent:"center",marginTop:16}}><span style={{fontSize:36,opacity:.4}}>🗺️</span></div>}
                    {step.num==="3"&&<div style={{background:"rgba(0,0,0,.42)",borderRadius:10,padding:"12px",border:"1px solid rgba(201,168,76,.08)",marginTop:16}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                        <span style={{fontSize:11,color:"#a78bfa",fontFamily:"monospace"}}>⚡ 3.2M fama/hora</span>
                        <span style={{fontSize:11,color:"#22c55e",fontFamily:"monospace",fontWeight:700}}>↑ LIVE</span>
                      </div>
                      <div style={{display:"flex",alignItems:"flex-end",gap:3,height:36}}>
                        {[40,65,45,80,55,90,70,85,60,95].map((h,j)=><div key={j} style={{flex:1,height:`${h}%`,borderRadius:"2px 2px 0 0",background:`rgba(201,168,76,${0.2+h/200})`}}/>)}
                      </div>
                    </div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════════════════════════ */}
      <section style={{padding: isMobile?"56px 20px 70px":"80px 60px 90px",textAlign:"center",background:"linear-gradient(180deg,#0e0a06,#130e07)"}}>
        <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.35),transparent)",marginBottom: isMobile?40:56}}/>
        <div style={{maxWidth:580,margin:"0 auto"}}>
          <h2 style={{fontSize: isMobile?"clamp(22px,6vw,32px)":"clamp(28px,3vw,42px)",color:"#c9a84c",marginBottom:14,fontWeight:700,textShadow:"0 0 28px rgba(201,168,76,.35)",lineHeight:1.2}}>
            Comienza a mejorar<br/>tu rendimiento hoy
          </h2>
          <p style={{fontSize: isMobile?13:15,color:"rgba(255,255,255,.4)",marginBottom:32,lineHeight:1.7}}>
            Únete a más de 2,400 jugadores que ya optimizan<br/>su farmeo con AlbionForge
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn-gold" onClick={()=>scrollTo("como")}
              style={{padding: isMobile?"14px 32px":"16px 44px",borderRadius:8,fontSize: isMobile?15:17,fontWeight:700,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,.85)",color:"#0e0a06",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 28px rgba(201,168,76,.45)",animation:"glow 3s ease-in-out infinite"}}>
              Descargar Tracker Gratis
            </button>
            <button onClick={()=>scrollTo("mercado")}
              style={{padding: isMobile?"14px 24px":"16px 32px",borderRadius:8,fontSize: isMobile?14:15,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.18)",color:"rgba(255,255,255,.7)",cursor:"pointer",fontFamily:"Georgia,serif",backdropFilter:"blur(10px)",transition:"all .2s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.11)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.06)"}>
              Ver Mercado →
            </button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer style={{padding: isMobile?"22px 20px":"28px 60px",borderTop:"1px solid rgba(255,255,255,.06)",background:"#080502"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexDirection: isMobile?"column":"row",alignItems:"center",justifyContent:"space-between",gap:14,textAlign: isMobile?"center":"left"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18}}>⚔️</span>
            <span style={{fontSize:17,color:"#c9a84c",fontWeight:700}}>AlbionForge</span>
          </div>
          <div style={{fontSize:8,color:"rgba(255,255,255,.1)",fontFamily:"monospace",letterSpacing:1.5,lineHeight:1.9}}>
            NOT AFFILIATED WITH SANDBOX INTERACTIVE GMBH · FOR ENTERTAINMENT PURPOSES
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:9,color:"rgba(255,255,255,.1)",fontFamily:"monospace"}}>💳 STRIPE</span>
            <div style={{width:1,height:12,background:"rgba(255,255,255,.1)"}}/>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:16,height:16,borderRadius:4,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"white",fontWeight:700}}>U</div>
              <span style={{fontSize:8,color:"rgba(255,255,255,.2)",fontFamily:"monospace",letterSpacing:2}}>UMBRYON AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
