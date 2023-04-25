import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useSocket } from "../../App";

const SocketNotifications = () => {
  const socket = useSocket(io);
  const { token, userId, isLoggedIn } = useSelector((state) => {
    //return object contains the redux states
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    };
  });
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    socket &&
      socket.on(
        "RECEIVE_NOTIFICATION",
        ({ firstname, lastname, avatar, messagecontent }) => {
          console.log(firstname, lastname, avatar, messagecontent );
          setNotification([
            ...notification,
            {
              firstname: firstname,
              lastname: lastname,
              avatar: avatar,
              messagecontent: messagecontent,
            },
          ]);
        }
      );
  }, [notification]);

  const notify = () =>
    toast(`${notification.avatar} ${notification.messagecontent}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  notification !== null && notify();
  return (
    <div>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default SocketNotifications;
