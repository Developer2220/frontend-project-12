// import { useSelector } from "react-redux";
// import { useGetMessagesQuery } from "../API/messages";
// import { selectCurrentChannel } from "../store/slices/dataSlices";
// import { useState, useEffect } from "react";
// import io from "socket.io-client";

// const LoadingState = () => <p>Loading messages...</p>;
// const ErrorState = ({ message }) => <p>Error loading messages: {message}</p>;

// const Messages = () => {
//   const { data: initialMessages, error, isLoading } = useGetMessagesQuery();
//   const currentChannel = useSelector(selectCurrentChannel);
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);

//   // Подключение WebSocket
//   useEffect(() => {
//     const socketInstance = io(); // Создаем сокет
//     setSocket(socketInstance);

//     socketInstance.on("connect", () => {
//       console.log("Соединение установлено с сервером:", socketInstance.id);
//     });

//     socketInstance.on("newMessage", (payload) => {
//       setMessages((prevMessages) => [...prevMessages, payload]);
//     });

//     return () => {
//       socketInstance.disconnect(); // Отключаем сокет при размонтировании
//     };
//   }, []);

//   // Обновление сообщений при смене канала
//   useEffect(() => {
//     if (initialMessages) {
//       const channelMessages = initialMessages.filter(
//         (message) => message.channelId === currentChannel.id
//       );
//       setMessages(channelMessages);
//     }
//   }, [initialMessages, currentChannel]);

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
//     </div>
//   );
// };

// export default Messages;


import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../API/messages";
import { selectCurrentChannel } from "../store/slices/dataSlices";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const LoadingState = () => <p>Loading messages...</p>;
const ErrorState = ({ message }) => <p>Error loading messages: {message}</p>;

const Messages = () => {
  const { data: initialMessages, error, isLoading } = useGetMessagesQuery();
  const currentChannel = useSelector(selectCurrentChannel);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const messagesEndRef = useRef(null); // Ссылка на контейнер с сообщениями

  // Подключение WebSocket
  useEffect(() => {
    const socketInstance = io(); // Создаем сокет
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Соединение установлено с сервером:", socketInstance.id);
    });

    socketInstance.on("newMessage", (payload) => {
      setMessages((prevMessages) => [...prevMessages, payload]);
    });

    return () => {
      socketInstance.disconnect(); // Отключаем сокет при размонтировании
    };
  }, []);

  // Обновление сообщений при смене канала
  useEffect(() => {
    if (initialMessages) {
      const channelMessages = initialMessages.filter(
        (message) => message.channelId === currentChannel.id
      );
      setMessages(channelMessages);

      // Мгновенная прокрутка к последнему сообщению
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" });
      }
    }
  }, [initialMessages, currentChannel]);

  // Плавная прокрутка вниз при добавлении нового сообщения
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Прокручиваем вниз при изменении сообщений

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}: </b> 
          {message.body}
        </div>
      ))}
        {/* Ссылка на последний элемент, чтобы прокручивать вниз */}
        <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
