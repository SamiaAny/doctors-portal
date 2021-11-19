import React, { useState } from 'react';
import Calendar from '../../../Shared/Calendar/Calendar';
import Appointments from '../Appointments/Appointments';
import { Grid } from '@mui/material';

const DashboardHome = () => {
    const [date, setDate] = useState(new Date());
    return (
        <div>
            <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                        <Calendar
                            date={date}
                            setDate={setDate}
                        ></Calendar>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Appointments date={date}></Appointments>
                    </Grid>

                </Grid>
        </div>
    );
};

export default DashboardHome;