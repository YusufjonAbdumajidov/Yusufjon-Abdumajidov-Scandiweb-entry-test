export const activeCategory = (category) => ({
    type: "SET_ACTIVE_CATEGORY",
    payload: category,
});
export const cart = () => ({
    type: "UNSET_ACTIVE_CATEGORY",
});
export const toggleCurrencyBlock = (param) => ({
    type: "TOGGLE_CURRENCY_BLOCK",
    payload: param,
});
export const toggleCartBlock = (param) => ({
    type: "TOGGLE_CART_BLOCK",
    payload: param,
});
export const activeCurrency = (currency) => ({
    type: "SET_ACTIVE_CURRENCY",
    payload: currency,
});



export const addToCart = (item) => ({
    type: "ADD_TO_CART",
    payload: item,
});
  
export const minusCart = (item) => ({
    type: "MINUS_ITEM",
    payload: item,
});
export const removeItem = (item) => ({
    type: "REMOVE_ITEM",
    payload: item,
});
export const cleanCart = (item) => ({
    type: "CLEAN_CART",
});




export const setActiveImg = (src) => ({
    type: "SET_ACTIVE_IMG",
    payload: src,
});
export const setActiveParams = (param) => ({
    type: "SET_ACTIVE_PARAMS",
    payload: param,
});
export const unsetParams = () => ({
    type: "UNSET_PARAMS",
});
  
  