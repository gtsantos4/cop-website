/* global React, ReactDOM, Header, WWDHero, ProgramOne, ProgramTwo, ProgramThree, ApproachTieback, WWDFinalCTA, Footer */
const { useState } = React;

function WhatWeDoApp() {
  const [_, setPage] = useState('what-we-do');
  const handleCTA = (k) => setPage(k);
  const handleNav = () => {};
  return (
    <div data-screen-label="What We Do" style={{minHeight:'100vh', background:'#EEEEEC'}}>
      <Header active="What We Do" onNav={handleNav}/>
      <WWDHero/>
      <ProgramOne/>
      <ProgramTwo/>
      <ProgramThree/>
      <ApproachTieback/>
      <WWDFinalCTA onCTA={handleCTA}/>
      <Footer/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<WhatWeDoApp/>);
