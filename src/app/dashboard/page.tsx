import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
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
import {
  Folders,
  Users,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import { projects, carbonCredits, stakeholders } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { CreditsChart } from "./components/credits-chart";

export default function DashboardPage() {
  const totalProjects = projects.length;
  const totalCredits = carbonCredits.filter(c => !c.retired).reduce((sum, c) => sum + c.sequestrationAmount, 0);
  const totalStakeholders = stakeholders.length;
  const recentProjects = projects.slice(0, 5);

  return (
    <>
      <PageHeader title="Dashboard" description="Welcome to your Blue Carbon MRV dashboard." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Projects"
          value={totalProjects.toString()}
          icon={<Folders className="h-4 w-4" />}
          description="Number of registered restoration projects."
        />
        <StatCard
          title="Active Credits (tCO₂e)"
          value={totalCredits.toLocaleString()}
          icon={<CircleDollarSign className="h-4 w-4" />}
          description="Total carbon credits currently in circulation."
        />
        <StatCard
          title="Total Stakeholders"
          value={totalStakeholders.toString()}
          icon={<Users className="h-4 w-4" />}
          description="Verified organizations and individuals."
        />
      </div>
      <div className="grid gap-4 mt-8 md:grid-cols-2 lg:grid-cols-7">
        <CreditsChart />
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>
                The latest projects added to the registry.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/dashboard/projects">
                View All
                </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <Link href={`/dashboard/projects/${project.id}`} className="hover:underline">
                        <div className="font-medium">{project.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {project.location}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={project.active ? "secondary" : "destructive"}>
                        {project.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
