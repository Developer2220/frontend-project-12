import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../store/slices/channelsSlices";
import { selectCurrentChannel } from "../store/slices/channelsSlices";
import { useState, useEffect } from "react";
import { useGetChannelsQuery, channelsApi } from "../API/channels";
import socket from "../socket";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import ModalDeleteChannel from "./ModalDeleteChannel";
import ModalRenameChannel from "./ModalRenameChannel";
import { useTranslation } from "react-i18next";
import filterWords from '../initLeoProfanity'

const Channels = () => {
  const { t } = useTranslation();
const { data: channels = [] } = useGetChannelsQuery();
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


  useEffect(() => {
    if (channels && channels.length > 0 && !currentChannel) {
      const defaultChannel = channels[0];
      dispatch(setCurrentChannel(defaultChannel));
    }
  }, [channels, dispatch, currentChannel]);



  const handleСlick = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

 

  useEffect(() => {
    // setSocket(socket);
    socket.on("connect", () => {
        console.log("WebSocket in Channels connected:", socket.id);
      });
    socket.on("newChannel", (payload) => {
    //   setChannels((prevChannels) => [...prevChannels, payload]);
      dispatch(
        channelsApi.util.updateQueryData("getChannels", undefined, (draft) => {
          draft.push(payload);
        })
      );
    });

    return () => {
        socket.off("newChannel");
      };
  }, []);

  console.log("Socket connected?", socket.connected);
  socket.on("connect_error", (err) => {
    console.error("Connection error:", err);
  });
  

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
              {filterWords.clean(channel.name)}
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
                {filterWords.clean(channel.name)}
              </Button>
              <Dropdown.Toggle
                split
                variant=""
                className={`${
                    currentChannel.id === channel.id ? "btn-secondary" : ""
                }`}
                id="dropdown-split-basic"
              >
                <span className="visually-hidden">{t('dropdown.toggle')}</span>
                </Dropdown.Toggle>
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
