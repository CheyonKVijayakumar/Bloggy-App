import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DataRecord } from "@/lib/types";
import VerifyDataDialog from "./verify-data-dialog";

type DataRecordsTableProps = {
  records: DataRecord[];
  projectId: number;
};

export default function DataRecordsTable({ records, projectId }: DataRecordsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Records</CardTitle>
        <CardDescription>
          Uploaded data for carbon sequestration monitoring.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Record ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Sequestration Δ</TableHead>
              <TableHead>Data Hash</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.id}</TableCell>
                <TableCell>
                  {new Date(record.timestamp * 1000).toLocaleDateString()}
                </TableCell>
                <TableCell>{record.sequestrationDelta} tCO₂e</TableCell>
                <TableCell className="font-mono text-xs">
                  {record.dataHash.substring(0, 15)}...
                </TableCell>
                <TableCell>
                  <Badge variant={record.verified ? "default" : "secondary"} className={record.verified ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}>
                    {record.verified ? "Verified" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {!record.verified && <VerifyDataDialog record={record} projectId={projectId} />}
                </TableCell>
              </TableRow>
            ))}
             {records.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">No data records uploaded yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
