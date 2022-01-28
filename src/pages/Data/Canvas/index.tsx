import { Paper, Stack } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext, DragUpdate, DropResult } from 'react-beautiful-dnd';
import CanvasRender from '../../../components/CanvasRender';
import LeftBar from '../../../components/LeftBar';
import utils from '../../../config/utils';
import { DropCanvas } from '../../../interface';

interface ICanvasProps {
}

const Canvas: React.FunctionComponent<ICanvasProps> = (props) => {

  const canvasRef = React.useRef<DropCanvas>();

  const [list, setList] = React.useState([
    { type: 'circle', minSeat: 1, maxSeat: 4 },
    { type: 'square', minSeat: 5, maxSeat: 8 },
    { type: 'circle', minSeat: 10, maxSeat: 15 },
  ])

  const dragEnd = (e: DropResult) => {
    if (!e.destination) {
      return;
    }
    if (e.destination.droppableId === 'table_area') {
      const items = utils.reorder(list, e.source.index, e.destination.index);
      setList(items)
    } else if (e.destination.droppableId === 'table_layout') {
      console.log(e)
    }
  }

  const dragUpdate = (e: DragUpdate) => {
    if (!e.destination) {
      return;
    }
    if (e.destination?.droppableId == 'table_layout') {
      canvasRef.current?.createCell();
    }
  }

  return (
    <Stack sx={{ height: '100%' }}>
      <DragDropContext onDragEnd={(e) => dragEnd(e)} onDragUpdate={(e) => dragUpdate(e)}>
        <Stack flexDirection={'row'} sx={{ height: '100%' }}>
          <Paper sx={{ width: 340, mr: 2 }}>
            <LeftBar list={list} />
          </Paper>
          <Paper sx={{ flex: 1, minWidth: '1px', height: '100%', p: 2 }}>
            <CanvasRender ref={canvasRef}></CanvasRender>
          </Paper>
        </Stack>
      </DragDropContext>
    </Stack>
  );
};

export default Canvas;
