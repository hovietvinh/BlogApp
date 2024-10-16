import { Route, Routes } from 'react-router-dom';
import './App.css';
import Default from './layouts/Default';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {Toaster} from "react-hot-toast"


function App() {
  return (
    <>
      <Toaster/>
      <Routes>  
        <Route path='/' element={<Default/>}>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
       
      </Routes>
       
    </>
   
  );
}

export default App;
