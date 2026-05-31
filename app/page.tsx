import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/home/Hero";
import About from "@/app/components/home/About";


export const metadata = {
  title: 'CAF PRE-BMT',
  description: 'Start page of CAna....',
}

export default function Home() {
  return (
    <div>
      <Navbar title="Start your journey today" />
      <Hero />
      <section id="about">
        <About />
      </section>
      <Footer />
    </div>
  );
}
