import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../store/slices/dataSlices";
import { selectCurrentChannel } from "../store/slices/dataSlices";
import { useState, useEffect } from "react";
import { useGetChannelsQuery, channelsApi } from "../API/channels";
import socket from "../socket";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import ModalDeleteChannel from "./ModalDeleteChannel";
import ModalRenameChannel from "./ModalRenameChannel";
import { useTranslation } from "react-i18next";

const Channels = () => {
  const { t } = useTranslation();
  const { data: initialChannels } = useGetChannelsQuery();
  const [channels, setChannels] = useState([]);
  const [socketInitial, setSocket] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowRenameChannel, setModalShowRenameChannel] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);

  const handleOpenModal = (channelId) => {
    setSelectedChannelId(channelId);
    setModalShow(true);
  };

  const handleOpenModalRenameChannel = (channelId) => {
    setSelectedChannelId(channelId);
    setModalShowRenameChannel(true);
  };

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
      dispatch(setCurrentChannel(defaultChannel));
    }
  }, [channels, dispatch]);
// useEffect(() => {
//     if (channels && channels.length > 0) {
//       if (!currentChannel) {
//         const defaultChannel = channels[0];
//         dispatch(setCurrentChannel(defaultChannel));
//       } else {
//         const updatedChannel = channels.find(
//           (channel) => channel.id === currentChannel.id
//         );
//         if (updatedChannel) {
//           dispatch(setCurrentChannel(updatedChannel));
//         }
//       }
//     }
//   }, [channels, currentChannel, dispatch]);


  const handleСlick = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  useEffect(() => {
    setSocket(socket);
    socket.on("newChannel", (payload) => {
      setChannels((prevChannels) => [...prevChannels, payload]);
      dispatch(
        channelsApi.util.updateQueryData("getChannels", undefined, (draft) => {
          draft.push(payload);
        })
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
                <Dropdown.Item onClick={() => handleOpenModal(channel.id)}>
                  {t("buttons.delete")}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleOpenModalRenameChannel(channel.id)}
                >
                  {t("buttons.rename")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </li>
      ))}
      <ModalDeleteChannel
        show={modalShow}
        onHide={() => setModalShow(false)}
        channelId={selectedChannelId}
      />
      <ModalRenameChannel
        show={modalShowRenameChannel}
        onHide={() => setModalShowRenameChannel(false)}
        channelId={selectedChannelId}
      />
    </ul>
  );
};

export default Channels;
