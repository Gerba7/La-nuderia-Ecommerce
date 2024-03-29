import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';

const Logo = styled.img`
    height: 50px;
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

export default function PaymentTabs({fn}) {

  const [value, setValue] = useState(0);

  const { currency } = useContext(CurrencyContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    fn(newValue)
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '5px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
        WebkitBoxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', MozBoxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: '10px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'  }}>
        
        {currency === 'pesos' ? 
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  variant="scrollable" scrollButtons allowScrollButtonsMobile>
          <Tab style={{fontFamily: 'inherit'}} label={<Logo src='https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/mercadopagoButton.png?alt=media&token=85836135-4828-48fd-a90c-b0ec56c78169' alt='MercadoPago' />} {...a11yProps(0)} /> 
          <Tab style={{fontFamily: 'inherit'}} label="TRANSFERENCIA" {...a11yProps(1)} />
          </Tabs>
          : 
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  variant="scrollable" scrollButtons allowScrollButtonsMobile>
            <Tab style={{fontFamily: 'inherit'}} label={<Logo src='https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Online_Primary_Acceptance_Mark_RGB_V2_small.jpg' alt='Paypal' />} {...a11yProps(2)} />
          </Tabs>
        }
          
      </Box>
      {currency === 'pesos' ? 
      <>
      <TabPanel style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}} value={value} index={0}>
        {window.innerWidth > 768 ? <img src="https://imgmp.mlstatic.com/org-img/banners/ar/medios/575X40.jpg" title="Mercado Pago - Medios de pago" alt="Mercado Pago - Medios de pago" width="575" height="40"/> 
        : <img src="https://imgmp.mlstatic.com/org-img/banners/ar/medios/120X240.jpg" title="Mercado Pago - Medios de pago" alt="Mercado Pago - Medios de pago" width="120" height="240"/>}
      </TabPanel>
      <TabPanel value={value} index={1} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', textAlign: 'center'}}>
          Si elegis abonar tu compra por transferencia, continua con el boton pagar y apareceran los datos para que la realices y finalices tu orden.
        Recorda enviar el comprobate a nuestro mail para que podamos confirmartela.
      </TabPanel>
      </>
      :
      <TabPanel style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}} value={value} index={0}>
        {window.innerWidth > 768 ? <img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Full_Online_Tray_RGB.png" border="0" alt="PayPal Acceptance Mark" />
        : <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" border="0" alt="PayPal Acceptance Mark" />}
      </TabPanel>
      }
    </Box>
  );
}