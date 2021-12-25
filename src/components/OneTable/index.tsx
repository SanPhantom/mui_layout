import * as React from 'react';
import { IOneTableProps } from '../interface/intex';
import OneTableRow from './OneTableRow';
import { cloneDeep, remove } from "lodash-es";
import { TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, Typography, TableBody, Divider, TablePagination } from '@material-ui/core';
const OneTable = <T extends {[x: string]: any}>({
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
  changeRows = () => {}
}: IOneTableProps<T>) => {
  // const [selectedKeys, setSelectedKeys] = React.useState<Array<>>([])
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
    let clone_selectedKeys = cloneDeep(selectedKeys);
    let clone_selectedRows = cloneDeep(selectedRows);
    checked ? 
      setSelectedKeys([...clone_selectedKeys, key]) : setSelectedKeys(remove(clone_selectedKeys, n=>n!==key));
    checked ?
      setSelectedRows([...clone_selectedRows, data]) : setSelectedRows(remove(clone_selectedRows, n=>n[keyId] !== data[keyId]))
  }

  React.useEffect(() => {
    
    changeRows(selectedRows, selectedKeys);
  }, [selectedKeys, selectedRows])

  return (
    <TableContainer>
      <Table sx={{ tableLayout: 'fixed' }} size={size}>
        <TableHead>
          <TableRow>
            {checkedBox && (
              <TableCell width={72} align={"center"}>
                <Checkbox
                  checked={judgeAllCheck() && tableData.length > 0}
                  indeterminate={judgeFalseCheck() && selectedKeys.length !== 0} />
              </TableCell>
            )}
            {
              columns.map((column, index) => (
                <TableCell key={`one_thc_${index}`}
                  width={column.width}
                  align={column.align ?? 'left'}>
                  <Typography variant={"body2"} fontWeight="700" noWrap={column.ellipsis} sx={{ wordBreak: column.ellipsis ? 'normal' :'break-all' }}>{column.label}</Typography>
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
                  <TableCell align={"center"}>
                    <Checkbox checked={new Set(selectedKeys).has(data[keyId])} onChange={(e) => handleCheck(e.target.checked, data, data[keyId])} />
                  </TableCell>
                )}
                {
                  columns.map((row, i) => (
                    <TableCell key={`one_tbc_${index}_${i}`} align={row.align ?? 'left'}>
                      {
                        row.render ? row.render(data, index) : (
                          <Typography variant={"body2"} noWrap={row.ellipsis} sx={{ width: '100%', wordBreak: row.ellipsis ? 'normal' :'break-all' }}>{data[row.props]}</Typography>
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
    </TableContainer>
  );
};

export default OneTable;
