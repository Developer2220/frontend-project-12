import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetChannelsQuery, useUpdateChannelMutation } from '../API/channels';

import { setCurrentChannel, selectCurrentChannel } from '../store/slices/channelsSlices';
import checkChannelnameUnique from '../helpers/checkChannelnameUnique.js';

const ModalRenameChannel = (props) => {
  const { t } = useTranslation();
  const [updateChannel] = useUpdateChannelMutation();
  const { data: channels } = useGetChannelsQuery();

  const {
    channelId, channelName, onHide, show,
  } = props;

  const dispatch = useDispatch();

  const currentChannel = useSelector(selectCurrentChannel);

  const ModalSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('errors.range'))
      .max(20, t('errors.range'))
      .required(t('errors.required'))

      .test('unique', t('errors.unique'), (value) => {
        if (!value) return false;
        return checkChannelnameUnique(channels, value);
      }),
  });

  return (
    <Modal onHide={onHide} show={show} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: channelName,
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
              console.log('result', result);

              if (currentChannel && currentChannel.id === channelId) {
                dispatch(
                  setCurrentChannel({
                    ...currentChannel,
                    name: values.name,
                  }),
                );
              }

              onHide();
              toast.success(t('toast.renameChannel'), { autoClose: 2000 });
            } catch (error) {
              console.error(error);
              toast.error(t('toast.errorNetwork'), { autoClose: 2000 });
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
                    touched.name && errors.name ? 'is-invalid' : null
                  }`}
                />
                <label className="visually-hidden" htmlFor="name">
                  {t('channels.name')}
                </label>
                {touched.name && errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <Container className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={onHide}
                >
                  {t('buttons.cancel')}
                </Button>
                <Button type="submit">{t('buttons.submit')}</Button>
              </Container>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
