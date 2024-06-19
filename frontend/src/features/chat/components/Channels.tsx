import { ChannelsProps } from "../../../@types/chat";
import styles from "./Channels.module.css";

const Channels = ({ children }: ChannelsProps) => {
  // <div className={styles.container}>
  return <div>{children}</div>;
};

export default Channels;
