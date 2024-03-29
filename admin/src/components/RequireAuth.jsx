import { useLocation, Navigate, Outlet } from "react-router-dom";



const RequireAuth = () => {


    const parseCookie = str =>
    str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
                acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
                return acc;
            }, {}
    );

    const isLoggedIn = parseCookie(document.cookie).loggedIn

    const isAdmin = parseCookie(document.cookie).admin
    
    const location = useLocation();

  return (

    isLoggedIn && isAdmin
        ? <Outlet />
        : <Navigate to='/login' state={{ from: location }} replace /> 

  )

}

export default RequireAuth