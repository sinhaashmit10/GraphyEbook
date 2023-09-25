import './App.css';
import EbookState from './Context/EbookState';

import Left from './components/Left';
import Right from './components/Right';

function App() {
  return (
    <>
    <EbookState>
    <Left/>
    <Right/>
    </EbookState>
    </>
  );
}

export default App;
