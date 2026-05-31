import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/training/Hero";


export const metadata = {
    title: 'Training Plan',
    description: 'Training page of CAF PRE-BMT',
}

export default function TrainingPage() {
    return (
        <div>
            <Navbar title="Choose your training plan" />
            <Hero />
            <Footer />
        </div>
    );
}
