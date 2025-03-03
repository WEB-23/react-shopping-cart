import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// context Api
import { ProductContext } from "./contexts/ProductContext.js";
import { CartContext } from "./contexts/CartContext.js";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = item => {
    // add the given item to the cart
    setCart([...cart, item]);
  };

  const removeItem = key => {
    const filteredItems = cart.filter(item => {
      console.log(key, item.id);
      return key !== item.id;
    });
    setCart([...filteredItems]);
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation cart={cart} />

          {/* Routes */}
          <Route exact path="/" component={Products} />

          <Route path="/cart" render={() => <ShoppingCart cart={cart} />} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
