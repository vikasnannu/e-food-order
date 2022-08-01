import React, { useRef, useState } from "react";
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {

    const [qunatIsValid, setQuantIsValid] = useState(true)

    const quantityInputRef = useRef()

    const submitHandler = event => {
        event.preventDefault();
        
        const enteredQuantity = +(quantityInputRef.current.value);
        console.log(enteredQuantity);
        
        if(enteredQuantity.length === 0 || enteredQuantity < 1 || enteredQuantity > 5) {
            setQuantIsValid(false);
            return;
        }

        props.onAddToCart(enteredQuantity);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={quantityInputRef} label="Quantity" input={{id: 'amount_' + props.id, type: 'number', min: '1', max: '5', step: '1', defaultValue: '1'}} />
            <button>+ Add</button>
            {!qunatIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    );
};

export default MealItemForm;