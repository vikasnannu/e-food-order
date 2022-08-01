import React, {useState} from "react";
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from "./store/CartProvider";

function App() {

  const [cartIs, setCart] = useState(false);

  const showCartHandler = () => {
    setCart(true);
  };

  const hideCartHandler = () => {
    setCart(false);
  };


  return (
    <CartProvider>
      {cartIs && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
