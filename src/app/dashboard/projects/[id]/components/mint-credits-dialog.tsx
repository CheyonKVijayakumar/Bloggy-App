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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CircleDollarSign, Lightbulb, Loader2 } from "lucide-react";
import { Project } from "@/lib/types";
import { recommendCreditFactor } from "@/ai/flows/credit-factor-recommendation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const mintSchema = z.object({
  recordId: z.string().min(1, "Please select a verified record."),
  factor: z.coerce.number().min(0.1, "Factor must be greater than 0."),
  marketConditions: z.string().min(1, "Market conditions are required."),
});

export default function MintCreditsDialog({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendation, setRecommendation] = useState<{ factor: number; rationale: string } | null>(null);
  const { toast } = useToast();

  const verifiedRecords = project.dataRecords.filter(r => r.verified);

  const form = useForm<z.infer<typeof mintSchema>>({
    resolver: zodResolver(mintSchema),
    defaultValues: {
      recordId: "",
      factor: 1,
      marketConditions: "Stable demand for high-quality blue carbon credits.",
    },
  });

  const onSubmit = (values: z.infer<typeof mintSchema>) => {
    const record = verifiedRecords.find(r => r.id === parseInt(values.recordId));
    if (!record) return;

    const creditsToMint = record.sequestrationDelta * values.factor;

    console.log("Minting credits:", {
      ...values,
      projectId: project.id,
      creditsToMint,
    });
    
    toast({
      title: "Credits Minted",
      description: `${creditsToMint.toLocaleString()} credits have been minted for project ${project.id}.`,
    });
    form.reset();
    setRecommendation(null);
    setIsOpen(false);
  };
  
  const handleGetRecommendation = async () => {
    const values = form.getValues();
    const recordId = values.recordId;
    const marketConditions = values.marketConditions;
    if (!recordId) {
        form.setError("recordId", { message: "Please select a record first."});
        return;
    }
    const record = verifiedRecords.find(r => r.id === parseInt(recordId));
    if (!record) return;

    setIsRecommending(true);
    setRecommendation(null);
    try {
        const result = await recommendCreditFactor({
            blueCarbonSourceType: project.type,
            marketConditions: marketConditions,
            sequestrationAmount: record.sequestrationDelta,
        });
        setRecommendation({ factor: result.recommendedFactor, rationale: result.rationale });
        form.setValue("factor", result.recommendedFactor);
    } catch (error) {
        console.error("Failed to get recommendation:", error);
        toast({ variant: "destructive", title: "Recommendation Failed" });
    } finally {
        setIsRecommending(false);
    }
  };
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setRecommendation(null);
      form.reset();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <CircleDollarSign className="mr-2 h-4 w-4" />
          Mint Credits
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Calculate & Mint Credits</DialogTitle>
          <DialogDescription>
            Select a verified record and a factor to mint new carbon credits.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="recordId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verified Record</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified data record" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {verifiedRecords.map(r => (
                        <SelectItem key={r.id} value={r.id.toString()}>
                          Record #{r.id} ({r.sequestrationDelta} tCO₂e)
                        </SelectItem>
                      ))}
                       {verifiedRecords.length === 0 && <p className="p-4 text-sm text-muted-foreground">No verified records available.</p>}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Market Conditions</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe current market conditions..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="factor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Factor</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="button" variant="outline" onClick={handleGetRecommendation} disabled={isRecommending}>
                {isRecommending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Lightbulb className="mr-2 h-4 w-4"/>}
                {isRecommending ? "Getting Recommendation..." : "Get AI Recommended Factor"}
            </Button>

            {recommendation && (
                <Alert className="bg-accent/20">
                    <Lightbulb className="h-4 w-4 text-accent-foreground" />
                    <AlertTitle className="text-accent-foreground">AI Recommendation</AlertTitle>
                    <AlertDescription className="text-accent-foreground/80">
                        {recommendation.rationale}
                    </AlertDescription>
                </Alert>
            )}

            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting || verifiedRecords.length === 0}>
                {form.formState.isSubmitting ? "Minting..." : "Mint Credits"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
