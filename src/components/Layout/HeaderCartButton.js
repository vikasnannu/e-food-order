import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {

    const [btnIsHighlighted, setbtnIsHighlighted] = useState(false);

    const cartCTX = useContext(CartContext);
    const { items } = cartCTX;
    const noOfCartItems = items.reduce((prev, curr) =>  {return prev + curr.quantity}, 0);
    
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setbtnIsHighlighted(true);
        const timer = setTimeout(() => {setbtnIsHighlighted(false);}, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onCartClick}>
            <span className={classes.icon}>
            <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
            {noOfCartItems}
            </span>
            <span></span>
        </button>
    );

};

export default HeaderCartButton;