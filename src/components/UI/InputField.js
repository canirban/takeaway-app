import classes from './InputField.module.css';
const InputField = (props) =>{
    return <div className={classes.control}>
    <label htmlFor={props.id}>{props.id}</label>
    <input
            type={props.type}
            value={props.value}
            id={props.id}
            onChange={props.onChange}
            required
          />
          </div>
}
export default InputField;