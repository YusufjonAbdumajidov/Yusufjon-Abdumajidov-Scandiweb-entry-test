import { combineReducers } from "redux";

import nav from "./nav";
import product from "./product";
import cart from "./cart";

const rootReducer = combineReducers({
  nav,
  product,
  cart,
});

export default rootReducer;
