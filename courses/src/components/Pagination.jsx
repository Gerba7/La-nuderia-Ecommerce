import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles'




const theme = createTheme({
    palette: {
      corporative: {
        main: '#216E8C',
        contrastText: '#fff',
      },
    },
});



export default function PaginationC({fn, count, current}) {

    const handleChange = (e) => {
        fn(e.target.textContent);
        window.scrollTo(0, 0);
      
    }

 

  return (

    <ThemeProvider theme={theme}>
        <Stack spacing={2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0px 50px 0px'}}>
            <Pagination count={count} color="corporative" onChange={handleChange} hideNextButton={true} hidePrevButton={true} />
        </Stack>
    </ThemeProvider>

  );

}