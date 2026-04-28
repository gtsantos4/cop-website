/* global React */

/* ============================================================
   LOW-FI WIREFRAME PRIMITIVES
   Sketchy, hand-drawn vibe. B&W + one accent.
   ============================================================ */

const INK = '#1a1a1a';
const PAPER = '#fafaf7';
const MUTE = '#8a8a85';
const ACCENT = '#D5A33A';
const NAVY_SKETCH = '#07305B';

const sketchFont = "'Caveat', 'Patrick Hand', cursive";
const labelFont = "'Architects Daughter', 'Caveat', cursive";
const kickerFont = "'Architects Daughter', monospace";

// Squiggly text placeholder bar
function Bar({ w = '100%', h = 8, dark = false, style = {} }) {
  return (
    <div style={{
      width: w, height: h,
      background: dark ? INK : MUTE,
      opacity: dark ? 0.85 : 0.35,
      borderRadius: 2,
      ...style
    }} />
  );
}

function TextBlock({ lines = 3, width = '100%', dark = false, style = {} }) {
  const widths = ['100%', '95%', '88%', '92%', '70%', '98%', '80%'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Bar key={i} w={widths[i % widths.length]} h={6} dark={dark} />
      ))}
    </div>
  );
}

function Heading({ children, size = 28, dark = true, style = {} }) {
  return (
    <div style={{
      fontFamily: sketchFont,
      fontSize: size,
      fontWeight: 700,
      color: dark ? INK : PAPER,
      lineHeight: 1.05,
      letterSpacing: '-0.5px',
      ...style
    }}>{children}</div>
  );
}

function Kicker({ children, dark = true }) {
  return (
    <div style={{
      fontFamily: kickerFont,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      color: dark ? MUTE : 'rgba(255,255,255,.55)',
      marginBottom: 10
    }}>{children}</div>
  );
}

function Label({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: labelFont,
      fontSize: 12,
      color: MUTE,
      letterSpacing: '0.5px',
      ...style
    }}>{children}</div>
  );
}

function GoldRule({ w = 48, dark = true }) {
  return <div style={{ width: w, height: 3, background: dark ? INK : PAPER, marginBottom: 14 }} />;
}

// A sketchy box with a dashed border (denotes "placeholder")
function Sketchbox({ children, style = {}, filled = false, dashed = true, dark = false }) {
  return (
    <div style={{
      border: `1.5px ${dashed ? 'dashed' : 'solid'} ${dark ? PAPER : INK}`,
      borderRadius: 6,
      background: filled ? (dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.04)') : 'transparent',
      padding: 16,
      position: 'relative',
      ...style
    }}>{children}</div>
  );
}

// Corner annotation tag
function Annot({ children, pos = 'top-right', color = ACCENT }) {
  const map = {
    'top-right': { top: -10, right: -6 },
    'top-left':  { top: -10, left: -6 },
    'bottom-right': { bottom: -10, right: -6 },
    'bottom-left':  { bottom: -10, left: -6 },
  };
  return (
    <div style={{
      position: 'absolute',
      ...map[pos],
      background: color,
      color: INK,
      fontFamily: labelFont,
      fontSize: 11,
      fontWeight: 700,
      padding: '3px 8px',
      borderRadius: 12,
      letterSpacing: '0.3px',
      transform: 'rotate(-2deg)',
      zIndex: 2,
    }}>{children}</div>
  );
}

// Image placeholder with wavy "PHOTO" diagonals
function PhotoBox({ label = 'PHOTO', style = {}, dark = false, aspect }) {
  return (
    <div style={{
      background: `repeating-linear-gradient(45deg, ${dark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.04)'} 0 10px, ${dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.07)'} 10px 20px)`,
      border: `1.5px dashed ${dark ? 'rgba(255,255,255,.45)' : INK}`,
      borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: labelFont, fontSize: 12, letterSpacing: '2px',
      color: dark ? 'rgba(255,255,255,.7)' : MUTE,
      aspectRatio: aspect,
      ...style,
    }}>{label}</div>
  );
}

// Circular photo placeholder
function PhotoCircle({ size = 64, dark = false, style = {} }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `repeating-linear-gradient(45deg, ${dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.06)'} 0 8px, ${dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.09)'} 8px 16px)`,
      border: `1.5px dashed ${dark ? 'rgba(255,255,255,.45)' : INK}`,
      ...style,
    }} />
  );
}

// A rough button
function BtnSketch({ children, primary = false, dark = false, style = {} }) {
  return (
    <div style={{
      display: 'inline-block',
      padding: '10px 18px',
      border: `1.5px solid ${dark ? PAPER : INK}`,
      borderRadius: 6,
      background: primary ? (dark ? PAPER : INK) : 'transparent',
      color: primary ? (dark ? INK : PAPER) : (dark ? PAPER : INK),
      fontFamily: labelFont,
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '0.5px',
      ...style,
    }}>{children}</div>
  );
}

// Arrow link
function ArrowLink({ children, dark = false }) {
  return (
    <span style={{
      fontFamily: labelFont, fontSize: 13, fontWeight: 700,
      color: dark ? PAPER : INK, letterSpacing: '0.3px',
      borderBottom: `1.5px solid ${ACCENT}`, paddingBottom: 2,
    }}>{children} →</span>
  );
}

// Margin note — sticky-note-like comment off to the side
function MarginNote({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: sketchFont,
      fontSize: 16,
      color: NAVY_SKETCH,
      lineHeight: 1.25,
      padding: '8px 10px',
      background: '#fff8dc',
      border: `1px dashed ${ACCENT}`,
      borderRadius: 4,
      transform: 'rotate(-1deg)',
      ...style,
    }}>{children}</div>
  );
}


/* ============================================================
   SHARED: HEADER NAV + FOOTER SKETCH
   ============================================================ */

function HeaderSketch({ dark = false }) {
  const nav = ['What We Do', 'Our Approach', 'Who We Are', 'Access Services', 'Get Involved', 'Published Work', 'Contact'];
  return (
    <div style={{
      padding: '18px 48px',
      borderBottom: `1.5px solid ${dark ? 'rgba(255,255,255,.2)' : INK}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: dark ? NAVY_SKETCH : 'transparent',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 6,
          border: `1.5px solid ${dark ? PAPER : INK}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: sketchFont, fontSize: 20, color: dark ? PAPER : INK,
        }}>♥</div>
        <div style={{ fontFamily: sketchFont, fontSize: 20, fontWeight: 700, color: dark ? PAPER : INK }}>
          City of Promise
        </div>
      </div>
      <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
        {nav.map(n => (
          <span key={n} style={{
            fontFamily: labelFont, fontSize: 13,
            color: n === 'Who We Are' ? ACCENT : (dark ? 'rgba(255,255,255,.7)' : MUTE),
            fontWeight: n === 'Who We Are' ? 700 : 400,
            borderBottom: n === 'Who We Are' ? `2px solid ${ACCENT}` : 'none',
            paddingBottom: 2,
          }}>{n}</span>
        ))}
        <BtnSketch primary dark={dark}>Donate</BtnSketch>
      </div>
    </div>
  );
}

function FooterSketch() {
  return (
    <div style={{
      padding: '40px 48px 28px',
      background: NAVY_SKETCH,
      borderTop: `3px solid ${ACCENT}`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr repeat(4, 1fr)', gap: 32 }}>
        <div>
          <div style={{ fontFamily: sketchFont, fontSize: 18, color: PAPER, fontWeight: 700 }}>♥ City of Promise</div>
          <Label style={{ color: 'rgba(255,255,255,.5)', marginTop: 8 }}>CHARLOTTESVILLE</Label>
          <TextBlock lines={3} width="80%" style={{ marginTop: 14 }} />
        </div>
        {['What We Do', 'Who We Are', 'Access Services', 'Get Involved'].map(h => (
          <div key={h}>
            <Label style={{ color: ACCENT, marginBottom: 10 }}>{h.toUpperCase()}</Label>
            <TextBlock lines={4} />
          </div>
        ))}
      </div>
    </div>
  );
}


/* ============================================================
   SHARED SECTIONS — same content beats, different stacks.
   Each option composes these differently.
   ============================================================ */

// Breadcrumb / page-title sub-header
function SubNav({ sections }) {
  return (
    <div style={{
      padding: '16px 48px',
      background: PAPER,
      borderBottom: `1px solid rgba(0,0,0,.1)`,
      display: 'flex', gap: 28, alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 1,
    }}>
      <Label style={{ color: MUTE }}>On this page →</Label>
      {sections.map((s, i) => (
        <span key={s} style={{
          fontFamily: labelFont, fontSize: 13,
          color: i === 0 ? INK : MUTE,
          fontWeight: i === 0 ? 700 : 400,
          borderBottom: i === 0 ? `2px solid ${ACCENT}` : 'none',
          paddingBottom: 2,
        }}>{s}</span>
      ))}
    </div>
  );
}


/* ------------------------------------------------------------
   OPTION A — "Classic editorial stack"
   Hero → Team grid → Board grid → History timeline →
   Partners logo wall → CTA
   Treatment: Long scroll, strong vertical rhythm.
   History moved AFTER the Board section per user direction.
------------------------------------------------------------ */

function OptionA() {
  const W = 1280;
  return (
    <div style={{ width: W, background: PAPER, color: INK, fontFamily: labelFont }}>
      <HeaderSketch />
      <SubNav sections={['Team', 'Board', 'History', 'Partners']} />

      {/* HERO — full-bleed navy block */}
      <div style={{ background: NAVY_SKETCH, padding: '72px 48px', position: 'relative' }}>
        <GoldRule dark={false} />
        <Kicker dark={false}>WHO WE ARE</Kicker>
        <Heading dark={false} size={64} style={{ maxWidth: 900 }}>
          Ten people. Seven schools.<br />
          One Charlottesville.
        </Heading>
        <div style={{ marginTop: 20, maxWidth: 720, fontFamily: sketchFont, fontSize: 20, color: 'rgba(255,255,255,.8)', lineHeight: 1.4 }}>
          Charlottesville has one of Virginia's largest 3rd-grade literacy gaps. 37% of Black students read on grade level, compared to 94% of their White peers. We're built to close it: dual-generation, place-based, anchored in Westhaven and 10th and Page.
        </div>
        <Annot pos="top-right" color={ACCENT}>NAVY HERO • 72px pad</Annot>
      </div>

      {/* TEAM — full grid, 12 people */}
      <div style={{ padding: '80px 48px', background: '#E8DFD1' }}>
        <div style={{ maxWidth: 1184, margin: '0 auto' }}>
          <GoldRule />
          <Kicker>TEAM</Kicker>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, gap: 32 }}>
            <Heading size={40}>Our team.</Heading>
            <Label style={{ maxWidth: 520, textAlign: 'right', lineHeight: 1.5 }}>Ten staff. Seven embedded as Community School Coordinators inside Trailblazer, Tall Oaks, Summit, and four other CCS elementaries. The rest run 708 Page Street.</Label>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>
                <PhotoBox aspect="1 / 1" label="PHOTO" />
                <div style={{ marginTop: 14, fontFamily: sketchFont, fontSize: 20, fontWeight: 700, color: INK }}>[Name]</div>
                <Label style={{ fontStyle: 'italic', marginTop: 2 }}>[Title / role]</Label>
                <div style={{ marginTop: 8 }}>
                  <TextBlock lines={2} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOARD — tighter grid, no photos */}
      <div style={{ padding: '80px 48px', background: PAPER }}>
        <div style={{ maxWidth: 1184, margin: '0 auto' }}>
          <GoldRule />
          <Kicker>BOARD</Kicker>
          <Heading size={40}>Board of Directors.</Heading>
          <div style={{ marginTop: 12, maxWidth: 720, fontFamily: sketchFont, fontSize: 19, color: MUTE, lineHeight: 1.4 }}>
            Twelve directors. They set strategy, raise money, and keep us accountable to the families we work with.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <Sketchbox key={i} style={{ padding: 20 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <PhotoCircle size={48} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: sketchFont, fontSize: 18, fontWeight: 700 }}>[Name]</div>
                    <Label style={{ fontStyle: 'italic' }}>[Role · Affiliation]</Label>
                  </div>
                </div>
              </Sketchbox>
            ))}
          </div>
        </div>
      </div>

      {/* HISTORY — two-column narrative + side timeline — moved after Board */}
      <div style={{ padding: '80px 48px', background: '#E8DFD1', position: 'relative' }}>
        <div style={{ maxWidth: 1184, margin: '0 auto' }}>
          <GoldRule />
          <Kicker>HISTORY</Kicker>
          <Heading size={40}>Our history.</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56, marginTop: 36 }}>
            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: 24 }}>
              <div style={{ position: 'absolute', left: 6, top: 8, bottom: 8, width: 2, background: MUTE, opacity: .4 }} />
              {['2013 · Founded in Westhaven', '2016 · First Pathway coaches', '2019 · Dreambuilders launched', '2022 · Embedded in 7 school sites', '2026 · $1.3M raised'].map((y, i) => (
                <div key={y} style={{ display: 'flex', gap: 14, marginBottom: 22, alignItems: 'flex-start' }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: ACCENT, marginLeft: -21, marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: sketchFont, fontSize: 18, color: INK, fontWeight: 700 }}>{y}</div>
                    <TextBlock lines={2} width={220} style={{ marginTop: 6 }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Narrative */}
            <div style={{ fontFamily: sketchFont, fontSize: 19, color: INK, lineHeight: 1.55 }}>
              <p style={{ margin: 0 }}>
                City of Promise was founded in 2013 in Westhaven and 10th and Page. The premise was simple: no school closes the literacy gap alone. We started with a handful of coaches working out of borrowed rooms. Thirteen years later, we're still on the same block, at 708 Page Street, with seven Community School Coordinators embedded inside Trailblazer, Tall Oaks, Summit, and four other Charlottesville City Schools.
              </p>
              <p style={{ margin: '20px 0 0 0' }}>
                Dreambuilders, our two-year wraparound program for parents and their children, came online in 2019. Family Empowerment Coaches followed. We grew because the model worked. In FY26, average absences among CoP students dropped 75% between Spring and Fall 2025, we raised $1.3M, and we convened the Pathways to Family Success coalition. It's working.
              </p>
              <div style={{ marginTop: 24 }}><ArrowLink>Read our founding story</ArrowLink></div>
            </div>
          </div>
        </div>
        <MarginNote style={{ position: 'absolute', right: 24, top: 120, maxWidth: 180 }}>
          history lands after team and board. reads as the proof of the people above.
        </MarginNote>
      </div>

      {/* PARTNERS — logo wall, grouped */}
      <div style={{ padding: '80px 48px', background: PAPER, borderTop: `1px solid rgba(0,0,0,.1)` }}>
        <div style={{ maxWidth: 1184, margin: '0 auto' }}>
          <GoldRule />
          <Kicker>PARTNERS</Kicker>
          <Heading size={40}>Partners.</Heading>
          <div style={{ marginTop: 12, maxWidth: 720, fontFamily: sketchFont, fontSize: 19, color: MUTE, lineHeight: 1.4 }}>
            This is the constellation of care, named. None of this works without them.
          </div>

          {['Anchor partners', 'Schools & districts', 'Community partners', 'Faith partners'].map(group => (
            <div key={group} style={{ marginTop: 36 }}>
              <Label style={{ fontSize: 14, marginBottom: 14, letterSpacing: '1.5px' }}>{group.toUpperCase()}</Label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Sketchbox key={i} style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Label>LOGO</Label>
                  </Sketchbox>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CLOSING CTA */}
      <div style={{ padding: '72px 48px', background: NAVY_SKETCH }}>
        <div style={{ maxWidth: 1184, margin: '0 auto', textAlign: 'center' }}>
          <GoldRule w={48} dark={false} />
          <Heading dark={false} size={44} style={{ margin: '0 auto', maxWidth: 720 }}>
            Be the tailwind.
          </Heading>
          <div style={{ marginTop: 18, maxWidth: 640, margin: '18px auto 0', fontFamily: sketchFont, fontSize: 20, color: 'rgba(255,255,255,.8)', lineHeight: 1.4 }}>
            Kids spend about 80% of their waking hours out of school. Make those hours work for them.
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 32 }}>
            <BtnSketch primary dark>Donate</BtnSketch>
            <BtnSketch dark>Volunteer</BtnSketch>
            <BtnSketch dark>Partner with us</BtnSketch>
          </div>
        </div>
      </div>

      <FooterSketch />
    </div>
  );
}


/* ------------------------------------------------------------
   OPTION B — "Manifesto-led, numbers-first"
   Big editorial opener → History as horizontal scroll strip →
   Team as ED + "Meet the team" disclosure → Board as compact list
   → Partners as categorized chips (not logos)
   Treatment: Dense, voice-heavy, shorter overall.
------------------------------------------------------------ */

function OptionB() {
  const W = 1280;
  return (
    <div style={{ width: W, background: PAPER, color: INK, fontFamily: labelFont }}>
      <HeaderSketch />

      {/* HERO — editorial opener, big Fraunces-style statement */}
      <div style={{ padding: '96px 48px 64px', background: PAPER, position: 'relative' }}>
        <div style={{ maxWidth: 1184, margin: '0 auto' }}>
          <Kicker>WHO WE ARE</Kicker>
          <Heading size={88} style={{ maxWidth: 1100, letterSpacing: '-2px', lineHeight: 1 }}>
            We're neighbors who refused<br />
            to accept the gap.
          </Heading>
          <div style={{ marginTop: 28, maxWidth: 780, fontFamily: sketchFont, fontSize: 22, color: MUTE, lineHeight: 1.35 }}>
            [2–3 sentence editorial intro. Who "we" are in the plural. Place (Charlottesville) and stakes (the 49pp gap) in the first paragraph.]
          </div>
        </div>
        <MarginNote style={{ position: 'absolute', top: 40, right: 40, maxWidth: 200 }}>
          lean into voice — no "about us" platitudes
        </MarginNote>
      </div>

      {/* QUICK-FACTS STRIP — who/what/where */}
      <div style={{ padding: '28px 48px', background: NAVY_SKETCH, borderTop: `3px solid ${ACCENT}`, borderBottom: `3px solid ${ACCENT}` }}>
        <div style={{ maxWidth: 1184, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
          {[
            { n: '10', l: 'staff members' },
            { n: '12', l: 'board members' },
            { n: '2013', l: 'founded' },
            { n: '1', l: 'zip code (22903, 22902, 22901)' },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: sketchFont, fontSize: 56, fontWeight: 700, color: ACCENT, lineHeight: 1 }}>{s.n}</div>
              <Label style={{ color: 'rgba(255,255,255,.7)', marginTop: 6 }}>{s.l}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORY — horizontal scroll strip with year cards */}
      <div style={{ padding: '72px 0 72px 48px', background: PAPER }}>
        <div style={{ maxWidth: 1184, paddingRight: 48 }}>
          <GoldRule />
          <Kicker>OUR HISTORY</Kicker>
          <Heading size={36}>Thirteen years, one block at a time.</Heading>
        </div>
        <div style={{
          marginTop: 36, display: 'flex', gap: 20, overflowX: 'auto',
          paddingBottom: 16, paddingRight: 48,
        }}>
          {['2013', '2015', '2017', '2019', '2022', '2024', '2026'].map((y, i) => (
            <div key={y} style={{
              flex: '0 0 280px',
              border: `1.5px solid ${INK}`,
              borderRadius: 8, padding: 20, background: i === 0 ? '#E8DFD1' : PAPER,
              position: 'relative',
            }}>
              <div style={{ fontFamily: sketchFont, fontSize: 44, fontWeight: 700, color: ACCENT, lineHeight: 1 }}>{y}</div>
              <div style={{ marginTop: 10, fontFamily: sketchFont, fontSize: 19, color: INK }}>[Milestone headline]</div>
              <div style={{ marginTop: 10 }}><TextBlock lines={3} /></div>
              {i === 0 && <Annot pos="top-right">FOUNDING</Annot>}
            </div>
          ))}
          <div style={{ flex: '0 0 60px', display: 'flex', alignItems: 'center', color: MUTE, fontFamily: sketchFont, fontSize: 20 }}>→ scroll</div>
        </div>
      </div>

      {/* LEADERSHIP SPOTLIGHT — ED feature, then team disclosure */}
      <div style={{ padding: '80px 48px', background: '#E8DFD1', position: 'relative' }}>
        <div style={{ maxWidth: 1184, margin: '0 auto' }}>
          <GoldRule />
          <Kicker>OUR TEAM</Kicker>
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 56, marginTop: 28, alignItems: 'center' }}>
            <PhotoBox aspect="4 / 5" label="ED PHOTO" />
            <div>
              <Heading size={40}>Led by [Name].</Heading>
              <Label style={{ fontStyle: 'italic', marginTop: 4, fontSize: 14 }}>Executive Director · Founder</Label>
              <div style={{ marginTop: 20 }}><TextBlock lines={6} /></div>
              <div style={{ marginTop: 20, fontFamily: sketchFont, fontSize: 22, color: INK, fontStyle: 'italic', borderLeft: `3px solid ${ACCENT}`, paddingLeft: 16, maxWidth: 520 }}>
                "[A pull-quote from the ED. One sentence.]"
              </div>
              <div style={{ marginTop: 24, display: 'flex', gap: 14 }}>
                <ArrowLink>Read From the ED</ArrowLink>
                <Label>·</Label>
                <ArrowLink>Envision Radio</ArrowLink>
              </div>
            </div>
          </div>

          {/* Team row underneath — chips, not cards */}
          <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid rgba(0,0,0,.12)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Heading size={26}>The rest of the team.</Heading>
              <Label>10 people, including 7 Community School Coordinators.</Label>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, marginTop: 28,
            }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <PhotoCircle size={88} />
                  <div style={{ marginTop: 12, fontFamily: sketchFont, fontSize: 17, fontWeight: 700 }}>[Name]</div>
                  <Label style={{ fontStyle: 'italic', marginTop: 2 }}>[Role]</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOARD — compact list view (no cards) */}
      <div style={{ padding: '72px 48px', background: PAPER }}>
        <div style={{ maxWidth: 1184, margin: '0 auto' }}>
          <GoldRule />
          <Kicker>BOARD OF DIRECTORS</Kicker>
          <Heading size={40}>Governance.</Heading>
          <div style={{ marginTop: 12, fontFamily: sketchFont, fontSize: 19, color: MUTE, maxWidth: 720, lineHeight: 1.4 }}>
            [One sentence. What the board's role is and who's on it.]
          </div>
          <div style={{ marginTop: 36, border: `1.5px solid ${INK}`, borderRadius: 8 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '2fr 2fr 1.4fr 60px',
                padding: '16px 20px',
                borderBottom: i < 11 ? `1px solid rgba(0,0,0,.1)` : 'none',
                alignItems: 'center', gap: 20,
              }}>
                <div style={{ fontFamily: sketchFont, fontSize: 18, fontWeight: 700 }}>[Name]</div>
                <Label style={{ fontStyle: 'italic' }}>[Affiliation]</Label>
                <Label>[Role on board]</Label>
                <Label style={{ textAlign: 'right', color: ACCENT, fontWeight: 700 }}>{i === 0 ? 'CHAIR' : i === 1 ? 'VICE' : i === 2 ? 'TREAS.' : ''}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PARTNERS — categorized chips, no logos */}
      <div style={{ padding: '72px 48px', background: PAPER }}>
        <div style={{ maxWidth: 1184, margin: '0 auto' }}>
          <GoldRule />
          <Kicker>PARTNERS</Kicker>
          <Heading size={40}>It takes a constellation.</Heading>

          {[
            { g: 'Anchor', count: 4 },
            { g: 'Schools', count: 7 },
            { g: 'Community orgs', count: 10 },
            { g: 'Faith partners', count: 3 },
            { g: 'Researchers', count: 4 },
          ].map(cat => (
            <div key={cat.g} style={{ marginTop: 32 }}>
              <Label style={{ fontSize: 14, marginBottom: 10, letterSpacing: '1.5px' }}>{cat.g.toUpperCase()} · {cat.count}</Label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {Array.from({ length: cat.count }).map((_, i) => (
                  <div key={i} style={{
                    padding: '10px 16px',
                    border: `1.5px solid ${INK}`,
                    borderRadius: 999,
                    fontFamily: sketchFont, fontSize: 17,
                  }}>[Partner name]</div>
                ))}
              </div>
            </div>
          ))}
          <MarginNote style={{ marginTop: 36, maxWidth: 420 }}>
            chips > logos for a wireframe — but in hi-fi, some of these become real logo lockups
          </MarginNote>
        </div>
      </div>

      <FooterSketch />
    </div>
  );
}


/* ------------------------------------------------------------
   OPTION C — "Tabbed directory"
   Short hero with mission → Sticky tabbed switcher between
   History / Team / Board / Partners as 4 mini-pages within one URL.
   Treatment: Compact, doc-like. Good for returning staff/donors who
   already know CoP and want to jump to a thing.
------------------------------------------------------------ */

function OptionC() {
  const W = 1280;
  const tabs = ['History', 'Team (10)', 'Board (12)', 'Partners'];

  return (
    <div style={{ width: W, background: PAPER, color: INK, fontFamily: labelFont }}>
      <HeaderSketch />

      {/* SHORT HERO — mission sentence on editorial tan */}
      <div style={{ padding: '56px 48px 40px', background: '#E8DFD1', position: 'relative' }}>
        <div style={{ maxWidth: 1184, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 64, alignItems: 'end' }}>
          <div>
            <GoldRule />
            <Kicker>WHO WE ARE · /ABOUT</Kicker>
            <Heading size={52} style={{ letterSpacing: '-1px' }}>
              A ten-person nonprofit<br />practicing dual-generation<br />early intervention.
            </Heading>
          </div>
          <div>
            <Label style={{ fontSize: 14, marginBottom: 10, letterSpacing: '1.5px' }}>BY THE NUMBERS</Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[['10', 'staff'], ['12', 'board'], ['7', 'schools'], ['~30', 'partners']].map(([n, l]) => (
                <Sketchbox key={l} style={{ padding: 14 }}>
                  <div style={{ fontFamily: sketchFont, fontSize: 36, fontWeight: 700, color: ACCENT, lineHeight: 1 }}>{n}</div>
                  <Label style={{ marginTop: 4 }}>{l}</Label>
                </Sketchbox>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STICKY TABS */}
      <div style={{
        padding: '0 48px',
        background: PAPER,
        borderBottom: `1.5px solid ${INK}`,
        position: 'sticky', top: 0, zIndex: 2,
      }}>
        <div style={{ maxWidth: 1184, margin: '0 auto', display: 'flex', gap: 4 }}>
          {tabs.map((t, i) => (
            <div key={t} style={{
              padding: '18px 24px',
              fontFamily: labelFont, fontSize: 14, fontWeight: 700,
              letterSpacing: '0.5px',
              borderBottom: i === 0 ? `3px solid ${ACCENT}` : '3px solid transparent',
              color: i === 0 ? INK : MUTE,
            }}>{t}</div>
          ))}
        </div>
      </div>

      {/* ACTIVE PANEL — "History" shown, other tabs are stacked below in low-opacity */}
      <div style={{ padding: '48px 48px 24px', background: PAPER, position: 'relative' }}>
        <div style={{ maxWidth: 1184, margin: '0 auto' }}>
          <Label style={{ color: ACCENT, fontSize: 14, letterSpacing: '1.5px', marginBottom: 16 }}>ACTIVE TAB ▼</Label>
          <Heading size={32}>History</Heading>
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48 }}>
            <div>
              <TextBlock lines={8} />
              <div style={{ height: 16 }} />
              <TextBlock lines={6} />
            </div>
            <div>
              <PhotoBox aspect="4 / 3" label="FOUNDING PHOTO" />
              <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {['2013 — Founded', '2019 — Dreambuilders', '2022 — 7 sites', '2026 — $1.3M'].map(m => (
                  <Sketchbox key={m} style={{ padding: 12 }}>
                    <div style={{ fontFamily: sketchFont, fontSize: 16, fontWeight: 700 }}>{m}</div>
                  </Sketchbox>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TEASER for inactive tabs — to signal there's more content per-tab */}
      <div style={{ padding: '24px 48px 32px', background: PAPER }}>
        <div style={{ maxWidth: 1184, margin: '0 auto' }}>
          <Label style={{ color: MUTE, marginBottom: 16 }}>↓ OTHER TABS (shown faded to indicate switchable panels) ↓</Label>

          {/* TEAM teaser */}
          <Sketchbox style={{ padding: 28, marginBottom: 16, opacity: 0.55 }}>
            <Kicker>TEAM TAB</Kicker>
            <Heading size={24}>10 people, including 7 school coordinators.</Heading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 10, marginTop: 20 }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <PhotoCircle size={52} style={{ margin: '0 auto' }} />
                  <Label style={{ marginTop: 6, fontSize: 10 }}>[Name]</Label>
                </div>
              ))}
            </div>
          </Sketchbox>

          {/* BOARD teaser */}
          <Sketchbox style={{ padding: 28, marginBottom: 16, opacity: 0.55 }}>
            <Kicker>BOARD TAB</Kicker>
            <Heading size={24}>12 directors. Governance.</Heading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 20 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <PhotoCircle size={40} />
                  <div>
                    <div style={{ fontFamily: sketchFont, fontSize: 15, fontWeight: 700 }}>[Name]</div>
                    <Label>[Affiliation]</Label>
                  </div>
                </div>
              ))}
              <Label style={{ alignSelf: 'center' }}>+ 8 more</Label>
            </div>
          </Sketchbox>

          {/* PARTNERS teaser */}
          <Sketchbox style={{ padding: 28, opacity: 0.55 }}>
            <Kicker>PARTNERS TAB</Kicker>
            <Heading size={24}>~30 partner orgs across 5 categories.</Heading>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 20 }}>
              {['Anchor · 4', 'Schools · 7', 'Community · 10', 'Faith · 3', 'Research · 4'].map(g => (
                <div key={g} style={{
                  padding: '8px 14px', border: `1.5px solid ${INK}`, borderRadius: 999,
                  fontFamily: sketchFont, fontSize: 15, fontWeight: 700,
                }}>{g}</div>
              ))}
            </div>
          </Sketchbox>
        </div>
        <MarginNote style={{ position: 'absolute', right: 24, top: 80, maxWidth: 200 }}>
          best for staff/donors who already know CoP; worst for first-time readers
        </MarginNote>
      </div>

      <FooterSketch />
    </div>
  );
}


/* ============================================================ */

Object.assign(window, { OptionA, OptionB, OptionC });
