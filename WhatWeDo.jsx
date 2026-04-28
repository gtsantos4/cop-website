/* global React */

/* ============================================================
   WHAT WE DO — editorial stack
   Hero → Program 1 (canvas) → Program 2 (navy) → Program 3 (tan)
   → Approach tie-back → Final CTA band
   ============================================================ */

function WWDHero() {
  return (
    <section style={{background:'#07305B', color:'#fff', padding:'96px 48px 104px'}}>
      <div style={{maxWidth:1184, margin:'0 auto'}}>
        <div style={{width:64, height:3, background:'#D5A33A', margin:'0 0 22px'}}/>
        <div style={{fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,.65)', marginBottom:22}}>What We Do</div>
        <h1 style={{fontFamily:'Fraunces, serif', fontSize:88, fontWeight:700, color:'#fff', textTransform:'uppercase', letterSpacing:'-2px', lineHeight:1.02, margin:0, maxWidth:1000}}>
          Three programs.<br/>One family.
        </h1>
        <p style={{fontFamily:'Inter, sans-serif', fontSize:20, color:'rgba(255,255,255,.82)', lineHeight:1.55, margin:'32px 0 0', maxWidth:720}}>
          A cradle-to-career continuum for kids and the adults who raise them, because education is a social issue no school can solve alone.
        </p>
      </div>
    </section>
  );
}

/* ---- Shared building blocks ---- */

function SectionTag({ n, label, dark }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:14}}>
      <div style={{
        fontFamily:'Fraunces, serif', fontSize:22, fontWeight:700,
        color: dark ? '#D5A33A' : '#13539A', letterSpacing:'-0.4px'
      }}>{n}</div>
      <div style={{height:1, flex:'0 0 32px', background: dark ? 'rgba(255,255,255,.35)' : 'rgba(7,48,91,.25)'}}/>
      <div style={{fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color: dark ? 'rgba(255,255,255,.75)' : 'rgba(7,48,91,.70)'}}>
        {label}
      </div>
    </div>
  );
}

function StatCell({ value, label, color, dark }) {
  return (
    <div>
      <div style={{
        fontFamily:'Fraunces, serif', fontSize:56, fontWeight:700,
        color: color, letterSpacing:'-1.4px', lineHeight:1
      }}>{value}</div>
      <div style={{
        fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:500,
        color: dark ? 'rgba(255,255,255,.70)' : 'rgba(7,48,91,.70)',
        marginTop:10, lineHeight:1.4, maxWidth:160
      }}>{label}</div>
    </div>
  );
}

function Chip({ children, dark }) {
  return (
    <span style={{
      display:'inline-block', padding:'6px 14px', borderRadius:999,
      fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:500, letterSpacing:'0.4px',
      border: dark ? '1px solid rgba(255,255,255,.30)' : '1px solid rgba(7,48,91,.18)',
      color: dark ? 'rgba(255,255,255,.88)' : '#07305B',
      background: 'transparent'
    }}>{children}</span>
  );
}

function WWDButton({ variant, children, onClick }) {
  const base = {
    display:'inline-flex', alignItems:'center', gap:8,
    padding:'13px 22px', borderRadius:6, border:0,
    fontFamily:'Inter, sans-serif', fontSize:15, fontWeight:600, cursor:'pointer',
    transition:'all 200ms cubic-bezier(.2,.6,.2,1)'
  };
  const styles = {
    navy: { ...base, background:'#07305B', color:'#fff' },
    gold: { ...base, background:'#D5A33A', color:'#07305B' },
    outlineLight: { ...base, background:'transparent', color:'#07305B', border:'1px solid rgba(7,48,91,.30)' },
    outlineDark: { ...base, background:'transparent', color:'#fff', border:'1px solid rgba(255,255,255,.45)' },
  };
  return <button style={styles[variant]} onClick={onClick}>{children} <span style={{display:'inline-block'}}>→</span></button>;
}

/* ---- Program 1: Community Schools (canvas, photo left) ---- */

function ProgramOne() {
  const stats = [
    { v:'7',    l:'CCS school sites',            c:'#13539A' },
    { v:'75%',  l:'drop in absences (Spring→Fall 2025)', c:'#13539A' },
    { v:'40+',  l:'hours added instruction',     c:'#D5A33A' },
    { v:'4×/wk',l:'after-school tutoring',       c:'#D5A33A' },
  ];
  const pills = ['Coordinators','On-Site Tutoring','Food Pantries','Walking Bus','Resource Brokering'];
  return (
    <section style={{background:'#EEEEEC', padding:'112px 48px'}}>
      <div style={{maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'minmax(340px, 480px) 1fr', gap:72, alignItems:'center'}}>
        <div style={{position:'relative'}}>
          <div style={{
            aspectRatio:'4/5', borderRadius:16, overflow:'hidden',
            backgroundImage:"url('assets/wwd-community-schools.png')",
            backgroundSize:'cover', backgroundPosition:'center 30%',
            boxShadow:'0 1px 3px rgba(7,48,91,.06)'
          }}/>
        </div>
        <div>
          <SectionTag n="01" label="Program One"/>
          <h2 style={{fontFamily:'Fraunces, serif', fontSize:56, fontWeight:700, color:'#07305B', letterSpacing:'-1.2px', lineHeight:1.05, margin:'24px 0 16px', textTransform:'uppercase'}}>
            Community<br/>Schools
          </h2>
          <div style={{width:64, height:3, background:'#D5A33A', marginBottom:20}}/>
          <p style={{fontFamily:'Inter, sans-serif', fontSize:19, color:'rgba(7,48,91,.80)', lineHeight:1.55, margin:0, maxWidth:560}}>
            Community School Coordinators embedded at <strong style={{color:'#07305B'}}>seven Charlottesville school sites</strong>: ELC, Trailblazer, Tall Oaks, Summit, CMS, Lugo-McGinness, and CHS. After-school tutoring four days a week, on-site food pantries, and the Walking Bus that gets 25–30 kids to and from Trailblazer every day.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32, marginTop:40, paddingTop:32, borderTop:'1px solid rgba(7,48,91,.10)'}}>
            {stats.map(s => <StatCell key={s.l} value={s.v} label={s.l} color={s.c}/>)}
          </div>
          <div style={{display:'flex', gap:8, marginTop:32, flexWrap:'wrap'}}>
            {pills.map(p => <Chip key={p}>{p}</Chip>)}
          </div>
          <div style={{display:'flex', gap:12, marginTop:36, flexWrap:'wrap'}}>
            <WWDButton variant="navy">See how it works</WWDButton>
            <WWDButton variant="outlineLight">Meet our coordinators</WWDButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Program 2: Dreambuilders (navy, reversed) ---- */

function ProgramTwo() {
  const stats = [
    { v:'2 yr',  l:'commitment per family',     c:'#D5A33A' },
    { v:'$7K',   l:'in micro-financing',        c:'#D5A33A' },
    { v:'Weekly',l:'parent + family learning',  c:'#fff'    },
    { v:'NCFL',  l:'evidence-based model',      c:'#fff'    },
  ];
  const pills = ['Parent Time','P.A.C.T. Time','Micro-Financing','School Coordination'];
  return (
    <section style={{background:'#07305B', padding:'112px 48px', position:'relative'}}>
      <div style={{maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr minmax(340px, 480px)', gap:72, alignItems:'center'}}>
        <div>
          <SectionTag n="02" label="Program Two" dark/>
          <h2 style={{fontFamily:'Fraunces, serif', fontSize:56, fontWeight:700, color:'#fff', letterSpacing:'-1.2px', lineHeight:1.05, margin:'24px 0 16px', textTransform:'uppercase'}}>
            Dreambuilders
          </h2>
          <div style={{width:64, height:3, background:'#D5A33A', marginBottom:20}}/>
          <p style={{fontFamily:'Inter, sans-serif', fontSize:19, color:'rgba(255,255,255,.80)', lineHeight:1.55, margin:0, maxWidth:560}}>
            Dreambuilders is a <strong style={{color:'#fff'}}>two-year wraparound program</strong> for working Charlottesville families: parent classes, family learning time, embedded coaching, and up to $7,000 in micro-financing to invest in self-sufficiency.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32, marginTop:40, paddingTop:32, borderTop:'1px solid rgba(255,255,255,.15)'}}>
            {stats.map(s => <StatCell key={s.l} value={s.v} label={s.l} color={s.c} dark/>)}
          </div>
          <div style={{display:'flex', gap:8, marginTop:32, flexWrap:'wrap'}}>
            {pills.map(p => <Chip key={p} dark>{p}</Chip>)}
          </div>
          <div style={{display:'flex', gap:12, marginTop:36, flexWrap:'wrap'}}>
            <WWDButton variant="gold">Program Details</WWDButton>
            <WWDButton variant="outlineDark">Who qualifies</WWDButton>
          </div>
        </div>
        <div style={{position:'relative'}}>
          <div style={{
            aspectRatio:'4/5', borderRadius:16, overflow:'hidden',
            backgroundImage:"url('assets/wwd-dreambuilders.jpg')",
            backgroundSize:'auto 118%', backgroundPosition:'44% 38%'
          }}/>
        </div>
      </div>
    </section>
  );
}

/* ---- Program 3: Family Engagement (tan, photo right) ---- */

function ProgramThree() {
  const stats = [
    { v:'1:1',    l:'parent coaching',          c:'#13539A' },
    { v:'All',    l:'CoP families eligible',    c:'#13539A' },
    { v:'Ongoing',l:'intake, no cohorts',       c:'#D5A33A' },
    { v:'LIFT',   l:'integrated team model',    c:'#D5A33A' },
  ];
  const pills = ['Parenting Practices','School Advocacy','Academic Involvement','Community Support'];
  return (
    <section style={{background:'#E8DFD1', padding:'112px 48px'}}>
      <div style={{maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr minmax(340px, 480px)', gap:72, alignItems:'center'}}>
        <div>
          <SectionTag n="03" label="Program Three"/>
          <h2 style={{fontFamily:'Fraunces, serif', fontSize:56, fontWeight:700, color:'#07305B', letterSpacing:'-1.2px', lineHeight:1.05, margin:'24px 0 16px', textTransform:'uppercase'}}>
            Family Engagement<br/>&amp; Advocacy
          </h2>
          <div style={{width:64, height:3, background:'#D5A33A', marginBottom:20}}/>
          <p style={{fontFamily:'Inter, sans-serif', fontSize:19, color:'rgba(7,48,91,.80)', lineHeight:1.55, margin:0, maxWidth:560}}>
            The parent-facing arm of our model offers <strong style={{color:'#07305B'}}>parenting coaching, school advocacy, and connection to the wider Charlottesville safety net</strong>, because a child's trajectory tracks their parent's. Any CoP family can start a conversation, no application required.
          </p>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:32, marginTop:40, paddingTop:32, borderTop:'1px solid rgba(7,48,91,.15)'}}>
            {stats.map(s => <StatCell key={s.l} value={s.v} label={s.l} color={s.c}/>)}
          </div>
          <div style={{display:'flex', gap:8, marginTop:32, flexWrap:'wrap'}}>
            {pills.map(p => <Chip key={p}>{p}</Chip>)}
          </div>
          <div style={{display:'flex', gap:12, marginTop:36, flexWrap:'wrap'}}>
            <WWDButton variant="navy">What parent support looks like</WWDButton>
            <WWDButton variant="outlineLight">Start a conversation</WWDButton>
          </div>
        </div>
        <div style={{position:'relative'}}>
          <div style={{
            aspectRatio:'4/5', borderRadius:16, overflow:'hidden',
            backgroundImage:"url('assets/wwd-family-engagement.png')",
            backgroundSize:'cover', backgroundPosition:'center 20%',
            boxShadow:'0 1px 3px rgba(7,48,91,.06)'
          }}/>
        </div>
      </div>
    </section>
  );
}

/* ---- Approach tie-back (canvas, editorial band) ---- */

function ApproachTieback() {
  return (
    <section style={{background:'#EEEEEC', padding:'96px 48px', borderTop:'1px solid rgba(7,48,91,.10)'}}>
      <div style={{maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center'}}>
        <div>
          <div style={{fontFamily:'Inter, sans-serif', fontSize:12, fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(7,48,91,.60)'}}>
            Why three, why together
          </div>
          <div style={{width:64, height:3, background:'#D5A33A', margin:'18px 0 24px'}}/>
          <h2 style={{fontFamily:'Fraunces, serif', fontSize:44, fontWeight:700, color:'#07305B', letterSpacing:'-1px', lineHeight:1.1, margin:0}}>
            Dual-generation, by design.
          </h2>
          <p style={{fontFamily:'Inter, sans-serif', fontSize:18, color:'rgba(7,48,91,.80)', lineHeight:1.6, marginTop:20, maxWidth:540}}>
            We coach the child, support the parent, and connect the family to the "constellation of care" around them: housing, childcare, health, food. A single coordinator may touch all three programs for the same household in a single week.
          </p>
          <div style={{marginTop:32}}>
            <WWDButton variant="navy">Read our approach</WWDButton>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16}}>
          <ScaleCard scale="Child" program="Community Schools" n="01"/>
          <ScaleCard scale="Family" program="Dreambuilders" n="02"/>
          <ScaleCard scale="Community" program="Family Engagement" n="03"/>
        </div>
      </div>
    </section>
  );
}

function ScaleCard({ scale, program, n }) {
  return (
    <div style={{
      background:'#fff', borderRadius:8, padding:24,
      border:'1px solid rgba(7,48,91,.08)', boxShadow:'0 1px 3px rgba(7,48,91,.06)',
      display:'flex', flexDirection:'column'
    }}>
      <div style={{fontFamily:'Fraunces, serif', fontSize:14, fontWeight:600, color:'#D5A33A', letterSpacing:'0.4px'}}>{n}</div>
      <div style={{fontFamily:'Fraunces, serif', fontSize:28, fontWeight:700, color:'#07305B', letterSpacing:'-0.6px', marginTop:14}}>
        {scale}
      </div>
      <div style={{width:40, height:2, background:'#D5A33A', margin:'12px 0'}}/>
      <div style={{fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:500, color:'rgba(7,48,91,.70)', letterSpacing:'0.4px'}}>
        {program}
      </div>
    </div>
  );
}

/* ---- Final CTA band (navy full-bleed) ---- */

function WWDFinalCTA({ onCTA }) {
  return (
    <section style={{position:'relative', overflow:'hidden'}}>
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:"url('assets/wwd-cta.jpg')",
        backgroundSize:'cover', backgroundPosition:'center 40%'
      }}/>
      <div style={{position:'absolute', inset:0, background:'linear-gradient(90deg, rgba(7,48,91,.95) 0%, rgba(7,48,91,.85) 50%, rgba(7,48,91,.55) 100%)'}}/>
      <div style={{position:'relative', maxWidth:1280, margin:'0 auto', padding:'112px 48px'}}>
        <div style={{width:64, height:3, background:'#D5A33A', marginBottom:24}}/>
        <h2 style={{fontFamily:'Fraunces, serif', fontSize:56, fontWeight:700, color:'#fff', letterSpacing:'-1.2px', lineHeight:1.05, margin:0, textTransform:'uppercase', maxWidth:820}}>
          Move this work<br/>forward.
        </h2>
        <p style={{fontFamily:'Inter, sans-serif', fontSize:19, color:'rgba(255,255,255,.82)', lineHeight:1.55, marginTop:20, maxWidth:620}}>
          This is relationship work, not a transaction. It only happens when partners stay in for the long haul.
        </p>
        <div style={{display:'flex', gap:12, marginTop:36, flexWrap:'wrap'}}>
          <WWDButton variant="gold" onClick={()=>onCTA && onCTA('donate')}>Donate Now</WWDButton>
          <WWDButton variant="outlineDark" onClick={()=>onCTA && onCTA('partner')}>Partner with us</WWDButton>
        </div>
        <div style={{marginTop:32, paddingTop:20, borderTop:'1px solid rgba(255,255,255,.12)', maxWidth:620}}>
          <div style={{fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:500, letterSpacing:'1.2px', textTransform:'uppercase', color:'#D5A33A', marginBottom:8}}>
            NAP credits
          </div>
          <div style={{fontFamily:'Inter, sans-serif', fontSize:15, color:'rgba(255,255,255,.78)', lineHeight:1.55}}>
            Gifts of $500 or more qualify for a 65% Virginia state tax credit. CoP has used 100% of its allocation each year, so credits move fast.
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  WWDHero, ProgramOne, ProgramTwo, ProgramThree,
  ApproachTieback, WWDFinalCTA
});
