import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { RouterProvider } from 'react-router-dom'

import { createBrowserRouter , createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Main from './components/Main/Main'
import LogIn from './components/LogIn/LogIn.jsx'
import SignUp from './components/SignUp/SignUp'
import Root from './Root'
import Thanku from './components/SignUp/Thanku.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route index element={<Main />} />
      <Route path='login' element={<LogIn />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='thanku' element={<Thanku />} />
    </Route> 
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router={router}></RouterProvider> */}
    <RouterProvider router={router} />
      {/* <App /> */}
  </StrictMode>,
)

