import { TextField } from '@material-ui/core';
import React, { useRef, useState } from 'react';

interface INumberFieldProps {
  className?: string;
}

const NumberField = (props: INumberFieldProps) => {

  const { className } = props;

  const [value, setValue] = useState('0');
  const prevRef = useRef<string>(value);

  const handleChange = (v: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const currentValue = v.target.value;
    if (!currentValue && prevRef.current.length >= 2 && Number(prevRef.current) > 0) {
      setValue(prevRef.current);
      return;
    }
    if (!currentValue && Number(prevRef.current) <= 0) {
      setValue('0');
      prevRef.current = '0';
      return;
    }
    console.log('current: ', currentValue);
    setValue(currentValue);
    prevRef.current = currentValue;
  }

  return (
    <TextField type="number"
      label={"Number Textfield"}
      className={`number-textfield ${className}`}
      value={value}
      onChange={(v) => {
        handleChange(v);
      }} />
  );
}

export default NumberField