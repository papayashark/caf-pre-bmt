
export default function About() {
    return (
        <section id="about" className="w-full py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">
                <div className="max-w-3xl flex flex-col items-center gap-6">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl uppercase">About the Mission</h2>

                    <div className="w-16 h-1 bg-primary rounded-full mb-2"></div>

                    <p className="text-lg text-muted-foreground leading-relaxed md:text-xl">
                        This website is dedicated to preparing recruits for the Canadian Armed Forces Basic Military Training (CAF BMT). It provides a comprehensive training program designed to help you succeed in your military journey. Whether you're just starting out or looking to improve your fitness, our resources and guidance will support you every step of the way.
                    </p>
                </div>
            </div>
        </section>

    );
}