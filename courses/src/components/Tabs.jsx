import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import DeliveryIcon from './Icons/DeliveryIcon';
import WhatsappIcon from './Icons/WhatsappIcon';
import styled from 'styled-components';
import RegisterModal from './RegisterModal';
import SignLanguageIcon from '@mui/icons-material/SignLanguage';


const Button = styled.button`
    padding: 15px;
    border: 2px solid #000;
    background-color: #216E8C;
    cursor: pointer;
    font-weight: 500;
    width: 50%;
    color: #fff;
    border-radius: 10px;

    &:hover {
        background-color: #fff;
        color: #216E8C;
        font-weight: 500;
    }
`


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{fontSize: '14px', fontFamily: 'inherit', lineHeight: '20px'}}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '5px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
             WebkitBoxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', MozBoxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: '10px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="MEDIOS DE PAGO" {...a11yProps(0)} icon={<LocalShippingIcon />} iconPosition="top" sx={{ '@media (max-width: 768px)': {fontSize: '12px'}}} />
          <Tab label="REGISTRARSE" {...a11yProps(1)} icon={<PaymentsOutlinedIcon />} iconPosition="top" sx={{ '@media (max-width: 768px)': {fontSize: '12px'}}} />
        </Tabs>
      </Box>
        <TabPanel value={value} index={0}>
          <p style={{marginBottom: '10px'}}>- TRANSFERENCIA</p>
          <img src="https://imgmp.mlstatic.com/org-img/banners/ar/medios/468X60.jpg" title="Mercado Pago - Medios de pago" alt="Mercado Pago - Medios de pago" width="300" height="40"/>
          <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" border="0" alt="PayPal Acceptance Mark" width="300" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RegisterModal />
        </TabPanel>
    </Box>
  );
}