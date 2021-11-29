import { Box } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import * as React from 'react';

export interface ListSubItemProps<P = {}, D extends React.ElementType = 'li'> {
  // props
  props: P & {
    children?: React.ReactNode,
    
  };
  defaultComponent: D;
}

declare const ListSubItem: OverridableComponent<ListSubItemProps>

export default ListSubItem;