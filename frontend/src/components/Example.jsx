import io from 'socket.io-client'
import useAuthContext from '../auth/authProvider';

const socket = io()

socket.on('connect', () => {
    console.log('Соединение установлено с сервером!');
    console.log('ID сокета:', socket.id);
});

// Обработка входящих сообщений
socket.on('newMessage', (message) => {
    console.log('Ответ от сервера:', message);
});

socket.on('disconnect', () => {
    console.log('Соединение разорвано');
});



// // Обработка подключения
// socket.on('connect', () => {
//     console.log('Соединение установлено с сервером!');
//     socket.emit('newMessage', { body: "new message", channelId: 7, id: 8, username: "admin" }); // Отправляем сообщение на сервер
// });

// // Обработка входящих сообщений
// socket.on('newMessage', (message) => {
//     console.log('Ответ от сервера:', message);
// });

const API_BASE_URL = '/api/v1';


const Example = () => {
 
    const { token, logIn } = useAuthContext();
    console.log('token in Example', token)

    const postData = async (url = '', data = {}) => {
        // Формируем запрос
        const response = await fetch(url, {
          // Метод, если не указывать, будет использоваться GET
          method: 'POST',
         // Заголовок запроса
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': 'application/json'
          },
          // Данные
          body: JSON.stringify(data)
        });
        return response.json(); 
      }
    
      const newMessage = { body: 'new message', channelId: '1', username: 'admin' };
      
    //   const url = `${API_BASE_URL}${path}`;
    const url = '/api/v1/messages'
    
    //   postData(url, newMessage)
    //   .then((data) => {
    //     console.log('data', data); 
    //   });
    

  return (
    <div>
        <div>Example</div>
    </div>
  )
}

export default Example