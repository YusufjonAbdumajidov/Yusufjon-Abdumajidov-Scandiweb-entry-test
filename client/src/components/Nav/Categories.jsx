import React from "react";
import { fetchCategories } from "../../GraphQL/queries";
import { graphql } from "@apollo/client/react/hoc";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import { activeCategory } from "../../redux/actions";

class Categories extends React.Component {
  render() {
    const handleClick = (category) => {
      this.props.dispatchActiveCategory(category);
    };

    const {
      data: { loading, categories },
    } = this.props;
    if (loading) {
      return <></>;
    } else {
      return (
        <ul className="nav__categories">
          {categories.map((category) => {
            return (
              <li
                className={`nav__categories-item ${
                  this.props.activeCategory === category.name ? "active" : ""
                }`}
                key={category.name}
              >
                <Link
                id={category.name}
                  to={`/`}
                  onClick={() => {
                    handleClick(category.name);
                  }}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchActiveCategory: (category) => {
      dispatch(activeCategory(category));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    activeCategory: state.nav.activeCategory,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(fetchCategories)(Categories));
