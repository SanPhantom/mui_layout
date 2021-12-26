import { Stack, TextField } from '@mui/material';
import { MobileTimePicker } from '@mui/lab';
import { Box } from '@material-ui/system';
import moment from 'moment';
import * as React from 'react';
import { dateOfNumber, numberOfDate } from '../utils';

interface IOneTimeRangeProps {
  value: [number, number],

}

const OneTimeRange = ({
  value,
}: IOneTimeRangeProps) => {

  const updateTime = (key: string, value: number) => {

  }

  return (
    <Stack direction="row" alignItems="center">
      <MobileTimePicker
        label="Business Start Time"
        value={
          new Date(
            dateOfNumber(value[0]).toString(),
          )
        }
        onChange={(v) => {
          updateTime(
            'fromMinOffset',
            Math.min(
              numberOfDate(moment(v).toString()),
              value[1] - 1,
            ),
          );
        }}
        maxTime={
          new Date(
            dateOfNumber(value[1] - 1).toString(),
          )
        }
        renderInput={(params) => <TextField {...params} sx={{ flex: 1 }} />}
      ></MobileTimePicker>
      <Box sx={{ mx: 2 }}> to </Box>
      <MobileTimePicker
        label="Business End Time"
        value={
          new Date(
            dateOfNumber(value[1]).toString(),
          )
        }
        onChange={(v) => {
          updateTime(
            'toMinOffset',
            Math.max(
              numberOfDate(moment(v).toString()),
              value[0] + 1,
            ),
          );
        }}
        minTime={
          new Date(
            dateOfNumber(value[0] + 1).toString(),
          )
        }
        renderInput={(params) => <TextField {...params} sx={{ flex: 1 }} />}
      ></MobileTimePicker>
    </Stack>
  );
};

export default OneTimeRange;

