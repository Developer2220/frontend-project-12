import { useState } from "react"


// const Modal = () => {
//   return (
//     <div>Modal</div>
//   )
// }


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import CloseButton from "react-bootstrap/esm/CloseButton";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

const ModalWindow = (props) => {
  return (
    <Modal
      {...props}
      centered

    >
      <Modal.Header closeButton>
        <Modal.Title>
          Добавить канал
        </Modal.Title>
     

      </Modal.Header>
      <Modal.Body>
      <Form>
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
          </Form>
      </Modal.Body>
    </Modal>
  );
}


export default ModalWindow