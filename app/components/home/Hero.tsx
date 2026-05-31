
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="w-full py024 md:py-32 lg:py-40 flex flex-col items-center justify-center text-center px-4 min-h-[70vh]">
            <div className="space-y-6 max-w-4xl">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl uppercase">
                    Welcome to <br />
                    <span className="text-primary">CAF PRE-BMT</span>
                </h1>

                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl sm:leading-relaxed">
                    Physical and mental training program designed to prepare you for the challenges of the Canadian Armed Forces Basic Military Training. Whether you're just starting your fitness journey or looking to push your limits, our comprehensive training plans will help you succeed in your military aspirations.
                </p>
                <div className="pt-8">
                    <Link href="/training">
                        <Button size="lg" className="text=lg px-8 py-6 font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">
                            Show Training Plan
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}