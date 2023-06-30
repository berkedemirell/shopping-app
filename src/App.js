
import {RouterProvider, Outlet, createBrowserRouter } from 'react-router-dom';
import {Navbar} from './components/Navbar.jsx';
import {Products} from './components/Products.jsx';
import {Single} from './components/Single.jsx';
import {Footer} from './components/Footer.jsx';
import {Payment} from './components/Payment.jsx';
import './App.css';

function App() {
  
  const Layout = () => {
    return (
      <>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children: [
        {
          path:"/",
          element:<Products/>
        },
        {
          path:"/product/:id",
          element:<Single/>
        },
        {
          path:"/payment",
          element:<Payment/>
        }
      ]
    }
  ])


  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  ); 
}

export default App;
