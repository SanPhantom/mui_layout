import { Button, Typography } from '@material-ui/core';
import * as React from 'react';
import { ITableColumnsProps } from '../../../components/interface/intex';
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
      
      {/* <OneTimeRange value={[256, 385]}></OneTimeRange> */}
    </>
  );
};

export default Table;
