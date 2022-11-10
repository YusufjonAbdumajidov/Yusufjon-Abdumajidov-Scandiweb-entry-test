import React from "react";
import { Link } from "react-router-dom";
import CartIco from "../assets/CartIco";

class productBlock extends React.Component {
  render() {
    const onAddToCart = () => {
      const productParams = this.props.product.attributes.map((param) => {
        return {
          paramName: param.name,
          paramValue: param.items[0].value,
        };
      });

      this.props.onAddToCart({
        id: this.props.product.id,
        itemName: this.props.product.name,
        itemBrand: this.props.product.brand,
        itemGallery: this.props.product.gallery,
        itemPrice: this.props.product.prices,
        params: productParams,
      });
    };

    return (
      <div 
        className={`productBlock ${
          this.props.outOfStock ? "out-of-stock" : ""
        }`} 
      >
        <Link to={`/product/${this.props.product.id}`}>
          <div className="productBlock__img">
            <img src={this.props.product.gallery[0]} alt="" />
            {this.props.outOfStock && (
              <div className="productBlock__stock">OUT OF STOCK</div>
            )}
          </div>
        </Link>
        <button className="productBlock__btn" onClick={onAddToCart}>
          <CartIco />
        </button>
        <div style={{ display: "flex" }}>
        <h4 className="productBlock__title">{this.props.product.brand} {this.props.product.name}</h4>
        </div>
        
        <p className="productBlock__price">
          {this.props.currency + " "}
          {
            this.props.product.prices.filter(
              (price) => price.currency.symbol === this.props.currency
            )[0].amount
          }
        </p>
      </div>
    );
  }
}

export default productBlock;
