import { Button } from '@/components/ui/button';
import { Leaf, Waves, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm border-b">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17.6C12 17.6 15.2 14.8 15.2 12.4C15.2 10.432 13.768 8.8 12 8.8C10.232 8.8 8.8 10.432 8.8 12.4C8.8 14.8 12 17.6 12 17.6Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 5.5C10.875 5.5 12.5 7.5 12.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.5 5.5C13.125 5.5 11.5 7.5 11.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-semibold text-lg font-headline">Blue Carbon MRV</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                    Transparent Carbon Markets for a Bluer Planet
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our blockchain-powered platform provides a decentralized, verifiable MRV system to ensure transparency, accuracy, and seamless carbon credit generation for blue carbon ecosystems.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      Launch App
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                 <img
                  data-ai-hint="ocean ecosystem"
                  alt="Blue Carbon Ecosystem"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                  src="https://picsum.photos/seed/blue-carbon/600/400"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A New Standard for Environmental Accountability</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From immutable data storage to tokenized carbon credits, our platform empowers communities, NGOs, and developers to drive meaningful climate action.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center p-6 rounded-lg bg-card shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">Project Registration</h3>
                <p className="text-sm text-muted-foreground">
                  Developers can easily register blue carbon projects, setting the foundation for verifiable environmental impact.
                </p>
              </div>
              <div className="grid gap-1 text-center p-6 rounded-lg bg-card shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Waves className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">Tokenized Credits</h3>
                <p className="text-sm text-muted-foreground">
                  Verified carbon sequestration is tokenized into NFTs, creating a liquid and transparent market for carbon credits.
                </p>
              </div>
              <div className="grid gap-1 text-center p-6 rounded-lg bg-card shadow-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">Immutable Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Leverage blockchain for immutable record-keeping and AI-assisted verification to ensure data integrity and trust.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Blue Carbon MRV. All rights reserved.</p>
      </footer>
    </div>
  );
}
