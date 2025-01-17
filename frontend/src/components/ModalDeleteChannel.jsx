import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

import { useEffect } from "react";
import { useDeleteChannelMutation, channelsApi } from "../API/channels"; 
import { useDeleteMessagesByChannelIdMutation, messagesApi } from "../API/messages";
import { useDispatch } from "react-redux";
import socket from "../socket";
import { useTranslation } from "react-i18next";

const ModalDeleteChannel = (props) => {
    const {t} = useTranslation();
    const [deleteChannel] = useDeleteChannelMutation();
    const [deleteMessagesByChannelId] = useDeleteMessagesByChannelIdMutation();
    const dispatch = useDispatch();
    const {channelId, ...modalProps} = props


  const handleDeleteChannel = async (channelId) => {
    try {
      await deleteChannel(channelId).unwrap();
      await deleteMessagesByChannelId(channelId);
      props.onHide();
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    socket.on('removeChannel', (channelId) => {
        dispatch(
            channelsApi.util.updateQueryData("getChannels", undefined, (draft) => {
              return draft.filter((channel) => channel.id !== channelId.id);
            })
          );
    
          dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
            return draft.filter((message) => message.channelId !== channelId.id);
          }));
    });

    return () => {
      socket.off('removeChannel');
    };
  }, [dispatch]);


  return (
    <Modal {...modalProps} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.delete')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={props.onHide}>
            {t('buttons.cancel')}
          </Button>
          <Button 
          variant="danger" onClick={()=>handleDeleteChannel(channelId)}>{t('buttons.delete')}</Button>
          </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteChannel;
