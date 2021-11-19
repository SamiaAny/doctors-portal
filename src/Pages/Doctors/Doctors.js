import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Doctor from '../Doctor/Doctor';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/alldoctors')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
            })
    }, [])

    return (
        <div>
            <h2>All Doctors</h2>
            <Container>
                <Grid container spacing={2}>
                    {
                        doctors.map(doctor => <Doctor key={doctor.id} doctor={doctor}></Doctor>)
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default Doctors;