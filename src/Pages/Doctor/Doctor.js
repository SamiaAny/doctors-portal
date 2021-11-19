import { Grid } from '@mui/material';
import React from 'react';

const Doctor = (props) => {
    const {name,image} = props.doctor;
    return (
        <Grid item xs={12} sm={6} md={4} >
            <img src={`data:image/png;base64,${image}`} width="200px" height="200px"   alt="" />
            <h4>{name}</h4>
        </Grid>
    );
};

export default Doctor;