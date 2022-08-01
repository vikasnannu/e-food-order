import React, {useContext} from "react";
import CartContext from '../../../store/cart-context';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css'

const MealItem = props => {

    const cartCTX = useContext(CartContext);

    const price = `$ ${props.price.toFixed(2)}`;

    const addToCart = quantity => {
        cartCTX.addItem({id: props.id, name: props.name, quantity:quantity, price:props.price})
    };

    return (
        <li className={classes.meal}>
            
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            
            <div>
                <MealItemForm onAddToCart={addToCart} />
            </div>
            
        </li>
    );
};

export default MealItem;