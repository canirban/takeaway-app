import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from './AvailableMeals.module.css';



  const AvailableMeals =(props)=>{
    return<section className={classes.meals}>
        <Card>
            <ul>{props.meals.map((meal)=><MealItem  key={meal.id} meal={meal} onAddToCart={props.onAddToCart}/>)}</ul>
        </Card>
        </section>
  }
  export default AvailableMeals;