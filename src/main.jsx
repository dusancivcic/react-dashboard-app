import React from 'react'
import App from './App.jsx'
import WineList from './components/winelist/WineList.jsx'
import { createRoot } from "react-dom/client"
import WineSingle from './components/winesingle/WineSingle.jsx'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import TopRated from './components/toprated/TopRated.jsx'
import Statistics from './components/statistics/Statistics.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
    children: [
      {
        path: "sort/:wineSort",
        element: <WineList />,
      },
      {
        path: "sort/single/:wineSingle",
        element: <WineSingle />,
      },
      {
        path: "topRated",
        element: <TopRated />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
    ],
  },

]);


createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);