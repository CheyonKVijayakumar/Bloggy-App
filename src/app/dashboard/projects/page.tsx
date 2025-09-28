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
import { projects } from "@/lib/mock-data";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RegisterProjectDialog from "./components/register-project-dialog";

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage and monitor all your blue carbon projects."
      >
        <RegisterProjectDialog />
      </PageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Project Listings</CardTitle>
          <CardDescription>
            A comprehensive list of all projects in the registry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden md:table-cell">Developer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                     <Link href={`/dashboard/projects/${project.id}`} className="hover:underline">
                        {project.name}
                     </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {project.location}
                  </TableCell>
                   <TableCell className="hidden md:table-cell">
                    <div className="font-mono text-xs">{project.developer}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={project.active ? "secondary" : "destructive"}>
                      {project.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                           <Link href={`/dashboard/projects/${project.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
