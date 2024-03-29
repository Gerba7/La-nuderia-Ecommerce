
import Tooltip from '@mui/material/Tooltip';

export default function BasicTooltip({child, title}) {
  return (
    <Tooltip sx={{textAlign: 'center'}} title={title}>
        {child}
    </Tooltip>
  );
}