import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_51JwZxTKEpEY0YmeSryG2peQE7sy9FKOKh0PV1IIyOY8Fsjv4Wi3eNb3sXvFD1kAB1KGRBCthF0oQwBAjva7dFV5S000NxBpYMn');

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointmentInfo, setAppointmentInfo] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAppointmentInfo(data);

            })
    }, [appointmentId]);
    return (
        <div>
            <h1>{appointmentInfo.patientName} Pay for: {appointmentInfo.serviceName}</h1>
            <p>Price: ${appointmentInfo.price}</p>
            {appointmentInfo?.price && <Elements stripe={stripePromise}>
                <Checkout 
                appointment ={appointmentInfo}
                />
            </Elements>}
        </div>
    );
};

export default Payment;