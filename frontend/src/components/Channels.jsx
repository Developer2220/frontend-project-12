import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Nav, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filterWords from 'leo-profanity';
import { setCurrentChannel, selectCurrentChannel } from '../store/slices/channelsSlices';
import { useGetChannelsQuery } from '../API/channels';
import { changeModalShow, setModalChannel } from '../store/slices/modalsSlices';

const Channels = () => {
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const dispatch = useDispatch();

  const handleOpenModalDeleteChannel = (channel) => {
    dispatch(setModalChannel(channel));
    dispatch(changeModalShow({
      modalShow: true,
      modalType: 'removing',
    }));
  };

  const handleOpenModalRenameChannel = (channel) => {
    dispatch(setModalChannel(channel));
    dispatch(changeModalShow({
      modalShow: true,
      modalType: 'renaming',
    }));
  };

  const currentChannel = useSelector(selectCurrentChannel);

  useEffect(() => {
    if (channels && channels.length > 0 && !currentChannel) {
      const defaultChannel = channels[0];
      dispatch(setCurrentChannel(defaultChannel));
    }
  }, [channels, dispatch, currentChannel]);

  const handleСlick = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  const channelsEndRef = useRef(null);

  useEffect(() => {
    if (channelsEndRef.current) {
      channelsEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [channels, currentChannel]);

  return (
    <Nav className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          {channel.removable === false ? (
            <button
              type="button"
              className={`w-100 rounded-0 text-start btn ${
                currentChannel.id === channel.id ? 'btn-secondary' : ''
              }`}
              onClick={() => handleСlick(channel)}
            >
              <span className="me-1">#</span>
              {filterWords.clean(channel.name)}
            </button>
          ) : (
            <Dropdown as={ButtonGroup} className="d-flex">
              <button
                type="button"
                className={`w-100 rounded-0 text-start text-truncate btn ${
                  currentChannel.id === channel.id ? 'btn-secondary' : ''
                }`}
                onClick={() => handleСlick(channel)}
              >
                <span className="me-1">#</span>
                {filterWords.clean(channel.name)}
              </button>
              <Dropdown.Toggle
                split
                variant=""
                className={`${
                  currentChannel.id === channel.id ? 'btn-secondary' : ''
                }`}
                id="dropdown-split-basic"
              >
                <span className="visually-hidden">{t('dropdown.toggle')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleOpenModalDeleteChannel(channel)}>
                  {t('buttons.delete')}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleOpenModalRenameChannel(channel)}
                >
                  {t('buttons.rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </li>
      ))}
      <div ref={channelsEndRef} />
    </Nav>
  );
};

export default Channels;
