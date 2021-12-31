import { Stack } from '@mui/material';
import React from 'react';

interface IOneTimeRangeProps {
  value: [number, number],

}

const OneTimeRange: React.FC<IOneTimeRangeProps> = ({
  value,
}) => {

  const updateTime = (key: string, value: number) => {

  }

  return (
    <Stack direction="row" alignItems="center">

    </Stack>
  );
};

export default OneTimeRange;

