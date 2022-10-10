import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import Product from "./pages/Product";
import Nav from "./components/Nav/Nav";
import CartPage from "./pages/CartPage";

class App extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/product/:id">
            <Product />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
        </Switch>
      </>
    );
  }
}

export default App;
