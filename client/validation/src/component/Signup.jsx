import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import { FormLabel } from '@mui/material';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
// danish

// objects of signups
const countries = ['Turky', 'USA', 'india'];
const states = ['Bangalore', 'Delhi', 'Mumbai'];
const cities = ['dwarka', 'najafgarh', 'pritampura'];


const defaultTheme = createTheme();


export default function SignUp() {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        state: '',
        city: '',
        gender: '',
        dateOfBirth: null,
        age: '',
    });

    const [gender, setGender] = useState('');
    const navigate = useNavigate()
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Calculate age when dateOfBirth changes
        if (name === 'dateOfBirth') {
            const dob = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            setFormData({ ...formData, age: age.toString() });
        }
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            dateOfBirth: date,
            age: calculateAge(date),
        });
    };
    const calculateAge = (birthDate) => {
        if (!birthDate) return '';

        const today = dayjs();
        const years = today.diff(birthDate, 'year');
        const dobPlusYears = birthDate.add(years, 'year');
        const months = today.diff(dobPlusYears, 'month');

        return `${years} years ${months} months`;
    };
    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setFormData({ ...formData, gender: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("datassssss",data)
                localStorage.setItem('name', data.firstName); 
                localStorage.setItem('name', data.lastName); 

                toast.success('User created successfully!', "Success");
                navigate('/login')
                console.log('User created:', data.user);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'An error occurred';
                toast.error(errorMessage, "Error");
                console.error('Failed to create user:', errorMessage);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('An error occurred while processing your request', "Error");
        }
    };


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
                        <img src='https://media.licdn.com/dms/image/C510BAQF2j2EVmPxZXQ/company-logo_200_200/0/1630618243372/frequentresearch_logo?e=2147483647&v=beta&t=OgTsy4yZsHcJUzMqsX6hekPQcGT5R1cbud04WTXQRzQ'
                            style={{
                                backgroundImage: "inherit",
                                backgroundSize: "cover",
                                width:"70px",
                                height:"70px"
                            }}
                        />
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    inputProps={{ pattern: '^[A-Za-z ]+$', title: 'Must contain alphabets only' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    inputProps={{ pattern: '^[A-Za-z ]+$', title: 'Must contain alphabets only' }}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    // Validation for valid email format
                                    type="email"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {/* Dropdown for countries */}
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    id="country"
                                    //   label="Country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    {countries.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    id="state"
                                    //   label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="">Select State</option>
                                    {states.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* City Dropdown */}
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    required
                                    fullWidth
                                    id="city"
                                    //   label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="">Select City</option>
                                    {cities.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Date of Birth"
                                        value={formData.dateOfBirth}
                                        onChange={handleDateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                    type="text"
                                    value={formData.age}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleGenderChange} row>
                                            <FormLabel component="legend">Gender :</FormLabel>
                                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to={'/login'}>
                                <Link path='login' variant="body2">
                                    Already have an account? Sign in
                                </Link>

                                </NavLink>
                                
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
