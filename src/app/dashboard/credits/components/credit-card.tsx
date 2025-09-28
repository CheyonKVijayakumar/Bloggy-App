"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CarbonCredit } from "@/lib/types";
import { projects } from "@/lib/mock-data";

export default function CreditCard({ credit }: { credit: CarbonCredit }) {
  const { toast } = useToast();
  const project = projects.find((p) => p.id === credit.projectId);

  const handleRetire = () => {
    console.log("Retiring credit:", credit.tokenId);
    toast({
      title: "Credit Retired",
      description: `Token ID ${credit.tokenId} has been retired (burned).`,
    });
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Token #{credit.tokenId}</CardTitle>
        <CardDescription>
          From project: {project?.name || "Unknown"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-4xl font-bold font-headline text-primary">
          {credit.sequestrationAmount.toLocaleString()}
        </div>
        <p className="text-sm text-muted-foreground">tCO₂e</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        {credit.retired ? (
          <span className="text-sm font-medium text-muted-foreground">Retired</span>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Retire</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently retire (burn) this carbon credit
                  token. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRetire}>
                  Confirm Retirement
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}
