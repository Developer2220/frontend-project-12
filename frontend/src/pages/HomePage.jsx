import {
  Container, Row, Col, Button, Spinner,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filterWords from 'leo-profanity';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Channels from '../components/Channels';
import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';
import { selectCurrentChannel } from '../store/slices/channelsSlices';
import { useGetMessagesQuery } from '../API/messages';
import { useGetChannelsQuery } from '../API/channels';
import { changeModalShow } from '../store/slices/modalsSlices';

const SpinnerPage = () => (
  <Container
    className="d-flex justify-content-center align-items-center"
    style={{ height: '100vh' }}
  >
    <Spinner animation="border" variant="primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </Container>
);

const HomePage = () => {
  const { t } = useTranslation();
  const {
    data: messages, isLoading: isLoadingMessages, isError, error,
  } = useGetMessagesQuery();
  const { isLoading: isLoadingChannels } = useGetChannelsQuery();
  const navigate = useNavigate();
  const currentChannel = useSelector(selectCurrentChannel);
  const dispatch = useDispatch();

  const declOfNum = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return `${number} ${
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
    }`;
  };

  const filteredMessages = messages && currentChannel
    ? messages.filter((message) => message.channelId === currentChannel.id)
    : [];

  const showNumberMessages = filteredMessages.length >= 0
    ? declOfNum(filteredMessages.length, [
      t('messages.one'),
      t('messages.two'),
      t('messages.five'),
    ])
    : t('messages.loading');

  if (isLoadingChannels || isLoadingMessages) {
    return <SpinnerPage />;
  }

  if (isError) {
    if (error.status === 401) {
      return navigate('./login');
    }
  }

  return (
    <div className="d-flex flex-column h-100">
      <NavBar showLogout />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">
          <Col
            xs={4}
            md={2}
            className="border-end bg-light px-0 d-flex flex-column h-100"
          >
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels.title')}</b>
              <Button
                onClick={() => dispatch(changeModalShow({
                  modalShow: true,
                  modalType: 'adding',
                }))}
                variant="link"
                className="p-0 text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
                <span className="visually-hidden">+</span>
              </Button>
            </div>
            <Channels />
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    #
                    {filterWords.clean(currentChannel.name)}
                  </b>
                </p>
                <span className="text-muted">{showNumberMessages}</span>
              </div>
              <Messages />
              <MessageInput />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
