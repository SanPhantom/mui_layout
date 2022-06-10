
export interface ITableColumnsProps<T> {
  label: string,
  align?: 'left' | 'right' | 'center',
  props: keyof T,
  width?: string | number,
  ellipsis?: boolean,
  fixed?: 'left' | 'right',
  render?: (row: T, index: number) => React.ReactNode,
}

export interface ITablePaginationProp {
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


export interface ITableProps<T> {
  tableData: Array<T>,
  columns: ITableColumnsProps<T>[],
  doubleColor?: boolean,
  showPagination?: boolean,
  pageInfo?: ITablePaginationProp,
  checkedBox?: boolean,
  keyId: keyof T,
  size?: 'small' | 'medium',
  headFixed?: boolean,
  tableHeight?: number | string,
  changeRows?: (selectedRows: Array<T>, selectedKeys: Array<T[keyof T]>) => void,
}