import { Badge, Button, Paper, Stack, Typography } from '@material-ui/core';
import { uniqueId } from 'lodash-es';
import moment from 'moment';
import React from 'react';
import { message } from '../../../components/Message';
import OneCalendar from '../../../components/OneCalendar';
import SanTable from '../../../components/SanTable';
import { ITableColumnsProps } from '../../../components/SanTable/tableType';
import NumberField from '../../../components/TextField/NumberField';

interface DataType {
  id: string,
  name: string,
  age: string,
  sex: string,
  addr: string,
  google: string,
}

const Input = () => {

  const [tableList, setTableList] = React.useState<DataType[]>([])
  const [curDate, setCurDate] = React.useState<moment.Moment>(moment());

  const columns: ITableColumnsProps<DataType>[] = [{
    props: 'id',
    label: '#',
    width: 80,
  }, {
    props: 'name',
    label: 'Name',
    render: (row, index) => (
      <Typography noWrap>{row.name} goods</Typography>
    )
  }, {
    label: 'Sex',
    props: 'sex',
    width: 120,
    ellipsis: true,
    align: 'center',
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
    align: 'center'
  },
  {
    label: 'Action',
    props: 'id',
    render: (row, index) => (
      <Button variant={"contained"} color="primary" onClick={() => handleClick(row)}>Action</Button>
    ),
    align: 'right',
    width: 240
  }];

  const handleClick = (row: DataType) => {
    console.log('click', row)
  }

  React.useEffect(() => {
    // console.log('tableList: ', tableList)
    let timeout: NodeJS.Timeout | null = null;
    timeout = setTimeout(() => {
      setTableList(new Array(20).fill(0).map((d, i) => ({
        id: uniqueId(),
        name: 'PhantomGlaxtMin Line',
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

  const renderCalendarCell = (v: moment.Moment) => {
    if (v.month() !== curDate.month()) {
      return <></>
    } else {
      return (
        <Stack alignItems={"flex-start"}
          sx={{
            width: '100%',
            height: '100%',
            boxShadow: theme => theme.shadows[2],
            borderTop: '1px solid',
            borderColor: theme => theme.palette.action.selected,
            p: 1
          }}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Badge color="primary" variant="dot" sx={{ pl: 1 }}></Badge>
            <Typography>{v.date()}</Typography>
          </Stack>

        </Stack>
      )
    }
  }

  return (
    <Stack spacing={3} sx={{ width: '100%', boxSizing: 'border-box' }}>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography fontSize={18} fontWeight={700} mb={2}>Number Input</Typography>
        <Stack spacing={3}>
          <NumberField />
        </Stack>
      </Paper>


      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography fontSize={18} fontWeight={700} mb={2}>Message Modal</Typography>
        <Stack direction="row" spacing={3} flexWrap="wrap">
          <Button variant='contained' color="success" onClick={() => message.success('success message')}>Success</Button>
          <Button variant='contained' color="info" onClick={() => message.info('info message')}>Info</Button>
          <Button variant='contained' color="error" onClick={() => message.error('danger message')}>Danger</Button>
          <Button variant='contained' color="warning" onClick={() => message.error('warning message')}>Warning</Button>
        </Stack>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, width: '100%', boxSizing: 'border-box' }}>
        <Typography fontSize={18} fontWeight={700} mb={2}>Table Component</Typography>
        <SanTable tableData={tableList}
          columns={columns}
          keyId="id"
          tableHeight={450}
          headFixed
          size="medium"
          pageInfo={{
            total: 100,
            current: 1,
            pageSize: 30,
            onPageChange: () => { },
            onRowsPerPageChange: () => { }
          }} />
      </Paper>
      

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography fontSize={18} fontWeight={700} mb={2}>Calendar Component</Typography>
        <OneCalendar date={curDate} type={'dd'}
            renderCell={(v) => {
              return renderCalendarCell(v);
            }} />
      </Paper>
    </Stack>
  );
}

export default Input