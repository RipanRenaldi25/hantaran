import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { MoreHorizontal, Pen, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';

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
  isRadioAction?: boolean;
  onProcessHandler?: any;
}

const TableComponent = ({
  currentPage,
  isNext,
  isPrevious,
  setCurrentPage,
  tableData,
  tableHeader,
  totalPage,
  isDeleteAction,
  isEditAction,
  handleDelete,
  isRadioAction,
  onProcessHandler,
}: ITableComponent<any>) => {
  const [, setSearchParam] = useSearchParams();
  const [process, setProcess] = useState<
    'unprocessed' | 'processed' | 'completed'
  >('unprocessed');

  const handleProcessChange = (
    orderId: string,
    status: 'unprocessed' | 'processed' | 'completed'
  ) => {
    setProcess(status);
    onProcessHandler(orderId, status);
  };

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
                header.name === 'date' ||
                header.name === 'created_at' ||
                header.name === 'updated_at'
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
            {isEditAction || isDeleteAction || isRadioAction ? (
              <TableCell
                className="h-full"
                colSpan={isEditAction && isDeleteAction ? 2 : 0}
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
                  {isRadioAction && (
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={process as any}
                            onValueChange={(e: any) =>
                              handleProcessChange(data.id, e)
                            }
                          >
                            <DropdownMenuRadioItem value="unprocessed">
                              Unprocessed
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="processed">
                              Processed
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="completed">
                              Completed
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
      {!!totalPage ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={!isPrevious}
                onClick={() => {
                  if (!isPrevious || !currentPage) {
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
            {Array.from({ length: totalPage }).map((_, index) => {
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
                if (!isNext || !currentPage) {
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
      ) : null}
    </Table>
  );
};

export default TableComponent;
