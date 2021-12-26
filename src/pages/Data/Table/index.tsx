import { Alert, Button, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import * as React from 'react';
import { ITableColumnsProps } from '../../../components/interface/intex';
import { message } from '../../../components/Message';
import OneTable from '../../../components/OneTable';
import OneTimeRange from '../../../components/OneTimeRange';

interface ITableProps {
}

type TableProp = {
  id: number,
  username: string,
  age: number,

}

const Table: React.FunctionComponent<ITableProps> = ({ }) => {

  const [tableList, setTableList] = React.useState<TableProp[]>([])

  const tableColumns: ITableColumnsProps<TableProp>[] = [
    {
      label: '#',
      props: 'id',
      width: 80,
    },
    {
      label: 'UserName',
      props: 'username',
      ellipsis: true,
    },
    {
      label: 'Age',
      props: 'age',
      width: 120,
      render: (row, index) => (
        <Typography variant={"body2"}>{row.age}岁</Typography>
      )
    },
    {
      label: 'Action',
      props: 'id',
      render: (row, index) => (
        <Button variant={"text"}>Edit</Button>
      ),
      width: '10%',
    }
  ]

  React.useEffect(() => {
    console.log('tableList: ', tableList)
    let timeout: NodeJS.Timeout | null = null;
    timeout = setTimeout(() => {
      setTableList([
        {
          id: 1,
          username: 'PhantomGlaxtMin Line',
          age: 12
        },
        {
          id: 2,
          username: 'RTX20121547845785',
          age: 14
        }
      ]);
    }, 1500)
    return () => {
      clearTimeout(timeout!);
      timeout = null;
    }
  }, [])

  const changeRows = (selectedRows: Array<TableProp>, selectedKeys: Array<TableProp[keyof TableProp]>) => {
    console.log('selectedKeys: ', selectedKeys);
    console.log('selectedRows: ', selectedRows);
  }

  const handleClick = () => {
    // Message.success('123');
    message.success('asss', 10);
    // message.success('jasd')
  }

  return (
    <>
      <OneTable
        tableData={tableList}
        columns={tableColumns}
        keyId={'id'}
        size={"small"}
        checkedBox
        doubleColor
        showPagination
        changeRows={changeRows}></OneTable>
      <Stack direction={"row"} spacing={3} alignItems={"center"}>
        <Button variant="contained" color='success' onClick={() => { message.success('This is success msg!') }}>success</Button>
        <Button variant="contained" color='info' onClick={() => { message.info('This is info msg!') }}>info</Button>
        <Button variant="contained" color='warning' onClick={() => { message.warn('This is warn msg!') }}>warn</Button>
        <Button variant="contained" color='error' onClick={() => { message.error('This is error msg!') }}>error</Button>
        <Button variant="contained" color='warning' onClick={() => { message.warning('This is warning msg!') }}>warning</Button>
      </Stack>
      <Stack alignItems={"flex-start"}>
        <Alert variant="filled" sx={{ mt: 2 }}>This is a success tip</Alert>
      </Stack>
      <Stack>
        <OneTimeRange value={[100, 600]}></OneTimeRange>
      </Stack>

    </>
  );
};

export default Table;
