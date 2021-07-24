import React from 'react';
import GlobalSubject from './1-global-subject/GlobalSubject';
import ScopeSubject from './2-scope-subject/ScopeSubject';
import WithPipeSubject from './3-with-pipe-subject/WithPipeSubject';

function App() {
  return (
    <div className="App">
      <GlobalSubject />
      <ScopeSubject />
      <WithPipeSubject />
    </div>
  );
}

export default App;
