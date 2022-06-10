import { TableCell, Typography } from '@material-ui/core';
import React from 'react';

interface ISanTableCellProps {
  children: React.ReactNode;
  ellipsis?: boolean;
  bold?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
}

const SanTableCell = (props: ISanTableCellProps) => {

  const { 
    children, 
    ellipsis = false, 
    bold = false, 
    align = 'left',
    width = 'unset',
  } = props;

  return (
    <TableCell align={align} width={width}>
      <Typography component="div" fontWeight={bold ? 700 : 500} noWrap={ellipsis} sx={{
        wordBreak: ellipsis ? 'normal' : 'break-all'
      }}>
        { children }
      </Typography>
    </TableCell>
  );
}

export default SanTableCell