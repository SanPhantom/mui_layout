import { Alert } from "@mui/material";
import ReactDOM from "react-dom";
import MessageWrapper, { MessageProp } from "./MessageWrapper";
import { uniqueId } from 'lodash-es';
import './styles.css';
import React, { useCallback } from "react";

export const message = (function() {

  const messageRef = React.createRef<{
    add: (params: MessageProp) => void,
  }>();

  const createRoot = () => {
    let container = document.getElementById('message-container');
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', 'message-container');
      document.body.appendChild(container);
    }
    ReactDOM.render(
      <MessageWrapper ref={messageRef}  />,
      container,
    );
  }

  

  return {
    success: (content: string, duration?: number) => {
      createRoot();
      messageRef.current!.add({
        type: 'success',
        content: content,
        key: uniqueId(),
        duration: duration || 3
      })
    },
    info: (content: string, duration?: number) => {
      createRoot();
      messageRef.current!.add({
        type: 'info',
        content: content,
        key: uniqueId(),
        duration: duration || 3
      })
    },
    warning: (content: string, duration?: number) => {
      createRoot();
      messageRef.current!.add({
        type: 'warning',
        content: content,
        key: uniqueId(),
        duration: duration || 3
      })
    },
    error: (content: string, duration?: number) => {
      createRoot();
      messageRef.current!.add({
        type: 'error',
        content: content,
        key: uniqueId(),
        duration: duration || 3
      })
    },
    warn: (content: string, duration?: number) => {
      message.warning(content, duration)
    }
  }
})()