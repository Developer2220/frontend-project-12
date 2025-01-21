import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Channels from "../components/Channels";
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";
import { useSelector } from "react-redux";
import { selectCurrentChannel } from "../store/slices/channelsSlices";
import ModalAddChannel from "../components/ModalAddChannel";
import { useGetMessagesQuery } from "../API/messages";
import { useTranslation } from "react-i18next";
import filterWords from "../initLeoProfanity/";

const HomePage = () => {
  const { t } = useTranslation();

  const { data: messages, error, isLoading } = useGetMessagesQuery();
  if (!isLoading && messages) {
    console.log("messages in Homepage", messages);
  }

  const currentChannel = useSelector(selectCurrentChannel);
  console.log("currentChannel in HomePage", currentChannel.id);

  const declOfNum = (number, titles) => {
    let cases = [2, 0, 1, 1, 1, 2];
    return `${number} ${
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
    }`;
  };

  const filteredMessages =
    messages && currentChannel
      ? messages.filter((message) => message.channelId === currentChannel.id)
      : [];
  console.log("filteredMessages", filteredMessages);

  const showNumberMessages =
    filteredMessages.length >= 0
      ? declOfNum(filteredMessages.length, [
          t("messages.one"),
          t("messages.two"),
          t("messages.five"),
        ])
      : t("messages.loading");

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="d-flex flex-column h-100">
      <NavBar showLogout={true} />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white">
          <Col
            xs={4}
            md={2}
            className="border-end bg-light px-0 d-flex flex-column"
          >
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t("channels.title")}</b>
              <Button
                onClick={() => setModalShow(true)}
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
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
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
                  {<b># {filterWords.clean(currentChannel.name)}</b>}
                </p>
                <span className="text-muted">{showNumberMessages}</span>
              </div>
              <Messages />
              <MessageInput />
            </div>
          </Col>
        </Row>
      </Container>

      <ModalAddChannel show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default HomePage;
