import React from "react";

interface ITableColumnsProps<T> {
  label: string,
  align?: 'left' | 'right' | 'center',
  props: keyof T,
  width?: string | number,
  ellipsis?: boolean,
  render?: (row: T, index: number) => React.ReactNode,
}

interface ITablePaginationProp {
  total: number,
  current: number,
  pageSize: number,
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void,
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void,
}

interface IOneTableProps<T> {
  tableData: Array<T>,
  columns: ITableColumnsProps<T>[],
  doubleColor?: boolean,
  showPagination?: boolean,
  pageInfo?: ITablePaginationProp,
  checkedBox?: boolean,
  keyId: keyof T,
  size?: 'small' | 'medium',
  changeRows?: (selectedRows: Array<T>, selectedKeys: Array<T[keyof T]>) => void;
}

interface IOneTableRowProps {
  doubleColor: boolean, 
}

export type {
  IOneTableProps,
  IOneTableRowProps,
  ITableColumnsProps
}