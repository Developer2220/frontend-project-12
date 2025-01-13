import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";

import { useUpdateChannelMutation } from "../API/channels";
import { useGetChannelsQuery, channelsApi } from "../API/channels";
  
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";

// import { setCurrentChannel } from "../store/slices/dataSlices";
// import { useDispatch } from "react-redux";


const ModalRenameChannel = (props) => {
  const [updateChannel] = useUpdateChannelMutation();
  const { data: channels, error, isLoading } = useGetChannelsQuery();

  const { channelId, ...modalProps} = props;

// console.log('props.channelId', props.channelId)

//   const dispatch = useDispatch();
  
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
        
          // const isUnique = await checkChannelnameUnique(channels, value);
          // return isUnique

          return await checkChannelnameUnique(channels, value);

      
        }
      ),
      
  });

  return (
    <Modal {...modalProps} centered>
    {/* <Modal {...modalProps} centered> */}

      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <Form>
            <Form.Group >
              <Form.Control
              controlId="name"
              className="mb-3"
              name="name"
              />
              <Form.Label className="visually-hidden" for='name' >Имя канала</Form.Label>
            </Form.Group>
    <Container className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={props.onHide}>Отменить</Button>
        <Button onClick={props.onHide}>Отправить</Button>

    </Container>
          </Form> */}

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
            //   dispatch(setCurrentChannel(result)); // Диспатч нового канала как текущего
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
