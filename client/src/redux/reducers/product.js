const initialState = {
  activeImg: null,
  activeParams: [],
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_IMG":
      return {
        ...state,
        activeImg: action.payload,
      };

    case "SET_ACTIVE_PARAMS":
      return {
        ...state,
        activeParams: !state.activeParams.find(
          (param) => param.paramName === action.payload.paramName
        )
          ? [...state.activeParams, action.payload]
          : state.activeParams.map((param) => {
              if (param.paramName === action.payload.paramName) {
                return action.payload;
              } else {
                return param;
              }
            }),
      };

    case "UNSET_PARAMS":
      return {
        ...state,
        activeParams: [],
      };
    default:
      break;
  }
  return state;
};
export default product;
