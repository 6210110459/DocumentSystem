import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Registeruser from './Registeruser';

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

const theme = createTheme();

export default function SignInSide() {

    const handleSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const jsonData = {
            email: data.get('email'),
            passwords: data.get('passwords'),
        }

        fetch("http://localhost:8004/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    alert('login success')
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('users', data.data)
                    if (data.data[0].roleuser === 'student') {
                        window.location = "/home"
                    } else if (data.data[0].roleuser === 'teacher') {
                        window.location = "/teacher/home"
                    } else {
                        window.location = "/admin/home"
                    }
                } else {
                    alert('login failed')
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://th.bing.com/th/id/OIP.gg0F7OJ9c9CnK5C8WOgpPgHaHa?pid=ImgDet&w=500&h=500&rs=1)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ width: 120, height: 50 }} variant="square" src="https://th.bing.com/th/id/R.b9728253a291e38e5c26d32df88656c4?rik=vrq1i33eCXYVkg&riu=http%3a%2f%2fpsubrand.psu.ac.th%2fimages%2f844c4e0432d116f15618cb3e3bc6f01b.jpg&ehk=hT83mycFKzhQIVvn0G5IRERJg%2bF0wksscEC8xBEjFFg%3d&risl=&pid=ImgRaw&r=0">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography sx={{ mt: 3, mb: 2 }} component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="๊PSU passport"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="passwords"
                                label="Password"
                                type="password"
                                id="passwords"
                                autoComplete="current-password"
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
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>

                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}