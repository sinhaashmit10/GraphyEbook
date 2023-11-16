import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import Left from './components/Left';
import Right from './components/Right';
// import EbookDisplay from './components/EbookDisplay';

function App() {
  return (
    <>
    <Router>
        <div className="appEbook">
        <Left/>
        <Right/>
      {/* <Routes>   */}
        {/* <Route path="/EbookDisplay" element={<EbookDisplay/>}/> */}
      {/* </Routes> */}
        </div>
    </Router>
    </>
  );
}

export default App;