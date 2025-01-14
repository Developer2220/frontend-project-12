// import useFetch from "../hooks/useFetch";
// import useFetchChannels from "../hooks/useFetchChannels";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../store/slices/dataSlices";
import { selectCurrentChannel } from "../store/slices/dataSlices";

import { useState, useEffect } from "react";
import { useGetChannelsQuery, channelsApi, useDeleteChannelMutation } from "../API/channels";

// import io from "socket.io-client";
import socket from "../socket";



import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useDeleteMessagesByChannelIdMutation, messagesApi } from "../API/messages";
import ModalDeleteChannel from "./ModalDeleteChannel";
import ModalRenameChannel from "./ModalRenameChannel";

const LoadingState = () => <p>Loading channels...</p>;
const ErrorState = ({ message }) => <p>Error loading channels: {message}</p>;

const Channels = () => {
  //   const channels = useFetch("/channels");
  //   const channels = useFetchChannels("/channels");
  //   console.log("channels", channels);

  const { data: initialChannels, error, isLoading } = useGetChannelsQuery();
  //   if (!isLoading && channels) {
  //       console.log('channels in Channels', channels);
  //     }
  // console.log('initialChannels', initialChannels)

  const [deleteChannel] = useDeleteChannelMutation();
  const [deleteMessagesByChannelId]= useDeleteMessagesByChannelIdMutation();

  const [channels, setChannels] = useState([]);
  const [socketInitial, setSocket] = useState(null);

  const [modalShow, setModalShow] = useState(false);
  const [modalShowRenameChannel, setModalShowRenameChannel] = useState(false);

  const [selectedChannelId, setSelectedChannelId] = useState(null);

  const handleOpenModal = (channelId) => {
    setSelectedChannelId(channelId)
    setModalShow(true)
  }


  const handleOpenModalRenameChannel = (channelId) => {
    setSelectedChannelId(channelId)
    setModalShowRenameChannel(true)
  }
  //   const [activeChannel, setActiveChannel] = useState(null);

  const dispatch = useDispatch();

  const currentChannel = useSelector(selectCurrentChannel);
  console.log("currentChannel in Channels", currentChannel);

  //загрузка каналов
  useEffect(() => {
    if (initialChannels) {
      setChannels(initialChannels);
    }
  }, [initialChannels]);

  useEffect(() => {
    if (channels && channels.length > 0) {
      const defaultChannel = channels[0];
      //   setActiveChannel(defaultChannel.id);
      //   dispatch(setCurrentChannel(defaultChannel.name));
      dispatch(setCurrentChannel(defaultChannel));
    }
  }, [channels, dispatch]);

  const handleСlick = (channel) => {
    //   const handleСlick = (channelName, channelId) => {
    dispatch(setCurrentChannel(channel));
    // setActiveChannel(channel.id);
  };

//   const handleDeleteChannel = async (channelId) => {
//     try {
//       await deleteChannel(channelId).unwrap();
//       // После успешного удаления поста, удаляем все связанные сообщения
//       await deleteMessagesByChannelId(channelId);
//     dispatch(
//         channelsApi.util.updateQueryData("getChannels", undefined, (draft) => {
//           return draft.filter((channel) => channel.id !== channelId);
//         })
//       );

//       dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
//         return draft.filter((message) => message.channelId !== channelId);
//       }));

//     } catch (error) {
//       console.error('Ошибка при удалении канала:', error);
//     }
//   };

  // Подключение WebSocket
  useEffect(() => {
    // const socketInstance = io(); // Создаем сокет
    // setSocket(socketInstance);
    setSocket(socket);

    // socketInstance.on("connect", () => {
    //   console.log("Соединение установлено с сервером:", socketInstance.id);
    // });

    // socketInstance.on("newChannel", (payload) => {
    socket.on("newChannel", (payload) => {

      setChannels((prevChannels) => [...prevChannels, payload]);
      // Обновляем кэш RTK Query
      dispatch(
        channelsApi.util.updateQueryData("getChannels", undefined, (draft) => {
          draft.push(payload); // Добавляем новый канал в кэш
        })
      );
    });

    return () => {
    //   socketInstance.disconnect(); // Отключаем сокет при размонтировании
    socket.disconnect(); // Отключаем сокет при размонтировании

    };
  }, []);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          {channel.removable === false ? (
            <button
              type="button"
              className={`w-100 rounded-0 text-start btn ${
                currentChannel.id === channel.id ? "btn-secondary" : ""
              }`}
              onClick={() => handleСlick(channel)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          ) : (
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button
                variant=""
                className={`w-100 rounded-0 text-start btn ${
                  currentChannel.id === channel.id ? "btn-secondary" : ""
                }`}
                onClick={() => handleСlick(channel)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              <Dropdown.Toggle
                split
                variant=""
                className={`${
                  currentChannel.id === channel.id ? "btn-secondary" : ""
                }`}
                id="dropdown-split-basic"
              />
              <Dropdown.Menu>
                 {/* <Dropdown.Item onClick={()=> handleDeleteChannel(channel.id)} >Удалить</Dropdown.Item> */}
                 <Dropdown.Item onClick={() => handleOpenModal(channel.id)} >Удалить</Dropdown.Item>
                <Dropdown.Item onClick={() => handleOpenModalRenameChannel(channel.id)}>Переименовать</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </li>
      ))}
      <ModalDeleteChannel
      show={modalShow}
      onHide={() => setModalShow(false)}
      channelId = {selectedChannelId}
      />
      <ModalRenameChannel
      show={modalShowRenameChannel}
      onHide={() => setModalShowRenameChannel(false)}
      channelId = {selectedChannelId}
      />

    </ul>
  );
};

export default Channels;
