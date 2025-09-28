import { PageHeader } from "@/components/page-header";
import { carbonCredits } from "@/lib/mock-data";
import CreditCard from "./components/credit-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreditsPage() {
  const activeCredits = carbonCredits.filter((c) => !c.retired);
  const retiredCredits = carbonCredits.filter((c) => c.retired);

  return (
    <>
      <PageHeader
        title="My Carbon Credits"
        description="View and manage your portfolio of tokenized blue carbon credits."
      />
      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="active">Active Credits</TabsTrigger>
          <TabsTrigger value="retired">Retired Credits</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            {activeCredits.map((credit) => (
              <CreditCard key={credit.id} credit={credit} />
            ))}
             {activeCredits.length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-10">You have no active credits.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="retired">
          <div className="grid gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            {retiredCredits.map((credit) => (
              <CreditCard key={credit.id} credit={credit} />
            ))}
            {retiredCredits.length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-10">You have no retired credits.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
