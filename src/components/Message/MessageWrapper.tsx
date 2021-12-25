import { useState } from "react"
import Message from "./Message";

interface MessageProp {
  open: boolean,
  content: string,
  type: 'primary' | 'success' | 'error' | 'info' | 'warning'
}

const MessageWrapper: React.FC = ({}) => {
  const [list, setList] = useState<MessageProp[]>([]);

  const add = () => {

  }

  return (
    <div className="message-wrapper">
      {
        list.map((item) => (
          <Message open={item.open} content={item.content} type={item.type} />
        ))
      }
    </div>
  )
}

export default MessageWrapper