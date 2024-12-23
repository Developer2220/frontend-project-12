// import useFetch from "../hooks/useFetch"
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../API/messages";
import { selectCurrentChannel } from "../store/slices/dataSlices";


const Messages = () => {
  const { data: messages, error, isLoading } = useGetMessagesQuery();
  const currentChannel = useSelector(selectCurrentChannel)


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

  const filteredMessages = messages.filter(
    (message) => message.channelId === currentChannel.id
  );

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {filteredMessages.map((message)=> (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}:</b> <br />
          {message.body}
        </div>
        ) 
      )}
    </div>  
  );
};

export default Messages;
