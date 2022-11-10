import React from "react";

import { connect } from "react-redux";
import { toggleCartBlock, cart } from "../../../redux/actions";
import {
  addToCart,
  minusCart,
  removeItem,
  cleanCart,
} from "../../../redux/actions";
import { Link } from "react-router-dom";

import CartItem from "./CartItem";
import CartIco from "../../../assets/CartIco";

import empty_cart from "../../../assets/empty_cart.jpg";

class CartBlock extends React.Component {
  constructor(props) {
    super(props);
    this.cartBlockRef = React.createRef(null);
  }

  componentDidMount() {
    window.addEventListener("click", this.closePopup);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.closePopup);
  }

  render() {
    const togglePopup = () => {
      this.props.dispatchCartBlock();
    };

    const onPlusCart = (item) => {
      this.props.dispatchAddToCart(item);
    };
    const onMinusCart = (item) => {
      this.props.dispatchMinusCart(item);
    };

    this.closePopup = (e) => {
      this.props.toggleCartBlock &&
        !e.path.includes(this.cartBlockRef.current) &&
        this.props.dispatchCartBlock(false);
    };

    const onRemoveItem = (item) => {
      if (window.confirm("Are you sure to remove item?")) {
        this.props.dispatchRemoveItem(item);
      }
    };

    const onCheckout = () => {
      window.confirm("Confirm your Order please!") &&
        this.props.dispatchCleanCart();

      window.alert("Your order has been sent sucessfully");
    };

    this.props.toggleCartBlock
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");

    return (
      <div className="nav__cart" ref={this.cartBlockRef}>
        <div onClick={togglePopup}>
          {this.props.cart.totalCount > 0 && (
            <div className="nav__cart-badge">{this.props.cart.totalCount}</div>
          )}
          <CartIco />
        </div>
        <div
          className={`nav__cart-block ${
            this.props.toggleCartBlock ? "active" : ""
          }`}
        >
          <h5>
            My Bag, <span>{this.props.cart.totalCount} {this.props.cart.totalCount > 1 ? "items" : "item"} </span>
          </h5>
          <div className="cart__items">
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
                  <img src={empty_cart} alt="" />
                </div>
                <p>Your Cart is Empty</p>
              </div>
            )}
          </div>
          <div className="cart__total">
            <h3 style={{ margin: "8px 0" }}>
              Total
              <span>
                {this.props.currency}
                {(this.props.cart.totalPrice[this.props.currency] &&
                  this.props.cart.totalPrice[this.props.currency].toFixed(2)) ??
                  0}
              </span>
            </h3>
            <div className="cart__btns">
              <Link
                to="/cart"
                className="btn"
                onClick={() => {
                  togglePopup();
                  this.props.dispatchCart();
                }}
              >
                View Bag
              </Link>
              <button
                className="btn primary"
                onClick={onCheckout}
                disabled={this.props.cart.totalCount ? false : true}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCartBlock: (param) => {
      dispatch(toggleCartBlock(param));
    },
    dispatchAddToCart: (item) => {
      dispatch(addToCart(item));
    },
    dispatchMinusCart: (item) => {
      dispatch(minusCart(item));
    },
    dispatchRemoveItem: (item) => {
      dispatch(removeItem(item));
    },
    dispatchCleanCart: () => {
      dispatch(cleanCart());
    },
    dispatchCart: () => {
      dispatch(cart());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    toggleCartBlock: state.nav.toggleCartBlock,
    currency: state.nav.activeCurrency,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartBlock);
