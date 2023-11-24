import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserContext from '../components/Usercontext';
import "./../styles/signin.css"

const defaultTheme = createTheme();

function SignIn() {
  const navigate = useNavigate();
  const { username, setUsername } = useContext(UserContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedValues = localStorage.getItem('rememberedValues');

    if (storedValues) {
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    if (rememberMe) {
      localStorage.setItem(
        'rememberedValues',
        JSON.stringify({ email: data.get('email'), password: data.get('password') })
      );
    } else {
      localStorage.removeItem('rememberedValues');
    }

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
        }),
      });

      const result = await response.json();

      console.log(result);

      if (result.success) {
        const response2 = await fetch('http://localhost:5000/api/getUsername', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.get('email'),
            password: data.get('password'),
          }),
        });

        const userResponse = await response2.json();
        const usernameFromServer = userResponse.username;

        setUsername(usernameFromServer);

        console.log('Login successful');
        console.log('User Identity:', result.identity);

        const identity = result.identity;
        if (identity === 'patelstudent') {
          // Use navigate to redirect
          navigate('/patelstudent');
        } else if (identity === 'tilakstudent') {
          // Use navigate to redirect
          navigate('/tilakstudent');
        } else if(identity === 'cheifwarden'){
          navigate('/cheifwarden');
        } else if(identity === 'accountant'){
          navigate('/accountant');
        }
      } else {
        console.error('Login failed');
        console.error('Error message:', result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }

    // Your existing code for form submission...

    setLoading(false);
  };

  return (
    <div className='signinouterdiv' >
      <ThemeProvider theme={defaultTheme}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust the opacity as needed
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)', // Apply the blur effect
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup">
                  <p>Don't have an account? Sign Up</p>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}

export default SignIn;
