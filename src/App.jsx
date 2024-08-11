import { Route, Routes } from 'react-router-dom';
import './App.css'

import Signin from './components/signin';
import Signup from './components/signup';
import Client from './client';
import { useEffect, useState } from 'react';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuth(true);
    }
    else if(!token){
      setAuth(false);
    }
  }, []);

  return (
    <div className='container'>
      {auth ? ( 
        <div className='content'>
          <Client/>
        </div>
      ):(
        <div className='authContent'>
          <Routes>
            <Route path='/' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
