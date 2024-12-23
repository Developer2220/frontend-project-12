import { useState, useEffect } from 'react';
import useAuthContext from '../auth/authProvider';
import { useDispatch } from 'react-redux';
import { setData, setError, setLoading } from '../store/slices/dataSlices'; 
import { selectData, selectError, selectLoading } from '../store/slices/dataSlices';
import { useSelector } from 'react-redux';

const API_BASE_URL = '/api/v1';


const useFetch = (path) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { token, logIn } = useAuthContext();
const data = useSelector(selectData);
const loading = useSelector(selectLoading);
const error = useSelector(selectError);


const { token, logIn } = useAuthContext();
console.log('useAuthContext', useAuthContext())

const dispatch = useDispatch();



  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      const url = `${API_BASE_URL}${path}`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': 'application/json',
          },
        });
        // if (!response.ok) {
        //   if (response.status === 401) {
        //     // Обработка ошибки 401 (Unauthorized) - обновление токена
        //     console.log('обновление токена');
        //     const refreshResponse = await fetch(`${API_BASE_URL}/refresh_token`, {
        //       method: 'POST',
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //         'Content-Type': 'application/json',
        //       },
        //     });
        //     if (refreshResponse.ok) {
        //       const newToken = await refreshResponse.json();
        //       login(newToken); // Обновляем токен в контексте
        //       fetchData(); // Повторно отправляем запрос с новым токеном
        //     } else {
        //       throw new Error('Failed to refresh token');
        //     }
        //   } else {
        //     throw new Error('Network response was not ok');
        //   }
        // }
        const result = await response.json();
        dispatch(setData(result));
      } catch (err) {
        dispatch(setError(err));
      } finally {
        dispatch(setLoading(false));
      }
    };
    if (token) {
      fetchData();
    } else {
      dispatch(setLoading(false));
      dispatch(setError(new Error('No token available')));
    }
  }, [path, token]);

  return { data, loading, error };
};

export default useFetch;
