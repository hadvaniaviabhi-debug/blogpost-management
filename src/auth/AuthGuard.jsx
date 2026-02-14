import { Children } from "react";
import { Navigate, redirect } from "react-router-dom";
const AuthGuard=({
    children,
    required = true,
    redirect = "/login"
})=>{
    const loginData=JSON.parse(localStorage.getItem("loginData"));
    const isAuthenticated=!!loginData;
    
    if(required && !isAuthenticated){
        return <Navigate to={redirect} replace/>
    }
     if(!required && isAuthenticated){
        return <Navigate to="/dashboard" replace/>
    }
    return children;
}

export default AuthGuard;