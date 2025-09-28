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
import { Label } from "@/components/ui/label";
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
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  location: z.string().min(1, "Location is required"),
  baselineCarbon: z.coerce
    .number()
    .min(0, "Baseline carbon must be a positive number"),
});

export default function RegisterProjectDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      location: "",
      baselineCarbon: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    console.log("Registering project:", values);
    // Here you would typically call a server action or API endpoint
    toast({
      title: "Project Registered",
      description: `The project "${values.name}" has been successfully registered.`,
    });
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Register Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to register a new blue carbon project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mangrove Restoration in Sundarbans" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sundarbans, West Bengal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baselineCarbon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Baseline Carbon (tCO₂e)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Registering..." : "Register Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
