import ReactDOM from "react-dom";
import MessageWrapper from "./MessageWrapper";

export const message = (function() {
  let container = document.getElementById('message-container');
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'message-container');
    document.body.appendChild(container);
  }

  const messageWrapper = ReactDOM.render(
    <MessageWrapper  />,
    container,
  );

  return {
    success: (content: string) => {
      // messageWrapper.add({

      // })
    }
  }
})