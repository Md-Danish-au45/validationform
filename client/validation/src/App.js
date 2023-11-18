import './App.css';
import AllData from './component/AllData';
import SignIn from './component/Signin';
import SignUp from './component/Signup';
import { BrowserRouter, Routes,Route  } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path='/' element={<AllData/>} />
      </Routes>
      </BrowserRouter>

 
    </div>
  );
}

export default App;
