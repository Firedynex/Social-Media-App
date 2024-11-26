import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './ErrorPages/NotFoundPage.jsx'
import Login from './Login/Login.jsx'
import RegistrationPage from './RegistrationPages/RegistrationPage.jsx'
import Achievement from './AchievementPage/Achievement.jsx'
import MovieListPage from './MovieListPage/MovieListPage.jsx';
import HomePage from './HomePage/HomePage.jsx';
import CreateTextPost from './CreateTextPost/CreateTextPost.jsx'
import EventCreator from './EventCreator/EventCreator.jsx'
import UserProfile from './UserProfilePage/UserProfile.jsx'
import TestHomePage from './TestHomePage/TestHomePage.jsx'

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
  {
    path: "/create-achievement",
    element: <Achievement/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: "/HomePage",
    element: <HomePage/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: "/CreateTextPost",
    element: <CreateTextPost/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: "/CreateEvent",
    element: <EventCreator/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: `/UserProfilePage/:email`,
    element: <UserProfile/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: "/TestHomePage",
    element: <TestHomePage/>,
    errorElement: <NotFoundPage/>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
