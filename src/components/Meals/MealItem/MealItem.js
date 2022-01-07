import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) =>{
    return (<li>
        <div className={classes.meal}>
            <h3>{props.meal.name}</h3>
            <div><MealItemForm cart={props.cart} meal={props.meal} onAddToCart={props.onAddToCart}/></div>
            <div dangerouslySetInnerHTML={{__html:props.meal.description}} className={classes.description}></div>
            <div className={classes.price}>{props.meal.price.formatted_with_symbol}</div>
        </div>
        
    </li>);
}
export default MealItem;