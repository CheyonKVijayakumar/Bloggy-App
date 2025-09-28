import { PageHeader } from "@/components/page-header";
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
import { stakeholders } from "@/lib/mock-data";
import OnboardStakeholderForm from "./components/onboard-stakeholder-form";

export default function StakeholdersPage() {
  return (
    <>
      <PageHeader
        title="Stakeholder Management"
        description="Onboard and manage stakeholders in the ecosystem."
      />
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <OnboardStakeholderForm />
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Stakeholder List</CardTitle>
              <CardDescription>
                A list of all onboarded stakeholders and their roles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stakeholders.map((stakeholder) => (
                    <TableRow key={stakeholder.id}>
                      <TableCell className="font-medium">
                        {stakeholder.name}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {stakeholder.address}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{stakeholder.role}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
