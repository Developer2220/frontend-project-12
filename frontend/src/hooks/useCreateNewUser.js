import { useState } from 'react';

const API_BASE_URL = '/api/v1';

const useCreateNewUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        // throw new Error(errorResponse.message || 'Create failed');
        return {success: false, status: response.status, message: errorResponse}
      }

      const userData = await response.json();
      console.log('userData', userData);
      // return userData;
      return { success: true, data: userData };
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

export default useCreateNewUser;

