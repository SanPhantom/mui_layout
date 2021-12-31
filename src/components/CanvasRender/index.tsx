import { Box } from '@mui/material';
import * as React from 'react';

interface ICanvasRenderProps {
}

const CanvasRender: React.FunctionComponent<ICanvasRenderProps> = (props) => {
  return (
    <Box>
      <canvas height={500}></canvas>
      <canvas></canvas>
    </Box>
  );
};

export default CanvasRender;
