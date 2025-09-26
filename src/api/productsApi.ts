// Simulated mock API for fetching products
import { Product } from '../types/Product';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'JavaScript Mastery',
    price: 39.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=JavaScript+Mastery',
    description: 'Advanced JavaScript concepts and practical patterns.'
  },
  {
    id: 'prod-2',
    name: 'TypeScript Pro',
    price: 49.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=TypeScript+Pro',
    description: 'Deepen your knowledge of TypeScript for real-world apps.'
  },
  {
    id: 'prod-3',
    name: 'React GraphQL Starter',
    price: 29.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=React+GraphQL+Starter',
    description: 'Learn to use React with GraphQL APIs.'
  },
  {
    id: 'prod-4',
    name: 'Full Stack Engineer',
    price: 59.99,
    imageUrl: 'https://via.placeholder.com/300x200?text=Full+Stack+Engineer',
    description: 'Everything you need to know to build scalable applications.'
  }
];

// Simulate API call delay and potential error
export const fetchProducts = async (): Promise<Product[]> => {
  await new Promise(res => setTimeout(res, 1000)); // simulate network latency
  if (Math.random() < 0.1) {
    // Simulate intermittent error
    throw new Error('Failed to fetch products.');
  }
  // Simulate background data update
  return MOCK_PRODUCTS.map(product => ({ ...product }));
};
