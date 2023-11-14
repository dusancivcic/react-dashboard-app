import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import './Sidebar.css'

const Sidebar = () =>{

    return(
        <nav className='sidebar'>
            <ul>
                <li>
                    <Link to={`sort/reds`}>
                        <img src="../../public/red-wine.svg" alt="wine" />
                        <p>Red wines</p>
                    </Link>
                </li>
                <li>
                    <Link to={`sort/whites`}>
                        <img src="../../public/white-wine.svg" alt="wine" />
                        <p>White wines</p>
                    </Link>
                </li>
                <li>
                    <Link to={`sort/rose`}>
                        <img src="../../public/rose-wine.svg" alt="wine" />
                        <p>Rose wines</p>
                    </Link>
                </li>
                <li>
                    <Link to={'topRated'}>
                        <img src="../../public/rating.svg" alt="rating" />
                        <p>Top rated</p>
                    </Link>
                </li>
                <li>
                    <Link to={'statistics'}>
                        <img src="../../public/chart.svg" alt="chart" />
                        <p>Statistics</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )

}

export default Sidebar