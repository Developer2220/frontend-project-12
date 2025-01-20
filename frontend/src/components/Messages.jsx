import { useSelector, useDispatch } from "react-redux";
import { useGetMessagesQuery, messagesApi } from "../API/messages";
import { selectCurrentChannel } from "../store/slices/dataSlices";
import { useRef, useEffect } from "react";
import socket from "../socket";
import filterWords from '../initLeoProfanity'

const Messages = () => {
  const currentChannel = useSelector(selectCurrentChannel); 
  const { data: allMessages } = useGetMessagesQuery(); 
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
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

  useEffect(() => {
    if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });

    }
}, [allMessages, currentChannel]);

  const filteredMessages = allMessages
    ? allMessages.filter((message) => message.channelId === currentChannel.id)
    : [];

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {filteredMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}: </b>
          {filterWords.clean(message.body)}
          {/* {message.body} */}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
