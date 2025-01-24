import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { channelsApi } from '../API/channels';
import { messagesApi } from '../API/messages';

const socket = io();

const SocketManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('WebSocket connected:', socket.id);
    });

    socket.on('newChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          draft.push(payload);
        }),
      );
    });

    socket.on('removeChannel', (channelId) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((channel) => channel.id !== channelId.id)),
      );
      dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draft) => draft.filter((message) => message.channelId !== channelId.id)),
      );
    });

    socket.on('renameChannel', (updatedChannel) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          const index = draft.findIndex(
            (channel) => channel.id === updatedChannel.id,
          );
          if (index !== -1) {
            // eslint-disable-next-line no-param-reassign
            draft[index].name = updatedChannel.name;
          }
        }),
      );
    });

    socket.on('newMessage', (newMessage) => {
      dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
          draft.push(newMessage);
        }),
      );
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('newMessage');
    };
  }, [dispatch]);

  return null;
};

export default SocketManager;
