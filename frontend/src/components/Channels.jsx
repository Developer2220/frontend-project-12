// import useFetch from "../hooks/useFetch";
// import useFetchChannels from "../hooks/useFetchChannels";

import { useDispatch } from "react-redux";
import { setCurrentChannel } from "../store/slices/dataSlices";

import { useState, useEffect } from "react";
import { useGetChannelsQuery } from "../API/channels";

import io from "socket.io-client";





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


  const [channels, setChannels] = useState([]);
  const [socket, setSocket] = useState(null);

  const [activeChannel, setActiveChannel] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (channels && channels.length > 0) {
      const defaultChannel = channels[0];
      setActiveChannel(defaultChannel.id);
      //   dispatch(setCurrentChannel(defaultChannel.name));
      dispatch(setCurrentChannel(defaultChannel));
    }
  }, [channels, dispatch]);

  const handleСlick = (channel) => {
    //   const handleСlick = (channelName, channelId) => {
    dispatch(setCurrentChannel(channel));
    setActiveChannel(channel.id);
  };


    // Подключение WebSocket
    useEffect(() => {
        const socketInstance = io(); // Создаем сокет
        setSocket(socketInstance);
    
        // socketInstance.on("connect", () => {
        //   console.log("Соединение установлено с сервером:", socketInstance.id);
        // });
    
        socketInstance.on("newChannel", (payload) => {
            setChannels((prevChannels) => [...prevChannels, payload]);
        });
    
        // return () => {
        //   socketInstance.disconnect(); // Отключаем сокет при размонтировании
        // };
      }, []);

//загрузка каналов 
  useEffect(() => {
    if (initialChannels) {
      setChannels(initialChannels);
    }
  }, [initialChannels]);


  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels &&
        channels.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            <button
              type="button"
              className={`w-100 rounded-0 text-start btn ${
                activeChannel === channel.id ? "btn-secondary" : ""
              }`}
              // onClick={() => handleСlick(channel.name, channel.id)}
              onClick={() => handleСlick(channel)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        ))}
    </ul>
  );
};

export default Channels;
