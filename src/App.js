import logo from './logo.svg';
import './App.css';
import Login from '../src/Login/Login';
import About from './Login/Register';
import { Routes, Route, AbortedDeferredError, Router} from "react-router-dom";
import Register from './Login/Register';
import Dashboard from './Login/Dashboard';
import Admin from './Login/Admin';
import Nav from './Login/Nav';
import Slider from './Login/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {createContext, useState } from 'react';
import { AuthProvider } from './Login/Api';
import Showdata from './Login/Showdata';
import Cart from './Cart';
import Deta from './Login/slices/Deta';
import Update from './Login/Update';
import Adding from './Login/Add-Product';
import Edit from './Edit';
import Footer from './Login/Footer';
import Mony from './Login/Mony';


function App() {



  return (
      <>
 <AuthProvider>
        <Routes>
       
                <Route
                    path='/'
                    element={
                        <>
                        
                            <Nav />
                            <Slider />
                            <Showdata></Showdata>
                            <Footer></Footer>
                        </>
                    }
                />
                <Route path='login' element={<Login />} />
                <Route path='/Cart' element={<Cart />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/update' element={<Update/>}></Route>
                <Route path='/:productId' element={<Deta/>} />
                <Route path='/edit/:productId' element={<Edit/>} />
                <Route path='/adding' element={<Adding/>} />
                <Route path='/money' element={<Mony/>} />
            </Routes>
     
            </AuthProvider>

   
    
               
             

      </>
  );
}

export default App;
