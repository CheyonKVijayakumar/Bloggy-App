import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/lib/types";

export default function ProjectDetailsCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>
          High-level information about this project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Project Name</span>
              <span>{project.name}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Location</span>
              <span>{project.location}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Developer</span>
              <span className="font-mono text-xs">{project.developer}</span>
            </li>
          </ul>
          <Separator />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Baseline Carbon</span>
              <span>{project.baselineCarbon.toLocaleString()} tCO₂e</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total Minted</span>
              <span>{project.totalCreditsMinted.toLocaleString()} tCO₂e</span>
            </li>
             <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Sequestration</span>
              <span>{project.lastSequestration.toLocaleString()} tCO₂e</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
