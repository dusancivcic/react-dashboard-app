import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import './Sidebar.css'
import { useState } from 'react'

const Sidebar = () =>{

    const [active, setActive] = useState('')

    return(
        <div className={`sidebar-container ${active}`}>
            <div className={`hamburger ${active}`} onClick={()=>{if(active === ''){
                setActive('active')
            }else{
                setActive('')
            }}}>
                <div></div>
            </div>
            <nav className='sidebar'>
                <ul>
                    <li>
                        <Link to={`sort/reds`} onClick={()=>{setActive('')}}>
                            <img src="../../public/red-wine.svg" alt="wine" />
                            <p>Red wines</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`sort/whites`} onClick={()=>{setActive('')}}>
                            <img src="../../public/white-wine.svg" alt="wine" />
                            <p>White wines</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`sort/rose`} onClick={()=>{setActive('')}}>
                            <img src="../../public/rose-wine.svg" alt="wine" />
                            <p>Rose wines</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={'topRated'} onClick={()=>{setActive('')}}>
                            <img src="../../public/rating.svg" alt="rating" />
                            <p>Top rated</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={'statistics'} onClick={()=>{setActive('')}}>
                            <img src="../../public/chart.svg" alt="chart" />
                            <p>Statistics</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )

}

export default Sidebar