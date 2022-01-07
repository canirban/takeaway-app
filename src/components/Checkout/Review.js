import classes from '../Meals/MealItem/MealItem.module.css';
import Card from '../UI/Card';
const Review = (props) =>{
    return <Card>
            <h3>Order Summary</h3>
            <ul>{props.token.live.line_items.map((meal)=>(
                <li key={meal.name}>
                <div className={classes.meal}>
                    <h4>{meal.name}</h4>
                    <h6>Quantity : {meal.quantity}</h6>
                    <div className={classes.price}>{meal.line_total.formatted_with_symbol}</div>
                </div>
                
            </li>
            ))}</ul>

            <div>
            <h3>Total : {props.token.live.subtotal.formatted_with_symbol}</h3>
            </div>

        </Card>
}
export default Review;