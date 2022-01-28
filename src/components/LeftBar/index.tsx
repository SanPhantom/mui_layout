import { Box, Card, CardContent, CardHeader, CardMedia, Stack, Typography } from '@material-ui/core';
import * as React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface ILeftBarProps {
  list: Array<any>;
}

const LeftBar: React.FunctionComponent<ILeftBarProps> = ({
  list
}) => {

  return (
    <Box>
      <CardHeader title={"Component Template"}
        sx={{
          backgroundColor: theme => theme.palette.action.hover,
          textAlign: 'center'
        }}></CardHeader>
      <Droppable droppableId={"table_area"}>
        {(provided, snapshot) => (
          <Stack sx={{ p: 2 }} spacing={3} ref={provided.innerRef}>
            {
              list.map((item, index) => (
                <Draggable key={`${item.type}_${item.minSeat}_${item.maxSeat}`} draggableId={`${item.type}_${item.minSeat}_${item.maxSeat}`} index={index}>
                  {(provided, snapshot) => (
                    <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{mt: 0}}>
                      <CardMedia
                        component="img"
                        height="80"
                        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.type} table
                        </Typography>
                        <Stack flexDirection={"row"} justifyContent={"space-between"}>
                          <Typography variant="body2" color="text.secondary">
                            minSeat: {item.minSeat}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            maxSeat: {item.maxSeat}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))
            }
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>

    </Box>
  );
};

export default LeftBar;
