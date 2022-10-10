const initialState = {
  activeCategory: "all",
  toggleCurrencyBlock: false,
  toggleCartBlock: false,
  activeCurrency: "$",
};
const navCategories = (state = initialState, action) => {
  if (action.type === "SET_ACTIVE_CATEGORY") {
    return {
      ...state,
      activeCategory: action.payload,
    };
  }
  if (action.type === "UNSET_ACTIVE_CATEGORY") {
    return {
      ...state,
      activeCategory: null,
    };
  }
  if (action.type === "TOGGLE_CURRENCY_BLOCK") {
    return {
      ...state,
      toggleCurrencyBlock:
        action.payload === false ? false : !state.toggleCurrencyBlock,
    };
  }
  if (action.type === "TOGGLE_CART_BLOCK") {
    return {
      ...state,
      toggleCartBlock:
        action.payload === false ? false : !state.toggleCartBlock,
    };
  }
  if (action.type === "SET_ACTIVE_CURRENCY") {
    return {
      ...state,
      activeCurrency: action.payload,
    };
  }
  return state;
};

export default navCategories;
