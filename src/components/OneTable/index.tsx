import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import * as React from 'react';
import { IOneTableProps } from '../interface/intex';
import OneTableRow from './OneTableRow';
import { cloneDeep, remove } from 'lodash-es'

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
      event: React.MouseEvent<HTMLButtonElement> | null
    ) => { },
  },
  checkedBox = false,
  keyId,
}: IOneTableProps<T>) => {

  const [selectedKeys, setSelectedKeys] = React.useState<Array<typeof tableData[0][typeof keyId]>>([])

  const judgeAllCheck = () => {
    let col = cloneDeep(tableData);
    return col.map(x => x[keyId]).filter(x => !new Set(selectedKeys).has(x)).length === 0
  }

  const judgeFalseCheck = () => {
    let col = cloneDeep(tableData);
    return col.map(x => x[keyId]).filter(x => !new Set(selectedKeys).has(x)).length > 0
  }

  const handleCheck = (checked: boolean, data: typeof tableData[0], key: typeof tableData[0][typeof keyId]) => {
    console.log(data);
    let clone_selectedKeys = cloneDeep(selectedKeys);
    checked ? 
      setSelectedKeys([...clone_selectedKeys, key]) : setSelectedKeys(remove(clone_selectedKeys, n=>n!==key))
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {checkedBox && (
              <TableCell width={45} align={"center"}>
                <Checkbox
                  checked={judgeAllCheck()}
                  indeterminate={judgeFalseCheck() && selectedKeys.length !== 0} />
              </TableCell>
            )}
            {
              columns.map((column, index) => (
                <TableCell key={`one_thc_${index}`}
                  width={column.width}
                  align={column.align ?? 'left'}>
                  <Typography fontWeight="700">{column.label}</Typography>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            Array.isArray(tableData) &&
            tableData.map((data, index) => (
              <OneTableRow key={`one_tbr_${index}`} doubleColor={doubleColor}>
                {checkedBox && (
                  <TableCell align={"center"}>
                    <Checkbox checked={new Set(selectedKeys).has(data[keyId])} onChange={(e) => handleCheck(e.target.checked, data, data[keyId])} />
                  </TableCell>
                )}
                {
                  columns.map((row, i) => (
                    <TableCell align={row.align ?? 'left'}>
                      {
                        row.render ? row.render(data, index) : (
                          <Typography noWrap sx={{ width: '100%' }}>{data[row.props]}</Typography>
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
  );
};

export default OneTable;
