"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { StakeholderRole } from "@/lib/types";

const stakeholderSchema = z.object({
  name: z.string().min(1, "Stakeholder name is required."),
  address: z.string().min(1, "Address is required."),
  role: z.enum(["ADMIN", "VERIFIER", "DEVELOPER"]),
});

export default function OnboardStakeholderForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof stakeholderSchema>>({
    resolver: zodResolver(stakeholderSchema),
    defaultValues: {
      name: "",
      address: "",
      role: "DEVELOPER",
    },
  });

  const onSubmit = (values: z.infer<typeof stakeholderSchema>) => {
    console.log("Onboarding stakeholder:", values);
    toast({
      title: "Stakeholder Onboarded",
      description: `User with address ${values.address} has been given the ${values.role} role.`,
    });
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboard Stakeholder</CardTitle>
        <CardDescription>
          Grant a role to a new stakeholder address.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
             <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., GreenDevelop Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stakeholder Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DEVELOPER">Developer</SelectItem>
                      <SelectItem value="VERIFIER">Verifier</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Onboarding..." : "Onboard"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
