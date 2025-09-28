"use client";

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
import { Upload } from "lucide-react";
import { useState } from "react";

const dataSchema = z.object({
  dataHash: z.string().min(1, "Data hash is required"),
  sequestrationDelta: z.coerce
    .number()
    .min(0, "Sequestration delta must be a positive number"),
});

export default function UploadDataDialog({ projectId }: { projectId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
    defaultValues: {
      dataHash: "",
      sequestrationDelta: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof dataSchema>) => {
    console.log("Uploading data for project", projectId, ":", values);
    toast({
      title: "Data Uploaded",
      description: `Data has been successfully uploaded for verification.`,
    });
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload New Data Record</DialogTitle>
          <DialogDescription>
            Submit a new data record for verification. Project ID: {projectId}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="dataHash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Hash (IPFS)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ipfs://QmWx..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sequestrationDelta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sequestration Delta (tCO₂e)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
