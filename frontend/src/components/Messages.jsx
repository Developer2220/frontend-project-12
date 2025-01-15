import { useSelector, useDispatch } from "react-redux";
import { useGetMessagesQuery, messagesApi } from "../API/messages";
import { selectCurrentChannel } from "../store/slices/dataSlices";
import { useRef, useEffect } from "react";
// import io from "socket.io-client";
import socket from "../socket";

const LoadingState = () => <p>Loading messages...</p>;
const ErrorState = ({ message }) => <p>Error loading messages: {message}</p>;

// export const socket = io();

const Messages = () => {
  const currentChannel = useSelector(selectCurrentChannel); // Текущий канал
  const { data: allMessages, error, isLoading } = useGetMessagesQuery(); // Получаем все сообщения
  const messagesEndRef = useRef(null);

  const dispatch = useDispatch();

  // Подключение WebSocket и обновление кэша RTK Query
  useEffect(() => {
    // const socket = io();

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
    //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });

    }
//   }, [allMessages, currentChannel]);
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
