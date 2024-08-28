import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { NavLink } from 'react-router-dom';

export interface ITableComponent<T> {
  tableData: T[];
  tableHeader: { name: string; as: string }[];
}

const TableComponent = (props: ITableComponent<any>) => {
  return (
    <Table className="min-w-[calc(100vw-20vw)]">
      <TableCaption>A list of all boxes</TableCaption>
      <TableHeader>
        <TableRow>
          {props.tableHeader.map((header) => (
            <TableHead>{header.as}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.tableData.map((data) => (
          <TableRow>
            {props.tableHeader.map((header) => {
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
    </Table>
  );
};

export default TableComponent;
