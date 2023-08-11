import './App.css';
import {Routes, Route} from 'react-router-dom';
import Books from './Component/Books';
import Authors from './Component/Authors';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' Component={Books} />
        <Route path='/author' Component={Authors} />
      </Routes>
    </div>
  );
}

export default App;
