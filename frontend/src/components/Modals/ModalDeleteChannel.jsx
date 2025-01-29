import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDeleteMessagesByChannelIdMutation } from '../../API/messages';
import { useDeleteChannelMutation } from '../../API/channels';
import { setCurrentChannel, selectCurrentChannel } from '../../store/slices/channelsSlices';

const ModalDeleteChannel = (props) => {
  console.log('props', props);
  const { t } = useTranslation();
  const [deleteChannel] = useDeleteChannelMutation();
  const [deleteMessagesByChannelId] = useDeleteMessagesByChannelIdMutation();
  const dispatch = useDispatch();
  //   const { channelId, ...modalProps } = props;
  const { channelId, onHide, show } = props;

  const currentChannel = useSelector(selectCurrentChannel);

  const handleDeleteChannel = async (clickedChannelId) => {
    try {
      await deleteChannel(clickedChannelId).unwrap();
      await deleteMessagesByChannelId(clickedChannelId);
      if (currentChannel && currentChannel.id === clickedChannelId) {
        dispatch(
          setCurrentChannel({ id: '1', name: 'general', removable: false }),
        );
      }
      //   props.onHide();
      onHide();
      toast.success(t('toast.deleteChannel'), { autoClose: 2000 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <Modal {...modalProps} centered>
    <Modal onHide={onHide} show={show} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.delete')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="lead">
        {t('channels.modalDeleteSubmit')}
        <Container className="d-flex justify-content-end">
          {/* <Button variant="secondary" className="me-2" onClick={props.onHide}> */}
          <Button variant="secondary" className="me-2" onClick={onHide}>

            {t('buttons.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteChannel(channelId)}
          >
            {t('buttons.delete')}
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteChannel;
