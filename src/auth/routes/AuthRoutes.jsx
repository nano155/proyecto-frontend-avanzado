import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"




export const AuthRoutes = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
    <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/*" element={<Navigate to={'/login'}/>}/>
    </Routes>
    </div>
  )
}
