import { Box } from '@material-ui/core';
import * as React from 'react';

export interface ListItemProps {
  // props
  label: string | React.ReactNode,
  icon?: React.ReactNode,
}

const ListItem: React.SFC<ListItemProps> = props => {
  // const { props } = props;
  return (
    <Box></Box>
  );
}

export default ListItem;