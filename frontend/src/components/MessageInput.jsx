// const MessageInput = () => {
//   return (
//     <div className="mt-auto px-5 py-3">
//       <form noValidate className="py-1 border rounded-2">
//         <div className="input-group has-validation">
//         <input
//           name="body"
//           aria-label="Новое сообщение"
//           placeholder="Введите сообщение..."
//           className="border-0 p-0 ps-2 form-control"
//           defaultValue=""
//         />
//         <button type="submit" className="btn btn-group-vertical" disabled="">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             width="20"
//             height="20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
//             ></path>
//           </svg>
//           <span className="visually-hidden">Отправить</span>
//         </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;

import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useAddMessageMutation } from "../API/messages";
import { useGetChannelsQuery } from "../API/channels";

const MessageInput = () => {
  const [addMessage] = useAddMessageMutation();
const {data:channels} = useGetChannelsQuery()

//   const handleAddMessage = async () => {
//     await addMessage({ text: "New message" });
//   };

const handleAddMessage = async (event) =>  {
    event.preventDefault()
    await addMessage(formData);
}

// const handleAddMessage = (e) => {
//     e.preventDefault()
//     console.log(formData)
// }

const [formData, setFormData] = useState({
    channelId: '1', username: 'admin'
});
// console.log('formData', formData)

const handleChange = (event) => {
    setFormData({
      ...formData,
      body: event.target.value,
    });
  };


  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={handleAddMessage}>
        <InputGroup hasValidation >
          <Form.Control
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 ps-2"
            defaultValue=""
            // value={value}
            // value={formData.username || ''} 
            onChange={handleChange} 
          />
          <Button type="submit" variant="light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
              />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageInput;
