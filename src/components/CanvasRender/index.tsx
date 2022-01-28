import * as React from 'react';
import { Graph, Shape } from '@antv/x6';
import { Paper } from '@material-ui/core';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { DropCanvas } from '../../interface';
import { uniqueId } from 'lodash-es';

interface ICanvasRenderProps {
}

const CanvasRender = React.forwardRef(({ }, ref) => {

  let g6Ref = React.useRef<HTMLDivElement | null>(null);
  let graph: Graph | null = null;

  React.useImperativeHandle(ref, () => ({
    createCell,
  }))

  React.useEffect(() => {
    console.log(graph)
    if (!graph) {
      graph = new Graph({
        container: document.getElementById("table-area-canvas")!,
        width: g6Ref.current?.offsetWidth,
        height: g6Ref.current?.offsetHeight,
        autoResize: true,
        history: true,
        grid: {
          size: 10,
          visible: true,
          type: 'dot'
        },
        minimap: {
          enabled: true,
          container: document.getElementById("min-canvas")!,
          graphOptions: {
            async: false,
            background: {
              color: '#f52443'
            }
          }
        }
      })
    }
    return () => {
      graph?.model.clear()
      graph?.minimap.dispose()
    }
  }, [])

  window.onresize = () => {
    graph?.resize(g6Ref.current?.offsetWidth, g6Ref.current?.offsetHeight)
  }

  const createCell = () => {
    console.log('java')
    const rect = new Shape.Rect({
      id: uniqueId(),
      label: 'rect',
      x: 80,
      y: 40,
      width: 80,
      height: 60,
      zIndex: 2
    })
    console.log(rect)
    graph?.addNode(rect);
  }

  const dragEnd = (e: React.DragEvent<HTMLDivElement>, snapshot: DroppableStateSnapshot) => {
    console.log(snapshot)
  }

  return (

    <div ref={g6Ref} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Paper id="min-canvas" sx={{
        position: 'absolute',
        right: 0,
        zIndex: 999
      }}></Paper>
      <div style={{
        width: 0, height: 0, overflow: 'hidden', position: 'absolute',
        right: 0,
      }}>
      </div>
      <Droppable droppableId={"table_layout"} isDropDisabled={false} renderClone={(provided, snapshot, rubric) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {JSON.stringify(rubric)}
        </div>
      )}>
        {(provided, snapshot) => (
          <div id='table-area-canvas' ref={provided.innerRef} {...provided.droppableProps} onDrop={(e) => {console.log('drop: ', e)}}>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>

  );
});

export default CanvasRender;
