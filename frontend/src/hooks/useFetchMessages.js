// import { useState, useEffect } from 'react';
// import useAuthContext from '../auth/authProvider';
// import { useDispatch } from 'react-redux';
// import { setMessages, setLoading, setError} from '../store/slices/messagesSlices.js'; 
// import { selectMessages, selectLoading, selectError } from '../store/slices/messagesSlices';
// import { useSelector } from 'react-redux';

// const API_BASE_URL = '/api/v1';

// const useFetchMessages = (path) => {
// const data = useSelector(selectMessages);
// const loading = useSelector(selectLoading);
// const error = useSelector(selectError);

// const { token, logIn } = useAuthContext();
// const dispatch = useDispatch();


//   useEffect(() => {
//     const fetchData = async () => {
//       const url = `${API_BASE_URL}${path}`;
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             Authorization: token ? `Bearer ${token}` : undefined,
//             'Content-Type': 'application/json',
//           },
//         });
//         const result = await response.json();
//         dispatch(setMessages(result));
//     };
//     if (token) {
//       fetchData();
//     } else {
//       dispatch(setLoading(false));
//       dispatch(setError(new Error('No token available')));
//     }
//   }, [path, token]);

//   return { data, loading, error };
// };

// export default useFetchMessages;
