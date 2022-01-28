import { Box, Stack, TextField, Button, Typography, Badge, Paper } from '@material-ui/core';
import * as React from 'react';
import moment from 'moment';
import OneCalendar from '../../../components/OneCalendar';

interface ICalandarProps {
}

const Calandar: React.FunctionComponent<ICalandarProps> = () => {

  const [year, setYear] = React.useState<number>(moment().year());
  const [month, setMonth] = React.useState<number>(moment().month() + 1)

  const [curDate, setCurDate] = React.useState<moment.Moment>(moment());


  const search = () => {
    // console.log(moment.weekdays('dd'))
    setCurDate(moment().year(year).month(month - 1))
  }

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
    <Stack spacing={3}>
      <Paper sx={{ p: 2, boxShadow: theme => theme.shadows[5] }}>
        <Stack direction="row" spacing={3} mt={2} alignItems="center">
          <TextField
            type="number"
            id=""
            label="year"
            value={year}
            onChange={(e) => { setYear(Number(e.target.value)) }}

          />
          <TextField
            type="number"
            id=""
            label="Month"
            value={month}
            onChange={(e) => { setMonth(Number(e.target.value)) }}
          />
          <Button variant="contained" color="primary" onClick={() => { search() }}>
            Search
          </Button>
        </Stack>
        <Box>
          <OneCalendar date={curDate} type={'dd'}
            renderCell={(v) => {
              return renderCalendarCell(v);
            }} />
        </Box>

      </Paper>

      {/* <Paper sx={{ p: 2, boxShadow: theme => theme.shadows[5] }}>
        <CanvasRender></CanvasRender>
      </Paper> */}
    </Stack>

  );
};

export default Calandar;
