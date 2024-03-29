import { useLocation, Navigate, Outlet } from "react-router-dom";



const RequireAuth2 = () => {


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
    
    const location = useLocation();
    

  return (

    isLoggedIn
        ? <Outlet />
        : <Navigate to='/purchaselogin' state={{ from: location }} replace /> 

  )

}

export default RequireAuth2