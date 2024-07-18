import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login/Login.jsx'
import RegistrationPage from './RegistrationPages/RegistrationPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
    <RegistrationPage></RegistrationPage>
  </React.StrictMode>,
)
