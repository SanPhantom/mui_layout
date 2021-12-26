import { Alert, Stack, styled } from "@mui/material";
import { concat, remove } from "lodash-es";
import { forwardRef, useImperativeHandle, useState } from "react"

export interface MessageProp {
  type: "info" | 'success' | 'error' | 'warning',
  content: string,
  key: string,
  duration?: number,
}

const Message = styled(Alert, {
  shouldForwardProp: (props) => props !== 'duration'
})<{duration: number}>(({
  theme, duration
}) => ({
  marginBottom: theme.spacing(1),
  animation: `message ${duration}s linear 1`,
  backgroundColor: "#fff",
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
}))

const MessageWrapper = forwardRef((props, ref) => {
  const [list, setList] = useState<MessageProp[]>([]);

  useImperativeHandle(ref, ()=>({
    add: (params: MessageProp = { content: '', type: 'success', key: '' }) => {
      setList(concat([params], list));
    }
  }))

  const handleHide = (item: MessageProp) => {
    setList(remove(list, x => x.key !== item.key))
  }

  return (
    <Stack className="message-wrapper" alignItems={"center"}>
      {
        list.map((item) => (
          <Message severity={item.type} variant={"outlined"} key={item.key} duration={item.duration ?? 3} onAnimationEnd={() => {handleHide(item)}}>{item.content}</Message>
        ))
      }
    </Stack>
  )
})

export default MessageWrapper