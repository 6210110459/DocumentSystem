import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://cds.psu.ac.th/">
        CDS PSU
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const roleregis = [ 'student', 'teacher', 'admin'];

const theme = createTheme();

export default function Registeruser() {
  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const jsonData = {
      email: data.get('email'),
      passwords: data.get('password'),
      ffname: data.get('firstName'),
      llname: data.get('lastName'),
      roleuser: data.get('statusRole'),
    }

    fetch("http://localhost:8004/registeruser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then(response => response.json())
      .then(data => {
        if ( data.status === 'ok') {
          // alert('register success')
          // window.location = "/login"
          alert('register failed')
        } else {
          // alert('register failed')
          alert('register success')
          window.location = "/"
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ width: 120, height: 50 }} variant="square" src="https://th.bing.com/th/id/R.b9728253a291e38e5c26d32df88656c4?rik=vrq1i33eCXYVkg&riu=http%3a%2f%2fpsubrand.psu.ac.th%2fimages%2f844c4e0432d116f15618cb3e3bc6f01b.jpg&ehk=hT83mycFKzhQIVvn0G5IRERJg%2bF0wksscEC8xBEjFFg%3d&risl=&pid=ImgRaw&r=0"></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="status"
                  label="Status ex: student, teacher, admin"
                  name="statusRole"
                  autoComplete="role"
                />
              </Grid>
          
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address ex: student=>IDstudnetor@email.psu.ac.th"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Do have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}