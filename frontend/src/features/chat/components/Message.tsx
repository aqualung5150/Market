import { MessageProps, SocketMessageData } from "../../../@types/chat";

const Message = ({
  id,
  body,
  read,
  createdAt,
  channelId,
  sender,
  userId,
}: MessageProps) => {
  return (
    <li>
      <h2>{body}</h2>
      {userId === sender.id ? <h3>me</h3> : <h3>{sender.nickname}</h3>}
      <h3>{createdAt}</h3>
    </li>
  );
};

export default Message;
