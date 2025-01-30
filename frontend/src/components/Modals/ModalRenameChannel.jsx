import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Col } from 'react-bootstrap';
import { useGetChannelsQuery, useUpdateChannelMutation } from '../../API/channels';
import { setCurrentChannel, selectCurrentChannel } from '../../store/slices/channelsSlices';
import checkChannelnameUnique from '../../helpers/checkChannelnameUnique.js';
import {
  changeModalShow, selectChangeModalShow, selectSetModalChannel, setModalChannel,
} from '../../store/slices/modalsSlices';

const ModalRenameChannel = () => {
  const { t } = useTranslation();
  const [updateChannel] = useUpdateChannelMutation();
  const { data: channels } = useGetChannelsQuery();
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
            name: currentModalChannel.name,
          }}
          validationSchema={ModalSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateChannel({
                id: currentModalChannel.id,
                newChannelName: values.name,
              }).unwrap();

              if (currentChannel && currentChannel.id === currentModalChannel.id) {
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
              <Col className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={onHide}
                >
                  {t('buttons.cancel')}
                </Button>
                <Button type="submit">{t('buttons.submit')}</Button>
              </Col>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
