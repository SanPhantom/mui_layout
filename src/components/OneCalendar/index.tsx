// import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Typography } from '@material-ui/core';
import { Box, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// import { styled } from '@material-ui/system';
import { chunk, isUndefined } from 'lodash-es';
import moment from 'moment';
import * as React from 'react';

interface ICalendarProps {
  date: moment.Moment,
  type?: 'd' | 'dd' | 'ddd',
  renderCell?: (v: moment.Moment) => React.ReactElement
}

const CalendarCell = styled(TableCell, {})({
  height: 54,
  borderBottom: 'none',
  cursor: 'pointer',
  padding: 3
})

const Calendar: React.FunctionComponent<ICalendarProps> = ({
  date,
  type = 'dd',
  renderCell=(v)=>{return undefined},
}) => {

  const calendar = () => {
    return type === 'dd' ? moment.weekdaysMin() :
      type === 'd' ? moment.weekdays() :
        type === 'ddd' ? moment.weekdaysShort() : [];
  };

  const [dates, setDates] = React.useState<Array<Array<{ date: moment.Moment }>>>([]);

  const dateRef = React.useRef<moment.Moment>(date)

  const initDates = (v: moment.Moment) => {
    setDates([]);

    let startDate = moment(v).startOf('month');
    let endDate = moment(v).endOf('month');
    let daysInMonth = moment(v).daysInMonth();

    let copy_dates = [];
    const f_start = calendar().findIndex(i => i === startDate.format(type));
    for (let i = 0; i < f_start; i++) {
      copy_dates.unshift({
        date: moment(v).startOf('month').subtract(i + 1, 'days')
      })
    }
    for (let i = 1; i <= daysInMonth; i++) {
      copy_dates.push({
        date: moment(v).startOf('month').add(i - 1, 'days')
      })
    }

    const f_end = calendar().findIndex(i => i === endDate.format(type));
    for (let i = 0; i < 6 - f_end; i++) {
      copy_dates.push({
        date: moment(v).endOf('month').add(i + 1, 'days')
      })
    }
    setDates(chunk(copy_dates, 7))
  }

  // 判断是否在当前月中
  const judgeIsMonth = (v: moment.Moment) => {
    return moment(v).month() === dateRef.current.month();
  }

  React.useMemo(() => {
    initDates(date);
    dateRef.current = date;
  }, [date])

  return (
    <Box mt={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {
                calendar().map((week, i) => (
                  <TableCell align="center" key={`calendar_th_${i}`} sx={{borderBottom: 0, p: 1}}>{week}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (dates.length) ? dates.map((w, i) => (
                <TableRow key={`calendar_tr_${i}`}>
                  {
                    dates[i].map((c, k) => (
                      <CalendarCell align="center" key={`calendar_td_${i}_${k}`}>
                        {
                          isUndefined(renderCell(dates[i][k].date)) ? 
                          <Typography color={judgeIsMonth(dates[i][k].date) ? 'inherit' : 'text.disabled'}>{dates[i][k].date!.date()}</Typography> :
                          renderCell(dates[i][k].date)
                        }
                      </CalendarCell>
                    ))
                  }
                </TableRow>
              )) : <></>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Calendar;
