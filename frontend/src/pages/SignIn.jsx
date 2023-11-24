import * as React from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserContext from '../components/Usercontext';


function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function SignIn() {
  const { username, setUsername } = useContext(UserContext);
  
  
  const navigate = useNavigate();
  // const history = useHistory();

  const [rememberMe, setRememberMe] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    const storedValues = localStorage.getItem('rememberedValues');

    if (storedValues) {
      setInitialValues(JSON.parse(storedValues));
      setRememberMe(true);
    }
  }, []);


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (rememberMe) {
      localStorage.setItem('rememberedValues', JSON.stringify({ email: data.get('email'), password: data.get('password') }));
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

      // Handle the result as needed
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

      const userResponse =  await response2.json();
      console.log(userResponse.data);
        const usernameFromServer = userResponse.username;

        setUsername(usernameFromServer);

        console.log('Login successful');
        console.log('User Identity:', result.identity);

        const identity = result.identity;
        if (identity === "patelstudent") {
          navigate("/patelstudent");
        } else if (identity === "tilakstudent") {
          navigate("/tilakstudent");
        }
      } else {
        console.error('Login failed');
        console.error('Error message:', result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };



    // if (data.get('email') === 'sourapatel' && data.get('password') === '7811069775') {
    //   navigate('/patelstudent');  // Use navigate to redirect
    // } 
    // if (data.get('email') === 'souratilak' && data.get('password') === '7811069775') {
    //   navigate('/patelstudent');  // Use navigate to redirect
    // } 
    // if (data.get('email') === 'cheifwarden' && data.get('password') === '7811069775') {
    //   navigate('/cheifwarden');  // Use navigate to redirect
    // } 
    // if (data.get('email') === 'accountant' && data.get('password') === '7811069775') {
    //   navigate('/accountant');  // Use navigate to redirect
    // } 


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

