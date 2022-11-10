import React from "react";
import CartItem from "../components/Nav/CartBlock/CartItem";

import { connect } from "react-redux";

import { activeCategory } from "../redux/actions";
import { addToCart, minusCart, removeItem } from "../redux/actions";
import { Link } from "react-router-dom";

import emptyCartImage from "../assets/empty_cart.jpg";

class CartPage extends React.Component {
  render() {
    const onPlusCart = (item) => {
      this.props.dispatchAddToCart(item);
    };
    const onMinusCart = (item) => {
      this.props.dispatchMinusCart(item);
    };
    const onRemoveItem = (item) => {
      if (window.confirm("Are you sure to remove item?")) {
        this.props.dispatchRemoveItem(item);
      }
    };
    return (
      <>
        <div className="container cart">
          <h1 style={{ fontSize: "32px", fontWeight: "700" }}>Cart</h1>
          {this.props.cart.totalCount > 0 ? (
            Object.values(this.props.cart.items).map((item, idx) => {
              return (
                <CartItem
                  item={item}
                  currency={this.props.currency}
                  key={idx}
                  onAddItem={onPlusCart}
                  onMinusItem={onMinusCart}
                  onRemoveProduct={onRemoveItem}
                />

              );
            })
           
          ) : (
            <div className="cart__empty">
              <div className="cart__empty-img">
                <img style={{height: "370px", transform: "translateY(-100px)"}} src={emptyCartImage} alt=""/>
              </div>
              <p>Please Add Item in your cart!</p>
              <Link
                to="/"
                onClick={() => {
                  this.props.dispatchActiveCategory("all");
                }}
              >
                <button>START SHOPPING</button>
              </Link>
            </div>
          )}
          <div style={{ marginTop: "30px", fontSize: "24px", fontHeight: "28px", fontWeight: "400", color: "#1D1F22", lineHeight: "28px"}} className="cart_total_price">
            <p >Tax 21%: <span style={{fontWeight: "700", marginLeft: "6px"}}>${ parseFloat((21 / 100) *  (this.props.cart.totalPrice[this.props.currency] &&
                  this.props.cart.totalPrice[this.props.currency]) ??
                  0).toFixed(2)}</span></p>
            <p>Quantity: <span style={{fontWeight: "700", marginLeft: "6px"}}>{this.props.cart.totalCount}</span></p>
            <p>Total: <span style={{fontWeight: "700", marginLeft: "6px"}}> {this.props.currency}
                {parseFloat((this.props.cart.totalPrice[this.props.currency]  &&
                  this.props.cart.totalPrice[this.props.currency] + 
                  (21 / 100) *  (this.props.cart.totalPrice[this.props.currency] &&
                    this.props.cart.totalPrice[this.props.currency])) ??
                  0  ).toFixed(2)}</span></p>
                <button style={{marginTop: "20px", backgroundColor: "#5ECE7B", fontSize: "16px", color: "#fff", padding: "14px 120px", cursor: "pointer"}}>Order</button>
          </div>
        </div>
        
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddToCart: (item) => {
      dispatch(addToCart(item));
    },
    dispatchMinusCart: (item) => {
      dispatch(minusCart(item));
    },
    dispatchRemoveItem: (item) => {
      dispatch(removeItem(item));
    },
    dispatchActiveCategory: (category) => {
      dispatch(activeCategory(category));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.nav.activeCurrency,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);





