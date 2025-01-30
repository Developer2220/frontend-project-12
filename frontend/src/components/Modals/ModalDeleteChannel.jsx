import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Col } from 'react-bootstrap';
import { useDeleteMessagesByChannelIdMutation } from '../../API/messages';
import { useDeleteChannelMutation } from '../../API/channels';
import { setCurrentChannel, selectCurrentChannel } from '../../store/slices/channelsSlices';
import {
  selectSetModalChannel, setModalChannel, changeModalShow, selectChangeModalShow,
} from '../../store/slices/modalsSlices';

const ModalDeleteChannel = () => {
  const { t } = useTranslation();
  const [deleteChannel] = useDeleteChannelMutation();
  const [deleteMessagesByChannelId] = useDeleteMessagesByChannelIdMutation();
  const dispatch = useDispatch();
  const onHide = () => {
    dispatch(changeModalShow({
      modalShow: false,
      modalType: null,
    }));
    dispatch(setModalChannel(null));
  };
  const show = useSelector(selectChangeModalShow);
  const currentModalChannel = useSelector(selectSetModalChannel);
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
      onHide();
      toast.success(t('toast.deleteChannel'), { autoClose: 2000 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal onHide={onHide} show={show} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.delete')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="lead">
        {t('channels.modalDeleteSubmit')}
        <Col className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>

            {t('buttons.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteChannel(currentModalChannel.id)}
          >
            {t('buttons.delete')}
          </Button>
        </Col>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteChannel;
