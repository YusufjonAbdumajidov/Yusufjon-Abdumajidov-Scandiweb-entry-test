const initialState = {
  items: {},
  totalPrice: {},
  totalCount: 0,
};
const cart = (state = initialState, action) => {
  const getCurrentItems = (payload) => {
    return !state.items[
      payload.id +
        action.payload.params
          .map((param) => {
            return param.paramValue;
          })
          .join("")
    ]
      ? [payload]
      : [
          ...state.items[
            payload.id +
              action.payload.params
                .map((param) => {
                  return param.paramValue;
                })
                .join("")
          ].items,
          payload,
        ];
  };

  const getNewItems = (payload) => {
    return {
      ...state.items,
      [payload.id +
      action.payload.params
        .map((param) => {
          return param.paramValue;
        })
        .join("")]: {
        items: getCurrentItems(payload),
        totalItemPrice: [
          ...[payload.itemPrice].map((item) => {
            return item.reduce((acc, cur) => {
              const amount = cur.amount * getCurrentItems(payload).length;
              acc[cur.currency.symbol] = amount;
              return acc;
            }, {});
          }),
        ][0],
        totalItemCount: getCurrentItems(payload).length,
      },
    };
  };

  function sumObjectsByKey(objs) {
    return objs.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k)) a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
  }

  const getTotalPrice = (items) => {
    return sumObjectsByKey(
      Object.values({ ...items }).map((el) => el.totalItemPrice)
    );
  };

  const getTotalCount = (items) => {
    return Object.values({ ...items }).reduce((acc, cur) => {
      return acc + cur.totalItemCount;
    }, 0);
  };

  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        items: getNewItems(action.payload),
        totalPrice: getTotalPrice(getNewItems(action.payload)),
        totalCount: getTotalCount(getNewItems(action.payload)),
      };
    }

    case "MINUS_ITEM": {
      const oldItems =
        state.items[
          action.payload.id +
            action.payload.params
              .map((param) => {
                return param.paramValue;
              })
              .join("")
        ].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[
              action.payload.id +
                action.payload.params
                  .map((param) => {
                    return param.paramValue;
                  })
                  .join("")
            ].items.slice(1)
          : oldItems;
      const newItems = {
        ...state.items,
        [action.payload.id +
        action.payload.params
          .map((param) => {
            return param.paramValue;
          })
          .join("")]: {
          items: newObjItems,
          totalItemPrice: [
            ...[action.payload.itemPrice].map((item) => {
              return item.reduce((acc, cur) => {
                const amount = cur.amount * newObjItems.length;
                acc[cur.currency.symbol] = amount;
                return acc;
              }, {});
            }),
          ][0],
          totalItemCount: newObjItems.length,
        },
      };

      return {
        ...state,
        items: newItems,
        totalPrice: getTotalPrice(newItems),
        totalCount: getTotalCount(newItems),
      };
    }

    case "REMOVE_ITEM": {
      const newItems = {
        ...state.items,
      };

      delete newItems[
        action.payload.id +
          action.payload.params
            .map((param) => {
              return param.paramValue;
            })
            .join("")
      ];

      return {
        ...state,
        items: newItems,
        totalPrice: getTotalPrice(newItems),
        totalCount: getTotalCount(newItems),
      };
    }

    case "CLEAN_CART": {
      return initialState;
    }
    default:
      break;
  }

  return state;
};
export default cart;
