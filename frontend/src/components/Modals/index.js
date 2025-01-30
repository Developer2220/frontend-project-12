import ModalAddChannel from './ModalAddChannel';
import ModalDeleteChannel from './ModalDeleteChannel';
import ModalRenameChannel from './ModalRenameChannel';

const modals = {
  adding: ModalAddChannel,
  renaming: ModalRenameChannel,
  removing: ModalDeleteChannel,
};

const getModal = (modalName) => modals[modalName];

export default getModal;
