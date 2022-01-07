import {CircularProgress } from '@material-ui/core';
import classes from './Checkout.module.css';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
const Confirmation = ({order, onCloseCart}) =>{
    return <Card>
    {order===undefined?<>
    <h3>Processing your order please wait..</h3>
    <CircularProgress/></>:<>
    <h3>Thank you for your order, your food will be delivered soon</h3>
    <div className={classes.item}>
    <Link to='/'>
        <br></br>
    <button className={classes['button--alt']}  onClick={onCloseCart}>Back</button>
    </Link>
    </div>
    </>}
    </Card>

}
export default Confirmation;