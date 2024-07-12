import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login/Login.jsx'
import Banner from './UniversalComponents/CorinthBanner/CorinthBanner.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Banner />
    <Login />
  </React.StrictMode>,
)
