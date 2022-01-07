import InputField from "../UI/InputField";
import classes from './Checkout.module.css';
import Card from "../UI/Card";
import Review from './Review';
import { Paper,Stepper, Step, StepLabel, Typography, CircularProgress, Divider } from "@material-ui/core";
import { useStripe, useElements, Elements,CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MealsLoading from "../Meals/MealsLoading";
import { useState, useEffect } from "react";
import { commerce } from "../../lib/Commerce";
import { Link } from 'react-router-dom';
import Confirmation from './Confirmation';
const Checkout =(props)=> {
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [address,setAddress]=useState('');
    const [token, setToken]=useState({id:''});
    const [cart,setCart]=useState({});
    useEffect(()=>{
        setCart(props.cart.total_items!==0 && props.cart)
    },[props.cart]);
    useEffect(()=>{
        {cart && getToken(cart)};
    },[cart]);
    const getToken =async (cart) =>{
        setToken(await commerce.checkout.generateTokenFrom('cart', cart.id));
        console.log(token);
    }
    const stripePromise = loadStripe('pk_test_51KDZcDJMXsAG6rhI0PFhqBKJ2vHVHZzQJjZwhOxvExFrEObSPLK7JbHU0Mzcen9jevkZLNhlp3sjSjaC4SoOdX7100FSeDbd8K');
    
    
    console.log(stripePromise);
    const handleSubmit = async (event, elements, stripe) => {
        console.log(stripe);
        event.preventDefault();
        
        if (!stripe || !elements) return;
    
        const cardElement = elements.getElement(CardElement);
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    
        if (error) {
          console.log('[error]', error);
        } else {
          const orderData = {
            line_items: token.live.line_items,
            customer: { firstname: firstName, lastname: lastName, email: email },
            shipping: { name: 'Local', street: address, town_city: address, county_state: 'D', postal_zip_code: address, country: 'IE' },
            fulfillment: {shipping_method: 'ship_QG375v9zXorMOg'},
            payment: {
              gateway: 'stripe',
              stripe: {
                payment_method_id: paymentMethod.id,
              },
            },
          };
    
          props.onCaptureCheckout(token.id, orderData);
          return <Card>
            <CircularProgress/>
          </Card>

        }
      };
      const firstNameChangeHandler=(event=>{
          setFirstName(event.target.value);
      });
      const lastNameChangeHandler=(event=>{
        setLastName(event.target.value);
    });
    const emailChangeHandler=(event=>{
        setEmail(event.target.value);
    });
    const addressChangeHandler=(event=>{
        setAddress(event.target.value);
    });
    console.log(props.order.id);
    return <>{props.order.id==='test' ? <section className={classes.meals}><Card>
    <h1>Checkout</h1>
{token.id!==''&&<Review token={token}/>}
<br></br>
<Card>
<h3>Delivery Details</h3>
<InputField type="text" value={firstName} onChange={firstNameChangeHandler} id='First Name'/>
<InputField type="text" value={lastName} onChange={lastNameChangeHandler} id='Last Name'/>
<InputField type="text" value={email} onChange={emailChangeHandler} id='Email'/>
<InputField type="text" value={address} onChange={addressChangeHandler}  id='Address'/>
</Card>
<br></br> 
<Card>
<h3>Payment Details</h3>   <br></br>  
<Elements stripe={stripePromise}>
 
    <ElementsConsumer>
        {({elements, stripe})=>(
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement/>
                <br>   
                </br>
                <div className={classes.item}>
                <Link to='/'>
                    <br></br>
                <button className={classes['button--alt']}  onClick={props.onCloseCart}>Back</button>
                </Link>
                <button type='submit' disabled={!stripe} className={classes['button--alt']}> 
                    Pay {token.id!=='' && token.live.subtotal.formatted_with_symbol}</button>
                </div>
                <br></br>
            </form>
            
        )}
    </ElementsConsumer>
</Elements>
</Card>
<br></br>
</Card>
</section>:<Confirmation onCloseCart={props.onCloseCart} order={props.order}/>}</>
                
        
}
export default Checkout;

/*

const handlePayment =(e, elements, stripe)=>{
            e.preventDefault();
            if (!stripe || !elements) return;

            const cardElement = elements.getElement(CardElement);
        
            const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
            if (error) {
                console.log('[error]', error);
              } else {
                const orderData = {
                  line_items: checkoutToken.live.line_items,
                  customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                  shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
                  fulfillment: { shipping_method: shippingData.shippingOption },
                  payment: {
                    gateway: 'stripe',
                    stripe: {
                      payment_method_id: paymentMethod.id,
                    },
                  },
                };
          
                props.onCaptureCheckout(checkoutToken.id, orderData);
              }
    }

*/
/*
commerce.services.localeListShippingCountries(token.id).then((response) => console.log(response));
    commerce.services.localeListShippingSubdivisions(token.id, 'IE').then((response) => console.log(response));
    commerce.checkout.getShippingOptions(token.id, {
      country: 'IE',
      region: 'D',
    }).then((response) => console.log(response));
*/