import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { ITableColumnsProps } from '../../../components/interface/intex';
import OneTable from '../../../components/OneTable';


interface ITableProps {
}

type TableProp = {
  id: number,
  username: string,
  age: string,
  sex: string,
  addr: string,
  google: string,
}

const Table: React.FunctionComponent<ITableProps> = () => {

  const [tableList, setTableList] = React.useState<TableProp[]>([])

  const tableColumns: ITableColumnsProps<TableProp>[] = [
    {
      label: '#',
      props: 'id',
      ellipsis: true,
      width: 80,
      fixed: 'left'
    },
    {
      label: 'UserName',
      props: 'username',
      ellipsis: true,
    },
    {
      label: 'Sex',
      props: 'sex',
      width: 120,
      ellipsis: true,
    },
    {
      label: 'Age',
      props: 'age',
      ellipsis: true,
      width: 120,
      render: (row, index) => (
        <Typography variant={"body2"} noWrap sx={{ width: '100%', wordBreak: 'normal' }}>{row.age}</Typography>
      )
    },
    {
      label: 'Addr',
      props: 'addr',
      ellipsis: true,
    },
    {
      label: 'Google',
      props: 'google',
      ellipsis: true,
    },
    {
      label: 'Action',
      props: 'id',
      render: (row, index) => (
        <Button variant={"contained"} color="primary">Action</Button>
      ),
      fixed: 'right',
      width: '10%',
    }
  ]

  React.useEffect(() => {
    // console.log('tableList: ', tableList)
    let timeout: NodeJS.Timeout | null = null;
    timeout = setTimeout(() => {
      setTableList(new Array(25).fill(0).map((d, i) => ({
        id: i,
        username: 'PhantomGlaxtMin Line',
        age: '12 years old',
        sex: '男',
        addr: 'This is an uninhabited island. Leave it alone',
        google: "Don't talk nonsense. It's a statement. It doesn't make any sense"
      })));
    }, 1500)
    return () => {
      clearTimeout(timeout!);
      timeout = null;
    }
  }, [])

  const changeRows = (selectedRows: Array<TableProp>, selectedKeys: Array<TableProp[keyof TableProp]>) => {
    // console.log('selectedKeys: ', selectedKeys);
    // console.log('selectedRows: ', selectedRows);
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <OneTable
        tableData={tableList}
        columns={tableColumns}
        keyId={'id'}
        size={"small"}
        tableHeight={'450px'}
        checkedBox
        doubleColor
        headFixed
        showPagination
        changeRows={changeRows}></OneTable>
    </Stack>
  );
};

export default Table;
