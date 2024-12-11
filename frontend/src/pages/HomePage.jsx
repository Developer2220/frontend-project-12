import { useState } from "react";
import useAuthContext from "../auth/authProvider";
// import useFetch from "../hooks/useFetch";
import useFetchMessages from "../hooks/useFetchMessages";

import NavBar from "../components/NavBar";
import Channels from "../components/Channels";
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";

// import { useDispatch } from "react-redux";
// import { setCurrentChannel } from "../store/slices/dataSlices";
import { useSelector } from "react-redux";
import { selectCurrentChannel } from "../store/slices/dataSlices";

import ModalWindow from "../components/ModalWindow";




const HomePage = () => {
  const { logOut, isAuthenticated } = useAuthContext();
  console.log('useAuthContext()',useAuthContext())
  console.log('isAuthenticated',isAuthenticated)

  // const { data, loading, error } = useFetch("/channels");
  // console.log("data in channels", data);
  // const channels = useFetch("/channels");
  // console.log("data in channels", channels.data);

  const {data} = useFetchMessages("/messages");
  console.log("data im messages", data);

  
  const currentChannel = useSelector(selectCurrentChannel)

  // const { data, loading, error } = useFetch("/messages");
  // const messages = useFetch("/messages")
  // console.log('data in messages', messages)
  
  // const numberMessages = (data) => {
  //   const strDataLength = data.length;
  //   if (data.length === 0) {
  //     return `0 сообщений`
  //   }
  //   if (strDataLength.endsWith(2)||strDataLength.endsWith(3)||strDataLength.endsWith(4)) {
  //     return `${data.length} сообщения`
  //   }
  //   if (strDataLength.endsWith(1)||strDataLength.endsWith(3)||strDataLength.endsWith(4)) {
  //     return `${data.length} сообщение`
  //   }
  //   else {
  //     return `${data.length} сообщений`
  //   }
  // } 
  // console.log('data.length', data.length)
  // console.log('numberMessages', numberMessages(data))


  const declOfNum = (number, titles) => {  
    let cases = [2, 0, 1, 1, 1, 2];  
    return `${number} ${titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]}`;  
}

// use:

const showNumberMessages = declOfNum(data.length, ['сообщение', 'сообщения', 'сообщений']);

const [modalShow, setModalShow] = useState(false);


  return (
    <div className="d-flex flex-column h-100">
      <NavBar showLogout={true}/>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button onClick={() => setModalShow(true)} type='button' className="p-0 text-primary btn btn-group-vertical" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <Channels/>
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># {currentChannel}</b>
                </p>
                <span className="text-muted">{showNumberMessages}</span>
              </div>
              <Messages/>
              <MessageInput/>
            </div>
          </div>


        </div>
      </div>

      <ModalWindow 
    show={modalShow}
    onHide={() => setModalShow(false)}
    />
    </div>
    
  );
};

export default HomePage;
