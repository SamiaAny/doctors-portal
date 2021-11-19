import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Input } from '@mui/material';



const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [image,setImage] = useState(null);
    const [success,setSuccess] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(name,email,image);
        // if(!image) {
        //     //return if image not found
        //     return;
        // }

        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('image',image);

        console.log(formData,'dorm');
        console.log('dorm');

        fetch('http://localhost:5000/alldoctors',{
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId) {
                console.log('added doctor successfullly');
                setSuccess(true);
            }
        })
    }

    return (
        <div>
            <h1>Add Doctor</h1>
            <form onSubmit={handleSubmit}>
                <TextField 
                label="name" 
                variant="outlined" 
                onBlur={e => setName(e.target.value)}
                required /><br />
                <TextField 
                label="email" 
                variant="outlined" 
                onBlur={e => setEmail(e.target.value)}
                required /><br />
                <Input 
                accept="image/*" 
                type="file"
                onBlur={e => setImage(e.target.files[0])} />
                <input type="submit" value="submit" />
            </form>
            {success && <p style={{color:'green'}}>added doctor successfullly</p>}
        </div>
    );
};

export default AddDoctor;