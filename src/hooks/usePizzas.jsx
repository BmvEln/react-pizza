import axios from 'axios';
import { useCallback, useState } from 'react';

export const usePizzas = (url) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const getPizzas = useCallback(async () => {
    setLoading(true);

    let pizzas = null;

    try {
      const response = await axios.get(url);
      pizzas = response.data;
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
    return pizzas;
  }, []);

  return { error, loading, getPizzas };
};
