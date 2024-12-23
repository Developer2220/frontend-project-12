// import { useState, useEffect } from 'react';
// import useAuthContext from '../auth/authProvider';
// import { useDispatch } from 'react-redux';
// import { setChannels, setLoading, setError} from '../store/slices/channelsSlices.js'; 
// import { selectChannels, selectLoading, selectError } from '../store/slices/channelsSlices';
// import { useSelector } from 'react-redux';

// const API_BASE_URL = '/api/v1';

// const useFetchChannels = (path) => {
// const data = useSelector(selectChannels);
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
//         dispatch(setChannels(result));
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

// export default useFetchChannels;
