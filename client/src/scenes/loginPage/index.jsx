import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './form';

function LoginPage() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1020px)');
  return (
    <Box
      width='100%'
      backgroundColor={theme.palette.background.alt}
      p='1rem 6%'
    >
      <Box>
        <Typography
          fontWeight='bold'
          fontSize='32px'
          color='primary'
          textAlign='center'
        >
          Sociopedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5' }}>
          Welcome to Sociapedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}

export default LoginPage;
