import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, {useState,useEffect} from 'react';
import './Checkout.css';
import useAuth from '../../../../hooks/useAuth';
import { CircularProgress } from '@mui/material';

const Checkout = ({ appointment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { price,patientName,_id } = appointment;
  const [clientSecret,setClientSecret] = useState('');
  const [processing,setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success,setSuccess] = useState('');
  const { user } = useAuth();

  useEffect(()=>{
    fetch('http://localhost:5000/create-payment-intent',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({price})
    })
    .then(res => res.json())
    .then(data => setClientSecret(data.clientSecret))
  },[price])

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    console.log('click');

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      console.log(error);
      setError(error.message);
    }
    else {
      console.log(paymentMethod);
      setError('');
    }

    const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: user.email
          },
        },
      },
    );

    if(intentError) {
      setError(intentError.message);
      setSuccess('');
    }
    else {
      setSuccess('successful');
      console.log(paymentIntent);
      setError('');
      setProcessing(false);
      //save to db
      const payment = {
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        last4: paymentMethod.card.last4,
        client_secret: paymentIntent.client_secret.slice('_secret')[0],
      }
      const url = `http://localhost:5000/appointments/${_id}`;
      fetch(url,{
        method: 'PUT',
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify(payment)
      })
    }


  }
  return (
    <div>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        { processing ? <CircularProgress/> : <button className="checkout-btn" type="submit" disabled={!stripe || success}>
          Pay ${price}
        </button>}
      </form>
      {
        error && <div style={{color: 'red'}}>{error}</div>
      } 
      {success && <div style={{color: 'green'}}>{success}</div>}   
    </div>
  );
};

export default Checkout;