import { useState } from 'react';

const API_BASE_URL = '/api/v1';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticate = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Authentication failed');
      }

      const authData = await response.json();
    //   console.log('authData', authData);
      return authData;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { authenticate, loading, error };
};

export default useAuth;


// const {authenticate} = useAuth();
// const formData = { username: 'admin', password: 'admin' }
// const getData = async(formData) => {
//     const result = await authenticate(formData);
//     return result
// }

// console.log('data', getData(formData))