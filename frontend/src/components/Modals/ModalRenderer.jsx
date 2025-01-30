import { useSelector } from 'react-redux';
import { selectChangeModalShow, selectChangeModalType } from '../../store/slices/modalsSlices';
import getModal from '.';

const ModalRenderer = () => {
  const show = useSelector(selectChangeModalShow);
  const currentModalType = useSelector(selectChangeModalType);
  const ModalComponent = getModal(currentModalType);

  if (!show || !ModalComponent) return null;

  return <ModalComponent />;
};

export default ModalRenderer;