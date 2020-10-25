import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // 1. loop over every item in the order
  const total = order.reduce((runningTotal, singleOrder) => {
    // 2. calc the total for that pizza
    const pizza = pizzas.find((p) => p.id === singleOrder.id);
    // 3. add that total to the running total
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);

  return total;
}
