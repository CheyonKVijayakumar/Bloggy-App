"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { DataRecord } from "@/lib/types";
import { verifyDataAccuracy } from "@/ai/flows/data-verification-assistance";
import { Loader2, ShieldCheck, FileWarning, Lightbulb } from "lucide-react";
import { projects } from "@/lib/mock-data";

type VerifyDataDialogProps = {
  record: DataRecord;
  projectId: number;
};

export default function VerifyDataDialog({ record, projectId }: VerifyDataDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const project = projects.find(p => p.id === projectId);

  const handleAnalyze = async () => {
    if (!project) return;
    setIsLoading(true);
    setAiAnalysis(null);
    try {
      const result = await verifyDataAccuracy({
        projectId: projectId,
        recordId: record.id,
        dataHash: record.dataHash,
        sequestrationDelta: record.sequestrationDelta,
        projectDetails: `Project: ${project.name}, Location: ${project.location}, Type: ${project.type}`,
      });
      setAiAnalysis(result.flaggedInaccuracies);
    } catch (error) {
      console.error("AI analysis failed:", error);
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "Could not get AI-powered analysis for this record.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = () => {
    console.log("Verifying record:", record.id, "for project:", projectId);
    toast({
      title: "Data Verified",
      description: `Record ${record.id} has been successfully marked as verified.`,
    });
    setIsOpen(false);
    setAiAnalysis(null);
  };
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setAiAnalysis(null);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Verify</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Data Record</DialogTitle>
          <DialogDescription>
            Review and verify data record #{record.id} for project #{projectId}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="text-sm">
                <p><span className="font-medium text-muted-foreground">Data Hash:</span> <span className="font-mono text-xs">{record.dataHash}</span></p>
                <p><span className="font-medium text-muted-foreground">Sequestration Δ:</span> {record.sequestrationDelta} tCO₂e</p>
            </div>
            {!aiAnalysis && (
                <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                    {isLoading ? "Analyzing..." : "Get AI Assistance"}
                </Button>
            )}

            {aiAnalysis && (
            <Alert>
              <FileWarning className="h-4 w-4" />
              <AlertTitle>AI Analysis</AlertTitle>
              <AlertDescription>
                {aiAnalysis}
              </AlertDescription>
            </Alert>
          )}

        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleVerify}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            Confirm Verification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
