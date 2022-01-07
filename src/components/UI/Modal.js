import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
const Backdrop = () =>{
    return<>
    <div className={classes.backdrop}/>
    </>
}

const Overlay =(props)=>{
    return<>
    <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
    </div>
    </>
}

const Modal = (props)=>{
    return<>
     {ReactDOM.createPortal(<Backdrop/>,document.getElementById('overlay'))};
     {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>,document.getElementById('overlay'))};
    </>
}

export default Modal;