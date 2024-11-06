
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/manager'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Register from './components/Register'
// import Login from './components/Login'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar/> <Manager/></>
    }
  ])
  return (
    // <BrowserRouter>
    //     <Routes>
    //         <Route path='/register' element = {<Register/>}></Route>
    //         <Route path='/login' element = {<Login/>}></Route>
    //     </Routes>
    // </BrowserRouter>
    <>
        <RouterProvider router={router} /> 
    </>
  )
}

export default App
