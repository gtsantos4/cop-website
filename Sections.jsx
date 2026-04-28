/* global React */

function UrgencySection() {
  return (
    <section style={{background:'#07305B', padding:'96px 48px'}}>
      <div style={{maxWidth:1280, margin:'0 auto'}}>
        <div style={{width:64, height:3, background:'#D5A33A', marginBottom:20}}/>
        <h2 style={{fontFamily:'Fraunces, serif', fontSize:48, fontWeight:700, color:'#fff', textTransform:'uppercase', letterSpacing:'-1px', lineHeight:1.1, margin:0}}>
          The gap is right here.
        </h2>
        <p style={{fontFamily:'Inter, sans-serif', fontSize:18, color:'rgba(255,255,255,.78)', maxWidth:720, marginTop:18, lineHeight:1.55}}>
          Charlottesville City Schools has the highest Black–white literacy pass-rate gap in Virginia.
        </p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1px 1fr 1px 1fr', gap:48, marginTop:64, alignItems:'start'}}>
          <Stat value="49" unit=" pp" label="reading gap, Black vs. white (highest in VA)" />
          <div style={{alignSelf:'stretch', width:1, background:'#D5A33A'}}/>
          <Stat value="40%" label="of Black CCS students passing English reading" />
          <div style={{alignSelf:'stretch', width:1, background:'#D5A33A'}}/>
          <Stat value="$18.5K" label="cost per pupil — 2nd highest in Virginia" />
        </div>
        <a href="#" style={{display:'inline-block', marginTop:48, fontFamily:'Inter, sans-serif', fontSize:15, fontWeight:500, color:'#D5A33A', textDecoration:'none'}}>See our full analysis →</a>
      </div>
    </section>
  );
}

function Stat({ value, unit = '', label, blue = false }) {
  return (
    <div>
      <div style={{fontFamily:'Fraunces, serif', fontSize:96, fontWeight:700, color: blue ? '#13539A' : '#D5A33A', letterSpacing:'-2px', lineHeight:1}}>
        {value}<span style={{fontSize:48}}>{unit}</span>
      </div>
      <div style={{fontFamily:'Inter, sans-serif', fontSize:14, color:'rgba(255,255,255,.8)', marginTop:12, maxWidth:220, lineHeight:1.45}}>{label}</div>
    </div>
  );
}

function Programs() {
  const cards = [
    { t:'Community Schools', b:'Community School Coordinators embedded at 7 Charlottesville school sites. After-school tutoring four days a week, on-site food pantries, and the Walking Bus.', g:'linear-gradient(135deg,#A8C8E8,#13539A)' },
    { t:'Dreambuilders', b:'A two-year wraparound program for working Charlottesville families. Parent classes, family learning, and up to $7,000 in micro-financing to invest in self-sufficiency.', g:'linear-gradient(135deg,#E8DFD1,#D5A33A)' },
    { t:'Family Engagement & Advocacy', b:'The parent-facing arm of our model. Parenting coaching, school advocacy, and connection to the wider Charlottesville safety net — because a child\'s trajectory tracks their parent\'s.', g:'linear-gradient(135deg,#E8DFD1,#07305B)' },
  ];
  return (
    <section style={{background:'#EEEEEC', padding:'96px 48px'}}>
      <div style={{maxWidth:1280, margin:'0 auto'}}>
        <div style={{width:64, height:3, background:'#D5A33A', marginBottom:20}}/>
        <h2 style={{fontFamily:'Fraunces, serif', fontSize:48, fontWeight:700, color:'#07305B', letterSpacing:'-1px', margin:0, lineHeight:1.1}}>
          Three programs. One family.
        </h2>
        <p style={{fontFamily:'Inter, sans-serif', fontSize:18, color:'rgba(7,48,91,.75)', maxWidth:720, marginTop:18, lineHeight:1.55}}>
          A cradle-to-career continuum that serves kids and the adults who raise them, because education is a social issue no school can solve alone.
        </p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginTop:56}}>
          {cards.map(c => (
            <div key={c.t} style={{background:'#fff', borderRadius:8, padding:24, border:'1px solid rgba(7,48,91,.08)', boxShadow:'0 1px 3px rgba(7,48,91,.06)'}}>
              <div style={{width:'100%', aspectRatio:'16/10', borderRadius:12, background:c.g, marginBottom:20, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'Inter, sans-serif', fontSize:11, fontWeight:600, letterSpacing:'1.2px', opacity:.9}}>PHOTO</div>
              <div style={{fontFamily:'Fraunces, serif', fontSize:24, fontWeight:600, color:'#07305B', letterSpacing:'-0.3px', marginBottom:10}}>{c.t}</div>
              <div style={{fontFamily:'Inter, sans-serif', fontSize:16, color:'rgba(7,48,91,.75)', lineHeight:1.55, marginBottom:16}}>{c.b}</div>
              <a href="#" style={{fontFamily:'Inter, sans-serif', fontSize:15, fontWeight:500, color:'#13539A', textDecoration:'none'}}>Learn more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ByTheNumbers() {
  const stats = [
    { n:'10+', l:'years serving Charlottesville', blue:true },
    { n:'3', l:'programs, one family' },
    { n:'$1.3M', l:'raised in FY2026', blue:true },
    { n:'11', l:'staff members (growing to 20–25)' },
  ];
  return (
    <section style={{background:'#EEEEEC', padding:'64px 48px 96px'}}>
      <div style={{maxWidth:1280, margin:'0 auto'}}>
        <div style={{width:64, height:3, background:'#D5A33A', marginBottom:20}}/>
        <h2 style={{fontFamily:'Fraunces, serif', fontSize:48, fontWeight:700, color:'#07305B', textTransform:'uppercase', letterSpacing:'-1px', margin:0}}>
          By the Numbers
        </h2>
        <p style={{fontFamily:'Inter, sans-serif', fontSize:18, color:'rgba(7,48,91,.75)', marginTop:18, lineHeight:1.55}}>
          What a decade of dual-generation work looks like.
        </p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32, marginTop:56}}>
          {stats.map(s => (
            <div key={s.l}>
              <div style={{width:56, height:56, borderRadius:999, background:'rgba(7,48,91,.06)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, color:'#07305B'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              </div>
              <div style={{fontFamily:'Fraunces, serif', fontSize:72, fontWeight:700, color: s.blue ? '#13539A' : '#D5A33A', letterSpacing:'-1.4px', lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:'Inter, sans-serif', fontSize:14, color:'#07305B', marginTop:10, maxWidth:180, lineHeight:1.4}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section style={{background:'#E8DFD1', padding:'96px 48px'}}>
      <div style={{maxWidth:1280, margin:'0 auto'}}>
        <div style={{width:64, height:3, background:'#D5A33A', marginBottom:20}}/>
        <h2 style={{fontFamily:'Fraunces, serif', fontSize:36, fontWeight:600, color:'#07305B', letterSpacing:'-0.6px', margin:0}}>In their own words.</h2>
        <div style={{display:'grid', gridTemplateColumns:'380px 1fr', gap:56, marginTop:48, alignItems:'center'}}>
          <div style={{aspectRatio:'4/5', borderRadius:16, backgroundImage:"url('assets/eddison.jpg')", backgroundSize:'cover', backgroundPosition:'center 30%'}}/>
          <div>
            <div style={{fontFamily:'Fraunces, serif', fontSize:160, color:'#D5A33A', lineHeight:0.6, fontWeight:700, marginBottom:-20}}>"</div>
            <div style={{color:'#07305B'}}>
              <p style={{margin:'0 0 18px', fontFamily:"'Caveat', cursive", fontSize:35, fontWeight:600, lineHeight:1.3}}>I am standing in front of you today as a first-generation college student.</p>
              <p style={{margin:'0 0 18px', fontFamily:"'Caveat', cursive", fontSize:35, fontWeight:600, lineHeight:1.3}}>College was not something I imagined. A year ago, I wouldn't have expected to be here today, standing here and telling my story.</p>
              <p style={{margin:0, fontFamily:"'Caveat', cursive", fontSize:35, fontWeight:600, lineHeight:1.3}}>I am thankful for the youth programs that have been in my life that have set me on the right path. It truly has taken a village to help raise me.</p>
            </div>
            <div style={{width:40, height:2, background:'#D5A33A', margin:'28px 0 12px'}}/>
            <div style={{fontFamily:'Fraunces, serif', fontStyle:'italic', fontSize:15, color:'rgba(7,48,91,.75)'}}>Eddison Duolo — Virginia State University, Men's Soccer Team</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreeWays({ onCTA }) {
  const ways = [
    { t:'Donate', b:'Ask about NAP tax credits — 65% Virginia state tax credit on gifts of $500 or more.', cta:'Give today', key:'donate' },
    { t:'Volunteer', b:'Tutoring, Walking Bus, family support — current open roles on the volunteer portal.', cta:'See opportunities', key:'volunteer' },
    { t:'Partner', b:'Schools, nonprofits, UVA researchers: we build the connective tissue together.', cta:'Start a conversation', key:'partner' },
  ];
  return (
    <section style={{background:'#07305B', padding:'96px 48px'}}>
      <div style={{maxWidth:1280, margin:'0 auto'}}>
        <div style={{width:64, height:3, background:'#D5A33A', marginBottom:20}}/>
        <h2 style={{fontFamily:'Fraunces, serif', fontSize:48, fontWeight:700, color:'#fff', textTransform:'uppercase', letterSpacing:'-1px', margin:0, lineHeight:1.1}}>
          There's no us without you.
        </h2>
        <p style={{fontFamily:'Inter, sans-serif', fontSize:18, color:'rgba(255,255,255,.78)', marginTop:18, maxWidth:720, lineHeight:1.55}}>
          Three ways to move the work forward. Pick yours.
        </p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginTop:56}}>
          {ways.map(w => (
            <div key={w.t} style={{border:'1px solid rgba(255,255,255,.15)', borderRadius:8, padding:28}}>
              <div style={{fontFamily:'Fraunces, serif', fontSize:28, fontWeight:600, color:'#fff', letterSpacing:'-0.4px', marginBottom:12}}>{w.t}</div>
              <div style={{fontFamily:'Inter, sans-serif', fontSize:15, color:'rgba(255,255,255,.78)', lineHeight:1.55, marginBottom:20, minHeight:88}}>{w.b}</div>
              <button onClick={()=>onCTA(w.key)} style={{background:'#D5A33A', color:'#07305B', fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:14, padding:'10px 18px', borderRadius:6, border:0, cursor:'pointer'}}>{w.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h:'What We Do', l:['Community Schools','Dreambuilders','Family Engagement & Advocacy'] },
    { h:'Who We Are', l:['Mission & Vision','Team','Board of Directors','Partners'] },
    { h:'Access Services', l:['Connect with Coordinator','Apply to Dreambuilders','Client Portal'] },
    { h:'Get Involved', l:['Donate','Volunteer','Partner with Us','Events'] },
  ];
  return (
    <footer style={{background:'#07305B', padding:'64px 48px 32px', color:'#fff'}}>
      <div style={{maxWidth:1280, margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns:'1.2fr repeat(4,1fr)', gap:40}}>
          <div>
            <img src="assets/favicon.png" style={{width:48, height:48, borderRadius:8}}/>
            <div style={{fontFamily:'Fraunces, serif', fontWeight:700, fontSize:20, marginTop:14}}>City of Promise</div>
            <div style={{fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:600, letterSpacing:'1.4px', opacity:.6, marginTop:4}}>CHARLOTTESVILLE</div>
            <div style={{fontFamily:'Inter, sans-serif', fontSize:13, opacity:.7, marginTop:20, lineHeight:1.6}}>
              708 Page Street<br/>134 10th Street (satellite)<br/>Charlottesville, VA
            </div>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <div style={{fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:600, letterSpacing:'1.2px', textTransform:'uppercase', color:'#D5A33A', marginBottom:14}}>{c.h}</div>
              {c.l.map(i => (
                <div key={i} style={{fontFamily:'Inter, sans-serif', fontSize:14, color:'rgba(255,255,255,.78)', marginBottom:8, cursor:'pointer'}}>{i}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{marginTop:48, paddingTop:24, borderTop:'1px solid rgba(255,255,255,.12)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{fontFamily:'Inter, sans-serif', fontSize:12, color:'rgba(255,255,255,.55)'}}>501(c)(3) · EIN 83-1439722 · © 2026 City of Promise</div>
          <div style={{fontFamily:'Inter, sans-serif', fontSize:12, color:'#D5A33A', fontWeight:500}}>Ask about NAP tax credits on qualified gifts</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { UrgencySection, Programs, ByTheNumbers, Story, ThreeWays, Footer });
