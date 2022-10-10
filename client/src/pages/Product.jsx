import React from "react";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { graphql } from "@apollo/client/react/hoc";
import { connect } from "react-redux";
import { Parser } from "html-to-react";

import { getProduct } from "../GraphQL/queries";
import {
  setActiveImg,
  setActiveParams,
  unsetParams,
} from "../redux/actions";
import { addToCart } from "../redux/actions";
import LoadingSpinner from "../components/LoadingText";

class Product extends React.Component {
  notificationTimer;
  constructor(props) {
    super(props);
    this.state = { added: false };
  }

  componentDidMount() {
    this.props.dispatchActiveImg();
    this.props.dispatchUnsetParams();
    this.props.data.loading === false &&
      this.props.data.product.attributes.forEach((param) => {
        this.props.dispatchActiveParams({
          paramName: param.name,
          paramValue: param.items[0].value,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.loading !== prevProps.data.loading) {
      this.props.data.product.attributes.forEach((param) => {
        this.props.dispatchActiveParams({
          paramName: param.name,
          paramValue: param.items[0].value,
        });
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.notificationTimer);
  }

  render() {
    const {
      data: { loading, product },
    } = this.props;

    const clickImg = (src) => {
      this.props.dispatchActiveImg(src);
    };
    const setParams = (obj) => {
      this.props.dispatchActiveParams(obj);
    };

    const addCartItem = (obj) => {
      clearTimeout(this.notificationTimer);

      this.props.dispatchAddToCart(obj);
      this.setState({
        added: true,
      });

      this.notificationTimer = setTimeout(() => {
        this.setState({
          added: false,
        });
      }, 2000);
    };

    if (loading) {
      return <LoadingSpinner />;
    } else {
      return (
        <>
          <div className="container product">
            <div className="product__thumbs">
              {product.gallery.map((photo, idx) => {
                return (
                  <img
                    src={photo}
                    key={idx}
                    alt=""
                    className="product__thumbs-img"
                    onClick={() => {
                      clickImg(photo);
                    }}
                  />
                );
              })}
            </div>
            <div className="product__img">
              <img
                src={this.props.activeImg ?? product.gallery[0]}
                alt=""
                className="product__thumbs-img"
              />
            </div>
            <div className="product__info">
              <h3 className="product__info-subtitle">{product.brand}</h3>
              <h2 className="product__info-title">{product.name}</h2>
              <div className="product__params">
                {product.attributes.length > 0 &&
                  product.attributes.map((attribute, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        <p className="product__params-title">
                          {attribute.name}:
                        </p>
                        {attribute.type === "text" ? (
                          <div className="product__params-btns">
                            {attribute.items.map((item, idx) => {
                              return (
                                <button
                                  className={`btn ${
                                    this.props.activeParams.find(
                                      (param) =>
                                        param.paramName === attribute.name &&
                                        param.paramValue === item.value
                                    )
                                      ? "selected"
                                      : ""
                                  }`}
                                  key={idx}
                                  onClick={() => {
                                    setParams({
                                      paramName: attribute.name,
                                      paramValue: item.value,
                                    });
                                  }}
                                >
                                  {item.value}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="product__params-swatch">
                            {attribute.items.map((item, idx) => {
                              return (
                                <button
                                  style={{
                                    backgroundColor: item.value,
                                  }}
                                  className={`swatch-btn $ ${
                                    this.props.activeParams.find(
                                      (param) =>
                                        param.paramName === attribute.name &&
                                        param.paramValue === item.value
                                    )
                                      ? "selected"
                                      : ""
                                  }`}
                                  key={idx}
                                  onClick={() => {
                                    setParams({
                                      paramName: attribute.name,
                                      paramValue: item.value,
                                    });
                                  }}
                                ></button>
                              );
                            })}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>
              <div className="product__price">
                <p className="product__price-title">PRICE:</p>
                <span>
                  {this.props.currency + " "}
                  {
                    product.prices.filter(
                      (price) => price.currency.symbol === this.props.currency
                    )[0].amount
                  }
                </span>
              </div>
              <button
                className="btn primary add-btn"
                disabled={!product.inStock}
                onClick={() => {
                  addCartItem({
                    id: product.id,
                    itemName: product.name,
                    itemBrand: product.brand,
                    itemGallery: product.gallery,
                    itemPrice: product.prices,
                    params: [...this.props.activeParams],
                  });
                }}
              >
                {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
              </button>
              <div className="product__desc">
                {Parser().parse(product.description)}
              </div>
            </div>
          </div>
          <div
            className={`add-notification ${this.state.added ? "active" : ""}`}
            ref={this.notificationRef}
          >
            Item Added to Cart!
          </div>
        </>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchActiveImg: (img) => dispatch(setActiveImg(img)),
    dispatchActiveParams: (obj) => dispatch(setActiveParams(obj)),
    dispatchUnsetParams: () => dispatch(unsetParams()),
    dispatchAddToCart: (item) => dispatch(addToCart(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    activeImg: state.product.activeImg,
    activeParams: state.product.activeParams,
    currency: state.nav.activeCurrency,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter(
    graphql(getProduct, {
      options: (props) => ({ variables: { id: props.match.params.id } }),
    })(Product)
  )
);
