"use client";
import { useState } from "react";

const STATS = [
  { icon:"👥", value:"142",    label:"Miembros", glow:"#a855f7" },
  { icon:"⚔️", value:"3,847",  label:"Kills",    glow:"#c9a84c" },
  { icon:"🛡️", value:"98K+",   label:"Builds",   glow:"#c9a84c" },
  { icon:"💰", value:"Mercado",label:"En Vivo",  glow:"#f97316" },
  { icon:"🏆", value:"2.4B",   label:"Fama",     glow:"#c9a84c" },
];

const FEATURES = [
  { icon:"⚡", title:"Tracking en tiempo real", desc:"Tus estadísticas se actualizan en vivo mientras juegas. Fama, plata y monstruos sin pausas." },
  { icon:"📈", title:"Fama por hora",            desc:"Calcula tu fama por hora y proyecta tus ganancias para sesiones de 1h, 4h y 8h." },
  { icon:"💰", title:"Precios de Mercado",       desc:"Compara precios en todas las ciudades y detecta oportunidades de flipping al instante." },
  { icon:"🛡️", title:"Builds META",             desc:"Las mejores builds actualizadas cada temporada, filtradas por rol y tipo de contenido." },
];

const STEPS = [
  { num:"1", title:"Descarga el tracker", desc:"Instala el script en tu PC", code:["pip install requests watchdog","python albionforge.py"] },
  { num:"2", title:"Farmea en Albion",    desc:"Juega en tu área de farmeo favorita" },
  { num:"3", title:"Mira tus stats",      desc:"Ve tus métricas en tiempo real" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#0e0a06;font-family:Georgia,serif;color:#e8dcc8;overflow-x:hidden}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(201,168,76,0.3)}50%{box-shadow:0 0 40px rgba(201,168,76,0.6)}}
        .s1{animation:fadeUp .5s ease-out .1s both}
        .s2{animation:fadeUp .5s ease-out .2s both}
        .s3{animation:fadeUp .5s ease-out .3s both}
        .s4{animation:fadeUp .5s ease-out .4s both}
        .s5{animation:fadeUp .5s ease-out .5s both}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(201,168,76,.3);border-radius:2px}
        .stat-card:hover{transform:translateY(-3px)!important;border-color:rgba(201,168,76,0.6)!important}
        .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(201,168,76,0.55)!important}
        .feat-card:hover{border-color:rgba(201,168,76,0.4)!important;transform:translateY(-2px)}
        .step-card:hover{border-color:rgba(201,168,76,0.45)!important;transform:translateY(-3px)}
        .nav-link:hover{color:#c9a84c!important}
        @media(max-width:640px){
          .desktop-nav{display:none!important}
          .hero-grid{flex-direction:column!important}
          .features-grid{grid-template-columns:1fr 1fr!important}
          .steps-grid{flex-direction:column!important}
        }
        @media(min-width:641px){
          .stats-row{flex-wrap:wrap!important;justify-content:center!important}
          .stat-card{min-width:120px!important}
          .features-grid{grid-template-columns:repeat(2,1fr)!important}
          .steps-grid{flex-direction:row!important}
        }
      `}</style>

      <div style={{minHeight:"100vh",background:"#0e0a06"}}>

        {/* ── NAV ── */}
        <nav style={{position:"sticky",top:0,zIndex:100,background:"rgba(14,10,6,0.94)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",borderBottom:"1px solid rgba(201,168,76,0.12)",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:8,background:"linear-gradient(135deg,rgba(139,92,246,0.5),rgba(80,40,0,0.7))",border:"1px solid rgba(201,168,76,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>⚔️</div>
            <span style={{fontSize:18,fontWeight:700,color:"#c9a84c"}}>AlbionForge</span>
          </div>
          <div className="desktop-nav" style={{display:"flex",gap:8,alignItems:"center"}}>
            <button className="nav-link" style={{background:"none",border:"none",color:"rgba(255,255,255,.55)",fontSize:13,cursor:"pointer",fontFamily:"Georgia,serif",padding:"4px 8px",transition:"color .2s"}}>Características</button>
            <button className="nav-link" style={{background:"none",border:"none",color:"rgba(255,255,255,.55)",fontSize:13,cursor:"pointer",fontFamily:"Georgia,serif",padding:"4px 8px",transition:"color .2s"}}>Cómo Funciona</button>
            <button className="btn-gold" style={{padding:"8px 18px",borderRadius:8,fontSize:13,fontWeight:700,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,0.8)",color:"#0e0a06",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 16px rgba(201,168,76,0.3)",transition:"all .2s"}}>Descargar</button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{position:"relative",minHeight:"92vh",display:"flex",flexDirection:"column",justifyContent:"flex-end",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#1a0d2e 0%,#2d1810 30%,#1a0f06 60%,#0e0a06 100%)"}}/>
          <div style={{position:"absolute",top:0,right:0,width:"60%",height:"55%",background:"radial-gradient(ellipse at 80% 20%,rgba(139,92,246,0.22) 0%,transparent 65%)",pointerEvents:"none"}}/>
          <div style={{position:"absolute",top:"20%",left:"10%",width:"50%",height:"40%",background:"radial-gradient(ellipse,rgba(201,168,76,0.08) 0%,transparent 70%)",pointerEvents:"none"}}/>

          {/* Castle */}
          <svg style={{position:"absolute",bottom:0,left:0,right:0,width:"100%",height:"42%",opacity:0.4}} viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice">
            <path d="M0,300 L0,200 L40,200 L40,170 L55,170 L55,155 L70,155 L70,170 L85,170 L85,200 L140,200 L140,145 L155,145 L155,118 L170,118 L170,100 L185,100 L185,118 L200,118 L200,145 L250,145 L250,180 L300,180 L300,130 L315,130 L315,110 L330,90 L345,110 L345,130 L365,130 L365,170 L390,170 L390,140 L405,140 L405,110 L420,85 L435,65 L450,50 L465,65 L480,85 L495,110 L495,140 L510,140 L510,170 L540,170 L540,145 L560,145 L560,120 L575,100 L590,120 L590,145 L620,145 L620,170 L660,170 L660,200 L700,200 L700,175 L715,175 L715,165 L730,165 L730,175 L745,175 L745,200 L800,200 L800,300Z" fill="#150a1a"/>
            <rect x="447" y="58" width="8" height="11" rx="4" fill="rgba(139,92,246,0.7)"/>
            <rect x="328" y="98" width="7" height="10" rx="3.5" fill="rgba(201,168,76,0.5)"/>
            <rect x="572" y="108" width="7" height="10" rx="3.5" fill="rgba(139,92,246,0.4)"/>
          </svg>

          <div style={{position:"absolute",bottom:0,left:0,right:0,height:160,background:"linear-gradient(0deg,rgba(14,10,6,1) 0%,rgba(14,10,6,0.5) 60%,transparent 100%)",pointerEvents:"none"}}/>

          {/* Hero text */}
          <div style={{position:"relative",zIndex:5,padding:"0 20px 32px",maxWidth:700}}>
            <div className="s1" style={{fontSize:9,letterSpacing:4,color:"rgba(139,92,246,0.9)",fontFamily:"monospace",marginBottom:14}}>⚡ POWERED BY UMBRYON ARTIFICIAL INTELLIGENCE</div>
            <h1 className="s2" style={{fontSize:"clamp(28px,7vw,52px)",fontWeight:700,color:"#c9a84c",lineHeight:1.1,letterSpacing:"-0.5px",marginBottom:12,textShadow:"0 2px 30px rgba(201,168,76,0.35)"}}>
              Optimiza tu farmeo<br/><span style={{color:"white"}}>en Albion como un pro</span>
            </h1>
            <p className="s3" style={{fontSize:15,color:"rgba(255,255,255,0.6)",lineHeight:1.65,marginBottom:28}}>Trackea tu fama, plata y rendimiento en tiempo real</p>
            <div className="s4" style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <button className="btn-gold" style={{padding:"13px 28px",borderRadius:8,fontSize:15,fontWeight:700,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,0.8)",color:"#0e0a06",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 20px rgba(201,168,76,0.4)",transition:"all .2s"}}>
                Descargar Tracker
              </button>
              <button style={{padding:"13px 20px",borderRadius:8,fontSize:14,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.15)",color:"rgba(255,255,255,0.7)",cursor:"pointer",fontFamily:"Georgia,serif",backdropFilter:"blur(10px)"}}>
                Ver Dashboard →
              </button>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="s5 stats-row" style={{position:"relative",zIndex:5,padding:"0 12px 28px",display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none"}}>
            {STATS.map((s,i)=>(
              <div key={i} className="stat-card" style={{flexShrink:0,background:"rgba(15,10,5,0.85)",border:"1px solid rgba(201,168,76,0.28)",borderRadius:12,padding:"12px 16px",textAlign:"center",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",boxShadow:`0 4px 20px rgba(0,0,0,0.5),0 0 20px ${s.glow}18`,minWidth:90,transition:"all .2s",position:"relative",overflow:"hidden",cursor:"default"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent)"}}/>
                <div style={{fontSize:20,marginBottom:4}}>{s.icon}</div>
                <div style={{fontSize:17,fontWeight:700,color:"#c9a84c",lineHeight:1,textShadow:`0 0 16px ${s.glow}80`}}>{s.value}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.4)",fontFamily:"monospace",letterSpacing:1.5,marginTop:5}}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{padding:"60px 20px",background:"linear-gradient(180deg,#0e0a06,#120c08 50%,#0e0a06)"}}>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)",marginBottom:48}}/>

          {/* App mockup */}
          <div style={{background:"rgba(15,10,5,0.9)",border:"1px solid rgba(201,168,76,0.2)",borderRadius:14,padding:16,marginBottom:32,boxShadow:"0 8px 40px rgba(0,0,0,0.6)",maxWidth:600,margin:"0 auto 32px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,paddingBottom:10,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span>⚔️</span>
                <span style={{fontSize:13,fontWeight:700,color:"#c9a84c"}}>AlbionForge</span>
              </div>
              <div style={{display:"flex",gap:4}}>
                <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,background:"rgba(201,168,76,0.15)",border:"1px solid rgba(201,168,76,0.3)",color:"#c9a84c",fontFamily:"monospace"}}>Características</span>
                <span style={{fontSize:9,padding:"2px 8px",borderRadius:20,background:"rgba(201,168,76,0.28)",border:"1px solid rgba(201,168,76,0.55)",color:"#fde68a",fontFamily:"monospace"}}>Descargar ›</span>
              </div>
            </div>
            <div style={{fontSize:11,color:"rgba(201,168,76,0.6)",fontFamily:"monospace",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 5px #22c55e",animation:"pulse 1.5s infinite"}}/>
              Parseando logs... 100 eventos/seg
            </div>
            <div style={{background:"rgba(0,0,0,0.5)",borderRadius:8,padding:"10px 12px",fontFamily:"monospace",fontSize:11,lineHeight:1.9,border:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{color:"rgba(139,92,246,0.8)"}}>pip install requests watchdog</div>
              <div style={{color:"rgba(201,168,76,0.8)"}}>python albionforge.py</div>
              <div style={{color:"rgba(255,255,255,0.2)",fontSize:10,marginTop:4,lineHeight:1.5}}>✓ Conectado · Fama: 3,200,000/hora<br/>✓ Plata: 450,000 · Sesión: 00:42:18</div>
            </div>
          </div>

          <div className="features-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,maxWidth:800,margin:"0 auto"}}>
            {FEATURES.map((f,i)=>(
              <div key={i} className="feat-card" style={{background:"rgba(15,10,5,0.8)",border:"1px solid rgba(201,168,76,0.14)",borderRadius:12,padding:"14px 12px",transition:"all .2s",cursor:"default",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)"}}/>
                <div style={{fontSize:22,marginBottom:8}}>{f.icon}</div>
                <div style={{fontSize:12,fontWeight:700,color:"white",marginBottom:5,lineHeight:1.3}}>{f.title}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",lineHeight:1.6}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ── */}
        <section style={{padding:"60px 20px",background:"#0a0704"}}>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)",marginBottom:40}}/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,marginBottom:36}}>
            <div style={{height:1,flex:1,maxWidth:80,background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.4))"}}/>
            <h2 style={{fontSize:"clamp(20px,4vw,30px)",color:"#c9a84c",fontWeight:700,whiteSpace:"nowrap",textShadow:"0 0 24px rgba(201,168,76,0.3)"}}>Cómo Funciona</h2>
            <div style={{height:1,flex:1,maxWidth:80,background:"linear-gradient(270deg,transparent,rgba(201,168,76,0.4))"}}/>
          </div>

          <div className="steps-grid" style={{display:"flex",flexDirection:"column",gap:12,maxWidth:900,margin:"0 auto"}}>
            {STEPS.map((step,i)=>(
              <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                  <div style={{width:36,height:36,borderRadius:8,background:"rgba(201,168,76,0.15)",border:"1px solid rgba(201,168,76,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:700,color:"#c9a84c",fontFamily:"Georgia,serif",flexShrink:0}}>{step.num}</div>
                  {i<STEPS.length-1&&<div style={{width:1,flex:1,minHeight:20,background:"rgba(201,168,76,0.15)",margin:"6px 0"}}/>}
                </div>
                <div className="step-card" style={{background:"rgba(15,10,5,0.85)",border:"1px solid rgba(201,168,76,0.18)",borderRadius:12,padding:"14px 16px",flex:1,position:"relative",overflow:"hidden",transition:"all .2s",cursor:"default"}}>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.35),transparent)"}}/>
                  <div style={{fontSize:15,fontWeight:700,color:"#c9a84c",marginBottom:4}}>{step.title}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",marginBottom:step.code?12:0}}>{step.desc}</div>
                  {step.code&&(
                    <div style={{background:"rgba(0,0,0,0.45)",borderRadius:8,padding:"8px 11px",fontFamily:"monospace",fontSize:11,lineHeight:1.9,border:"1px solid rgba(255,255,255,0.05)"}}>
                      {step.code.map((line,j)=>(
                        <div key={j} style={{color:"rgba(201,168,76,0.75)"}}><span style={{color:"rgba(139,92,246,0.6)",marginRight:5}}>›</span>{line}</div>
                      ))}
                    </div>
                  )}
                  {step.num==="2"&&<div style={{height:70,background:"linear-gradient(135deg,rgba(139,92,246,0.12),rgba(180,100,20,0.12))",borderRadius:8,border:"1px solid rgba(201,168,76,0.08)",display:"flex",alignItems:"center",justifyContent:"center",marginTop:8}}><span style={{fontSize:28,opacity:0.4}}>🗺️</span></div>}
                  {step.num==="3"&&(
                    <div style={{background:"rgba(0,0,0,0.4)",borderRadius:8,padding:"10px 12px",border:"1px solid rgba(201,168,76,0.08)",marginTop:8}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                        <span style={{fontSize:10,color:"#a78bfa",fontFamily:"monospace"}}>⚡ 200K/min</span>
                        <span style={{fontSize:10,color:"#22c55e",fontFamily:"monospace",fontWeight:700}}>↑ 330K</span>
                      </div>
                      <div style={{display:"flex",alignItems:"flex-end",gap:3,height:28}}>
                        {[40,65,45,80,55,90,70,85].map((h,j)=><div key={j} style={{flex:1,height:`${h}%`,borderRadius:"2px 2px 0 0",background:`rgba(201,168,76,${0.25+h/200})`}}/>)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{padding:"60px 20px 70px",textAlign:"center",background:"linear-gradient(180deg,#0a0704,#120c08)"}}>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)",marginBottom:44}}/>
          <h2 style={{fontSize:"clamp(20px,5vw,32px)",color:"#c9a84c",marginBottom:12,fontWeight:700,textShadow:"0 0 24px rgba(201,168,76,0.3)",lineHeight:1.3}}>
            Comienza a mejorar<br/>tu rendimiento hoy
          </h2>
          <p style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:28,lineHeight:1.7}}>Únete a más de 2,400 jugadores que ya optimizan su farmeo</p>
          <button className="btn-gold" style={{padding:"15px 40px",borderRadius:8,fontSize:16,fontWeight:700,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,0.8)",color:"#0e0a06",cursor:"pointer",fontFamily:"Georgia,serif",boxShadow:"0 4px 24px rgba(201,168,76,0.4)",animation:"glow 3s ease-in-out infinite",width:"100%",maxWidth:320,transition:"all .2s"}}>
            Descargar Tracker
          </button>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{padding:"24px 20px",borderTop:"1px solid rgba(255,255,255,0.06)",background:"#080603"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,textAlign:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:16}}>⚔️</span>
              <span style={{fontSize:16,color:"#c9a84c",fontWeight:700}}>AlbionForge</span>
            </div>
            <div style={{fontSize:8,color:"rgba(255,255,255,0.1)",fontFamily:"monospace",letterSpacing:1.5,lineHeight:1.8}}>NOT AFFILIATED WITH SANDBOX INTERACTIVE GMBH · FOR ENTERTAINMENT PURPOSES</div>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:15,height:15,borderRadius:4,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"white",fontWeight:700}}>U</div>
              <span style={{fontSize:8,color:"rgba(255,255,255,0.2)",fontFamily:"monospace",letterSpacing:2}}>POWERED BY UMBRYON AI</span>
            </div>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.1)",fontFamily:"monospace"}}>💳 PAGOS SEGUROS CON STRIPE</div>
          </div>
        </footer>
      </div>
    </>
  );
}
