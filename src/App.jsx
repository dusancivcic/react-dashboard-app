import Sidebar from './components/sidebar/Sidebar.jsx'
import { Outlet, useLocation, Link } from 'react-router-dom';
import './App.css'
import { useEffect } from 'react'

function App() {

  const location = useLocation();
  const isMainPage = location.pathname === '/'; // Your home route

  return (
    <>
      
      <section id="main">
      {isMainPage ? ( 
        <div className='homeContainer'>
          <h1>Select a card</h1>
          <div className='homeContent'>
              <div className='homeFlex'>
                    <Link to={`sort/reds`} className='homeCard'>
                          <div className='homeCardImage'>
                              <img src="../public/redBackground.png" alt="rose-wines" />
                              <h2>Red wines</h2>
                              <div className='overlay'></div>
                          </div>
                    </Link>
                  
                    <Link to={`sort/whites`} className='homeCard'>
                          <div className='homeCardImage'>
                              <img src="../public/whiteBackground.jpg" alt="rose-wines" />
                              <h2>White wines</h2>
                              <div className='overlay'></div>
                          </div>
                    </Link>
                  
                    <Link to={`sort/rose`} className='homeCard'>
                          <div className='homeCardImage'>
                              <img src="../public/roseBackground.jpg" alt="rose-wines" />
                              <h2>Rose wines</h2>
                              <div className='overlay'></div>
                          </div>
                    </Link>
                  
              </div>
              <div className='homeFlex'>
                    <Link to={'topRated'} className='homeCard'>
                      <div className='homeCard'>
                          <div className='homeCardImage'>
                              <img src="../public/topRatedBackground.jpg" alt="rose-wines" />
                              <h2>Top rated</h2>
                              <div className='overlay'></div>
                          </div>
                      </div>
                    </Link>
                  
                    <Link to={'statistics'} className='homeCard'>
                          <div className='homeCardImage'>
                              <img src="../public/statsBackground.jpg" alt="rose-wines" />
                              <h2>Statistics</h2>
                              <div className='overlay'></div>
                          </div>
                    </Link>
                  
              
              </div>
          </div>
        </div>   
      ) : (
        <>
          <Sidebar></Sidebar>
          <Outlet/>
        </>
      )    
    }
           
        
      </section>
    </>
  )
}

export default App
