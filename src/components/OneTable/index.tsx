import * as React from 'react';
import { IOneTableProps } from '../interface/intex';
import OneTableRow from './OneTableRow';
import { cloneDeep, includes, map, remove } from "lodash-es";
import { TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, Typography, TableBody, TablePagination, Box, Theme } from '@mui/material';

const OneTable = <T extends { [x: string]: any }>({
  tableData,
  columns,
  doubleColor = false,
  showPagination = false,
  pageInfo = {
    total: 0,
    current: 1,
    pageSize: 10,
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number
    ) => { },
    onRowsPerPageChange: (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => { },
  },
  checkedBox = false,
  keyId,
  size = 'medium',
  headFixed = false,
  tableHeight,
  changeRows = (selectedRows = [], selectedKeys = []) => { }
}: IOneTableProps<T>) => {

  const [selectedKeys, setSelectedKeys] = React.useState<Array<T[keyof T]>>([])
  const [selectedRows, setSelectedRows] = React.useState<Array<T>>([])

  const judgeAllCheck = () => {
    let col = cloneDeep(tableData);
    return col.map(x => x[keyId]).filter(x => !new Set(selectedKeys).has(x)).length === 0
  }

  const judgeFalseCheck = () => {
    let col = cloneDeep(tableData);
    return col.map(x => x[keyId]).filter(x => !new Set(selectedKeys).has(x)).length > 0
  }

  const handleCheck = (checked: boolean, data: T, key: T[keyof T]) => {
    let clone_selectedKeys = checked ? [...cloneDeep(selectedKeys), key] : remove(cloneDeep(selectedKeys), n => n !== key) ;
    let clone_selectedRows = checked ? [...cloneDeep(selectedRows), key] : remove(cloneDeep(selectedRows), n => n !== key) ;

    setSelectedKeys(clone_selectedKeys);
    setSelectedRows(clone_selectedRows);

    // checked ?
    //   setSelectedKeys([...clone_selectedKeys, key]) : setSelectedKeys(remove(clone_selectedKeys, n => n !== key));
    // checked ?
    //   setSelectedRows([...clone_selectedRows, data]) : setSelectedRows(remove(clone_selectedRows, n => n[keyId] !== data[keyId]))
    
    changeRows(clone_selectedRows, clone_selectedKeys);
  }

  const checkedAll = (checked: boolean) => {
    setSelectedKeys(checked ? map(cloneDeep(tableData), keyId) : []);
    setSelectedRows(checked ? cloneDeep(tableData) : []);
  }

  const controlBack = (theme: Theme, index: number) => {
    if (theme.palette.mode === 'light') {
      return index % 2 ? theme.palette.background.default : '#f5f5f5'
    } else {
      return index % 2 ? theme.palette.background.default : '#252525'
    }
  }

  // React.useEffect(() => {
    
  // }, [selectedKeys, selectedRows])

  React.useEffect(() => {
    // console.log(map(columns, 'fixed').filter(x => includes(['left', 'right'], x)));
    // console.log(columns.filter(x => x.fixed))
  }, [columns])

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer sx={{
        position: 'relative',
        height: tableHeight ?? 'auto',
        overflow: 'auto',
        width: '100%'
      }}>
        <Table sx={{
          // tableLayout: 'fixed'
        }} size={size}>
          <TableHead>
            <TableRow sx={{
              position: headFixed ? 'sticky' : 'unset',
              top: 0,
              background: theme => theme.palette.background.default,
              zIndex: 2
            }}>
              {checkedBox && (
                <TableCell width={72}
                  align={"center"}
                  sx={{
                    position: 'sticky',
                    zIndex: 2,
                    left: 0,
                    backgroundColor: theme => theme.palette.background.default
                  }}
                >
                  <Checkbox
                    checked={judgeAllCheck() && tableData.length > 0}
                    indeterminate={judgeFalseCheck() && selectedKeys.length !== 0}
                    onChange={(e) => checkedAll(e.target.checked)} />
                </TableCell>
              )}
              {
                columns.map((column, index) => (
                  <TableCell key={`one_thc_${index}`}
                    width={column.width}
                    align={column.align ?? 'left'}
                    sx={{
                      ...(column.fixed && {
                        position: 'sticky' 
                      })
                    }}>
                    <Typography variant={"body2"}
                      fontWeight="700"
                      noWrap={column.ellipsis}
                      sx={{
                        wordBreak: column.ellipsis ? 'normal' : 'break-all'
                      }}>{column.label}</Typography>
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (Array.isArray(tableData)) &&
              tableData.map((data, index) => (
                <OneTableRow key={`one_tbr_${index}`} doubleColor={doubleColor}>
                  {checkedBox && (
                    <TableCell align={"center"}
                      sx={{
                        position: 'sticky',
                        left: 0,
                        background: theme => controlBack(theme, index)
                      }}>
                      <Checkbox checked={new Set(selectedKeys).has(data[keyId])} onChange={(e) => handleCheck(e.target.checked, data, data[keyId])} />
                    </TableCell>
                  )}
                  {
                    columns.map((row, i) => (
                      <TableCell key={`one_tbc_${index}_${i}`} align={row.align ?? 'left'}>
                        {
                          row.render ? row.render(data, index) : (
                            <Typography variant={"body2"}
                              noWrap={row.ellipsis}
                              sx={{
                                width: '100%',
                                wordBreak: row.ellipsis ? 'normal' : 'break-all'
                              }}>{data[row.props]}</Typography>
                          )
                        }
                      </TableCell>
                    ))
                  }
                </OneTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          component="div"
          sx={{
            mt: 2,
            '& p': {
              m: 0,
            },
            '& .MuiButtonBase-root': {
              mr: 2,
              ml: 2,
            },
          }}
          count={pageInfo.total}
          page={pageInfo.current - 1}
          rowsPerPage={pageInfo.pageSize}
          onPageChange={pageInfo.onPageChange}
          onRowsPerPageChange={pageInfo.onRowsPerPageChange}
        />
      )}

    </Box>

  );
};

export default OneTable;
