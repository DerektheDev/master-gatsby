import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  name: 'topping', // computer name
  title: 'Toppings', // visible title
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping name',
      type: 'string',
      description: 'What is the name of the topping?',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Is this vegetarian?',
      options: {
        layout: 'checkbox', // switch
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: ({ name, vegetarian: veg }) => ({
      title: `${name} ${veg ? '🌱' : '🥩'}`,
    }),
  },
};
