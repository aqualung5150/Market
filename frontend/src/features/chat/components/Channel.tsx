import { ChannelProps } from "../../../@types/chat";
import timeAgo from "../../../utils/timeAgo";
import styles from "./Channel.module.css";

const Channel = ({
  id,
  lastMessage,
  lastMessageDate,
  read,
  users,
  setSelectedChannelId,
}: ChannelProps) => {
  const timestamp = new Date(lastMessageDate);
  const time = timeAgo(timestamp);

  return (
    <div
      className={styles.container}
      onClick={() => {
        setSelectedChannelId(id);
      }}
    >
      <div className={styles.icon}>IMAGE</div>
      <div className={styles.center}>
        <div className={styles.title}>
          {users[0].nickname + ", " + users[1].nickname}
        </div>
        <div className={styles.text}>{lastMessage}</div>
      </div>
      <div className={styles.date}>{time}</div>
    </div>
  );
};

export default Channel;
// export default React.memo(Channel);
