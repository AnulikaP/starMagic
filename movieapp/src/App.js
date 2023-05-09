
import { Route, Routes } from 'react-router-dom';
import './App.css';
import StarwarData from './StarwarData';
import StarDetails from './MoviePage.js/StarDetails';


function App() {
  return (
    <>
    <div className="App">
    
      <Routes>
        <Route path='/' element={<StarwarData/>}/>
        <Route path='/:id' element={<StarDetails/>}/>
        
      </Routes>
      
    </div>
    
    </>
  );
}

export default App;
