import React, { useContext, useState } from "react";
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Checkout from './Checkout';
import CartContext from '../../store/cart-context';

const Cart = props => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCTX = useContext(CartContext);

    const totalAmount = `$ ${cartCTX.totalAmount.toFixed(2)}`;
    const hasItems = cartCTX.items.length > 0;

    const cartItemRemove = id => {
        cartCTX.removeItem(id);
    };

    const cartItemAdd = item => {
        cartCTX.addItem({...item, quantity:1});
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://food-order-app-react-ac3ed-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', 
                            {method: 'POST', body: JSON.stringify({user: userData, orderedItems: cartCTX.items})});

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCTX.clearCart();
    };

    const cartItems = (<ul className={classes['cart-items']}> 
                        {cartCTX.items.map((item) => 
                        (<CartItem 
                        key={item.id} 
                        name={item.name} 
                        quantity={item.quantity} 
                        price={item.price} 
                        removeItem={cartItemRemove.bind(null, item.id)} 
                        addItem={cartItemAdd.bind(null, item)} />))} 
                    </ul>);

    const modalActions = 
                        <div className={classes.actions}>
                            <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
                        </div>;

    const cartModelContent = 
                            <React.Fragment>
                                {cartItems}
                                <div className={classes.total}>
                                    <span>Total Amount</span>
                                    <span>{totalAmount}</span>
                                </div>
                                {isCheckout && <Checkout confirmOrder={submitOrderHandler} cancelCheckout={props.onHideCart} />}
                                {!isCheckout && modalActions}
                            </React.Fragment>;

    const isSubmittingModalContent = <p>Sending Order Data...</p>;

    const didSubmitModalContent = <React.Fragment>
                                        <p>Succesfully Sent The Order!</p>
                                        <div className={classes.actions}>
                                            <button className={classes.button} onClick={props.onHideCart}>Close</button>
                                        </div>
                                    </React.Fragment>;


    return (
        <Modal onHideCart={props.onHideCart}> 
            {!isSubmitting && !didSubmit && cartModelContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;

