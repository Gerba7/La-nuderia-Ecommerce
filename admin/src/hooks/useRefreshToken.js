import axios, { publicRequest } from '../api/axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';



const useRefreshToken = () => {
    
    const dispatch = useDispatch();

    const refresh = async () => {

        const res = await publicRequest.get('/refresh', {
            withCredentials: true
        });
        
        console.log(res.data.accessToken);
        dispatch(setCredentials(res.data.accessToken))

        return res.data.accessToken;

    }
console.log('ok')
    return refresh;

}

export default useRefreshToken;