import { Badge } from '@/components/ui/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { Pen, Trash2 } from 'lucide-react';
import React from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

export interface ITableComponent<T> {
  tableData: T[];
  tableHeader: { name: string; as: string }[];
  totalPage?: number;
  currentPage?: number;
  setCurrentPage?: any;
  isNext?: boolean;
  isPrevious?: boolean;
  children?: React.ReactNode;
  isEditAction?: boolean;
  isDeleteAction?: boolean;
  handleDelete?: any;
}

const TableComponent = ({
  currentPage,
  isNext,
  isPrevious,
  setCurrentPage,
  tableData,
  tableHeader,
  totalPage,
  children,
  isDeleteAction,
  isEditAction,
  handleDelete,
}: ITableComponent<any>) => {
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <Table className="overflow-x-scrol table-fixed">
      {/* <TableCaption>A list of all boxes</TableCaption> */}
      <TableHeader>
        <TableRow>
          {tableHeader.map((header) => (
            <TableHead>{header.as}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data) => (
          <TableRow>
            {tableHeader.map((header) => {
              if (
                header.name === 'createdAt' ||
                header.name === 'updatedAt' ||
                header.name === 'date'
              ) {
                return (
                  <TableCell>
                    {formatDate(new Date(data[header.name]))}
                  </TableCell>
                );
              }
              if (header.name === 'status') {
                return (
                  <TableCell className="text-center  font-bold">
                    {data[header.name] === 'pending' && (
                      <Badge className="bg-yellow-400 text-black">
                        {data[header.name]}
                      </Badge>
                    )}
                    {data[header.name] === 'expire' && (
                      <Badge variant={'destructive'}>{data[header.name]}</Badge>
                    )}
                    {data[header.name] === 'settlement' && (
                      <Badge className="bg-green-500 font-bold">
                        {data[header.name]}
                      </Badge>
                    )}
                  </TableCell>
                );
              }
              if (header.name === 'manageStatus') {
                return (
                  <TableCell className="text-center font-bold ">
                    {data[header.name] === 'unprocessed' && (
                      <Badge variant={'secondary'}>{data[header.name]}</Badge>
                    )}
                    {data[header.name] === 'expire' && (
                      <Badge variant={'secondary'}>{data[header.name]}</Badge>
                    )}
                    {data[header.name] === 'processed' && (
                      <Badge className="font-bold">{data[header.name]}</Badge>
                    )}
                    {data[header.name] === 'completed' && (
                      <Badge className="bg-green-500 font-bold">
                        {data[header.name]}
                      </Badge>
                    )}
                  </TableCell>
                );
              }
              return <TableCell>{data[header.name]}</TableCell>;
            })}
            {(isEditAction || isDeleteAction) && (
              <TableCell
                className="h-full"
                colSpan={isEditAction && isDeleteAction ? 2 : 1}
              >
                <div className="flex gap-2">
                  {isEditAction && (
                    <NavLink
                      className="flex items-center gap-2 justify-center relative"
                      to={`edit/${data.id}`}
                    >
                      <Pen className="size-5" />
                      <h1>Edit</h1>
                    </NavLink>
                  )}
                  {isDeleteAction && (
                    <NavLink
                      className="flex items-center gap-2 justify-center relative"
                      to={`edit/${data.id}`}
                      onClick={() => handleDelete(data.id)}
                    >
                      <Trash2 className="size-5" />
                      <h1>Delete</h1>
                    </NavLink>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      {totalPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={!isPrevious}
                onClick={() => {
                  if (!isPrevious) {
                    return;
                  }
                  setSearchParam((prevParam) => ({
                    ...prevParam,
                    page: currentPage - 1,
                  }));
                  setCurrentPage(currentPage - 1);
                }}
                className={`${
                  !isPrevious && 'text-gray-400 cursor-not-allowed'
                } cursor-pointer`}
              />
            </PaginationItem>
            {Array.from({ length: totalPage }).map((val, index) => {
              return (
                <PaginationItem id={`${index}`}>
                  <NavLink to=""> {index + 1} </NavLink>
                </PaginationItem>
              );
            })}
            {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
            <PaginationItem
              onClick={() => {
                if (!isNext) {
                  return;
                }
                setSearchParam((prevParam) => ({
                  ...prevParam,
                  page: currentPage + 1,
                }));
                setCurrentPage(currentPage + 1);
              }}
              aria-disabled={!isNext}
              className={`${
                !isNext && 'text-gray-400 cursor-not-allowed'
              } cursor-pointer`}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </Table>
  );
};

export default TableComponent;
