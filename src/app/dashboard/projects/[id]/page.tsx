import Link from "next/link";
import {
  ChevronLeft,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import ProjectDetailsCard from "./components/project-details-card";
import DataRecordsTable from "./components/data-records-table";
import UploadDataDialog from "./components/upload-data-dialog";
import MintCreditsDialog from "./components/mint-credits-dialog";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 md:gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/dashboard/projects">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 font-headline">
          {project.name}
        </h1>
        <Badge variant={project.active ? "outline" : "destructive"} className="ml-auto sm:ml-0">
          {project.active ? "Active" : "Inactive"}
        </Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <UploadDataDialog projectId={project.id} />
          <MintCreditsDialog project={project} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <DataRecordsTable records={project.dataRecords} projectId={project.id} />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
           <ProjectDetailsCard project={project} />
        </div>
      </div>
        <div className="flex items-center gap-2 md:hidden">
          <UploadDataDialog projectId={project.id} />
          <MintCreditsDialog project={project} />
        </div>
    </div>
  );
}
