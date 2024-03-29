import axios from 'axios';

export const BASE_URL = 'http://localhost:5000/v1'; ///       'https://api.lanuderia.com:5000/v1'      'http://localhost:5000/v1'


export const publicRequest = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
});


const privateRequest = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
    timeout: 1800000,
});




const refresh = async () => {
    
    const res = await publicRequest.get('/auth/refresh', {
        withCredentials: true
    });
    
    return res.data.accessToken;

}


// privateRequest.interceptors.request.use(
//     config => {
//         if (!config.headers['Authorization']) {
//             config.headers['Authorization'] = `Bearer ${accessToken}`;
//         }
//         return config;
//     }, (error) => Promise.reject(error)
// );

privateRequest.interceptors.response.use(
    response => response,
    async (error) => {
        const prevReq = error?.config;
        if (error?.response?.status === 403 && !prevReq?.sent) {
            prevReq.sent = true;
            let newAccessToken = await refresh()
            
            return privateRequest({
                ...prevReq,
                headers: {...prevReq.headers, Authorization: `Bearer ${newAccessToken}`},
                sent: true
            });   
        } 
        return Promise.reject(error);
    }
);


//return () => {
//    privateRequest.interceptors.request.eject(reqIntercept);
//    privateRequest.interceptors.response.eject(resIntercept);
//}

export default privateRequest;