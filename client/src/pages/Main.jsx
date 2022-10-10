import React from "react";

import { connect } from "react-redux";
import { graphql } from "@apollo/client/react/hoc";

import { fetchProducts } from "../GraphQL/queries";
import ProductBlock from "../components/ProductBlock";
import LoadingSpinner from "../components/LoadingText";
import { addToCart } from "../redux/actions";

class Home extends React.Component {
  notificationTimer;
  constructor(props) {
    super(props);
    this.state = { added: false };
  }

  componentWillUnmount() {
    clearTimeout(this.notificationTimer);
  }

  render() {
    const {
      data: { loading },
    } = this.props;

    const addToCartItem = (obj) => {
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
          <div className=" home container">
            <h1 className="home__category-name">{this.props.activeCategory} Category</h1>
            <div className="home__products">
              {this.props.data.category.products.map((product) => {
                return (
                  <ProductBlock
                    key={product.id}
                    outOfStock={!product.inStock}
                    product={product}
                    currency={this.props.activeCurrency}
                    onAddToCart={addToCartItem}
                  />
                );
              })}
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
    dispatchAddToCart: (item) => {
      dispatch(addToCart(item));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    activeCategory: state.nav.activeCategory,
    activeCurrency: state.nav.activeCurrency,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(fetchProducts, {
    options: (props) => ({
      variables: { title: props.activeCategory ?? "all" },
    }),
  })(Home)
);
