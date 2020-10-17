import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    align-items: center;
    background: var(--grey);
    border-radius: 2px;

    .count {
      background: white;
      padding: 2px 5px;
    }

    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return the pizzas with counts
  const counts = pizzas
    .filter(Boolean)
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      // if so, increment it by 1
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      // otherwise create a new entry in
      // our accumulator and set it to 1
      return acc;
    }, {});

  // sort based on count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // get a list of all the toppings
  // get a list of all the pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
            vegetarian
          }
        }
      }
    }
  `);

  console.clear();

  // count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
  console.log(toppingsWithCounts);
  // loop over the list of toppings and display the topping and the count of pizzas in that topping
  // link it up

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span>All</span>
        <span>{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
