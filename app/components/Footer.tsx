import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white border-t border-gray-800 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Sloupec 1: Značka a popis */}
                    <div className="flex flex-col gap-4">
                        <span className="text-2xl font-extrabold text-red-500 tracking-wider">
                            CAF PRE-BMT
                        </span>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            Training program for aspiring recruits
                        </p>
                    </div>

                    {/* Sloupec 3: Kontakt a Podpora */}
                    <div className="flex flex-col gap-4 md:items-end">
                        <div>
                            <h3 className="text-lg font-bold text-gray-100 uppercase tracking-wider mb-4">
                                Important links
                            </h3>
                            <div className="flex flex-col gap-2 text-sm text-gray-400">
                                <p className="hover:text-red-500 transition-colors cursor-pointer w-fit">
                                    <Link href="https://forces.ca/fr/">
                                        Official website of CAF
                                    </Link>
                                </p>
                                <p className="hover:text-red-500 transition-colors cursor-pointer w-fit">
                                    <Link href="https://cfmws.ca/sport-fitness-rec/fitness-training/caf-fitness/pre-bmt">
                                        Training program source
                                    </Link>

                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Spodní část s copyrightem */}
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© {new Date().getFullYear()} CAF PRE-BMT. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}