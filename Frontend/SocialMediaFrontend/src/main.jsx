import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './ErrorPages/NotFoundPage.jsx'
import Login from './Login/Login.jsx'
import RegistrationPage from './RegistrationPages/RegistrationPage.jsx'
import EventCreator from './EventCreator/EventCreator.jsx'


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: "/register",
    element: <RegistrationPage/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: "/",
    element: <Login/>,
    errorElement: <NotFoundPage/>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <Login />
    <RegistrationPage></RegistrationPage>

=======
    <RouterProvider router={router}/>
>>>>>>> origin/main
  </React.StrictMode>,
)
