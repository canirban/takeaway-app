import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';

const Header=(props)=>{
    return<>
    <header className={classes.header}>
    <Link to='/'>
    <h1>Ani's Takeaway</h1>
    </Link>
    <HeaderCartButton onViewCart={props.onViewCart} cartItems={props.cartItems}/>
    </header>
    
    <div className={classes['main-image']}>
        <img src='https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg'
        alt='Food Banner'/>
    </div>
    </>
}
export default Header;