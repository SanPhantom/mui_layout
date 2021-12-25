import { ButtonTypeMap, Snackbar } from '@mui/material';
import * as React from 'react';

interface IMessageProps {
  open: boolean,
  content: string,
  type: 'primary' | 'success' | 'error' | 'info' | 'warning'
}

const Message: React.FunctionComponent<IMessageProps> = ({
  open,
  content,
  type
}) => {
  return (
    <Snackbar 
      open={open} 
      message={content}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      security={type}></Snackbar>
  );
};

export default Message;
