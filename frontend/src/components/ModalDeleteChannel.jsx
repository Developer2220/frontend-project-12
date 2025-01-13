import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

import { useGetChannelsQuery } from "../API/channels";
import { useDeleteChannelMutation, channelsApi } from "../API/channels"; 
import { useDeleteMessagesByChannelIdMutation, messagesApi } from "../API/messages";
import { useDispatch } from "react-redux";

const ModalDeleteChannel = (props) => {
    // const [addChannel] = useAddChannelMutation();
    const { data: channels, error, isLoading } = useGetChannelsQuery();
    const [deleteChannel] = useDeleteChannelMutation();
    const [deleteMessagesByChannelId] = useDeleteMessagesByChannelIdMutation();
    const dispatch = useDispatch();

  //   const dispatch = useDispatch();



  const handleDeleteChannel = async (channelId) => {
    try {
      await deleteChannel(channelId).unwrap();
      // После успешного удаления поста, удаляем все связанные сообщения
      await deleteMessagesByChannelId(channelId);
      props.onHide();
    dispatch(
        channelsApi.util.updateQueryData("getChannels", undefined, (draft) => {
          return draft.filter((channel) => channel.id !== channelId);
        })
      );

      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        return draft.filter((message) => message.channelId !== channelId);
      }));

    } catch (error) {
      console.error('Ошибка при удалении канала:', error);
    }
  };


  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Form>
            <Form.Group >
              <Form.Control
              controlId="name"
              className="mb-3"
              name="name"
              />
              <Form.Label className="visually-hidden" for='name' >Имя канала</Form.Label>
            </Form.Group>
    <Container className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={props.onHide}>Отменить</Button>
        <Button onClick={props.onHide}>Отправить</Button>

    </Container>
          </Form> */}
        <Container className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={props.onHide}>
            Отменить
          </Button>
          <Button 
          variant="danger" onClick={()=>handleDeleteChannel(props.channelId)}>Удалить</Button>
          </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteChannel;
