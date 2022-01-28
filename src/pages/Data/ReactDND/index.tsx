import { Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react';
import { DragDropContext, Draggable, DraggingStyle, Droppable, DroppableStateSnapshot, DropResult, NotDraggingStyle } from 'react-beautiful-dnd'
import utils from '../../../config/utils';

interface IReactDNDProps {
}

type TableProp = {
  id: number,
  username: string,
  age: string,
  sex: string,
  addr: string,
  google: string,
}

const ReactDND: React.FunctionComponent<IReactDNDProps> = (props) => {

  const [list, setList] = React.useState<TableProp[]>([]);

  const getListStyle = (snapshot: DroppableStateSnapshot, provided: any) => {
    return {
      width: '100%',
      height: '100%',
      overflow: 'auto',
    }
  }

  const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => {
    return {
      ...draggableStyle,
      display: isDragging ? 'table' : 'table-row',
    }
  }

  const dragEnd = (e: DropResult) => {
    if (!e.destination) {
      return;
    }
    const items = utils.reorder(list, e.source.index, e.destination.index);

    setList(items);
  }

  React.useEffect(() => {
    // console.log('tableList: ', tableList)
    let timeout: NodeJS.Timeout | null = null;
    timeout = setTimeout(() => {
      setList(new Array(15).fill(0).map((d, i) => ({
        id: i,
        username: 'PhantomGlaxtMin Line' + i,
        age: '12 years old',
        sex: '男',
        addr: 'This is an uninhabited island. Leave it alone',
        google: "Don't talk nonsense. It's a statement. It doesn't make any sense"
      })));
    }, 1500)
    return () => {
      clearTimeout(timeout!);
      timeout = null;
    }
  }, [])

  return (
    <Stack spacing={2}>

      {/* <Paper sx={{p: 2}}> */}
      <DragDropContext onDragEnd={(e) => dragEnd(e)}>
        <Stack flexDirection={'row'}>
          <Paper sx={{ width: 280, mr: 2, p: 2 }}>

          </Paper>
          <Paper sx={{ flex: 1, width: '100%', height: 480, p: 2 }}></Paper>
        </Stack>
      </DragDropContext>

      {/* </Paper> */}
      <Divider />
      <Paper>
        <DragDropContext
          onDragEnd={(e) => dragEnd(e)}
        >
          <Paper sx={{ width: '100%', height: '480px', p: 2 }}>
            <Droppable droppableId={"item"}>
              {
                (provided, snapshot) => (
                  <TableContainer ref={provided.innerRef} style={getListStyle(snapshot, provided)}>
                    <Table sx={{ tableLayout: 'fixed' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: '20%', fontWeight: '700' }}>Username</TableCell>
                          <TableCell sx={{ fontWeight: '700' }}>Age</TableCell>
                          <TableCell sx={{ width: '10%', fontWeight: '700' }}>Sex</TableCell>
                          <TableCell sx={{ width: '50%', fontWeight: '700' }}>Addr</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          list.map((item, index) => (
                            <Draggable key={item.id} draggableId={`item_${item.id}`} index={index}>
                              {
                                (provided, snapshot, rubric) => (
                                  <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                    )}>
                                    <TableCell sx={{ width: '20%' }}>{item.username}</TableCell>
                                    <TableCell>{item.age}</TableCell>
                                    <TableCell sx={{ width: '10%' }}>{item.sex}</TableCell>
                                    <TableCell sx={{ width: '50%' }}>{item.addr}</TableCell>
                                  </TableRow>
                                )
                              }
                            </Draggable>
                          ))
                        }
                        {provided.placeholder}
                      </TableBody>
                    </Table>

                  </TableContainer>
                )
              }
            </Droppable>
          </Paper>
        </DragDropContext>
      </Paper>

    </Stack>
  );
};

export default ReactDND;
