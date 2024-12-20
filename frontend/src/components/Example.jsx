import io from 'socket.io-client'
import useAuthContext from '../auth/authProvider';

import { useGetChannelsQuery } from '../API/channels'; 

import { useGetMessagesQuery } from '../API/messages';

// const socket = io()

// socket.on('connect', () => {
//     console.log('Соединение установлено с сервером!');
//     console.log('ID сокета:', socket.id);
// });

// // Обработка входящих сообщений
// socket.on('newMessage', (message) => {
//     console.log('Ответ от сервера:', message);
// });

// socket.on('disconnect', () => {
//     console.log('Соединение разорвано');
// });



// // Обработка подключения
// socket.on('connect', () => {
//     console.log('Соединение установлено с сервером!');
//     socket.emit('newMessage', { body: "new message", channelId: 7, id: 8, username: "admin" }); // Отправляем сообщение на сервер
// });

// // Обработка входящих сообщений
// socket.on('newMessage', (message) => {
//     console.log('Ответ от сервера:', message);
// });



// const Example = () => {
//     const { data: channels, error, isLoading } = useGetChannelsQuery();
//     console.log('channels in Example', channels)

// //     <ul>
// //         {channels.map((channel) => (
// //           <li key={channel.id}>
// //             {channel.name}
// //           </li>
// //         ))}
// //       </ul>
// //   </>

//   return (
//    <div>Example</div>
//   )
// }

// export default Example


const Example = () => {
    const { data: channels, error, isLoading } = useGetChannelsQuery();
  
    // Логируем только после загрузки
    if (!isLoading && channels) {
      console.log('channels in Example', channels);
    }

//     const {data: messages} = useGetMessagesQuery();
//   if (messages) {
//       console.log('messages in Example', messages);
//     }
  
    return (
      <div>
        {isLoading && <p>Loading channels...</p>}
        {error && <p>Error loading channels: {error.message}</p>}
        {channels && (
          <ul>
            {channels.map((channel) => (
              <li key={channel.id}>{channel.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default Example;