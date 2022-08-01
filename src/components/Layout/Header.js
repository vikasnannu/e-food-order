import React, {Fragment} from "react";
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = props => {
    
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>VikasReactMeals</h1>
                <HeaderCartButton onCartClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="Table With Food" />
            </div>
        </Fragment>
    );
};

export default Header;