import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css';
const HeaderCartButton=(props)=>{
    return<>
    <button onClick={props.onViewCart} className={classes.button}>
        <span className={classes.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{props.cartItems.total_items}</span>
    </button>
    </>
}
export default HeaderCartButton;