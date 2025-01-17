import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { useAddChannelMutation } from "../API/channels";
import { useGetChannelsQuery } from "../API/channels";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { setCurrentChannel } from "../store/slices/dataSlices";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ModalAddChannel = (props) => {
  const { t } = useTranslation();
  const [addChannel] = useAddChannelMutation();
  const { data: channels, error, isLoading } = useGetChannelsQuery();
  const dispatch = useDispatch();

  const checkChannelnameUnique = (channels, name) => {
    if (!channels) return true;
    const channelName = channels.map((channel) => channel.name);
    return !channelName.includes(name);
  };

  const ModalSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required'))

      .test("unique", t('errors.unique'), async (value) => {
        if (!value || isLoading || error) return false;
        return await checkChannelnameUnique(channels, value);
      }),
  });

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("channels.add")}</Modal.Title>
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
              const result = await addChannel(values).unwrap();
              dispatch(setCurrentChannel(result));
              props.onHide();
            } catch (error) {
              console.error(error);
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
                  {t("channels.name")}
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

export default ModalAddChannel;
