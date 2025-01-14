// import { useSelector, useDispatch } from "react-redux";
// import { useGetMessagesQuery, messagesApi } from "../API/messages";
// import { selectCurrentChannel } from "../store/slices/dataSlices";
// import { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";

// const LoadingState = () => <p>Loading messages...</p>;
// const ErrorState = ({ message }) => <p>Error loading messages: {message}</p>;

// const Messages = () => {
//   const { data: initialMessages, error, isLoading } = useGetMessagesQuery();
//   const currentChannel = useSelector(selectCurrentChannel);
//   const [allMessages, setAllMessages] = useState([]); // Хранилище всех сообщений
//   const [messages, setMessages] = useState([]); // Сообщения текущего канала
//   const [socket, setSocket] = useState(null);
//   const messagesEndRef = useRef(null); // Ссылка на контейнер с сообщениями
// const dispatch = useDispatch();
//   // Подключение WebSocket
//   useEffect(() => {
//     const socketInstance = io(); // Создаем сокет
//     setSocket(socketInstance);

//     socketInstance.on("connect", () => {
//       console.log("Соединение установлено с сервером:", socketInstance.id);
//     });

//     socketInstance.on("newMessage", (payload) => {
//       setAllMessages((prevMessages) => [...prevMessages, payload]); // Добавляем новое сообщение
//     });

//     return () => {
//       socketInstance.disconnect(); // Отключаем сокет при размонтировании
//     };
//   }, []);

//   // Обновление общего списка сообщений при загрузке начальных данных
//   useEffect(() => {
//     if (initialMessages) {
//       setAllMessages(initialMessages); // Сохраняем все начальные сообщения
//     }
//   }, [initialMessages]);

//   // Фильтрация сообщений для текущего канала
//   useEffect(() => {
//     const channelMessages = allMessages.filter(
//       (message) => message.channelId === currentChannel.id
//     );
//     setMessages(channelMessages);

//     // Прокрутка вниз при переключении канала
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "auto" });
//     }
//   }, [allMessages, currentChannel]);

// //   // Подключение WebSocket и обновление кэша RTK Query
// //   useEffect(() => {
// //     const socket = io();

// //     socket.on("connect", () => {
// //       console.log("WebSocket connected:", socket.id);
// //     });

// //     socket.on("newMessage", (newMessage) => {
// //       if (newMessage.channelId === currentChannel.id) {
// //         dispatch(messagesApi.util.updateQueryData("getMessages", currentChannel.id, (draft) => {
// //           draft.push(newMessage);
// //         }));
// //       }
// //     });

// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, [currentChannel.id, dispatch]);


//   // Плавная прокрутка вниз при добавлении нового сообщения
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isLoading) return <LoadingState />;
//   if (error) return <ErrorState message={error.message} />;

//   return (
//     <div id="messages-box" className="chat-messages overflow-auto px-5 ">
//       {messages.map((message) => (
//         <div key={message.id} className="text-break mb-2">
//           <b>{message.username}: </b> 
//           {message.body}
//         </div>
//       ))}
//       {/* Ссылка на последний элемент, чтобы прокручивать вниз */}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// export default Messages;



// import { useSelector, useDispatch } from "react-redux";
// import { useGetMessagesQuery, messagesApi } from "../API/messages";
// import { selectCurrentChannel } from "../store/slices/dataSlices";
// import { useRef, useEffect } from "react";
// import io from "socket.io-client";

// const LoadingState = () => <p>Loading messages...</p>;
// const ErrorState = ({ message }) => <p>Error loading messages: {message}</p>;

// const Messages = () => {
//   const currentChannel = useSelector(selectCurrentChannel);
//   const { data: messages, error, isLoading } = useGetMessagesQuery(currentChannel.id);
//   const messagesEndRef = useRef(null);

//   const dispatch = useDispatch();

//   // Подключение WebSocket и обновление кэша RTK Query
//   useEffect(() => {
//     const socket = io();

//     socket.on("connect", () => {
//       console.log("WebSocket connected:", socket.id);
//     });

//     socket.on("newMessage", (newMessage) => {
//       if (newMessage.channelId === currentChannel.id) {
//         dispatch(messagesApi.util.updateQueryData("getMessages", currentChannel.id, (draft) => {
//           draft.push(newMessage);
//         }));
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [currentChannel.id, dispatch]);

//   // Прокрутка вниз при добавлении сообщения
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isLoading) return <LoadingState />;
//   if (error) return <ErrorState message={error.message} />;

//   return (
//     <div id="messages-box" className="chat-messages overflow-auto px-5 ">
//       {messages.map((message) => (
//         <div key={message.id} className="text-break mb-2">
//           <b>{message.username}: </b>
//           {message.body}
//         </div>
//       ))}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// export default Messages;


import { useSelector, useDispatch } from "react-redux";
import { useGetMessagesQuery, messagesApi } from "../API/messages";
import { selectCurrentChannel } from "../store/slices/dataSlices";
import { useRef, useEffect } from "react";
import io from "socket.io-client";

const LoadingState = () => <p>Loading messages...</p>;
const ErrorState = ({ message }) => <p>Error loading messages: {message}</p>;

const Messages = () => {
  const currentChannel = useSelector(selectCurrentChannel); // Текущий канал
  const { data: allMessages, error, isLoading } = useGetMessagesQuery(); // Получаем все сообщения
  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();

  // Подключение WebSocket и обновление кэша RTK Query
  useEffect(() => {
    const socket = io();

    socket.on("connect", () => {
      console.log("WebSocket connected:", socket.id);
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(
        messagesApi.util.updateQueryData("getMessages", undefined, (draft) => {
          draft.push(newMessage);
        })
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  // Прокрутка вниз при добавлении сообщения
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages, currentChannel]);

  // Фильтрация сообщений для текущего канала
  const filteredMessages = allMessages
    ? allMessages.filter((message) => message.channelId === currentChannel.id)
    : [];

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {filteredMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}: </b>
          {message.body}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
