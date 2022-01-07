import {Button} from '@material-ui/core';
import classes from './MealItemForm.module.css';
const MealItemForm = (props) =>{
    return<>
    <div className={classes.cart}>
    <button onClick={()=>{props.onAddToCart(props.meal.id,1)}}>Add</button>
    </div>
    </>
}
export default MealItemForm;