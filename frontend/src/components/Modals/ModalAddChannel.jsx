import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setCurrentChannel } from '../../store/slices/channelsSlices';
import { useGetChannelsQuery, useAddChannelMutation } from '../../API/channels';
import checkChannelnameUnique from '../../helpers/checkChannelnameUnique.js';
import {changeModalShow, selectChangeModalShow } from '../../store/slices/modalsSlices';

// const ModalAddChannel = (props) => {
const ModalAddChannel = () => {
  // console.log('props on ModalAddChannel', props)
  // const { onHide, show } = props;
  const dispatch = useDispatch();
  const onHide = () => dispatch(changeModalShow(false));
  const show = useSelector(selectChangeModalShow)
  const { t } = useTranslation();
  const [addChannel, {isLoading}] = useAddChannelMutation();

  const { data: channels } = useGetChannelsQuery();
  

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
        <Modal.Title>{t('channels.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={ModalSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const result = await addChannel(values).unwrap();
              dispatch(setCurrentChannel(result));
              onHide();
              toast.success(t('toast.addChannel'), { autoClose: 2000 });
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
                  disabled={isLoading}
                >
                  {t('buttons.cancel')}
                </Button >
                <Button type="submit" disabled={isLoading}>{t('buttons.submit')}</Button>
              </Container>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAddChannel;
