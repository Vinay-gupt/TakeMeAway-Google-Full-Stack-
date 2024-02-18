import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import Allplaces from './components/Allplaces.jsx';
import MapContainer from './components/MapContainer.jsx';
import Details from './components/Details.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: `/allplaces/:title/:loc`,
        element: <Allplaces/>,
      },
      {
        path: `/details/:placeid`,
        element: <Details/>,
      },
      {
        path: `/map/:lat/:lon`,
        element: <MapContainer/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
