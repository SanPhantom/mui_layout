import { styled, TableRow } from '@mui/material';
import * as React from 'react';
import { IOneTableRowProps } from '../interface/intex';



const OneTableRow = styled(TableRow, {
  shouldForwardProp: (props) => (
    props !== 'doubleColor'
  ),
})<IOneTableRowProps>(({
  theme, doubleColor
}) => ({
  padding: theme.spacing(1),
  ...(doubleColor && {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.background.default,
    },
  })
}))

export default OneTableRow;
