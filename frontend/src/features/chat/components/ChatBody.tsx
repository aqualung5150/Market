import React from "react";
import { ChatBodyProps } from "../../../@types/chat";

const ChatBody = ({ children }: ChatBodyProps) => {
  return <div className="flex h-full overflow-auto">{children}</div>;
};

export default React.memo(ChatBody);
