import Sidebar from './components/sidebar/Sidebar.jsx'
import { Outlet } from "react-router-dom"
import './App.css'
import { useEffect } from 'react'

function App() {

  return (
    <>
      <Sidebar></Sidebar>
      <section id="main">
        <Outlet/>
      </section>
    </>
  )
}

export default App
