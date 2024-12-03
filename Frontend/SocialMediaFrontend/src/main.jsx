import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './ErrorPages/NotFoundPage.jsx'
import Login from './Login/Login.jsx'
import RegistrationPage from './RegistrationPages/RegistrationPage.jsx'
import Achievement from './AchievementPage/Achievement.jsx'
import HomePage from './HomePage/HomePage.jsx';
import CreateTextPost from './CreateTextPost/CreateTextPost.jsx'
import EventCreator from './EventCreator/EventCreator.jsx'
import UserProfile from './UserProfilePage/UserProfile.jsx'
import AllTextPostsPage from './AllTextPosts/AllTextPosts.jsx'
import AllEventsPage from './AllEvents/AllEvents.jsx'
import AllAchievementsPage from './AllAchievements/AllAchievements.jsx'
import ViewProfile from './ViewProfilePage/ViewProfile.jsx'

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
    path: "/AllTextPosts",
    element: <AllTextPostsPage/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: "/AllEvents",
    element: <AllEventsPage/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: "/AllAchievements",
    element: <AllAchievementsPage/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path: "/UserProfilePage",
    element: <UserProfile/>,
    errorElement: <NotFoundPage/>,
  },
  {
    path:"/ViewProfilePage/:email",
    element: <ViewProfile/>,
    errorElement: <NotFoundPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
