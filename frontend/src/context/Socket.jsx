import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";
const SocketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {

  const [socket, setSocket] = useState();
  const { authUser } = useAuthContext();
 const [onlineUsers,setOnlineUsers] = useState([])
  useEffect(() => {
    const socket = io("http://localhost:3500", {
      query: {
        userId: authUser?._id,
      },
    });

    socket.on("getOnlineUser",(users)=>{
setOnlineUsers(users) // stored _id:34847584573275834
    })
  
setSocket(socket)
    return () => socket && socket.close();
  }, [ authUser?._id]);

console.log("onlineUsers:",onlineUsers)
  return <SocketContext.Provider value={{socket,onlineUsers}}>
    {children}
    </SocketContext.Provider>;
};
