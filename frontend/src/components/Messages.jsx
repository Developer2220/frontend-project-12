// import useFetch from "../hooks/useFetch"
import { useGetMessagesQuery } from "../API/messages";

const Messages = () => {
  const { data: messages, error, isLoading } = useGetMessagesQuery();

  //   const messages = useFetch('/messages')
  //   console.log('messages.data in Messages', messages.data)

//   if (!isLoading && messages) {
//     console.log("messages in Messages", messages);
//   }


if (isLoading) {
    return <p>Loading messages...</p>;
  }

  if (error) {
    return <p>Error loading messages: {error.message}</p>;
  }

  if (!messages || messages.length === 0) {
    return <p>No messages available.</p>;
  }

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}:</b> <br />
          {message.body}
        </div>
      ))}
    </div>
  );
};

export default Messages;
