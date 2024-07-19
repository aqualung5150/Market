import { RootState } from "app/store";
import { SocketContext } from "context/SocketContext";
import useFormInput from "hooks/useFormInput";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SocketMessageData } from "types/chat";
import { PublicUser } from "types/user";

const useChatRoom = (selectedChannelId: number) => {
  const socket = useContext(SocketContext).socket;
  const userId = useSelector((state: RootState) => state.user.id);
  const [messagesData, setMessagesData] = useState<SocketMessageData[]>([]);
  const [roomUsers, setRoomUsers] = useState<PublicUser[]>([]);
  const [activated, setActivated] = useState(true);
  const [cursor, setCursor] = useState(0);
  const { inputProps: messageInput, setValue: setMessageInput } =
    useFormInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageInput.value.length === 0) return;
    socket?.emit("sendMessageReq", {
      body: messageInput.value,
      channelId: selectedChannelId,
    });
    setMessageInput("");
  };

  useEffect(() => {
    if (!socket) return;

    // Init Emit
    socket.emit("getRoomUsersReq", { selectedChannelId: selectedChannelId });

    // Event
    const addNewMessage = (message: SocketMessageData) => {
      if (message.channelId === selectedChannelId) {
        if (message.sender.id !== userId) {
          socket.emit("readMessageReq", {
            messageId: message.id,
            senderId: message.sender.id,
          });
        }
        // add message front
        setMessagesData((prev) => {
          prev.unshift(message);
          return [...prev];
        });
      }
    };

    const readMessage = (messageId: number) => {
      setMessagesData((prev) => {
        const target = prev.find((message) => message.id === messageId);
        if (target) target.read = true;

        return [...prev];
      });
    };

    const readMessages = (lastMessageAt: Date) => {
      setMessagesData((prev) => {
        prev.map((message: SocketMessageData) => {
          if (message.createdAt <= lastMessageAt) message.read = true;
        });

        return [...prev];
      });
    };

    const getRoomUsers = (users: PublicUser[]) => {
      if (users.find((user) => user.isDeleted)) setActivated(false);
      setRoomUsers(users.filter((user) => user.id !== userId));
    };

    // Listen
    socket.on("sendMessageRes", addNewMessage);
    socket.on("readMessagesRes", readMessages);
    socket.on("readMessageRes", readMessage);
    socket.on("getRoomUsersRes", getRoomUsers);

    return () => {
      socket.off("sendMessageRes", addNewMessage);
      socket.off("readMessagesRes", readMessages);
      socket.off("readMessageRes", readMessage);
      socket.on("getRoomUsersRes", getRoomUsers);
    };
  }, [socket]);

  // Infinite Scroll
  const loader = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!socket || cursor < 0) return; // last message loaded

    const concatMessages = ({ messages, nextCursor }: any) => {
      setMessagesData((prev) => prev.concat(messages));
      setCursor(nextCursor); // set cursor as last message's id
    };

    socket.on("getMessagesRes", concatMessages);

    const handleObserver = (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting) {
        socket?.emit("getMessagesReq", {
          channelId: selectedChannelId,
          cursor,
        });
      }
    };

    // const options = {
    //   root: null,
    //   rootMargin: "20px",
    //   threshold: 0,
    // };
    const observer = new IntersectionObserver(handleObserver);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);

      socket.off("getMessagesRes", concatMessages);
    };
  }, [cursor]);

  return {
    activated,
    roomUsers,
    messagesData,
    loader,
    messageInput,
    handleSubmit,
  };
};

export default useChatRoom;
