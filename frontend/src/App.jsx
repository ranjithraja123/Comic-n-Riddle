import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import HeroSection from './components/HeroSection/HeroSection.jsx'
import Login from './pages/Login/Login.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup/Signup.jsx'
import { Provider } from 'react-redux'
import store from './reduxSlice/redux-store.js'

function App() {

  return (
    <>
      <Provider store={store}>

        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<HeroSection />} />

        </Routes>
      </Provider>

    </>
  )
}

export default App
