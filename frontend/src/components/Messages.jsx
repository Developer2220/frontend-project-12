import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import filterWords from 'leo-profanity';
import { useGetMessagesQuery } from '../API/messages';
import { selectCurrentChannel } from '../store/slices/channelsSlices';

const Messages = () => {
  const currentChannel = useSelector(selectCurrentChannel);
  const { data: messages } = useGetMessagesQuery();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages, currentChannel]);

  const filteredMessages = messages
    ? messages.filter((message) => message.channelId === currentChannel.id)
    : [];

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {filteredMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>
            {message.username}
            :
            {' '}
          </b>
          {filterWords.clean(message.body)}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
