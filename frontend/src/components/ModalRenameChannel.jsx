import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { useUpdateChannelMutation } from "../API/channels";
import { useGetChannelsQuery, channelsApi } from "../API/channels";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import socket from "../socket";



const ModalRenameChannel = (props) => {
  const [updateChannel] = useUpdateChannelMutation();
  const { data: channels, error, isLoading } = useGetChannelsQuery();

  const { channelId, ...modalProps} = props;

// console.log('props.channelId', props.channelId)

  const dispatch = useDispatch();
  
// const socket = io()

  //проверка на уникальность значения в поле
  const checkChannelnameUnique = (channels, name) => {
    if (!channels) return true;
    const channelName = channels.map((channel)=> channel.name)
    // console.log(channelName)
      return !channelName.includes(name); 
    };

    console.log('channels in ModalRenameChannel', channels)

  const ModalSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .required("Обязательное поле")

      .test(
        "unique", // Название теста
        "Должно быть уникальным", // Сообщение об ошибке
        async (value) => {
          console.log('value', value)
          if (!value || isLoading || error) return false; // Не проверять пустое значение
          return await checkChannelnameUnique(channels, value);
      
        }
      ),
      
  });

  useEffect(() => {
    // Слушаем событие обновления канала от сервера
    socket.on('renameChannel', (updatedChannel) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
          const index = draft.findIndex((channel) => channel.id === updatedChannel.id);
          if (index !== -1) {
            draft[index].name = updatedChannel.name; // Обновляем имя канала
          }
        })
      );
    });

    return () => {
      // Очистка прослушивания события при размонтировании компонента
      socket.off('channelUpdated');
    };
  }, [dispatch]);


  return (
    <Modal {...modalProps} centered>
    {/* <Modal {...modalProps} centered> */}

      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={ModalSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            console.log('values', values);
            try {
              
            //   const result = await updateChannel({id: props.channelId, newChannelName: values.name}).unwrap();
            const result = await updateChannel({id: channelId, newChannelName: values.name}).unwrap();
              console.log("Ответ от сервера после обновления:", result);
            props.onHide();
            // onHide()
            } catch (error) {
              console.error("Ошибка", error);
              setFieldError("name", "Ошибка сервера");
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
                  Имя канала
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
                // onClick={onHide}

                >
                  Отменить
                </Button>
                <Button type="submit">Отправить</Button>
              </Container>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRenameChannel;
