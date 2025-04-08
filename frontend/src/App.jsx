import { Dashboard } from "./pages/Dashboard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Navigate, replace, Route } from "react-router"
import { Routes } from "react-router"
import { Transfer } from "./pages/Transfer"
import { Landing } from "./pages/Landing"
import { RecoilRoot } from "recoil"
import { createContext, useState } from "react"
import { UserProvider } from "./components/context"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Profile } from "./pages/Profile"


function App() {

  function ToLandingRoute({element}){
    const token = localStorage.getItem('token')
    return token ? element : <Navigate to="/" replace />
  }

  function ToDashboardRoute({element}){
    const token = localStorage.getItem('token')
    return !token ? element : <Navigate to='/dashboard' replace />
  }

  return (
    <div >
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing></Landing>}></Route>
            <Route path="/signup" element={<ToDashboardRoute element={<Signup/>}></ToDashboardRoute>}></Route>
            <Route path="/signin" element={<ToDashboardRoute element={<Signin/>}></ToDashboardRoute>}></Route>
            <Route path="/dashboard" element={<ToLandingRoute element={<Dashboard/>}></ToLandingRoute>}></Route>
            <Route path="/transfer" element={<ToLandingRoute element={<Transfer></Transfer>}></ToLandingRoute>}></Route>
            <Route path="/profile" element={<ToLandingRoute element={<Profile/>}></ToLandingRoute>}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
      
    </div>
  )
}

export default App
