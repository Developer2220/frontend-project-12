import Authform from "../components/AuthForm";
import Messages from "../components/Messages";
import MyVerticallyCenteredModal from "../components/ModalWindow";

import { useState } from "react";
import Button from 'react-bootstrap/Button';

import Example from "../components/Example";

const SignupPage = () => {
    const [modalShow, setModalShow] = useState(false);
  return <div>
    <div>SignupPage</div>
    <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>
    <MyVerticallyCenteredModal 
    show={modalShow}
    onHide={() => setModalShow(false)}
    />
<Example />

    
    </div>;
};

export default SignupPage;


