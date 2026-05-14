import { type Key, type ReactNode, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table'
import { Pagination } from './Pagination'

/**
 * Legacy Column interface — backward-compatible with existing 818-gaming pages.
 * New pages can use TanStack ColumnDef directly via `columnDefs` prop.
 */
export interface Column<T> {
  key: string | keyof T
  title: ReactNode
  render?: (value: unknown, record: T, index: number) => ReactNode
  width?: number
  sortable?: boolean
}

export interface DataTableProps<T> {
  /** Legacy column definitions (818-gaming format) */
  columns?: Column<T>[]
  /** TanStack Table column definitions (new format) */
  columnDefs?: ColumnDef<T, unknown>[]
  data: T[]
  getRowKey?: (record: T, index: number) => Key
  loading?: boolean
  page?: number
  pageSize?: number
  total?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  /** Enable column sorting (default: false) */
  enableSorting?: boolean
  /** Loading text */
  loadingText?: string
  /** Empty text */
  emptyText?: string
  /** Pagination labels */
  paginationLabels?: {
    total?: string
    prev?: string
    next?: string
  }
}

function getField(record: unknown, key: string): unknown {
  return (record as Record<string, unknown>)[key]
}

/**
 * Convert legacy Column<T> to TanStack ColumnDef<T>
 */
function toColumnDef<T>(col: Column<T>): ColumnDef<T, unknown> {
  return {
    id: String(col.key),
    header: ({ column }) => {
      if (col.sortable) {
        return (
          <button
            className="flex items-center gap-1 hover:text-gray-700"
            onClick={() => column.toggleSorting()}
          >
            {col.title}
            {column.getIsSorted() === 'asc' && <span className="text-xs">↑</span>}
            {column.getIsSorted() === 'desc' && <span className="text-xs">↓</span>}
            {!column.getIsSorted() && <span className="text-xs text-gray-300">↕</span>}
          </button>
        )
      }
      return col.title
    },
    accessorFn: (row) => getField(row, String(col.key)),
    cell: col.render
      ? ({ row, getValue }) => col.render!(getValue(), row.original, row.index)
      : ({ getValue }) => getValue() as ReactNode,
    size: col.width,
    enableSorting: col.sortable ?? false,
  }
}

export function DataTable<T>({
  columns,
  columnDefs,
  data,
  getRowKey,
  loading,
  page = 1,
  pageSize = 10,
  total = 0,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
  enableSorting = false,
  loadingText = '加载中...',
  emptyText = '暂无数据',
  paginationLabels,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const resolvedColumns = useMemo(() => {
    if (columnDefs) return columnDefs
    if (columns) return columns.map(toColumnDef)
    return []
  }, [columns, columnDefs])

  const table = useReactTable({
    data,
    columns: resolvedColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    manualPagination: true,
    pageCount: Math.ceil(total / pageSize),
  })

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={header.column.getSize() ? { width: header.column.getSize() } : undefined}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={resolvedColumns.length} className="text-center py-8 text-gray-500">
                {loadingText}
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={resolvedColumns.length} className="text-center py-8 text-gray-500">
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={getRowKey ? getRowKey(row.original, row.index) : row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {onPageChange && (
        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          pageSizeOptions={pageSizeOptions}
          labels={paginationLabels}
        />
      )}
    </div>
  )
}
