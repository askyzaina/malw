
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface ServiceItem {
  id: number;
  description: string;
  quantity: string;
  unitPrice: number;
  subtotal: number;
}

interface ServiceSummaryTableProps {
  items: ServiceItem[];
  total: number;
}

const ServiceSummaryTable: React.FC<ServiceSummaryTableProps> = ({ 
  items, 
  total 
}) => {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableCaption>Rincian Pekerjaan</TableCaption>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-12">No.</TableHead>
            <TableHead>Deskripsi Layanan</TableHead>
            <TableHead>Kuantitas</TableHead>
            <TableHead className="text-right">Harga Satuan (Rp)</TableHead>
            <TableHead className="text-right">Subtotal (Rp)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="font-medium">{item.description}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className="text-right">{item.unitPrice.toLocaleString('id-ID')}</TableCell>
              <TableCell className="text-right">{item.subtotal.toLocaleString('id-ID')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="font-medium">Total</TableCell>
            <TableCell colSpan={2}></TableCell>
            <TableCell className="text-right font-bold">{total.toLocaleString('id-ID')}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default ServiceSummaryTable;
