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
import { formatDate, formatCurrency } from '@/lib/utils';
import {
  MoreHorizontal,
  Pen,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  Copy,
  ExternalLink,
  Check,
} from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const AddressCell = ({ address }: { address?: string }) => {
  const [copied, setCopied] = useState(false);

  if (!address || address.trim() === '') {
    return (
      <span className="text-muted-foreground italic text-xs">-</span>
    );
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group flex items-start gap-1.5 text-left max-w-[200px] hover:text-primary transition-colors focus:outline-hidden cursor-pointer"
          title="Klik untuk melihat detail alamat & tracking"
        >
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
          <span className="line-clamp-2 leading-relaxed text-xs font-medium text-stone-700 group-hover:text-primary underline-offset-2 group-hover:underline">
            {address}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3.5 rounded-xl shadow-lg border-border bg-white" align="start">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Alamat Pengiriman Pembeli</span>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-2.5 rounded-lg border border-border/60 select-all">
            {address}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex-1 h-8 text-xs font-medium gap-1 rounded-lg border-border hover:bg-secondary cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Alamat</span>
                </>
              )}
            </Button>
            <Button
              type="button"
              asChild
              variant="default"
              size="sm"
              className="flex-1 h-8 text-xs font-medium gap-1 rounded-lg"
            >
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Maps</span>
              </a>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

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
    <div className="w-full overflow-hidden border border-border rounded-2xl bg-white shadow-xs">
      <div className="overflow-x-auto">
        <Table className="w-full text-sm">
          <TableHeader className="bg-stone-50/80 border-b border-border">
            <TableRow className="hover:bg-transparent">
              {tableHeader.map((header) => (
                <TableHead
                  key={header.name}
                  className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-4 whitespace-nowrap"
                >
                  {header.as}
                </TableHead>
              ))}
              {(isEditAction || isDeleteAction || isRadioAction) && (
                <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground py-4 px-4 text-center">
                  Aksi
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={tableHeader.length + (isEditAction || isDeleteAction || isRadioAction ? 1 : 0)}
                  className="h-32 text-center text-muted-foreground font-medium"
                >
                  Tidak ada data yang tersedia saat ini.
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((data: any, idx: number) => (
                <TableRow
                  key={data.id || idx}
                  className="hover:bg-secondary/40 transition-colors border-b border-border/70"
                >
                  {tableHeader.map((header) => {
                    const value = data[header.name];

                    // Date formatting
                    if (
                      header.name === 'createdAt' ||
                      header.name === 'updatedAt' ||
                      header.name === 'date' ||
                      header.name === 'created_at' ||
                      header.name === 'updated_at'
                    ) {
                      return (
                        <TableCell key={header.name} className="py-4 px-4 text-muted-foreground whitespace-nowrap font-medium text-xs">
                          {value ? formatDate(new Date(value)) : '-'}
                        </TableCell>
                      );
                    }

                    // Price formatting
                    if (header.name === 'price') {
                      return (
                        <TableCell key={header.name} className="py-4 px-4 font-bold text-foreground whitespace-nowrap">
                          {formatCurrency(Number(value) || 0)}
                        </TableCell>
                      );
                    }

                    // Payment status badge
                    if (header.name === 'status') {
                      return (
                        <TableCell key={header.name} className="py-4 px-4 whitespace-nowrap">
                          {value === 'pending' && (
                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300 font-semibold gap-1 px-2.5 py-1">
                              <Clock className="w-3 h-3" />
                              <span>Menunggu Bayar</span>
                            </Badge>
                          )}
                          {value === 'settlement' && (
                            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-300 font-semibold gap-1 px-2.5 py-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Lunas</span>
                            </Badge>
                          )}
                          {(value === 'expire' || value === 'expired' || value === 'cancelled') && (
                            <Badge variant="destructive" className="font-semibold gap-1 px-2.5 py-1">
                              <XCircle className="w-3 h-3" />
                              <span>Batal/Kadaluarsa</span>
                            </Badge>
                          )}
                          {!['pending', 'settlement', 'expire', 'expired', 'cancelled'].includes(value) && (
                            <Badge variant="outline" className="font-semibold">
                              {value}
                            </Badge>
                          )}
                        </TableCell>
                      );
                    }

                    // Manage Process status badge
                    if (header.name === 'manageStatus') {
                      return (
                        <TableCell key={header.name} className="py-4 px-4 whitespace-nowrap">
                          {value === 'unprocessed' && (
                            <Badge className="bg-stone-100 text-stone-700 hover:bg-stone-100 border-stone-300 font-semibold px-2.5 py-1">
                              Belum Diproses
                            </Badge>
                          )}
                          {value === 'processed' && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-300 font-semibold px-2.5 py-1">
                              Sedang Dikerjakan
                            </Badge>
                          )}
                          {value === 'completed' && (
                            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-300 font-semibold px-2.5 py-1">
                              Selesai Siap Ambil
                            </Badge>
                          )}
                          {!['unprocessed', 'processed', 'completed'].includes(value) && (
                            <Badge variant="secondary">{value || '-'}</Badge>
                          )}
                        </TableCell>
                      );
                    }

                    // Address formatting with popover & maps action
                    if (header.name === 'address') {
                      return (
                        <TableCell key={header.name} className="py-4 px-4 whitespace-normal">
                          <AddressCell address={value} />
                        </TableCell>
                      );
                    }

                    // Default cell
                    return (
                      <TableCell key={header.name} className="py-4 px-4 text-foreground font-medium">
                        {value !== undefined && value !== null ? String(value) : '-'}
                      </TableCell>
                    );
                  })}

                  {/* Actions Column */}
                  {(isEditAction || isDeleteAction || isRadioAction) && (
                    <TableCell className="py-4 px-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        {isEditAction && (
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="rounded-lg h-8 px-2.5 text-xs font-semibold gap-1.5 border-border hover:bg-secondary"
                          >
                            <NavLink to={`edit/${data.id}`}>
                              <Pen className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </NavLink>
                          </Button>
                        )}

                        {isDeleteAction && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg h-8 px-2.5 text-xs font-semibold gap-1.5 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleDelete(data.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </Button>
                        )}

                        {isRadioAction && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-lg border-border hover:bg-secondary"
                                aria-label="Ubah status proses"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl">
                              <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase px-2 py-1.5">
                                Update Status Proses
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuRadioGroup
                                value={data.manageStatus || (process as any)}
                                onValueChange={(e: any) =>
                                  handleProcessChange(data.id, e)
                                }
                              >
                                <DropdownMenuRadioItem
                                  value="unprocessed"
                                  className="cursor-pointer rounded-lg text-xs font-medium py-2"
                                >
                                  Belum Diproses
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                  value="processed"
                                  className="cursor-pointer rounded-lg text-xs font-medium py-2"
                                >
                                  Sedang Diproses
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                  value="completed"
                                  className="cursor-pointer rounded-lg text-xs font-medium py-2"
                                >
                                  Selesai
                                </DropdownMenuRadioItem>
                              </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {Boolean(totalPage && totalPage > 1) && (
        <div className="p-4 border-t border-border bg-stone-50/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">
            Halaman {currentPage || 1} dari {totalPage}
          </span>
          <Pagination className="justify-end w-auto mx-0">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={!isPrevious}
                  onClick={() => {
                    if (!isPrevious || !currentPage) return;
                    setSearchParam((prevParam) => ({
                      ...prevParam,
                      page: String(currentPage - 1),
                    }));
                    setCurrentPage(currentPage - 1);
                  }}
                  className={cn(
                    'min-h-[36px] rounded-lg text-xs font-semibold cursor-pointer border border-border',
                    !isPrevious && 'pointer-events-none opacity-40'
                  )}
                />
              </PaginationItem>

              {Array.from({ length: totalPage || 0 }).map((_, index) => {
                const pageNum = index + 1;
                const isActive = (currentPage || 1) === pageNum;
                return (
                  <PaginationItem key={pageNum}>
                    <Button
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      className={cn(
                        'min-w-[36px] h-9 rounded-lg text-xs font-semibold p-0',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'border-border text-foreground hover:bg-secondary'
                      )}
                      onClick={() => {
                        setSearchParam((prevParam) => ({
                          ...prevParam,
                          page: String(pageNum),
                        }));
                        setCurrentPage(pageNum);
                      }}
                    >
                      {pageNum}
                    </Button>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  aria-disabled={!isNext}
                  onClick={() => {
                    if (!isNext || !currentPage) return;
                    setSearchParam((prevParam) => ({
                      ...prevParam,
                      page: String(currentPage + 1),
                    }));
                    setCurrentPage(currentPage + 1);
                  }}
                  className={cn(
                    'min-h-[36px] rounded-lg text-xs font-semibold cursor-pointer border border-border',
                    !isNext && 'pointer-events-none opacity-40'
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
