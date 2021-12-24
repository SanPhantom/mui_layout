import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@material-ui/core';
import * as React from 'react';
import moment, { MomentInput } from 'moment'
import { styled } from '@material-ui/system';

interface ICalandarProps {
}

const Calandar: React.FunctionComponent<ICalandarProps> = (props) => {

  const [year, setYear] = React.useState<number>(2021);
  const [month, setMonth] = React.useState<number>(1)

  const calendar = [
    { week: 'Su', id: 7 },
    { week: 'Mo', id: 1 },
    { week: 'Tu', id: 2 },
    { week: 'We', id: 3 },
    { week: 'Th', id: 4 },
    { week: 'Fr', id: 5 },
    { week: 'Sa', id: 6 },
  ]

  const [dates, setDates] = React.useState<Array<{ date: MomentInput | null }>>([]);
  const [rows, setRows] = React.useState<Array<number>>([])

  // let startDate = moment().startOf('month');
  // let endDate = moment().endOf('month');
  // let startDay = startDate.day();
  // let endDay = endDate.day();
  // let daysInMonth = moment().daysInMonth();
  // let weeks = Math.ceil((daysInMonth - (7 - startDay)) / 7) + 1;
  // setRows(new Array(weeks).fill(0))

  const initDates = (v: moment.MomentInput) => {
    console.log(rows);
    let startDate = moment().year(year).month(month).startOf('month');
    let endDate = moment().year(year).month(month).endOf('month');
    let daysInMonth = moment().year(year).month(month).daysInMonth();
    let startDay = startDate.day();
    let endDay = endDate.day();

    let copy_dates = [];
    for (let i = 0; i < startDay; i++) {
      copy_dates.unshift({
        date: moment(v).startOf('month').subtract(i + 1, 'days').format('YYYY-MM-DD')
      })
    }
    for (let i = 1; i <= daysInMonth; i++) {
      copy_dates.push({
        date: moment(v).startOf('month').add(i - 1, 'days').format('YYYY-MM-DD')
      })
    }

    const f_end = calendar.findIndex(i => i.id === endDay);

    for (let i = 0; i < 6 - f_end; i++) {
      copy_dates.push({
        date: moment(v).endOf('month').add(i + 1, 'days').format('YYYY-MM-DD')
      })
    }


    console.log(copy_dates, f_end);
    setDates(copy_dates)
  }

  React.useEffect(() => {
    initDates(moment());
  }, [])

  React.useEffect(() => {

    let startDate = moment().year(year).month(month).startOf('month');
    let startDay = startDate.day();
    let daysInMonth = moment().year(year).month(month).daysInMonth();
    let weeks = Math.ceil((daysInMonth - (7 - startDay)) / 7) + 1;

    setRows(new Array(weeks).fill(0))

  }, [year, month])

  const CalendarCell = styled(TableCell, {})({
    height: 120,
    borderBottom: 'none'
  })

  return (
    <Box>
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
        <Button variant="contained" color="primary" onClick={() => { initDates(moment().year(year).month(month)); }}>
          Search
        </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {
                calendar.map(week => (
                  <TableCell align="center">{week.week}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.length && rows.map((w, i) => (
                <TableRow>
                  {
                    calendar.map((c, k) => (
                      <CalendarCell align="center">{moment(dates[i * 7 + k].date).date() || null}</CalendarCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Calandar;
