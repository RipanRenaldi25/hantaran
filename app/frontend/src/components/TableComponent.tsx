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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { NavLink, useSearchParams } from 'react-router-dom';

export interface ITableComponent<T> {
  tableData: T[];
  tableHeader: { name: string; as: string }[];
  totalPage: number;
  currentPage: number;
  setCurrentPage: any;
  isNext: boolean;
  isPrevious: boolean;
}

const TableComponent = ({
  currentPage,
  isNext,
  isPrevious,
  setCurrentPage,
  tableData,
  tableHeader,
  totalPage,
}: ITableComponent<any>) => {
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <Table className="overflow-x-scroll">
      <TableCaption>A list of all boxes</TableCaption>
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
              return <TableCell>{data[header.name]}</TableCell>;
            })}
            <TableCell>
              <div>
                <NavLink to={`edit/`}>Edit</NavLink>
              </div>
              <div>
                <NavLink to="">Delete</NavLink>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
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
    </Table>
  );
};

export default TableComponent;
