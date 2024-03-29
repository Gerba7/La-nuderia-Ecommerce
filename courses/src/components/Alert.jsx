import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../redux/alertSlice';

const AlertPopup = () => {

  const alertTime = 3000;

  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(resetAlert())  // useEffect??
  }, alertTime)

  const alert = useSelector((state) => state.alert.alert);
  const message = useSelector((state) => state.alert.message);
  const type = useSelector((state) => state.alert.type);

  if (alert && message && type) {
    return (
      <Alert
        severity={type}
        sx={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          zIndex: 15,
          minWidth: '250px'
        }}
        variant='filled'
      >
        {message}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;