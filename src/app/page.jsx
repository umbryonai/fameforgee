"use client";
import { useState, useEffect, useCallback, useRef } from "react";

// ── ALBION ITEM IMAGE CDN ──────────────────────────────────────────────────
// Official Albion Online render service — free, no auth required
const IMG = (id) => `https://render.albiononline.com/v1/item/${id}.png?count=1&quality=1`;

const MARKET_ITEMS = [
  { id:"T4_SWORD",                name:"Broadsword T4",     tier:"T4", cat:"Weapon"   },
  { id:"T5_SWORD",                name:"Broadsword T5",     tier:"T5", cat:"Weapon"   },
  { id:"T6_SWORD",                name:"Broadsword T6",     tier:"T6", cat:"Weapon"   },
  { id:"T7_SWORD",                name:"Broadsword T7",     tier:"T7", cat:"Weapon"   },
  { id:"T4_MAIN_CURSEDSTAFF",     name:"Cursed Staff T4",   tier:"T4", cat:"Weapon"   },
  { id:"T5_MAIN_CURSEDSTAFF",     name:"Cursed Staff T5",   tier:"T5", cat:"Weapon"   },
  { id:"T4_MAIN_HOLYSTAFF",       name:"Holy Staff T4",     tier:"T4", cat:"Weapon"   },
  { id:"T5_MAIN_HOLYSTAFF",       name:"Holy Staff T5",     tier:"T5", cat:"Weapon"   },
  { id:"T4_MAIN_NATURESTAFF",     name:"Nature Staff T4",   tier:"T4", cat:"Weapon"   },
  { id:"T4_2H_DUALSCYTHE_HELL",   name:"Infernal Scythe T4",tier:"T4", cat:"Weapon"   },
  { id:"T4_HEAD_PLATE_SET1",      name:"Knight Helmet T4",  tier:"T4", cat:"Armor"    },
  { id:"T5_HEAD_PLATE_SET1",      name:"Knight Helmet T5",  tier:"T5", cat:"Armor"    },
  { id:"T4_ARMOR_PLATE_SET1",     name:"Plate Armor T4",    tier:"T4", cat:"Armor"    },
  { id:"T5_ARMOR_PLATE_SET1",     name:"Plate Armor T5",    tier:"T5", cat:"Armor"    },
  { id:"T4_SHOES_PLATE_SET1",     name:"Knight Boots T4",   tier:"T4", cat:"Armor"    },
  { id:"T4_PLANKS",               name:"Planks T4",         tier:"T4", cat:"Resource" },
  { id:"T5_PLANKS",               name:"Planks T5",         tier:"T5", cat:"Resource" },
  { id:"T4_METALBAR",             name:"Metal Bar T4",      tier:"T4", cat:"Resource" },
  { id:"T5_METALBAR",             name:"Metal Bar T5",      tier:"T5", cat:"Resource" },
  { id:"T4_CLOTH",                name:"Cloth T4",          tier:"T4", cat:"Resource" },
  { id:"T5_CLOTH",                name:"Cloth T5",          tier:"T5", cat:"Resource" },
  { id:"T4_LEATHER",              name:"Leather T4",        tier:"T4", cat:"Resource" },
  { id:"T4_BAG",                  name:"Bag T4",            tier:"T4", cat:"Gear"     },
  { id:"T5_BAG",                  name:"Bag T5",            tier:"T5", cat:"Gear"     },
  { id:"CONSUMABLE_SANDWHICH_T5", name:"Beef Sandwich T5",  tier:"T5", cat:"Food"     },
  { id:"T4_POTION_HEAL",          name:"Healing Potion T4", tier:"T4", cat:"Food"     },
];

const CITIES = ["Caerleon","Bridgewatch","Fort Sterling","Lymhurst","Martlock","Thetford","Black Market"];

const BUILDS_DATA = [
  { tier:"META", name:"ZvZ Healer", role:"Healer", content:"ZvZ", rating:9.4, color:"#10b981",
    desc:"El healer más sólido para guerra de guilds. Alta curación AOE y soporte en línea.",
    gear:[
      { slot:"Arma",    id:"T5_MAIN_HOLYSTAFF",   name:"Holy Staff T5"     },
      { slot:"Casco",   id:"T5_HEAD_CLOTH_SET3",  name:"Scholar Cowl T5"   },
      { slot:"Pecho",   id:"T5_ARMOR_CLOTH_SET3", name:"Cleric Robe T5"    },
      { slot:"Botas",   id:"T5_SHOES_CLOTH_SET3", name:"Scholar Sandals T5"},
      { slot:"Offhand", id:"T5_OFF_BOOK",          name:"Tome of Spells T5" },
      { slot:"Capa",    id:"T5_CAPEITEM_FW_LYMHURST",name:"Lymhurst Cape"  },
    ]},
  { tier:"S", name:"Ganker 1vX", role:"DPS", content:"Ganking", rating:9.1, color:"#f97316",
    desc:"Máxima movilidad y burst para ganking en roads y zonas negras.",
    gear:[
      { slot:"Arma",    id:"T5_2H_DAGGERPAIR",    name:"Bloodletter T5"    },
      { slot:"Casco",   id:"T5_HEAD_LEATHER_SET3",name:"Stalker Hood T5"   },
      { slot:"Pecho",   id:"T5_ARMOR_LEATHER_SET3",name:"Assassin Jacket T5"},
      { slot:"Botas",   id:"T5_SHOES_LEATHER_SET3",name:"Stalker Boots T5" },
      { slot:"Offhand", id:"T5_OFF_HORN",          name:"Mistcaller T5"    },
      { slot:"Capa",    id:"T5_CAPEITEM_FW_BRECILIEN",name:"Brecilien Cape"},
    ]},
  { tier:"S", name:"Tank Frontline", role:"Tank", content:"ZvZ", rating:8.8, color:"#3b82f6",
    desc:"Tank de primera línea para ZvZ. Alta resistencia y control de masas.",
    gear:[
      { slot:"Arma",    id:"T5_2H_DUALSCYTHE_HELL",name:"Infernal Scythe T5"},
      { slot:"Casco",   id:"T5_HEAD_PLATE_SET1",  name:"Knight Helmet T5"  },
      { slot:"Pecho",   id:"T5_ARMOR_PLATE_SET1", name:"Plate Armor T5"    },
      { slot:"Botas",   id:"T5_SHOES_PLATE_SET1", name:"Knight Boots T5"   },
      { slot:"Offhand", id:"T5_OFF_SARCOPHAGUS",  name:"Sarcophagus T5"    },
      { slot:"Capa",    id:"T5_CAPEITEM_CAERLEON", name:"Caerleon Cape"    },
    ]},
  { tier:"A", name:"Mage HCE", role:"Mage", content:"HCE/PvE", rating:8.3, color:"#8b5cf6",
    desc:"Optimizado para HCE y PvE de alto nivel. Máxima fama por hora en dungeons.",
    gear:[
      { slot:"Arma",    id:"T5_MAIN_NATURESTAFF", name:"Nature Staff T5"   },
      { slot:"Casco",   id:"T5_HEAD_CLOTH_SET1",  name:"Mage Cowl T5"      },
      { slot:"Pecho",   id:"T5_ARMOR_CLOTH_SET3", name:"Cleric Robe T5"    },
      { slot:"Botas",   id:"T5_SHOES_CLOTH_SET1", name:"Mage Sandals T5"   },
      { slot:"Offhand", id:"T5_OFF_ORB",           name:"Muisak T5"        },
      { slot:"Capa",    id:"T5_CAPEITEM_FW_MARTLOCK",name:"Martlock Cape"  },
    ]},
  { tier:"A", name:"Frost Solo", role:"Mage", content:"Solo PvP", rating:8.1, color:"#60a5fa",
    desc:"Control total en 1v1. Congelamiento y burst para eliminar rivales solos.",
    gear:[
      { slot:"Arma",    id:"T5_MAIN_FROSTSTAFF",  name:"Frost Staff T5"    },
      { slot:"Casco",   id:"T5_HEAD_CLOTH_SET3",  name:"Scholar Cowl T5"   },
      { slot:"Pecho",   id:"T5_ARMOR_CLOTH_SET2", name:"Royal Robe T5"     },
      { slot:"Botas",   id:"T5_SHOES_CLOTH_SET1", name:"Mage Sandals T5"   },
      { slot:"Offhand", id:"T5_OFF_ORB",           name:"Muisak T5"        },
      { slot:"Capa",    id:"T5_CAPEITEM_FW_DEVON", name:"Devon Cape"       },
    ]},
  { tier:"B", name:"Gatherer Safe", role:"Gatherer", content:"Gathering", rating:7.5, color:"#c9a84c",
    desc:"Build económica para recolección segura. Buena huida y defensa pasiva.",
    gear:[
      { slot:"Arma",    id:"T4_2H_BOW",           name:"Bow T4"            },
      { slot:"Casco",   id:"T4_HEAD_GATHERER",    name:"Miner Cap T4"      },
      { slot:"Pecho",   id:"T4_ARMOR_GATHERER",   name:"Lumberjack Jacket T4"},
      { slot:"Botas",   id:"T4_SHOES_GATHERER",   name:"Miner Shoes T4"    },
      { slot:"Offhand", id:"T4_OFF_TORCH",         name:"Torch T4"         },
      { slot:"Capa",    id:"T4_CAPEITEM_FW_THETFORD",name:"Thetford Cape"  },
    ]},
];

const TIER_COLORS = { META:"#f59e0b", S:"#8b5cf6", A:"#3b82f6", B:"#c9a84c" };

// Falling items for background animation
const BG_ITEMS = [
  "T5_SWORD","T5_2H_DAGGERPAIR","T5_MAIN_HOLYSTAFF","T5_HEAD_PLATE_SET1",
  "T5_ARMOR_PLATE_SET1","T5_MAIN_CURSEDSTAFF","T5_OFF_SHIELD","T5_2H_BOW",
  "T5_MAIN_NATURESTAFF","T5_SHOES_PLATE_SET1",
];

function fmt(n){ if(!n||n===0)return "—"; if(n>=1e9)return (n/1e9).toFixed(2)+"B"; if(n>=1e6)return (n/1e6).toFixed(2)+"M"; if(n>=1e3)return (n/1e3).toFixed(1)+"K"; return String(n); }
function fmtS(n){ return n&&n>0?fmt(n)+" 🪙":"—"; }

// ── ITEM IMAGE COMPONENT ───────────────────────────────────────────────────
function ItemImg({ id, size=40, style={} }) {
  const [err, setErr] = useState(false);
  if (err) return (
    <div style={{ width:size,height:size,borderRadius:6,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.4,...style }}>⚔️</div>
  );
  return (
    <img
      src={IMG(id)}
      alt={id}
      width={size} height={size}
      onError={() => setErr(true)}
      style={{ borderRadius:6, objectFit:"contain", imageRendering:"pixelated", ...style }}
    />
  );
}

// ── ANIMATED FALLING WEAPONS BACKGROUND ───────────────────────────────────
function FallingWeapons() {
  const [items, setItems] = useState([]);
  const counterRef = useRef(0);

  useEffect(() => {
    function spawnItem() {
      const id = BG_ITEMS[counterRef.current % BG_ITEMS.length];
      counterRef.current++;
      const newItem = {
        key:      Date.now() + Math.random(),
        id,
        left:     5 + Math.random() * 90,    // % from left
        duration: 6 + Math.random() * 8,      // seconds to fall
        delay:    0,
        size:     36 + Math.random() * 32,    // px
        rotate:   -45 + Math.random() * 90,   // initial rotation degrees
        rotateEnd:-180 + Math.random() * 360, // end rotation
        opacity:  0.06 + Math.random() * 0.1,
      };
      setItems(prev => [...prev.slice(-12), newItem]); // max 12 at once
    }

    // Spawn first few immediately
    for (let i=0; i<4; i++) {
      setTimeout(spawnItem, i * 1200);
    }

    const interval = setInterval(spawnItem, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:1,overflow:"hidden" }}>
      {items.map(item => (
        <div key={item.key} style={{
          position:"absolute",
          left:`${item.left}%`,
          top:"-80px",
          animation:`fall${Math.round(item.duration)}s linear forwards`,
          animationDuration:`${item.duration}s`,
          animationName:"itemFall",
          opacity: item.opacity,
          transform:`rotate(${item.rotate}deg)`,
        }}>
          <img
            src={IMG(item.id)}
            width={item.size}
            height={item.size}
            alt=""
            style={{ imageRendering:"pixelated", objectFit:"contain", filter:"sepia(30%) hue-rotate(30deg) brightness(0.8)" }}
            onError={e => { e.target.style.display="none"; }}
          />
        </div>
      ))}
    </div>
  );
}

// ── MARKET SECTION ─────────────────────────────────────────────────────────
function MarketSection() {
  const [selItem,    setSelItem]    = useState(MARKET_ITEMS[4]);
  const [selCities,  setSelCities]  = useState(["Caerleon","Bridgewatch","Fort Sterling","Lymhurst"]);
  const [prices,     setPrices]     = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [lastUpd,    setLastUpd]    = useState(null);
  const [error,      setError]      = useState(null);
  const [filterCat,  setFilterCat]  = useState("All");
  const [search,     setSearch]     = useState("");
  const abortRef = useRef(null);
  const cats = ["All",...new Set(MARKET_ITEMS.map(i=>i.cat))];

  const fetchPrices = useCallback(async(item, cities) => {
    if (!cities.length) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    setLoading(true); setError(null);
    try {
      const url = `https://west.albion-online-data.com/api/v2/stats/prices/${item.id}?locations=${encodeURIComponent(cities.join(","))}&qualities=1`;
      const res  = await fetch(url, { signal: abortRef.current.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPrices(data.filter(p => p.sell_price_min > 0 || p.buy_price_max > 0));
      setLastUpd(new Date());
    } catch(e) {
      if (e.name==="AbortError") return;
      setError("Sin conexión con la API. Mostrando datos de ejemplo.");
      setPrices(cities.map(city=>({ city, sell_price_min:Math.floor(Math.random()*80000)+20000, buy_price_max:Math.floor(Math.random()*70000)+18000, sell_price_min_date:new Date().toISOString() })));
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchPrices(selItem, selCities); }, [selItem, selCities, fetchPrices]);

  const valid    = prices.filter(p=>p.sell_price_min>0||p.buy_price_max>0);
  const minSell  = valid.reduce((a,b)=>(!b.sell_price_min)?a:(!a||b.sell_price_min<a.sell_price_min?b:a),null);
  const maxBuy   = valid.reduce((a,b)=>(!b.buy_price_max)?a:(!a||b.buy_price_max>a.buy_price_max?b:a),null);
  const spread   = minSell&&maxBuy&&minSell.sell_price_min&&maxBuy.buy_price_max ? minSell.sell_price_min-maxBuy.buy_price_max : null;
  const margin   = spread&&minSell?.sell_price_min ? ((spread/minSell.sell_price_min)*100).toFixed(1) : null;
  const filtered = MARKET_ITEMS.filter(i=>(filterCat==="All"||i.cat===filterCat)&&i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section id="mercado" style={{padding:"70px 0",background:"linear-gradient(180deg,#0e0a06,#110d07 50%,#0e0a06)",position:"relative",zIndex:2}}>
      <div style={{maxWidth:1160,margin:"0 auto",padding:"0 24px"}}>
        <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.35),transparent)",marginBottom:48}}/>
        <div style={{marginBottom:32}}>
          <div style={{fontSize:9,letterSpacing:4,color:"rgba(201,168,76,.6)",fontFamily:"monospace",marginBottom:10}}>💰 HERRAMIENTA PRINCIPAL</div>
          <h2 style={{fontSize:"clamp(26px,4vw,40px)",color:"#c9a84c",fontWeight:700,letterSpacing:"-.5px",marginBottom:8,textShadow:"0 0 28px rgba(201,168,76,.3)"}}>Mercado en Vivo</h2>
          <p style={{fontSize:14,color:"rgba(255,255,255,.4)",lineHeight:1.65,maxWidth:520}}>Precios reales de la API oficial. Selecciona ítem y ciudades para comparar al instante.</p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:14,alignItems:"start"}}>
          {/* LEFT: item selector */}
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {/* Selected item preview */}
            <div style={{background:"rgba(12,8,4,.95)",border:"1px solid rgba(201,168,76,.25)",borderRadius:14,padding:16,display:"flex",alignItems:"center",gap:14}}>
              <ItemImg id={selItem.id} size={64} style={{background:"rgba(255,255,255,.05)",borderRadius:10,padding:4}}/>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"#c9a84c"}}>{selItem.name}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.3)",fontFamily:"monospace",marginTop:3,letterSpacing:1}}>{selItem.tier} · {selItem.cat.toUpperCase()}</div>
              </div>
            </div>

            {/* Search + filter */}
            <div style={{background:"rgba(12,8,4,.9)",border:"1px solid rgba(201,168,76,.15)",borderRadius:12,padding:14}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar ítem..."
                style={{width:"100%",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"7px 10px",color:"#e8dcc8",fontSize:12,outline:"none",fontFamily:"inherit",boxSizing:"border-box",marginBottom:8}}/>
              <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                {cats.map(c=>(
                  <button key={c} onClick={()=>setFilterCat(c)} style={{padding:"2px 8px",borderRadius:20,cursor:"pointer",fontSize:9,fontFamily:"monospace",letterSpacing:1,background:filterCat===c?"rgba(201,168,76,.22)":"rgba(255,255,255,.04)",border:`1px solid ${filterCat===c?"rgba(201,168,76,.45)":"rgba(255,255,255,.08)"}`,color:filterCat===c?"#c9a84c":"rgba(255,255,255,.3)",transition:"all .15s"}}>{c}</button>
                ))}
              </div>
              {/* Item list with images */}
              <div style={{display:"flex",flexDirection:"column",gap:3,maxHeight:280,overflowY:"auto"}}>
                {filtered.map(item=>(
                  <button key={item.id} onClick={()=>setSelItem(item)} style={{
                    padding:"6px 8px",borderRadius:8,cursor:"pointer",textAlign:"left",
                    background:selItem.id===item.id?"rgba(201,168,76,.15)":"rgba(255,255,255,.03)",
                    border:`1px solid ${selItem.id===item.id?"rgba(201,168,76,.4)":"rgba(255,255,255,.06)"}`,
                    color:selItem.id===item.id?"#c9a84c":"rgba(255,255,255,.55)",
                    fontSize:11,fontFamily:"inherit",transition:"all .15s",
                    display:"flex",alignItems:"center",gap:8,
                  }}>
                    <ItemImg id={item.id} size={28}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:11,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
                      <div style={{fontSize:8,opacity:.5,fontFamily:"monospace",marginTop:1}}>{item.tier}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* City buttons */}
            <div style={{background:"rgba(12,8,4,.9)",border:"1px solid rgba(201,168,76,.15)",borderRadius:12,padding:14}}>
              <div style={{fontSize:9,color:"rgba(201,168,76,.5)",fontFamily:"monospace",letterSpacing:2,marginBottom:10}}>CIUDADES</div>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                {CITIES.map(city=>{
                  const on=selCities.includes(city);
                  const cp=prices.find(p=>p.city===city);
                  return(
                    <button key={city} onClick={()=>setSelCities(p=>p.includes(city)?p.filter(c=>c!==city):[...p,city])} style={{padding:"7px 10px",borderRadius:8,cursor:"pointer",textAlign:"left",background:on?"rgba(201,168,76,.12)":"rgba(255,255,255,.03)",border:`1px solid ${on?"rgba(201,168,76,.35)":"rgba(255,255,255,.06)"}`,color:on?"#c9a84c":"rgba(255,255,255,.35)",fontSize:11,fontFamily:"inherit",transition:"all .15s",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div style={{width:5,height:5,borderRadius:"50%",background:on?"#c9a84c":"rgba(255,255,255,.15)",transition:"all .15s"}}/>
                        {city}
                      </div>
                      {on&&cp&&<span style={{fontSize:9,fontFamily:"monospace",color:"#22c55e"}}>{fmt(cp.sell_price_min)}</span>}
                    </button>
                  );
                })}
              </div>
              <button onClick={()=>fetchPrices(selItem,selCities)} style={{width:"100%",marginTop:10,padding:"8px",borderRadius:8,cursor:"pointer",background:"rgba(201,168,76,.18)",border:"1px solid rgba(201,168,76,.38)",color:"#c9a84c",fontSize:10,fontFamily:"monospace",letterSpacing:2,transition:"all .18s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,.28)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(201,168,76,.18)"}>
                {loading?"CARGANDO...":"↻ ACTUALIZAR"}
              </button>
            </div>
          </div>

          {/* RIGHT: prices */}
          <div>
            {/* Opportunity cards */}
            {(minSell||maxBuy)&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
                {[
                  {l:"Mejor Venta",v:fmtS(minSell?.sell_price_min),sub:minSell?.city,c:"#22c55e",icon:"📈"},
                  {l:"Mejor Compra",v:fmtS(maxBuy?.buy_price_max),sub:maxBuy?.city,c:"#f97316",icon:"📉"},
                  {l:"Margen Flip",v:spread>0?`${margin}%`:"Sin margen",sub:spread>0?"¡Oportunidad!":"—",c:spread>0?"#c9a84c":"rgba(255,255,255,.2)",icon:"💡"},
                ].map(s=>(
                  <div key={s.l} style={{background:"rgba(12,8,4,.9)",border:`1px solid ${s.c}30`,borderRadius:10,padding:"12px",textAlign:"center"}}>
                    <div style={{fontSize:18,marginBottom:4}}>{s.icon}</div>
                    <div style={{fontSize:15,fontWeight:700,color:s.c,fontFamily:"monospace"}}>{s.v}</div>
                    <div style={{fontSize:9,color:"rgba(255,255,255,.3)",fontFamily:"monospace",marginTop:3}}>{s.sub}</div>
                    <div style={{fontSize:7,color:"rgba(255,255,255,.18)",letterSpacing:1,marginTop:2,fontFamily:"monospace"}}>{s.l.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Table */}
            <div style={{background:"rgba(12,8,4,.95)",border:"1px solid rgba(201,168,76,.18)",borderRadius:14,overflow:"hidden"}}>
              <div style={{padding:"11px 16px",borderBottom:"1px solid rgba(201,168,76,.1)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <ItemImg id={selItem.id} size={24}/>
                  <span style={{fontSize:12,fontWeight:700,color:"#c9a84c"}}>{selItem.name}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  {loading
                    ? <div style={{width:5,height:5,borderRadius:"50%",background:"#f97316",boxShadow:"0 0 5px #f97316",animation:"pulse 1s infinite"}}/>
                    : <div style={{width:5,height:5,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 5px #22c55e"}}/>
                  }
                  <span style={{fontSize:9,color:"rgba(255,255,255,.3)",fontFamily:"monospace",letterSpacing:1}}>
                    {loading?"ACTUALIZANDO...":lastUpd?lastUpd.toLocaleTimeString():"—"}
                  </span>
                </div>
              </div>
              {error&&<div style={{padding:"8px 16px",fontSize:10,color:"#f97316",fontFamily:"monospace",background:"rgba(249,115,22,.06)",borderBottom:"1px solid rgba(249,115,22,.12)"}}>⚠ {error}</div>}
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead>
                    <tr style={{borderBottom:"1px solid rgba(255,255,255,.06)"}}>
                      {["Ciudad","Precio Venta","Precio Compra","Diferencia","Act.",""].map(h=>(
                        <th key={h} style={{padding:"9px 14px",textAlign:"left",fontSize:8,color:"rgba(201,168,76,.4)",letterSpacing:2,fontFamily:"monospace",whiteSpace:"nowrap"}}>{h.toUpperCase()}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading&&valid.length===0?(
                      <tr><td colSpan={6} style={{padding:32,textAlign:"center",color:"rgba(201,168,76,.4)",fontFamily:"monospace",fontSize:11,letterSpacing:2}}>CARGANDO PRECIOS DE LA API...</td></tr>
                    ):valid.length===0?(
                      <tr><td colSpan={6} style={{padding:32,textAlign:"center",color:"rgba(255,255,255,.2)",fontFamily:"monospace",fontSize:11}}>Sin datos. Selecciona más ciudades.</td></tr>
                    ):valid.map((p,i)=>{
                      const diff=(p.sell_price_min||0)-(p.buy_price_max||0);
                      const isBestSell=p.city===minSell?.city&&p.sell_price_min>0;
                      const isBestBuy=p.city===maxBuy?.city&&p.buy_price_max>0;
                      const isFlip=diff>0&&p.sell_price_min&&diff/p.sell_price_min>0.03;
                      return(
                        <tr key={i} style={{borderBottom:"1px solid rgba(255,255,255,.03)",transition:"background .15s",cursor:"default"}}
                          onMouseEnter={e=>e.currentTarget.style.background="rgba(201,168,76,.04)"}
                          onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                          <td style={{padding:"11px 14px"}}>
                            <div style={{display:"flex",alignItems:"center",gap:6}}>
                              <span style={{fontSize:13,color:"#e8dcc8",fontWeight:600}}>{p.city}</span>
                              {isBestSell&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:3,background:"rgba(34,197,94,.15)",color:"#22c55e",fontFamily:"monospace"}}>BEST</span>}
                              {isBestBuy&&<span style={{fontSize:7,padding:"1px 5px",borderRadius:3,background:"rgba(249,115,22,.15)",color:"#f97316",fontFamily:"monospace"}}>BUY</span>}
                            </div>
                          </td>
                          <td style={{padding:"11px 14px",color:"#22c55e",fontFamily:"monospace",fontSize:12}}>{fmtS(p.sell_price_min)}</td>
                          <td style={{padding:"11px 14px",color:"#f97316",fontFamily:"monospace",fontSize:12}}>{fmtS(p.buy_price_max)}</td>
                          <td style={{padding:"11px 14px",fontFamily:"monospace",fontSize:12,color:diff>0?"#c9a84c":"rgba(255,255,255,.2)"}}>{diff>0?fmtS(diff):"—"}</td>
                          <td style={{padding:"11px 14px",color:"rgba(255,255,255,.2)",fontFamily:"monospace",fontSize:10}}>
                            {p.sell_price_min_date?new Date(p.sell_price_min_date).toLocaleTimeString():"—"}
                          </td>
                          <td style={{padding:"11px 14px"}}>
                            {isFlip&&<span style={{fontSize:8,padding:"2px 7px",borderRadius:20,background:"rgba(34,197,94,.15)",border:"1px solid rgba(34,197,94,.3)",color:"#22c55e",fontFamily:"monospace",letterSpacing:1}}>✓ FLIP</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── BUILDS SECTION ─────────────────────────────────────────────────────────
function BuildsSection() {
  const [filter,   setFilter]   = useState("All");
  const [selected, setSelected] = useState(null);
  const roles = ["All","Healer","DPS","Tank","Mage","Gatherer"];
  const filtered = BUILDS_DATA.filter(b=>filter==="All"||b.role===filter);

  return (
    <section id="builds" style={{padding:"70px 0",background:"#0a0704",position:"relative",zIndex:2}}>
      <div style={{maxWidth:1160,margin:"0 auto",padding:"0 24px"}}>
        <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)",marginBottom:48}}/>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:28,flexWrap:"wrap",gap:14}}>
          <div>
            <div style={{fontSize:9,letterSpacing:4,color:"rgba(201,168,76,.6)",fontFamily:"monospace",marginBottom:10}}>🛡️ META ACTUAL</div>
            <h2 style={{fontSize:"clamp(24px,4vw,38px)",color:"#c9a84c",fontWeight:700,letterSpacing:"-.5px"}}>Builds META</h2>
          </div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {roles.map(r=>(
              <button key={r} onClick={()=>setFilter(r)} style={{padding:"5px 12px",borderRadius:20,cursor:"pointer",fontSize:10,fontFamily:"monospace",letterSpacing:1,background:filter===r?"rgba(201,168,76,.2)":"rgba(255,255,255,.04)",border:`1px solid ${filter===r?"rgba(201,168,76,.45)":"rgba(255,255,255,.08)"}`,color:filter===r?"#c9a84c":"rgba(255,255,255,.35)",transition:"all .15s"}}>{r}</button>
            ))}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:14}}>
          {filtered.map(b=>(
            <div key={b.name} onClick={()=>setSelected(selected?.name===b.name?null:b)} style={{
              background:"rgba(12,8,4,.92)",border:`1px solid ${selected?.name===b.name?b.color+"60":"rgba(201,168,76,.14)"}`,
              borderRadius:16,padding:18,cursor:"pointer",position:"relative",overflow:"hidden",
              transition:"all .22s",boxShadow:selected?.name===b.name?`0 0 28px ${b.color}18`:"none",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=b.color+"45";e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=selected?.name===b.name?b.color+"60":"rgba(201,168,76,.14)";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${b.color}70,transparent)`}}/>

              {/* Header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  {/* Main weapon image */}
                  <div style={{position:"relative"}}>
                    <ItemImg id={b.gear[0].id} size={52} style={{background:"rgba(255,255,255,.05)",borderRadius:10,padding:4,border:`1px solid ${b.color}40`}}/>
                    <div style={{position:"absolute",bottom:-4,right:-4,fontSize:8,padding:"1px 5px",borderRadius:4,background:`${TIER_COLORS[b.tier]}dd`,color:"#000",fontFamily:"monospace",fontWeight:700,letterSpacing:.5}}>{b.tier}</div>
                  </div>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:"white"}}>{b.name}</div>
                    <div style={{fontSize:9,color:"rgba(255,255,255,.35)",fontFamily:"monospace",letterSpacing:1,marginTop:2}}>{b.role} · {b.content}</div>
                    <div style={{display:"flex",alignItems:"center",gap:4,marginTop:4}}>
                      <span style={{fontSize:11,color:"#c9a84c",fontWeight:700}}>{b.rating}</span>
                      <div style={{flex:1,height:3,borderRadius:2,background:"rgba(255,255,255,.08)",width:60}}>
                        <div style={{height:"100%",borderRadius:2,width:`${b.rating/10*100}%`,background:`linear-gradient(90deg,${b.color}80,${b.color})`,boxShadow:`0 0 5px ${b.color}60`}}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p style={{fontSize:11,color:"rgba(255,255,255,.42)",lineHeight:1.65,marginBottom:12}}>{b.desc}</p>

              {/* Gear row — always visible */}
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
                {b.gear.map(g=>(
                  <div key={g.slot} title={`${g.slot}: ${g.name}`} style={{position:"relative",cursor:"help"}}>
                    <ItemImg id={g.id} size={34} style={{background:"rgba(255,255,255,.05)",borderRadius:7,padding:2,border:"1px solid rgba(255,255,255,.08)",transition:"all .15s"}}/>
                  </div>
                ))}
              </div>

              {/* Expanded gear detail */}
              {selected?.name===b.name&&(
                <div style={{marginTop:8,paddingTop:12,borderTop:"1px solid rgba(255,255,255,.06)"}}>
                  <div style={{fontSize:9,color:"rgba(201,168,76,.5)",fontFamily:"monospace",letterSpacing:2,marginBottom:10}}>EQUIPAMIENTO COMPLETO</div>
                  {b.gear.map(g=>(
                    <div key={g.slot} style={{display:"flex",gap:10,alignItems:"center",marginBottom:7}}>
                      <ItemImg id={g.id} size={32} style={{background:"rgba(255,255,255,.05)",borderRadius:7,padding:2,flexShrink:0}}/>
                      <div>
                        <div style={{fontSize:8,color:"rgba(255,255,255,.3)",fontFamily:"monospace",letterSpacing:1}}>{g.slot.toUpperCase()}</div>
                        <div style={{fontSize:11,color:"rgba(255,255,255,.75)"}}>{g.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{fontSize:9,color:"rgba(201,168,76,.4)",fontFamily:"monospace",letterSpacing:1,textAlign:"center",marginTop:4}}>
                {selected?.name===b.name?"▲ CERRAR":"▼ VER EQUIPO COMPLETO"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {label:"Mercado",id:"mercado"},
  {label:"Builds",id:"builds"},
  {label:"Tracker",id:"tracker"},
  {label:"Soporte",id:"soporte"},
];

const STATS = [
  {icon:"💰",value:"12K+",label:"Precios Live",glow:"#f97316",id:"mercado"},
  {icon:"🏆",value:"2,400+",label:"Jugadores",glow:"#c9a84c",id:"top"},
  {icon:"⚔️",value:"3.8M+",label:"Kills Tracked",glow:"#a855f7",id:"top"},
  {icon:"🛡️",value:"6",label:"Builds META",glow:"#10b981",id:"builds"},
  {icon:"🌐",value:"7",label:"Ciudades",glow:"#38bdf8",id:"mercado"},
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const fn=()=>setScrolled(window.scrollY>50);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const scrollTo=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMobileMenu(false);};

  return (
    <div style={{minHeight:"100vh",background:"#0e0a06",color:"#e8dcc8",overflowX:"hidden",position:"relative"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@300;400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'Crimson Text',Georgia,serif}
        h1,h2,h3{font-family:'Cinzel',Georgia,serif}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 22px rgba(201,168,76,.35)}50%{box-shadow:0 0 46px rgba(201,168,76,.7)}}
        @keyframes itemFall{
          0%  {transform:translateY(-80px) rotate(var(--rot-start,0deg));opacity:0}
          5%  {opacity:1}
          95% {opacity:0.8}
          100%{transform:translateY(110vh) rotate(var(--rot-end,360deg));opacity:0}
        }
        .a1{animation:fadeUp .6s ease-out .05s both}
        .a2{animation:fadeUp .6s ease-out .18s both}
        .a3{animation:fadeUp .6s ease-out .30s both}
        .a4{animation:fadeUp .6s ease-out .42s both}
        .a5{animation:fadeUp .6s ease-out .54s both}
        .btn-gold{transition:all .22s ease}
        .btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(201,168,76,.55)!important}
        .btn-ghost:hover{background:rgba(255,255,255,.12)!important;border-color:rgba(255,255,255,.3)!important}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(201,168,76,.3);border-radius:2px}
        @media(max-width:768px){
          .desktop-only{display:none!important}
          .stats-row{overflow-x:auto!important;flex-wrap:nowrap!important;padding-left:20px!important}
          .market-grid{grid-template-columns:1fr!important}
        }
        @media(min-width:769px){
          .mobile-only{display:none!important}
          .stats-row{flex-wrap:wrap!important;justify-content:center!important}
        }
      `}</style>

      {/* FALLING WEAPONS BACKGROUND */}
      <FallingWeapons/>

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:scrolled?"rgba(14,10,6,.97)":"rgba(14,10,6,.75)",backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",borderBottom:`1px solid ${scrolled?"rgba(201,168,76,.2)":"transparent"}`,padding:"0 32px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all .3s"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
          <div style={{width:34,height:34,borderRadius:8,background:"linear-gradient(135deg,rgba(139,92,246,.5),rgba(100,55,0,.7))",border:"1px solid rgba(201,168,76,.45)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:"0 0 14px rgba(139,92,246,.22)"}}>⚔️</div>
          <span style={{fontSize:18,fontWeight:700,color:"#c9a84c",fontFamily:"'Cinzel',serif",letterSpacing:".5px"}}>FameForge</span>
        </div>
        <div className="desktop-only" style={{display:"flex",gap:2,alignItems:"center"}}>
          {NAV_ITEMS.map(n=>(
            <button key={n.id} onClick={()=>scrollTo(n.id)} style={{background:"none",border:"none",color:"rgba(255,255,255,.5)",fontSize:13,cursor:"pointer",fontFamily:"'Crimson Text',serif",padding:"6px 14px",transition:"color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.color="#c9a84c"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.5)"}>
              {n.label}
            </button>
          ))}
          <div style={{width:1,height:18,background:"rgba(255,255,255,.12)",margin:"0 8px"}}/>
          <button className="btn-gold" onClick={()=>scrollTo("tracker")} style={{padding:"7px 18px",borderRadius:8,fontSize:13,fontWeight:600,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,.8)",color:"#0e0a06",cursor:"pointer",fontFamily:"'Cinzel',serif",boxShadow:"0 3px 14px rgba(201,168,76,.3)",letterSpacing:".3px"}}>
            Descargar
          </button>
        </div>
        <button className="mobile-only" onClick={()=>setMobileMenu(m=>!m)} style={{background:"none",border:"none",color:"#c9a84c",fontSize:22,cursor:"pointer",padding:4}}>
          {mobileMenu?"✕":"☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenu&&(
        <div className="mobile-only" style={{position:"fixed",top:60,left:0,right:0,zIndex:190,background:"rgba(14,10,6,.98)",backdropFilter:"blur(18px)",borderBottom:"1px solid rgba(201,168,76,.18)",padding:"16px 24px",display:"flex",flexDirection:"column",gap:2}}>
          {NAV_ITEMS.map(n=>(
            <button key={n.id} onClick={()=>scrollTo(n.id)} style={{padding:"11px 0",background:"none",border:"none",borderBottom:"1px solid rgba(255,255,255,.05)",color:"rgba(255,255,255,.65)",fontSize:15,cursor:"pointer",fontFamily:"'Crimson Text',serif",textAlign:"left"}}>{n.label}</button>
          ))}
          <button className="btn-gold" onClick={()=>scrollTo("tracker")} style={{marginTop:10,padding:"11px",borderRadius:8,fontSize:14,fontWeight:600,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,.8)",color:"#0e0a06",cursor:"pointer",fontFamily:"'Cinzel',serif"}}>Descargar Tracker</button>
        </div>
      )}

      {/* HERO */}
      <section style={{position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",overflow:"hidden",paddingTop:60,zIndex:2}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#1c0e30 0%,#301810 28%,#1a0f06 58%,#0e0a06 100%)"}}/>
        <div style={{position:"absolute",top:0,right:0,width:"70%",height:"65%",background:"radial-gradient(ellipse at 85% 15%,rgba(139,92,246,.28) 0%,transparent 58%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:"10%",left:0,width:"60%",height:"55%",background:"radial-gradient(ellipse at 20% 40%,rgba(201,168,76,.07) 0%,transparent 60%)",pointerEvents:"none"}}/>

        {/* Castle */}
        <svg style={{position:"absolute",bottom:0,left:0,right:0,width:"100%",height:"48%",opacity:.45}} viewBox="0 0 1400 420" preserveAspectRatio="xMidYMax slice">
          <path d="M0,420 L0,300 L60,300 L60,265 L78,265 L78,245 L98,245 L98,226 L118,226 L118,245 L138,245 L138,265 L158,265 L158,300 L230,300 L230,235 L248,235 L248,210 L268,188 L290,165 L310,142 L332,120 L352,142 L372,165 L392,188 L410,210 L410,235 L428,235 L428,300 L500,300 L500,260 L518,260 L518,238 L538,218 L558,196 L578,174 L598,152 L618,130 L638,108 L658,86 L678,65 L698,86 L718,108 L738,130 L758,152 L778,174 L798,196 L818,218 L838,238 L838,260 L856,260 L856,300 L920,300 L920,255 L938,255 L938,232 L958,210 L978,188 L998,210 L1018,232 L1018,255 L1036,255 L1036,300 L1100,300 L1100,270 L1118,270 L1118,255 L1138,255 L1138,242 L1158,242 L1158,255 L1178,255 L1178,270 L1198,270 L1198,300 L1260,300 L1260,285 L1278,285 L1278,272 L1298,272 L1298,285 L1320,285 L1320,300 L1400,300 L1400,420Z" fill="#150a1a"/>
          <rect x="675" y="73" width="12" height="17" rx="6" fill="rgba(139,92,246,.8)"/>
          <rect x="328" y="128" width="10" height="14" rx="5" fill="rgba(201,168,76,.55)"/>
          <rect x="978" y="198" width="9" height="13" rx="4.5" fill="rgba(139,92,246,.5)"/>
        </svg>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:220,background:"linear-gradient(0deg,rgba(14,10,6,1) 0%,rgba(14,10,6,.6) 55%,transparent 100%)",pointerEvents:"none"}}/>

        <div style={{position:"relative",zIndex:5,flex:1,maxWidth:1100,margin:"0 auto",width:"100%",padding:"60px 24px 0",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div className="a1" style={{fontSize:9,letterSpacing:5,color:"rgba(139,92,246,.9)",fontFamily:"'JetBrains Mono',monospace",marginBottom:18}}>
            ⚡ POWERED BY UMBRYON ARTIFICIAL INTELLIGENCE
          </div>
          <h1 className="a2" style={{fontSize:"clamp(34px,6vw,68px)",fontWeight:700,lineHeight:1.06,letterSpacing:"-1.5px",marginBottom:18,textShadow:"0 2px 40px rgba(201,168,76,.4)"}}>
            <span style={{color:"#c9a84c"}}>Optimiza tu farmeo</span><br/>
            <span style={{color:"white"}}>en Albion como un pro</span>
          </h1>
          <p className="a3" style={{fontSize:18,color:"rgba(255,255,255,.6)",lineHeight:1.7,marginBottom:36,maxWidth:560,fontFamily:"'Crimson Text',serif"}}>
            Precios de mercado en vivo con imágenes reales, tracker de fama, builds META con equipamiento visual y estadísticas de guild.
          </p>
          <div className="a4" style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button className="btn-gold" onClick={()=>scrollTo("tracker")} style={{padding:"14px 34px",borderRadius:8,fontSize:15,fontWeight:700,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,.88)",color:"#0e0a06",cursor:"pointer",fontFamily:"'Cinzel',serif",boxShadow:"0 4px 24px rgba(201,168,76,.42)",letterSpacing:".3px"}}>
              Descargar Tracker Gratis
            </button>
            <button className="btn-ghost" onClick={()=>scrollTo("mercado")} style={{padding:"14px 26px",borderRadius:8,fontSize:15,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.18)",color:"rgba(255,255,255,.75)",cursor:"pointer",fontFamily:"'Crimson Text',serif",backdropFilter:"blur(10px)",transition:"all .2s"}}>
              Ver Mercado →
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="a5 stats-row" style={{position:"relative",zIndex:5,padding:"0 20px 36px",display:"flex",gap:10,maxWidth:1100,margin:"0 auto",width:"100%"}}>
          {STATS.map((s,i)=>(
            <div key={i} onClick={()=>scrollTo(s.id)} style={{flexShrink:0,background:"rgba(14,10,5,.88)",border:"1px solid rgba(201,168,76,.24)",borderRadius:13,padding:"12px 18px",textAlign:"center",backdropFilter:"blur(14px)",boxShadow:`0 4px 20px rgba(0,0,0,.5),0 0 16px ${s.glow}14`,minWidth:100,cursor:"pointer",position:"relative",overflow:"hidden",transition:"all .22s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor="rgba(201,168,76,.55)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor="rgba(201,168,76,.24)";}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${s.glow}80,transparent)`}}/>
              <div style={{fontSize:20,marginBottom:5}}>{s.icon}</div>
              <div style={{fontSize:18,fontWeight:700,color:"#c9a84c",lineHeight:1,fontFamily:"'Cinzel',serif",textShadow:`0 0 14px ${s.glow}80`}}>{s.value}</div>
              <div style={{fontSize:8,color:"rgba(255,255,255,.4)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:1.5,marginTop:5}}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO */}
      <section style={{padding:"60px 0",background:"#0a0704",position:"relative",zIndex:2}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",textAlign:"center"}}>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)",marginBottom:44}}/>
          <div style={{fontSize:9,letterSpacing:4,color:"rgba(201,168,76,.6)",fontFamily:"'JetBrains Mono',monospace",marginBottom:10}}>🎮 ALBION ONLINE</div>
          <h2 style={{fontSize:"clamp(22px,4vw,36px)",color:"#c9a84c",fontWeight:700,marginBottom:24}}>El Mundo es Tuyo</h2>
          <div style={{position:"relative",paddingBottom:"50%",height:0,borderRadius:16,overflow:"hidden",border:"1px solid rgba(201,168,76,.2)",boxShadow:"0 16px 60px rgba(0,0,0,.7)",maxWidth:900,margin:"0 auto"}}>
            <iframe src="https://www.youtube.com/embed/bqUmFKvL7zU?autoplay=0&mute=1&rel=0&modestbranding=1" title="Albion Online" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
          </div>
        </div>
      </section>

      <MarketSection/>
      <BuildsSection/>

      {/* TRACKER */}
      <section id="tracker" style={{padding:"70px 0",background:"linear-gradient(180deg,#0e0a06,#110d07)",position:"relative",zIndex:2}}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px"}}>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)",marginBottom:48}}/>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{fontSize:9,letterSpacing:4,color:"rgba(201,168,76,.6)",fontFamily:"'JetBrains Mono',monospace",marginBottom:10}}>🖥️ EXTENSIÓN</div>
            <h2 style={{fontSize:"clamp(24px,4vw,38px)",color:"#c9a84c",fontWeight:700,marginBottom:10}}>Tracker de Escritorio</h2>
            <p style={{fontSize:15,color:"rgba(255,255,255,.4)",lineHeight:1.65,maxWidth:500,margin:"0 auto",fontFamily:"'Crimson Text',serif"}}>Lee tus logs de Albion automáticamente. Fama, plata y kills en tiempo real sin interrumpir tu juego.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div style={{background:"rgba(12,8,4,.9)",border:"1px solid rgba(201,168,76,.18)",borderRadius:14,padding:22}}>
              <div style={{fontSize:9,color:"rgba(201,168,76,.5)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:2,marginBottom:14}}>INSTALACIÓN</div>
              <div style={{background:"rgba(0,0,0,.5)",borderRadius:10,padding:"14px 16px",fontFamily:"'JetBrains Mono',monospace",fontSize:12,lineHeight:2,border:"1px solid rgba(255,255,255,.06)",marginBottom:14}}>
                <div style={{color:"rgba(139,92,246,.8)"}}><span style={{color:"rgba(255,255,255,.2)",marginRight:8}}>#</span>Instalar</div>
                <div style={{color:"rgba(201,168,76,.85)"}}>pip install requests colorama</div>
                <div style={{color:"rgba(139,92,246,.8)",marginTop:6}}><span style={{color:"rgba(255,255,255,.2)",marginRight:8}}>#</span>Ejecutar</div>
                <div style={{color:"rgba(201,168,76,.85)"}}>python albionforge.py --user TuNick</div>
                <div style={{color:"rgba(139,92,246,.8)",marginTop:6}}><span style={{color:"rgba(255,255,255,.2)",marginRight:8}}>#</span>Historial</div>
                <div style={{color:"rgba(201,168,76,.85)"}}>python albionforge.py --history</div>
              </div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.3)",lineHeight:1.7,fontFamily:"'Crimson Text',serif"}}>Compatible con <strong style={{color:"rgba(255,255,255,.5)"}}>Windows, macOS y Linux</strong>.</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {[{icon:"⚡",title:"Fama en tiempo real",desc:"Ve tu fama ganada y proyección por hora sin salir del juego."},{icon:"🪙",title:"Plata por sesión",desc:"Calcula exactamente cuánta plata ganaste en cada sesión."},{icon:"⚔️",title:"Contador de kills",desc:"Monstruos matados y eficiencia por zona de farmeo."},{icon:"💾",title:"Historial guardado",desc:"Cada sesión se guarda para comparar tu progreso."}].map(f=>(
                <div key={f.title} style={{background:"rgba(12,8,4,.85)",border:"1px solid rgba(201,168,76,.12)",borderRadius:10,padding:"12px 14px",display:"flex",gap:12,alignItems:"flex-start"}}>
                  <span style={{fontSize:18,flexShrink:0}}>{f.icon}</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:600,color:"#c9a84c",marginBottom:3,fontFamily:"'Cinzel',serif"}}>{f.title}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.38)",lineHeight:1.5,fontFamily:"'Crimson Text',serif"}}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{textAlign:"center",marginTop:28}}>
            <button className="btn-gold" style={{padding:"14px 40px",borderRadius:8,fontSize:15,fontWeight:700,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,.85)",color:"#0e0a06",cursor:"pointer",fontFamily:"'Cinzel',serif",boxShadow:"0 4px 24px rgba(201,168,76,.4)",animation:"glow 3s ease-in-out infinite",letterSpacing:".3px"}}>
              📥 Descargar albionforge.py
            </button>
            <p style={{marginTop:10,fontSize:11,color:"rgba(255,255,255,.2)",fontFamily:"'JetBrains Mono',monospace"}}>Python 3.8+ · Gratis y open source</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"70px 24px 80px",textAlign:"center",background:"linear-gradient(180deg,#0a0704,#130e07)",position:"relative",zIndex:2}}>
        <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)",marginBottom:52}}/>
        <h2 style={{fontSize:"clamp(24px,5vw,44px)",color:"#c9a84c",marginBottom:14,fontWeight:700,textShadow:"0 0 28px rgba(201,168,76,.35)",lineHeight:1.15}}>
          Comienza a dominar<br/>Albion hoy
        </h2>
        <p style={{fontSize:16,color:"rgba(255,255,255,.4)",marginBottom:32,lineHeight:1.7,fontFamily:"'Crimson Text',serif",maxWidth:460,margin:"0 auto 32px"}}>
          Más de 2,400 jugadores ya usan FameForge para optimizar su farmeo y dominar el mercado.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-gold" onClick={()=>scrollTo("tracker")} style={{padding:"15px 40px",borderRadius:8,fontSize:16,fontWeight:700,background:"linear-gradient(135deg,#c9a84c,#8b6914)",border:"1px solid rgba(201,168,76,.88)",color:"#0e0a06",cursor:"pointer",fontFamily:"'Cinzel',serif",boxShadow:"0 4px 28px rgba(201,168,76,.45)",animation:"glow 3s ease-in-out infinite",letterSpacing:".3px"}}>
            Descargar Gratis
          </button>
          <button className="btn-ghost" onClick={()=>scrollTo("mercado")} style={{padding:"15px 30px",borderRadius:8,fontSize:15,background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.18)",color:"rgba(255,255,255,.75)",cursor:"pointer",fontFamily:"'Crimson Text',serif",backdropFilter:"blur(10px)",transition:"all .2s"}}>
            Ver Mercado →
          </button>
        </div>
      </section>

      {/* SOPORTE */}
      <section id="soporte" style={{padding:"60px 0",background:"#0a0704",position:"relative",zIndex:2}}>
        <div style={{maxWidth:700,margin:"0 auto",padding:"0 24px",textAlign:"center"}}>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(201,168,76,.3),transparent)",marginBottom:44}}/>
          <div style={{fontSize:9,letterSpacing:4,color:"rgba(201,168,76,.6)",fontFamily:"'JetBrains Mono',monospace",marginBottom:10}}>💬 AYUDA</div>
          <h2 style={{fontSize:"clamp(22px,4vw,34px)",color:"#c9a84c",fontWeight:700,marginBottom:16}}>Soporte</h2>
          <p style={{fontSize:15,color:"rgba(255,255,255,.45)",lineHeight:1.7,marginBottom:28,fontFamily:"'Crimson Text',serif"}}>¿Problemas con el tracker? ¿Bug encontrado? Escríbenos y respondemos en menos de 24 horas.</p>
          <a href="mailto:admin@fameforge.online" style={{display:"inline-flex",alignItems:"center",gap:10,padding:"14px 28px",borderRadius:10,background:"rgba(201,168,76,.12)",border:"1px solid rgba(201,168,76,.35)",color:"#c9a84c",fontSize:16,textDecoration:"none",fontFamily:"'JetBrains Mono',monospace",letterSpacing:1,transition:"all .22s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(201,168,76,.22)";e.currentTarget.style.borderColor="rgba(201,168,76,.6)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(201,168,76,.12)";e.currentTarget.style.borderColor="rgba(201,168,76,.35)";}}>
            📧 admin@fameforge.online
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding:"28px 32px",borderTop:"1px solid rgba(255,255,255,.06)",background:"#080502",position:"relative",zIndex:2}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexWrap:"wrap",gap:16,justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18}}>⚔️</span>
            <span style={{fontSize:17,color:"#c9a84c",fontWeight:700,fontFamily:"'Cinzel',serif"}}>FameForge</span>
          </div>
          <div style={{fontSize:8,color:"rgba(255,255,255,.1)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:1.5,textAlign:"center",lineHeight:1.9}}>
            NOT AFFILIATED WITH SANDBOX INTERACTIVE GMBH<br/>FOR ENTERTAINMENT PURPOSES ONLY
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <a href="mailto:admin@fameforge.online" style={{fontSize:10,color:"rgba(255,255,255,.2)",fontFamily:"'JetBrains Mono',monospace",textDecoration:"none"}}>admin@fameforge.online</a>
            <div style={{width:1,height:12,background:"rgba(255,255,255,.1)"}}/>
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <div style={{width:15,height:15,borderRadius:4,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"white",fontWeight:700}}>U</div>
              <span style={{fontSize:8,color:"rgba(255,255,255,.2)",fontFamily:"'JetBrains Mono',monospace",letterSpacing:2}}>UMBRYON AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
