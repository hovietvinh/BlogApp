import { Route, Routes } from 'react-router-dom';
import './App.css';
import Default from './layouts/Default';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {Toaster} from "react-hot-toast"
import Create from './pages/Post/Create';
import Detail from './pages/Post/Detail';
import Edit from './pages/Post/Edit';


function App() {
  return (
    <>
      <Toaster/>
      <Routes>  
        <Route path='/' element={<Default/>}>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="posts/create" element={<Create/>}/>
          <Route path="posts/:id" element={<Detail/>}/>
          <Route path="posts/edit/:id" element={<Edit/>}/>
        </Route>
       
      </Routes>
       
    </>
   
  );
}

export default App;
