import { privateRequest } from "../api/axios";              // INTERCEPTOR
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/httpRequests";


const useAxiosPrivate = () => {

    const dispatch = useDispatch();
    
    const refresh = useRefreshToken();

    const accessToken = useSelector(state => state.auth.accessToken);
    
    useEffect(() => {

        const reqIntercept = privateRequest.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const resIntercept = privateRequest.interceptors.response.use(
            response => response,
            async (error) => {
                const prevReq = error?.config;
                if (error?.response?.status === 403 && !prevReq?.sent) {
                    prevReq.sent = true;
                    const newAccessToken = await refresh()
                    prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return privateRequest(prevReq);   
                } else {
                    dispatch(logout())
                }
                return Promise.reject(error);
            }
        );

        return () => {
            privateRequest.interceptors.request.eject(reqIntercept);
            privateRequest.interceptors.response.eject(resIntercept);
        }

    }, [accessToken, refresh]);

    return privateRequest;
}


export default useAxiosPrivate;
