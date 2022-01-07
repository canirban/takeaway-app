import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
const Cart = (props) =>{
const cartItem = (
<ul className={classes['cart-items']}>
    {props.cart.line_items.map((item)=>
    <li>
        <div className={classes.item}>{item.name}
        <button className={classes['button--alt']} onClick={()=>props.onUpdateCart(item.id,item.quantity-1)}>-</button>
        <span>{item.quantity}</span>
        <button className={classes['button--alt']} onClick={()=>props.onUpdateCart(item.id,item.quantity+1)}>+</button>
        <span className={classes.itemprice}>{item.line_total.formatted_with_symbol}</span>
        </div>
        <br/>
    </li>
    )}
</ul>
);
return<>
    <Modal>
        {props.cart.total_items!==0 ? <>
            {cartItem}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{props.cart.subtotal.formatted_with_symbol}</span>
        </div>
        <div className={classes.actions}>
            <button  onClick={props.onCloseCart} className={classes['button--alt']}>Close</button>
           <button onClick={props.onEmptyCart} className={classes['button--alt']}>Empty Cart</button>
           <Link to='/checkout'>
            <button onClick={()=>props.gotoCheckout(props.cart.id)} className={classes.button}>Checkout</button>
            </Link>
        </div>
        </>:<>
         <h3>Empty Cart, Come on add some food!</h3>
         <div className={classes.actions}>
         <button onClick={props.onCloseCart} className={classes['button--alt']}>Close</button>
         </div>
         </>
        }
    </Modal>
</>

}
export default Cart;