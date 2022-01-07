import Card from "../UI/Card";
import MealsSummary from './MealSummary';
import classes from './AvailableMeals.module.css';
const MealsLoading=()=>{
    return <>
    <MealsSummary/>
    <Card>
    <div className={classes.meals}>
            <h3>Loading tasty food...</h3>
            </div>
    
    </Card>
    </>
}
export default MealsLoading;