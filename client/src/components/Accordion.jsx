import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




export default function SimpleAccordion({title, content}) {

  return (
    <div>
      <Accordion sx={{borderRadius: '0px', border: 'none', fontFamily: 'inherit'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{fontWeight: '700', fontFamily: 'inherit'}}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{fontFamily: 'inherit'}}>
            {content}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );

}



