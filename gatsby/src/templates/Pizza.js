import React from 'react';
import { graphql } from 'gatsby';

export default function SinglePizzaPage({ data }) {
  const { pizza } = data;
  return <p>{pizza.name}</p>;
}

// needs to be dynamic based on the slug
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
