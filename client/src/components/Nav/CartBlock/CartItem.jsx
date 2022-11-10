import React from "react";

class CartItem extends React.Component {
  render() {
    return <>
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
          <p style={{ fontSize: "20px", fontWeight: "600" }} className="item__title">{this.props.item.items[0].itemBrand}</p>
          <p style={{ fontSize: "20px", fontWeight: "300" }} className="item__name">{this.props.item.items[0].itemName}</p>
          <h3  style={{ fontSize: "16px", fontWeight: "700" }} className="item__price">
            {this.props.currency}
            {
              this.props.item.items[0].itemPrice.find(
                (price) => price.currency.symbol === this.props.currency
              ).amount
            }
          </h3>

          <ul  className="item__params">
            {this.props.item.items[0].params.map((param, idx) => {
              return (
                <li style={{fontSize: "16px"}} key={idx}>
                  {param.paramName}:
                  {param.paramName !== "Color" ? (
                    <span style={{ fontSize: "14px", fontWeight: "400", padding: "8px 14px" }}>{param.paramValue}</span>
                  ) : (
                    <p
                      className="color"
                      style={{ backgroundColor: param.paramValue }}
                    ></p>
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
          <div  className="item__img">
            <img  src={this.props.item.items[0].itemGallery[0]} alt="" />
          </div>
        </div>
      </div>

      </>
  }
}

export default CartItem;