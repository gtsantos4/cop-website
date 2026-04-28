/* global React */
const { useState } = React;

function Header({ active = 'Who We Are', onNav = () => {} }) {
  const items = ['What We Do','Our Approach','Who We Are','Access Services','Get Involved','Impact','Insights'];
  return (
    <header style={hdr.bar}>
      <div style={hdr.left}>
        <img src="assets/logo-horizontal.png" alt="City of Promise" style={hdr.logo}/>
      </div>
      <nav style={hdr.nav}>
        {items.map(i => (
          <a key={i} href="#" onClick={e=>{e.preventDefault(); onNav(i);}}
             style={{...hdr.link, borderBottomColor: i===active ? '#D5A33A' : 'transparent'}}>{i}</a>
        ))}
      </nav>
      <button style={hdr.cta} onClick={()=>onNav('Donate')}>Donate Now</button>
    </header>
  );
}

const hdr = {
  bar: { position:'sticky', top:0, zIndex:10, background:'#fff', borderBottom:'1px solid rgba(7,48,91,.08)',
         display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 48px' },
  left: { display:'flex', alignItems:'center', gap:12 },
  logo: { height:48, width:'auto', display:'block' },
  nav: { display:'flex', gap:28 },
  link: { fontFamily:'Inter, sans-serif', fontSize:14, fontWeight:500, color:'#07305B', textDecoration:'none',
          padding:'4px 0', borderBottom:'2px solid transparent', cursor:'pointer', transition:'border-color 200ms' },
  cta: { background:'#D5A33A', color:'#07305B', fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:14,
         padding:'10px 20px', borderRadius:6, border:0, cursor:'pointer', transition:'all 200ms' }
};

function Hero({ onCTA }) {
  return (
    <section style={{position:'relative', height:780, overflow:'hidden'}}>
      <div style={{
        position:'absolute', inset:0, background:'#07305B',
        backgroundImage:"url('assets/hero.jpg')",
        backgroundSize:'auto 180%',
        backgroundPosition:'8% 68%',
        backgroundRepeat:'no-repeat'
      }}/>
      {/* Warm-white overlay — dense on the left for text legibility, fades to clear on the right */}
      <div style={{position:'absolute', inset:0, background:'linear-gradient(90deg, rgba(238,238,236,.78) 0%, rgba(238,238,236,.65) 22%, rgba(238,238,236,.25) 38%, rgba(238,238,236,0) 52%)'}}/>
      <div style={{position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 48px', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <div style={{maxWidth:560}}>
          <div style={{width:64, height:3, background:'#D5A33A', marginBottom:20}}/>
          <h1 style={{fontFamily:'Fraunces, serif', fontSize:64, fontWeight:700, color:'#07305B', textTransform:'uppercase', letterSpacing:'-1.6px', lineHeight:1.05, margin:0}}>
            Every kid deserves to learn to read.
          </h1>
          <p style={{fontFamily:'Inter, sans-serif', fontSize:18, color:'rgba(7,48,91,.85)', lineHeight:1.55, marginTop:24}}>
            Charlottesville's hub for dual-generation early intervention. We equip children and families with the support, coaching, and whole-family tools they need — because education is a social issue no school can solve alone.
          </p>
          <div style={{display:'flex', gap:12, marginTop:32, marginBottom:24}}>
            <button onClick={()=>onCTA('donate')} style={btn.gold}>Donate Now</button>
            <button onClick={()=>onCTA('services')} style={btn.outlineOnLight}>Access Services</button>
          </div>
        </div>
      </div>
    </section>
  );
}

const btn = {
  gold: { background:'#D5A33A', color:'#07305B', fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:16,
          padding:'14px 24px', borderRadius:6, border:0, cursor:'pointer' },
  navy: { background:'#07305B', color:'#fff', fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:16,
          padding:'14px 24px', borderRadius:6, border:0, cursor:'pointer' },
  outlineOnDark: { background:'transparent', color:'#fff', fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:16,
          padding:'14px 24px', borderRadius:6, border:'1px solid #fff', cursor:'pointer' },
  outlineOnLight: { background:'transparent', color:'#07305B', fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:16,
          padding:'14px 24px', borderRadius:6, border:'1px solid #07305B', cursor:'pointer' }
};

Object.assign(window, { Header, Hero, btn });
