import React from "react";

class CartItem extends React.Component {
  render() {
    return (
      <div className="cart__item">
        <button
          className="remove-btn"
          onClick={() => {
            this.props.onRemoveProduct(this.props.item.items[0]);
          }}
        >
          remove
        </button>
        <div className="cart__item-desc">
          <p className="item__title">{this.props.item.items[0].itemBrand}</p>
          <p className="item__name">{this.props.item.items[0].itemName}</p>
          <h3 className="item__price">
            {this.props.currency}
            {
              this.props.item.items[0].itemPrice.find(
                (price) => price.currency.symbol === this.props.currency
              ).amount
            }
          </h3>

          <ul className="item__params">
            {this.props.item.items[0].params.map((param, idx) => {
              return (
                <li key={idx}>
                  {param.paramName}:
                  {param.paramName !== "Color" ? (
                    <span>{param.paramValue}</span>
                  ) : (
                    <span
                      className="color"
                      style={{ backgroundColor: param.paramValue }}
                    ></span>
                  )}
                </li>
              );
            })}
          </ul>
          <span className="item__params">{this.props.item.items[0].param}</span>
        </div>
        <div className="cart__item-img">
          <div className="item__amount">
            <button
              className="btn"
              onClick={() => {
                this.props.onAddItem(this.props.item.items[0]);
              }}
            >
              +
            </button>
            <span>{this.props.item.totalItemCount}</span>
            <button
              className="btn"
              onClick={() => {
                this.props.onMinusItem(this.props.item.items[0]);
              }}
              disabled={this.props.item.totalItemCount === 1}
            >
              -
            </button>
          </div>
          <div className="item__img">
            <img src={this.props.item.items[0].itemGallery[0]} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
