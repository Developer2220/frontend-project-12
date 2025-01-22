// const App = () => <h1>Hexlet Chat</h1>;
import { useEffect } from "react";
// import socket from "./socket";

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import store from "./store/index.js";
import { Provider, useDispatch } from "react-redux";
import { AuthContextProvider } from "./auth/authProvider";
import { ToastContainer } from 'react-toastify';

// import { SocketContext } from "./context/SocketContext";

import io from 'socket.io-client'

import { channelsApi } from "./API/channels";
import { messagesApi } from "./API/messages";

import SocketManager from "./components/SocketManager";




const App = () => {
  // const socket = io();
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   // setSocket(socket);
  //   socket.on("connect", () => {
  //       console.log("WebSocket in Channels connected:", socket.id);
  //     });
  //   socket.on("newChannel", (payload) => {
  //   //   setChannels((prevChannels) => [...prevChannels, payload]);
  //     dispatch(
  //       channelsApi.util.updateQueryData("getChannels", undefined, (draft) => {
  //         draft.push(payload);
  //       })
  //     );
  //   });

  //   return () => {
  //       socket.off("newChannel");
  //     };
  // }, []);

  // console.log("Socket connected?", socket.connected);
  // socket.on("connect_error", (err) => {
  //   console.error("Connection error:", err);
  // });

  // useEffect(() => {
  //   socket.on('removeChannel', (channelId) => {
  //       dispatch(
  //           channelsApi.util.updateQueryData("getChannels", undefined, (draft) => {
  //             return draft.filter((channel) => channel.id !== channelId.id);
  //           })
  //         );
    
  //         dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
  //           return draft.filter((message) => message.channelId !== channelId.id);
  //         }));
  //   });

  //   return () => {
  //     socket.off('removeChannel');
  //   };
  // }, [dispatch]);


  // useEffect(() => {
  //   socket.on("renameChannel", (updatedChannel) => {
  //     dispatch(
  //       channelsApi.util.updateQueryData("getChannels", undefined, (draft) => {
  //         const index = draft.findIndex(
  //           (channel) => channel.id === updatedChannel.id
  //         );
  //         if (index !== -1) {
  //           draft[index].name = updatedChannel.name;
  //         }
  //       })
  //     );
  //   });

  //   return () => {
  //     socket.off("renameChannel");
  //   };
  // }, [dispatch]);


  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("WebSocket connected:", socket.id);
  //   });

  //   socket.on("newMessage", (newMessage) => {
  //     dispatch(
  //       messagesApi.util.updateQueryData("getMessages", undefined, (draft) => {
  //         draft.push(newMessage);
  //       })
  //     );
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [dispatch]);


  


  return (
   <BrowserRouter>
        <Provider store={store}>
          <AuthContextProvider>
          <SocketManager /> {/* Подключение сокетов */}
            <AppRoutes />
          </AuthContextProvider>
        </Provider>
        <ToastContainer/>
      </BrowserRouter>
   
  );
};

export default App;
