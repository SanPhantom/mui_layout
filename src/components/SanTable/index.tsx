import { Stack, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React from 'react';
import SanTableCell from './SanTableCell';
import { ITableProps } from './tableType';

const SanTable = <T extends { [x: string]: any }>(props: ITableProps<T>) => {

  const {
    tableData,
    columns,
    pageInfo,
    checkedBox,
    keyId,
    size = 'medium',
    headFixed,
    tableHeight,
    changeRows = (rows = [], keys = []) => { }
  } = props;

  return (
    <Stack spacing={2} sx={{
      width: '100%',
      height: tableHeight ?? 'auto',
    }}>
      <TableContainer sx={{
        position: 'relative',
        flex: 1, minHeight: 0,
        overflow: 'auto',
        // width: '100%',
      }}>
        <Table size={size} sx={{
          // width: '100%',
          // tableLayout: 'fixed'
        }}>
          <TableHead>
            <TableRow sx={{
              position: headFixed ? 'sticky' : 'unset',
              top: 0,
              background: theme => theme.palette.background.paper,
              color: theme => theme.palette.background.paper,
              zIndex: 2
            }}>
              {columns.map((column, idx) => (
                <SanTableCell align={column.align} width={column.width} key={`th_${column.props}_${idx}`} bold ellipsis={column.ellipsis}>
                  {column.label}
                </SanTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(Array.isArray(tableData)) &&
              tableData.map((data, dx) => (
                <TableRow key={`tr_${dx}`}>
                  {columns.map((column, idx) => (
                    <SanTableCell key={`td_${column.props}_${idx}`} align={column.align} width={column.width} ellipsis={column.ellipsis}>
                      {column.render ? column.render(data, dx) : data[column.props]}
                    </SanTableCell>
                  ))}
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

      </TableContainer>
      {pageInfo && <TablePagination component={"div"}
        sx={{
          mt: 2,
          '& p': {
            m: 0,
          },
          '& .MuiButtonBase-root': {
            mr: 1,
            ml: 1,
          },
        }}
        count={pageInfo.total}
        page={pageInfo.current - 1}
        rowsPerPage={pageInfo.pageSize}
        onPageChange={pageInfo.onPageChange}
        onRowsPerPageChange={pageInfo.onRowsPerPageChange}></TablePagination>}
    </Stack>
  );
}

export default SanTable