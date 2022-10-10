import { gql } from "@apollo/client";

export const fetchCategories = gql`
  query {
    categories {
      name
    }
  }
`;

export const fetchProducts = gql`
  query Category($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        brand
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          name
          items {
            value
          }
        }
      }
    }
  }
`;

export const fetchCurrencies = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const getProduct = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      brand
      name

      inStock
      gallery
      description
      attributes {
        name
        type
        items {
          value
        }
      }

      prices {
        currency {
          label
          symbol
        }
        amount
      }
      inStock
    }
  }
`;
