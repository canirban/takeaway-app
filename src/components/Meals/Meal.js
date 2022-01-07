import AvailableMeals from "./AvailableMeals"
import MealsSummary from "./MealSummary"

const Meal=(props)=>{
return<>
    <MealsSummary/>
    <AvailableMeals meals={props.allMeals} onAddToCart={props.onAddToCart}/>
    </>
}
export default Meal;