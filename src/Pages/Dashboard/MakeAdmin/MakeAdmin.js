import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import useAuth from '../../../hooks/useAuth';


const MakeAdmin = () => {
    const [email,setEmail] = useState('');
    //declare success state
    const [success,setSuccess] = useState(false);
    const {token} = useAuth();

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleMakeAdmin = e => {
        e.preventDefault();
        const user = { email };

        fetch('http://localhost:5000/user/admin',{
            method: 'PUT',
            headers: {
                'authorization': `bearer ${token}`,
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount) {
                setSuccess(true);

            }
        })

    }
    return (
        <div>
            <h1>Make a admin</h1>
            <form onSubmit={handleMakeAdmin}>
                <TextField
                sx={{width: '50%'}}
                label="email"
                type="email"
                onBlur={handleOnBlur}
                variant="standard" />
                <Button type="submit" variant="contained">make an admin</Button>
            </form>
            {success && <Alert severity="success">created admin successfully</Alert>}
        </div>
    );
};

export default MakeAdmin;