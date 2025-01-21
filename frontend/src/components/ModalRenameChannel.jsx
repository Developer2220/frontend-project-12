import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { useUpdateChannelMutation } from "../API/channels";
import { useGetChannelsQuery, channelsApi } from "../API/channels";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import socket from "../socket";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { setCurrentChannel } from "../store/slices/channelsSlices";
import { selectCurrentChannel } from "../store/slices/channelsSlices";

const ModalRenameChannel = (props) => {
  const { t } = useTranslation();
  const [updateChannel] = useUpdateChannelMutation();
  const { data: channels, error, isLoading } = useGetChannelsQuery();

  const { channelId, ...modalProps } = props;

  const dispatch = useDispatch();

  //
  const currentChannel = useSelector(selectCurrentChannel);

  const checkChannelnameUnique = (channels, name) => {
    if (!channels) return true;
    const channelName = channels.map((channel) => channel.name);
    return !channelName.includes(name);
  };

  const ModalSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t("errors.range"))
      .max(20, t("errors.range"))
      .required(t("errors.required"))

      .test("unique", t("errors.unique"), async (value) => {
        if (!value || isLoading || error) return false;
        return await checkChannelnameUnique(channels, value);
      }),
  });

  useEffect(() => {
    socket.on("renameChannel", (updatedChannel) => {
      dispatch(
        channelsApi.util.updateQueryData("getChannels", undefined, (draft) => {
          const index = draft.findIndex(
            (channel) => channel.id === updatedChannel.id
          );
          if (index !== -1) {
            draft[index].name = updatedChannel.name;
          }
        })
      );
    });

    return () => {
      socket.off("renameChannel");
    };
  }, [dispatch]);

  return (
    <Modal {...modalProps} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("channels.rename")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={ModalSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const result = await updateChannel({
                id: channelId,
                newChannelName: values.name,
              }).unwrap();

              // Если переименовываем текущий канал, обновляем его в Redux
              if (currentChannel && currentChannel.id === channelId) {
                dispatch(
                  setCurrentChannel({
                    ...currentChannel,
                    name: values.name,
                  })
                );
              }

              props.onHide();
              toast.success(t("toast.renameChannel"), { autoClose: 2000 });
            } catch (error) {
              console.error(error);
              toast.error(t("toast.errorNetwork"), { autoClose: 2000 });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field
                  id="name"
                  name="name"
                  className={`mb-2 form-control ${
                    touched.name && errors.name ? "is-invalid" : null
                  }`}
                />
                <label className="visually-hidden" htmlFor="name">
                  {t("channels.title")}
                </label>
                {touched.name && errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <Container className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={props.onHide}
                >
                  {t("buttons.cancel")}
                </Button>
                <Button type="submit">{t("buttons.submit")}</Button>
              </Container>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
