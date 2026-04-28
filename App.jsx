/* global React, ReactDOM, Header, Hero, UrgencySection, Programs, ByTheNumbers, Story, ThreeWays, Footer */
const { useState } = React;

function DonateModal({ onClose }) {
  const [amt, setAmt] = useState(100);
  const [freq, setFreq] = useState('one-time');
  const [done, setDone] = useState(false);
  return (
    <div style={mod.shade} onClick={onClose}>
      <div style={mod.panel} onClick={e=>e.stopPropagation()}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <div style={{width:48, height:3, background:'#D5A33A', marginBottom:12}}/>
            <h3 style={{fontFamily:'Fraunces, serif', fontSize:32, fontWeight:700, color:'#07305B', margin:0, textTransform:'uppercase', letterSpacing:'-0.6px'}}>
              {done ? 'Thank you.' : 'Support the work.'}
            </h3>
          </div>
          <button onClick={onClose} style={mod.close}>✕</button>
        </div>
        {done ? (
          <div style={{marginTop:20}}>
            <p style={{fontFamily:'Inter, sans-serif', fontSize:16, color:'#07305B', lineHeight:1.6}}>
              Your {freq === 'monthly' ? 'monthly ' : ''}gift of <strong>${amt}</strong> helps us keep coordinators on the ground at every CCS site.
            </p>
            <p style={{fontFamily:'Inter, sans-serif', fontSize:14, color:'rgba(7,48,91,.7)', lineHeight:1.55, marginTop:16}}>
              {amt >= 500 ? 'Your gift qualifies for 65% NAP tax credits — we will follow up with the paperwork.' : 'Gifts of $500+ qualify for 65% Virginia NAP tax credits.'}
            </p>
            <button onClick={onClose} style={{...btn.navy, marginTop:24}}>Close</button>
          </div>
        ) : (
          <>
            <div style={{display:'flex', gap:8, marginTop:24}}>
              {['one-time','monthly','major'].map(f => (
                <button key={f} onClick={()=>setFreq(f)} style={{
                  flex:1, padding:'10px 12px', borderRadius:6,
                  border:'1px solid '+(freq===f?'#07305B':'rgba(7,48,91,.16)'),
                  background: freq===f?'#07305B':'#fff',
                  color: freq===f?'#fff':'#07305B',
                  fontFamily:'Inter, sans-serif', fontSize:14, fontWeight:500, textTransform:'capitalize', cursor:'pointer'
                }}>{f.replace('-',' ')}</button>
              ))}
            </div>
            <div style={{marginTop:20, fontFamily:'Inter, sans-serif', fontSize:13, fontWeight:500, color:'#07305B'}}>Amount</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginTop:8}}>
              {[50,100,250,500].map(v => (
                <button key={v} onClick={()=>setAmt(v)} style={{
                  padding:'10px', borderRadius:6,
                  border:'1px solid '+(amt===v?'#D5A33A':'rgba(7,48,91,.16)'),
                  background: amt===v?'#D5A33A':'#fff',
                  color:'#07305B', fontFamily:'Inter, sans-serif', fontWeight:600, fontSize:15, cursor:'pointer'
                }}>${v}</button>
              ))}
            </div>
            <input type="number" value={amt} onChange={e=>setAmt(+e.target.value||0)}
              style={{width:'100%', boxSizing:'border-box', marginTop:12, padding:'10px 12px', borderRadius:6, border:'1px solid rgba(7,48,91,.16)', fontFamily:'Inter, sans-serif', fontSize:15, color:'#07305B'}}/>
            {amt >= 500 && (
              <div style={{marginTop:14, padding:'10px 12px', background:'#E8DFD1', borderRadius:6, fontFamily:'Inter, sans-serif', fontSize:13, color:'#07305B'}}>
                <strong>NAP credit eligible.</strong> Receive a 65% Virginia tax credit on this gift.
              </div>
            )}
            <button onClick={()=>setDone(true)} style={{...btn.navy, marginTop:24, width:'100%'}}>
              Give ${amt}{freq==='monthly'?' / month':''}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const mod = {
  shade: { position:'fixed', inset:0, background:'rgba(7,48,91,.55)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center' },
  panel: { background:'#fff', borderRadius:8, padding:40, width:480, maxWidth:'92vw', boxShadow:'0 20px 60px rgba(7,48,91,.25)' },
  close: { background:'transparent', border:0, fontSize:20, color:'#07305B', opacity:.6, cursor:'pointer' }
};

function App() {
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState('home');
  const handleCTA = (k) => { if (k==='donate') setModal('donate'); else setPage(k); };
  const handleNav = (i) => { if (i==='Donate') setModal('donate'); };

  return (
    <div style={{minHeight:'100vh', background:'#EEEEEC'}}>
      <Header active="Who We Are" onNav={handleNav}/>
      <Hero onCTA={handleCTA}/>
      <UrgencySection/>
      <Programs/>
      <ByTheNumbers/>
      <Story/>
      <ThreeWays onCTA={handleCTA}/>
      <Footer/>
      {modal==='donate' && <DonateModal onClose={()=>setModal(null)}/>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
